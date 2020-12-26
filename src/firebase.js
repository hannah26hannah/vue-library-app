import firebase from "firebase/app";
import "firebase/auth";
import store from "./store";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.UE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

export default firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth();

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("getUser", user);
  sessionStorage.setItem("user", JSON.stringify(user));
});
