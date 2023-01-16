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
  apiKey: "AIzaSyBTvCFtIg0A_JTokDcMWtMxxGdt60ztP6s",
  authDomain: "sahaba-fc030.firebaseapp.com",
  projectId: "sahaba-fc030",
  storageBucket: "sahaba-fc030.appspot.com",
  messagingSenderId: "177856090714",
  appId: "1:177856090714:web:a302bc1e93032d7ec77e63",
  measurementId: "G-PBJ1EWM5NN",
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
