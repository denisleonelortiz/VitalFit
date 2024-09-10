// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDFN-v1U2QNl_tSYQEW2-Yn-BexwZpurak",
//   authDomain: "vitalfitapp-2337c.firebaseapp.com",
//   projectId: "vitalfitapp-2337c",
//   storageBucket: "vitalfitapp-2337c.appspot.com",
//   messagingSenderId: "464011271207",
//   appId: "1:464011271207:web:cf8e1a0de93edfaa25c202",
//   measurementId: "G-19E89HG41Y",
const firebaseConfig = {
    apiKey: "AIzaSyB4ljltiZ6TPj9GBo4FKwnMz9GCRlZTzow",
    authDomain: "vitalfit-ac661.firebaseapp.com",
    databaseURL: "https://vitalfit-ac661-default-rtdb.firebaseio.com",
    projectId: "vitalfit-ac661",
    storageBucket: "vitalfit-ac661.appspot.com",
    messagingSenderId: "801528016234",
    appId: "1:801528016234:web:012963d243e333d4828913",
    measurementId: "G-EKKWCH0PY2"
  };
  /*  apiKey: "AIzaSyA_Mo2SKOIkWYyaDDw4iILnjdXb8Q_ZjKU",
  authDomain: "vitalfitapp-77225.firebaseapp.com",
  projectId: "vitalfitapp-77225",
  storageBucket: "vitalfitapp-77225.appspot.com",
  messagingSenderId: "558817686410",
  appId: "1:558817686410:web:b1cd87acbf95af845ace73",
  measurementId: "G-62Y0Q89LME", */


// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);
export const storage = getStorage(firebaseApp);

export async function uploadfiles(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
