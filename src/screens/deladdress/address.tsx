import React, { useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import auth from "@react-native-firebase/auth";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import AppText from "../../components/AppText";
import Input from "../../components/TextInput";
import BackArrow from "../../assets/Icons/back_arrow.svg";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import config, { GOOGLE_MAPS_KEY } from "../../utils/config";
import { styles } from "./addressStyle";

export default function AddressScreen({ navigation }: any) {
  const mapRef = useRef<MapView>(null);

  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [note, setNote] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const [region, setRegion] = useState<Region>({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
  });

  useEffect(() => {
    locateUser();
  }, []);

  const locateUser = () => {
  Geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;

      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      };

      // 1️⃣ Move map
      mapRef.current?.animateToRegion(newRegion, 1000);

      // 2️⃣ Update pin + state
      setRegion(newRegion);

      // 3️⃣ Update address
      reverseGeocode(latitude, longitude);
    },
    () => Alert.alert("Permission required", "Location permission is required"),
    { enableHighAccuracy: true }
  );
};


  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_KEY}`
      );
      const data = await res.json();

      if (!data.results || data.results.length === 0) return;

      const result = data.results[0];
      setAddress(result.formatted_address);

      const cityComp = result.address_components.find(
        (c: { long_name: string; types: string[] }) => c.types.includes("locality")
      );
      const pinComp = result.address_components.find(
        (c: { long_name: string; types: string[] }) => c.types.includes("postal_code")
      );

      if (cityComp) setCity(cityComp.long_name);
      if (pinComp) setPincode(pinComp.long_name);
    } catch (err) {
      console.log("Geocode error", err);
    }
  };

  const saveAddress = async () => {
    try {
      const token = await auth().currentUser?.getIdToken();

      await fetch(`${config.BASE_URL}/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          address,
          details,
          note,
          type: "HOME",
          lat: region.latitude,
          lng: region.longitude
        })
      });

      navigation.navigate(NavigationRoutes.DELIVERY_SETTINGS);
    } catch (err) {
      Alert.alert("Error", "Failed to save address");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackArrow width={18} height={18} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Add Address</AppText>
      </View>

      {/* Search */}
      <GooglePlacesAutocomplete
        placeholder="Search location"
        fetchDetails
        styles={{ container: { padding: 10 } }}
        onPress={(data, details) => {
          if (!details) return;

          const lat = details.geometry.location.lat;
          const lng = details.geometry.location.lng;
          const newRegion = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          };
          setRegion(newRegion);
          mapRef.current?.animateToRegion(newRegion, 1000);
          reverseGeocode(lat, lng);
        }}
        query={{ key: GOOGLE_MAPS_KEY, language: "en" }}
      />

      {/* Map */}
      <MapView
        ref={mapRef}
        style={{ height: 250 }}
        region={region}
        showsUserLocation
        onRegionChangeComplete={(r) => {
          setRegion(r);
          reverseGeocode(r.latitude, r.longitude);
        }}
      >
        <Marker coordinate={region} />
      </MapView>

      <TouchableOpacity onPress={locateUser} style={{ alignSelf: "center", margin: 10 }}>
        <AppText>📍 Use my current location</AppText>
      </TouchableOpacity>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Input value={address} editable={false} />
        <Input placeholder="Address details" value={details} onChangeText={setDetails} />
        <Input placeholder="Delivery note" value={note} onChangeText={setNote} />
      </ScrollView>

      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveAddress}>
          <AppText style={styles.saveButtonText}>Save Address</AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
