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

export const editItem = async (item) => {
  const itemRef = doc(firestore, "foodItems", item?.restaurantID);
  console.log(itemRef, "itemRef");

  try {
    return await updateDoc(itemRef, item);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
