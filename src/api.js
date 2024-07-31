import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyA7nywwBnBekO0GK1ZAxkmbeW9P8qGvsHU",
  authDomain: "vanlife-251101.firebaseapp.com",
  projectId: "vanlife-251101",
  storageBucket: "vanlife-251101.appspot.com",
  messagingSenderId: "11023900025",
  appId: "1:11023900025:web:9899b4ea0cc63ac32423a8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansCollectionRef = collection(db, "vans");

export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return dataArr;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const vanSnapshot = await getDoc(docRef);
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id,
  };
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return dataArr;
}

export async function loginUser(creds) {
  const res = await fetch("/api/login", { method: "post", body: JSON.stringify(creds) });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
