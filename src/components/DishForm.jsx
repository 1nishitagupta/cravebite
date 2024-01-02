/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import { useEffect, useState } from "react";
export const DishForm = ({ currentDish }) => {
  const handleInputChange = () => {};

  const [dishData, setDishData] = useState({
    id: currentDish?.id,
    title: currentDish?.title,
    category: currentDish?.category,
    calories: currentDish?.calories,
    price: currentDish?.price,
    imageAsset: currentDish?.imageAsset,
    qty: currentDish?.qty,
  });

  useEffect(() => {
    setDishData(currentDish);
  }, [currentDish]);

  return (
    <div className="addDishes flex flex-col items-center justify-center gap-4">
      <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
        <MdFastfood className="text-xl text-gray-700" />
        <input
          type="text"
          required
          name="title"
          value={dishData?.title}
          onChange={handleInputChange}
          placeholder="Give me a title..."
          className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
        />
      </div>

      <div className="w-full">
        <select
          onChange={handleInputChange}
          value={dishData?.category}
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
        Add a new field for Veg/Non-Veg
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFoodBank className="text-gray-700 text-2xl" />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={dishData?.isVegetarian}
              onChange={handleInputChange}
              className="mr-2"
            />
            Vegetarian
          </label>
        </div>
      </div>

      <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
        {dishData?.length > 0 ? (
          <Loader />
        ) : (
          <>
            {!dishData?.imageAsset ? (
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
                    // onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              </>
            ) : (
              <>
                <div className="relative h-full">
                  <img
                    src={dishData?.imageAsset}
                    alt="uploadedimage"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                    // onClick={deleteImage}
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
            value={dishData?.calories}
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
            value={dishData?.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
      </div>
    </div>
  );
};
