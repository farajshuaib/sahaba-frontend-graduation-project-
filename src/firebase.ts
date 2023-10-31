import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  Messaging,
  onMessage,
} from "firebase/messaging";
import { FCM_vapidKey } from "./constant";
import { getAnalytics } from "firebase/analytics";
import { isSupported } from "utils/functions";

const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  measurementId: "measurementId",
};

const firebaseApp = initializeApp(firebaseConfig);

let messaging: Messaging | null;
if (isSupported()) {
  messaging =
    Notification?.permission && Notification?.permission === "granted"
      ? getMessaging(firebaseApp)
      : null;
}

export const getFCMToken = async () => {
  try {
    if (!messaging) return;
    const token = await getToken(messaging, {
      vapidKey: FCM_vapidKey,
    });
    return token;
  } catch {
    return "";
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) return;
    onMessage(messaging, (payload) => {
      new Notification("new sahaba", {
        body: payload.notification?.body,
      });
      resolve(payload);
    });
  });

getAnalytics(firebaseApp);
export default firebaseApp;
