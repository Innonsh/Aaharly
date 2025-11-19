import React, { useState } from "react";
import { View, Image, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/ui/Button";
import AppText from "../../components/ui/AppText";


const onboardingData = [
  {
    id: 1,
    image: require("assets/pana.png"),
    title: "Meals that match your goals",
    description: "Personalized meals designed for your body and fitness goals.",
  },
  {
    id: 2,
    image: require("assets/rafiki.png"),
    title: "One Tap and You're set for the Meal Plan",
    description: "Subscribe once and let your meal arrive effortlessly.",
  },
  {
    id: 3,
    image: require("assets/cuate.png"),
    title: "Your Routine, Your Rules.",
    description: "Home, office, or college! We deliver wherever you are.",
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < onboardingData.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.navigate("Login" as never);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* SKIP BUTTON */}
      <View style={styles.skipContainer}>
        <Button
          title="Skip"
          variant="outline"
          style={{ paddingVertical: 4, paddingHorizontal: 10 , borderColor:"transparent", }}
          onPress={() => navigation.navigate("Login" as never)}
        />
      </View>

      {/* MAIN IMAGE */}
      <Image source={onboardingData[index].image} style={styles.mainImage} />

      {/* DOTS */}
      <View style={styles.dotContainer}>
        {onboardingData.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === index ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      {/* TITLE + DESCRIPTION */}
      <View style={styles.textSection}>
        <AppText weight="bold" size={24} align="center" style={{marginTop:30}}>
          {onboardingData[index].title}
        </AppText>

        <AppText
          size={18}
          color="gray"
          align="center"
          style={{ marginTop: 24}}
        >
          {onboardingData[index].description}
        </AppText>
      </View>

      {/* BUTTONS */}
      {index === 2 ? (
        <Button
          title="Get Started"
          onPress={() => navigation.navigate("Login" as never)}
          variant="primary"
        //   style={styles.getStartedBtn}
        />
      ) : (
        <Button
          title="→"
          variant="primary"
          onPress={next}
          style={styles.arrowBtn}
        />
      )}
     

      
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /* Skip Button */
  skipContainer: {
    position: "absolute",
    
    top: 44,
    right: 20,
    zIndex: 10,
  },

  /* Main Image */
  mainImage: {
    width: 260,
    height: 260,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 80,
  },

  /* Dot Section */
  dotContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 30,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: "#FF6B3C",
    width: 22,
  },
  dotInactive: {
    backgroundColor: "#DDD",
  },

  /* Text Section */
  textSection: {
    marginTop: 35,
    paddingHorizontal: 40,
  },

  /* Next Arrow Button */
  arrowBtn: {
    position: "absolute",
    top: 691,
    left: 164,
    width: 64,
    height: 64,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 32,
    justifyContent: "center",
    padding:22,
  },

  /* Final Get Started Button */
  getStartedBtn: {
    width: 360,
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#FF6B3C",
    borderRadius: 8,
  },
});
