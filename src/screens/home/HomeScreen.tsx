import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";
import Button from "../../components/Button";
import { Colors } from "../../theme/Colors";
import { LocalizationContext } from "../../contexts/LocalizationContext";
import { NavigationProp } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import auth from "@react-native-firebase/auth";

interface Props {
    navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const { translations } = useContext(LocalizationContext);

    const handleLogout = async () => {
        try {
            await auth().signOut();
            navigation.navigate(NavigationRoutes.LOGIN);
        } catch (error) {
            console.log("Error logging out: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <AppText variant="title" style={styles.title}>
                Welcome Home!
            </AppText>
            <AppText variant="subtitle" style={styles.subtitle}>
                You have successfully logged in.
            </AppText>

            <Button
                title="Logout"
                onPress={handleLogout}
                variant="primary"
                style={styles.button}
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        marginBottom: 10,
    },
    subtitle: {
        marginBottom: 30,
        textAlign: "center",
    },
    button: {
        width: "100%",
    },
});
