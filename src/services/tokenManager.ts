import auth, { getIdToken } from "@react-native-firebase/auth";

export const listenForTokenRefresh = (setToken: (val: string) => void) => {
  return auth().onIdTokenChanged(async (user) => {
    if (user) {
      const token = await getIdToken(user);
      setToken(token);
    } else {
      setToken("");
    }
  });
};
