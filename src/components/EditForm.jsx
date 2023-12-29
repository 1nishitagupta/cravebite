/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories, cityList, restaurantList } from "../utils/data";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { getAllFoodItems } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import React, { useEffect, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";

const EditForm = ({ data }) => {
  const [{ user }, dispatch] = useStateValue();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [editedData, setEditedData] = useState({
    restaurantImage: data?.restaurantImage || "",
    restaurant: data?.restaurant || "",
    location: data?.location || "",
    categoriesInRestaurant: data?.categoriesInRestaurant || [],
    dishes: data?.dishes || [],
  });

  const uploadImage = async (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // Update UI with the upload progress if needed
      },
      (error) => {
        // Handle error
        setIsLoading(false);
        console.error("Error uploading image:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setEditedData((prevData) => ({
            ...prevData,
            restaurantImage: downloadURL,
          }));
          setIsLoading(false);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, data?.restaurantImage);
    deleteObject(deleteRef)
      .then(() => {
        setEditedData((prevData) => ({
          ...prevData,
          restaurantImage: "",
        }));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error deleting image:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleDishChange = (index, field, value) => {
  //   setEditedData((prevData) => {
  //     const updatedDishes = [...prevData.dishes];
  //     updatedDishes[index] = { ...updatedDishes[index], [field]: value };
  //     return { ...prevData, dishes: updatedDishes };
  //   });
  // };

  // const handleCategoryChange = (selectedCategories) => {
  //   setEditedData((prevData) => ({
  //     ...prevData,
  //     categoriesInRestaurant: selectedCategories,
  //   }));
  // };

  const saveEditedData = async () => {
    console.log(editedData, "edited");
  };
  // console.log(editedData, "data");
  return (
    <div className="w-full min-h-screen ">
      <div className="w-[90%] md:w-[100%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <div className="w-full">
          <h1 className="font-extrabold	 text-xl">Restaurant</h1>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {data?.length <= 0 || undefined ? (
            <Loader />
          ) : (
            <>
              {!data.restaurantImage ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadRestaurantImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={data?.restaurantImage}
                      alt="uploadedimage"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full">
          <h1 className="font-extrabold text-xl">Restaurant Image</h1>
        </div>

        <div className="w-full">
          <select
            onChange={handleInputChange}
            defaultValue={data?.restaurant}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Restaurant
            </option>
            {restaurantList &&
              restaurantList.map((item) => (
                <option
                  key={item.name}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full">
          <select
            onChange={handleInputChange}
            defaultValue={data?.location}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Location
            </option>
            {cityList &&
              cityList.map((item) => (
                <option
                  key={item.pincode}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.city}
                >
                  {item.city}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full">
          {/* <Multiselect
            options={categories}
            selectedValues={selectedValues}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            closeIcon="cancel"
            selectionLimit={-1}
            placeholder="Categories in restaurant"
          /> */}
        </div>

        <div className="w-full">
          <h1 className="font-extrabold	 text-xl">Add Dishes</h1>
        </div>
        {data?.dishes.length > 0 && (
          <div className="w-full mt-4">
            <h2 className="font-bold text-lg mb-2">Added Dishes:</h2>
            <ul>
              {data?.dishes.map((dish, index) => (
                <li key={index}>
                  {dish.title} - {dish.category} - {dish.calories} calories - $
                  {dish.price}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data?.dishes?.map((currentDish, index) => {
          return (
            <React.Fragment key={index}>
              <div className="addDishes flex flex-col items-center justify-center gap-4">
                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                  <MdFastfood className="text-xl text-gray-700" />
                  <input
                    type="text"
                    required
                    name="title"
                    defaultValue={currentDish?.title}
                    onChange={handleInputChange}
                    placeholder="Give me a title..."
                    className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                  />
                </div>

                <div className="w-full">
                  <select
                    onChange={handleInputChange}
                    value={currentDish?.category}
                    className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option value="other" className="bg-white">
                      Select Category
                    </option>
                    {categories &&
                      categories.map((item) => (
                        <option
                          key={item.id}
                          className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                          value={item.urlParamName}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                  {/* ... (existing calorie and price fields) */}

                  {/* Add a new field for Veg/Non-Veg */}
                  <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdFoodBank className="text-gray-700 text-2xl" />
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={currentDish?.isVegetarian}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Vegetarian
                    </label>
                  </div>
                </div>

                <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
                  {data?.length > 0 ? (
                    <Loader />
                  ) : (
                    <>
                      {!currentDish?.imageAsset ? (
                        <>
                          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                              <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                              <p className="text-gray-500 hover:text-gray-700">
                                Click here to upload
                              </p>
                            </div>
                            <input
                              type="file"
                              name="uploadimage"
                              accept="image/*"
                              onChange={uploadImage}
                              className="w-0 h-0"
                            />
                          </label>
                        </>
                      ) : (
                        <>
                          <div className="relative h-full">
                            <img
                              src={currentDish?.imageAsset}
                              alt="uploadedimage"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                              onClick={deleteImage}
                            >
                              <MdDelete className="text-white" />
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                  <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdFoodBank className="text-gray-700 text-2xl" />
                    <input
                      type="text"
                      required
                      value={currentDish?.calories}
                      onChange={handleInputChange}
                      placeholder="Calories"
                      className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                    />
                  </div>

                  <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdAttachMoney className="text-gray-700 text-2xl" />
                    <input
                      type="text"
                      required
                      value={currentDish?.price}
                      onChange={handleInputChange}
                      placeholder="Price"
                      className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                    />
                  </div>
                </div>

                <div className="flex items-center w-full">
                  {/* <button
                    type="button"
                    className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                    //   onClick={addDish}
                  >
                    Save
                  </button> */}
                </div>
              </div>
            </React.Fragment>
          );
        })}

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            // onClick={saveDetails}
            onClick={saveEditedData}
          >
            Add Dish
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
