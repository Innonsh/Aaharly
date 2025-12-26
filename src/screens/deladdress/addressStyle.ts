import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { fonts } from "../../theme/Fonts";
import { Colors } from "../../theme/Colors";

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("2%"),
  },
  backButton: {
    width: wp("11%"), height: wp("11%"), borderRadius: wp("5.5%"),
    backgroundColor: "#F5F5F5", justifyContent: "center", alignItems: "center"
  },
  headerTitle: {
    flex: 1, textAlign: "center", marginRight: wp("11%"),
    fontSize: wp("4.5%"), fontFamily: fonts.SemiBold
  },

  searchBarWrapper: {
    width: wp("92%"), 
    height: 50,
    marginTop: hp("2%"), 
    alignSelf: 'center',
    zIndex: 999,
  },
  autocompleteContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 12,
  },
  searchIconInside: { marginRight: 14 },
  autocompleteInput: {
    backgroundColor: "transparent",
    height: 50,
    fontSize: wp("4%"),
    flex: 1,
    fontFamily: fonts.Regular,
    color: "#000000", // Search text is now black
  },
  autocompleteList: {
    position: "absolute",
    top: 55,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    elevation: 5,
    width: '100%',
    zIndex: 1000
  },

  mapWrapper: { 
    width: wp("100%"), 
    height: hp("48%"), 
    marginTop: hp("2%"),
    position: "relative" 
  },

  gpsButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
  },
  gpsText: { color: Colors.primary, fontFamily: fonts.Medium, fontSize: wp("3.5%") },
  formPadding: { paddingHorizontal: wp("4%"), paddingTop: 10 },
  
  labelRow: { flexDirection: 'row', alignItems: 'baseline' },
  label: { 
    fontFamily: fonts.Medium, 
    fontSize: wp("3.8%"), 
    marginTop: hp("2.5%"), 
    marginBottom: hp("1%"),
    color: "#000"
  },
  
  optionalText: {
    fontFamily: fonts.Regular,
    fontSize: wp("3.2%"),
    color: "#777777", // Optional text color is #777777
    marginLeft: wp("2%"),
  },

  addressInputFix: {
    minHeight: hp("10%"), 
    textAlignVertical: 'top',
    paddingTop: 12,
    fontSize: wp("3.8%"),
    color: "#000"
  },
  standardInput: {
    height: hp("6%"), 
    fontSize: wp("3.8%"),
    color: "#000"
  },

  addressTypeContainer: {
    width: 293,
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: hp("1%"),
  },
  chipItem: {
    width: 64,
    height: 28,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipItemActive: { backgroundColor: Colors.primary },
  chipItemText: { fontSize: 12, fontFamily: fonts.Medium, color: '#000' },
  chipItemTextActive: { color: '#FFF' },

  defaultContainerVertical: {
    marginTop: hp("3%"),
    alignItems: 'flex-start',
    marginBottom: hp("4%"), // Space before Save button
  },
  defaultLabel: { 
    fontFamily: fonts.Medium, 
    fontSize: wp("4%"), 
    marginBottom: hp("1.5%"),
    color: '#000' 
  },
  toggleTrack: { width: 52, height: 28, borderRadius: 14, justifyContent: "center", padding: 3 },
  toggleWheel: { width: 22, height: 22, borderRadius: 11, backgroundColor: "white" },
  
  // Footer styles removed
  saveBtn: {
    height: hp("7%"), 
    backgroundColor: Colors.primary,
    borderRadius: 12, 
    justifyContent: "center", 
    alignItems: "center",
    marginTop: hp("2%"),
  },
  saveBtnText: { color: "white", fontSize: wp("4%"), fontFamily: fonts.SemiBold }
});