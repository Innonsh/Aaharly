import React, { useEffect, useRef, useState, useContext } from "react";
import { View, SafeAreaView, TouchableOpacity, ScrollView, Alert, Keyboard } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";

import AppText from "../../components/AppText";
import Input from "../../components/TextInput"; 
import BackArrow from "../../assets/Icons/back_arrow.svg";
import SearchIcon from "../../assets/Icons/search.svg";
import { GOOGLE_MAPS_KEY } from "../../utils/config";
import { styles } from "./addressStyle";
import { Colors } from "../../theme/Colors";
import { LocalizationContext } from "../../contexts/LocalizationContext";

export default function AddressScreen({ navigation }: any) {
  const googleRef = useRef<GooglePlacesAutocompleteRef>(null);
  const mapRef = useRef<MapView | null>(null);
  const { translations } = useContext(LocalizationContext);
  const strings = translations as any;

  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [note, setNote] = useState("");
  const [type, setType] = useState("OFFICE");
  const [isDefault, setIsDefault] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const [region, setRegion] = useState<Region>({
    latitude: 18.5204, 
    longitude: 73.8567,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  useEffect(() => {
    locateUser();
  }, []);

  const locateUser = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setRegion({ latitude, longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 });
        mapRef.current?.animateToRegion({ latitude, longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 }, 1000);
      },
      () => Alert.alert("Error", "GPS Error"),
      { enableHighAccuracy: true }
    );
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_KEY}`);
      const data = await res.json();
      if (data?.results?.length) {
        const cleanAddress = data.results.find((r: any) => !r.types.includes("plus_code"))?.formatted_address || data.results[0].formatted_address;
        setAddress(cleanAddress); 
      }
    } catch (e) { console.log(e); }
  };

  /**
   * Deep Search Logic:
   * Instead of a basic geocode, we fetch the first suggestion 
   * from the Google Places API to ensure accuracy.
   */
  const handleDeepSearch = async () => {
    const currentText = googleRef.current?.getAddressText();
    if (!currentText || currentText.length < 2) return;

    try {
      // Fetching the deep location data for the current input string
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(currentText)}&key=${GOOGLE_MAPS_KEY}&components=country:in`
      );
      const data = await response.json();

      if (data.predictions && data.predictions.length > 0) {
        // Automatically select the very first (most accurate) prediction
        const firstResult = data.predictions[0];
        
        // Now get the coordinates for that specific Place ID
        const detailRes = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${firstResult.place_id}&key=${GOOGLE_MAPS_KEY}`
        );
        const detailData = await detailRes.json();

        if (detailData.result) {
          const { lat, lng } = detailData.result.geometry.location;
          const fullAddr = detailData.result.formatted_address;

          setAddress(fullAddr);
          setRegion({ latitude: lat, longitude: lng, latitudeDelta: 0.005, longitudeDelta: 0.005 });
          mapRef.current?.animateToRegion({ latitude: lat, longitude: lng, latitudeDelta: 0.005, longitudeDelta: 0.005 }, 1000);
          
          // Clear Search Bar text to keep it clean (Empty State design)
          googleRef.current?.setAddressText(""); 
          setIsTyping(false);
          Keyboard.dismiss();
        }
      }
    } catch (error) {
      console.log("Deep Search error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackArrow width={18} height={18} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>{strings?.address?.title}</AppText>
      </View>

      <View style={styles.searchBarWrapper}>
        <GooglePlacesAutocomplete
          ref={googleRef}
          placeholder={strings?.address?.search}
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details) {
              const { lat, lng } = details.geometry.location;
              setAddress(details.formatted_address || data.description); 
              setRegion({ latitude: lat, longitude: lng, latitudeDelta: 0.005, longitudeDelta: 0.005 });
              mapRef.current?.animateToRegion({ latitude: lat, longitude: lng, latitudeDelta: 0.005, longitudeDelta: 0.005 }, 1000);
              googleRef.current?.setAddressText(""); // Keep search empty after selection
              setIsTyping(false);
              Keyboard.dismiss();
            }
          }}
          textInputProps={{ 
            onChangeText: (text) => setIsTyping(text.length > 0),
            placeholderTextColor: '#999',
            onSubmitEditing: handleDeepSearch, // Now performs a deep search
            returnKeyType: 'search',
          }}
          query={{ key: GOOGLE_MAPS_KEY, language: "en", components: 'country:in' }}
          renderLeftButton={() => (<View style={styles.searchIconInside}><SearchIcon width={20} height={20} fill="#999" /></View>)}
          enablePoweredByContainer={false}
          styles={{
            container: { flex: 0 },
            textInputContainer: styles.autocompleteContainer,
            textInput: styles.autocompleteInput, 
            listView: [styles.autocompleteList, !isTyping && { height: 0, opacity: 0 }],
            description: { color: '#000' }, 
          }}
        />
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.mapWrapper}>
          <MapView ref={mapRef} style={{ flex: 1 }} region={region} showsUserLocation onRegionChangeComplete={(r, gesture) => {
            if (gesture?.isGesture) reverseGeocode(r.latitude, r.longitude);
          }}>
            <Marker coordinate={region} />
          </MapView>
          <TouchableOpacity style={styles.gpsButton} onPress={locateUser}>
            <AppText style={styles.gpsText}>{strings?.address?.useLocation}</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.formPadding}>
          <AppText style={styles.label}>{strings?.address?.address}</AppText>
          <Input value={address} onChangeText={setAddress} editable={true} multiline={true} style={styles.addressInputFix} />

          <AppText style={styles.label}>{strings?.address?.details}</AppText>
          <Input value={details} onChangeText={setDetails} placeholder="" style={styles.standardInput} />

          <View style={styles.labelRow}>
            <AppText style={styles.label}>{strings?.address?.note}</AppText>
            <AppText style={styles.optionalText}>(Optional)</AppText>
          </View>
          <Input value={note} onChangeText={setNote} placeholder="" style={styles.standardInput} />

          <AppText style={styles.label}>{strings?.address?.type}</AppText>
          <View style={styles.addressTypeContainer}>
            {["HOME", "OFFICE", "COLLEGE", "OTHER"].map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setType(t)}
                style={[styles.chipItem, type === t && styles.chipItemActive]}
              >
                <AppText style={[styles.chipItemText, type === t && styles.chipItemTextActive]}>
                  {strings?.address?.[t.toLowerCase()]}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.defaultContainerVertical}>
            <AppText style={styles.defaultLabel}>{strings?.address?.default}</AppText>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setIsDefault(!isDefault)} style={[styles.toggleTrack, { backgroundColor: isDefault ? Colors.primary : "#ccc" }]}>
              <View style={[styles.toggleWheel, { alignSelf: isDefault ? "flex-end" : "flex-start" }]} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
            <AppText style={styles.saveBtnText}>{strings?.address?.save}</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}