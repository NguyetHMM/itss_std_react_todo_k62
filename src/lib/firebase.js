import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBjCKGDA7OMeROF4ZWCCPFr4ZLVc8ji7KQ",
    authDomain: "itss-firebase-sample.firebaseapp.com",
    projectId: "itss-firebase-sample",
    storageBucket: "itss-firebase-sample.appspot.com",
    messagingSenderId: "217109224002",
    appId: "1:217109224002:web:94f61316ab5bef52a06bdb"
  };
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default firebase;

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
}