/* eslint-disable no-loop-func */
import firebase from "firebase";

const app = firebase.initializeApp({
  // Credentials
});

export const auth = firebase.auth(app);
export const storage = firebase.storage(app);
export const db = firebase.firestore(app);
export const functions = firebase.functions(app);

export const setUser = async (id) => {
  if (!id) {
    return null;
  }

  let thisUser = {};

  await db
    .collection("users")
    .doc(`${id}`)
    .get()
    .then(async (doc) => {
      thisUser = { ...thisUser, ...doc.data() };

      let properties = {
        admission: null,
        resume: null,
        proofOfResume: null,
      };

      for (const property in properties) {
        await storage
          .ref()
          .child("users")
          .child(`${id}`)
          .child(property.toString())
          .getDownloadURL()
          .then((url) => {
            thisUser = { ...thisUser, [property]: url };
          })
          .catch(() => {
            thisUser = { ...thisUser, [property]: null };
          });
      }
    });

  return thisUser;
};
