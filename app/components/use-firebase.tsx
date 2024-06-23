import { type FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useHydrated } from "./use-hydrated";

let isInitialRequest = true;
let firebaseApp: FirebaseApp;

export function clientLoader() {
  const firebaseConfig = {
    apiKey: "AIzaSyBlyVoECJ_I312_g_ye8yUA6D1vVqWNiy8",
    authDomain: "columferry-co-uk-c6fd6.firebaseapp.com",
    projectId: "columferry-co-uk-c6fd6",
    storageBucket: "columferry-co-uk-c6fd6.appspot.com",
    messagingSenderId: "424257855983",
    appId: "1:424257855983:web:2f8ce62ad99373f71cd61a",
    measurementId: "G-0KVMSX9TP4",
  };

  if (isInitialRequest) {
    isInitialRequest = false;
    firebaseApp = initializeApp(firebaseConfig);
  }
  const analytics = getAnalytics(firebaseApp);
  logEvent(analytics, "page_view", {});

  return null;
}
clientLoader.hydrate = true;

export function FirebaseAnalytics() {
  return useHydrated() ? <>&nbsp;</> : <>&nbsp;</>;
}
