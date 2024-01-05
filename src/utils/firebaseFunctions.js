/* eslint-disable no-debugger */
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// getall food items
export const getAllFoodItems = async () => {
  const items = await getDocs(query(collection(firestore, "foodItems")));
  return items.docs.map((doc) => doc.data());
};

// export const editItem = async (item) => {
//   const itemRef = doc(firestore, "foodItems", item?.restaurantID);
//   console.log(itemRef, "itemRef");

//   try {
//     return await updateDoc(itemRef, item);
//   } catch (error) {
//     console.error("Error updating document: ", error);
//   }
// };

export const editItem = async (item) => {
  const itemRef = doc(firestore, "foodItems", item?.restaurantID);

  try {
    // Specify the path to the specific property you want to update
    const nestedFieldPath = "dishes.0.title"; // Update the first dish's title as an example
    const nestedFieldValue = "New Title"; // Replace with your actual new value

    // Use the updateDoc function with field paths
    return await updateDoc(itemRef, {
      [nestedFieldPath]: nestedFieldValue,
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
