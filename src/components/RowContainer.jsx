/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../assets/images/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue, restaurant }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  // useEffect(() => {
  //   if (rowContainer.current.scrollLeft !== undefined)
  //     rowContainer.current.scrollLeft += scrollValue;
  // }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);

  // console.log(rowContainer?.current?.scrollLeft, "data");

  return (
    <>
      {data?.length > 0 && (
        <div
          ref={rowContainer}
          className={`flex scroll-smooth gap-5 ${
            flag
              ? "overflow-x-scroll scrollbar-none"
              : "overflow-x-hidden flex-wrap justify-center"
          }`}
        >
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="w-full min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg md:py-2 md:px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative h-auto px-2 py-1 "
              >
                <div className="w-full flex items-center justify-between ">
                  <motion.div
                    className="w-40 h-40 -mt-8 drop-shadow-2xl"
                    whileHover={{ scale: 1.2 }}
                  >
                    <img
                      src={item?.imageAsset}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                    onClick={() => setItems([...cartItems, item])}
                  >
                    <MdShoppingBasket className="text-white" />
                  </motion.div>
                </div>

                <div className="w-full flex flex-col items-end justify-end mt-4">
                  <p className="text-textColor font-semibold text-base md:text-lg">
                    {item?.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {item?.calories} Calories
                  </p>
                  <div className="flex items-center gap-8">
                    <p className="text-lg text-headingColor font-semibold">
                      <span className="text-sm text-red-500">$</span>{" "}
                      {item?.price}
                    </p>
                  </div>
                  <p>{restaurant}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center">
              <img src={NotFound} className="h-340" />
              <p className="text-xl text-headingColor font-semibold my-2">
                Items Not Available
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RowContainer;
