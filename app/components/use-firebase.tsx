import { type FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useHydrated } from "./use-hydrated";
import { useEffect, useState } from "react";

let loggingAnalytics: number | undefined;
let isInitialRequest = true;
let firebaseApp: FirebaseApp;
const firebaseConfig = {
  apiKey: "AIzaSyBlyVoECJ_I312_g_ye8yUA6D1vVqWNiy8",
  authDomain: "columferry-co-uk-c6fd6.firebaseapp.com",
  projectId: "columferry-co-uk-c6fd6",
  storageBucket: "columferry-co-uk-c6fd6.appspot.com",
  messagingSenderId: "424257855983",
  appId: "1:424257855983:web:2f8ce62ad99373f71cd61a",
  measurementId: "G-0KVMSX9TP4",
};

export function FirebaseAnalytics() {
  const [pathname, setPathname] = useState<string>("a");
  const [loggedPathname, setLoggedPathname] = useState<string>("b");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        if (isInitialRequest) {
          isInitialRequest = false;
          firebaseApp = initializeApp(firebaseConfig);
        }
        if (!loggingAnalytics && loggedPathname !== pathname) {
          setLoggedPathname(pathname);
          loggingAnalytics = window.setTimeout(() => {
            const analytics = getAnalytics(firebaseApp);
            logEvent(analytics, "page_view", {});
            window.clearTimeout(loggingAnalytics);
            loggingAnalytics = undefined;
          }, 250);
        }
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const refreshInterval = window.setInterval(() => {
      setPathname(window.location.pathname);
    }, 5_000);

    return () => window.clearInterval(refreshInterval);
  }, []);

  return useHydrated() ? <>&nbsp;</> : <>&nbsp;</>;
}
