import { auth, storage, firestore } from "../utils/firebase/firebaseConfig";

const setUser = async (id) => {
  if (!id) {
    return null;
  }

  let thisUser = {};

  await firestore
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
          .catch((err) => {
            console.log(err);
            thisUser = { ...thisUser, [property]: null };
          });
      }
    });

  return thisUser;
};

export default setUser;
