import { collection, getDocs } from "firebase/firestore";
import { firebaseDb } from "../../../firebase/config";

const getUsers = async () => {
  try {
    const colRef = collection(firebaseDb, "users");
    const querySnapshot = await getDocs(colRef);
    const usersData = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      usersData.push(userData);
    });

    return usersData;
  } catch (error) {
    console.log(error.message, "aaaa");
  }
};

export default getUsers;
