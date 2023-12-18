/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getAllFoodItems } from "../utils/firebaseFunctions";
import restaurantPic1 from "../assets/restaurant1.jpg";
import restaurantPic2 from "../assets/restaurant2.jpg";
import restaurantPic3 from "../assets/restaurant3.jpg";
import restaurantPic4 from "../assets/restaurant4.jpg";
import restaurantPic5 from "../assets/restaurant5.jpg";

const RestaurantList = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-center gap-10 " id="home">
      {foodItems?.map((item, index) => {
        return (
          <>
            <div className="flex font-sans border border-solid	border-gray-300	">
              <div className="flex-none w-48 relative">
                <img
                  src={restaurantPic2}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-auto p-6">
                <div className="flex flex-wrap">
                  <h1 className="flex-auto text-lg font-semibold text-slate-900">
                    {item?.restaurant}
                  </h1>
                  <div className="text-lg font-semibold text-slate-500">
                    $300-600
                  </div>
                  <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                    {item?.location}
                  </div>
                </div>
                <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                  <div className="  flex text-sm gap-2">
                    {item?.categoriesInRestaurant?.map(({ name, id }) => {
                      return (
                        <label key={id}>
                          <input
                            className="sr-only peer"
                            name="size"
                            type="radio"
                            value="xs"
                            checked
                          />
                          <div className="w-auto h-auto rounded-lg flex items-center justify-center p-2 text-slate-100 peer-checked:font-semibold bg-slate-900">
                            {name}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="flex space-x-4 mb-6 text-sm font-medium">
                  <div className="flex-auto flex space-x-4">
                    <button className="h-10 px-6 font-semibold rounded-md bg-black text-white">
                      View More
                    </button>
                  </div>
                  <button
                    className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
                    type="button"
                    aria-label="Like"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-slate-700">
                  Free shipping on all orders above 1000.
                </p>
              </div>
            </div>
          </>
        );
      })}
    </section>
  );
};

export default RestaurantList;
