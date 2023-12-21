/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { getAllFoodItems } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";
import EditRestaurantModal from "./EditRestaurantModal";
import EditForm from "./EditForm";

const ViewRestaurant = () => {
  const navigate = useNavigate();
  const [{ foodItems }, dispatch] = useStateValue();
  const [editMode, setEditMode] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("restaurant");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = (id) => {
    setEditMode(id);
    // navigate(`/edit/${id}`);
  };

  const handleDelete = (index) => {
    // Implement your delete logic here
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
      const locations = data.map((item) => item.location);
      setUniqueLocations([...new Set(locations)]);
    });
  };

  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };

  const handleLocationFilter = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations((prevLocations) =>
        prevLocations.filter((prevLocation) => prevLocation !== location)
      );
    } else {
      setSelectedLocations((prevLocations) => [...prevLocations, location]);
    }
  };

  const sortedFoodItems = foodItems
    ?.filter((item) =>
      selectedLocations.length === 0
        ? true
        : selectedLocations.includes(item.location)
    )
    .sort((a, b) => {
      const aValue = a[sortCriteria];
      const bValue = b[sortCriteria];

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      {foodItems?.length <= 0 || undefined ? (
        ""
      ) : (
        <div className="mb-4 flex gap-2">
          <span className="text-gray-700">Filter by Location:</span>
          {uniqueLocations.map((location, index) => (
            <label key={index} className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={selectedLocations.includes(location)}
                onChange={() => handleLocationFilter(location)}
              />
              <span className="ml-2 text-gray-700">{location}</span>
            </label>
          ))}
        </div>
      )}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort("restaurant")}
            >
              Restaurant
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort("location")}
            >
              Location
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort("categoriesInRestaurant")}
            >
              Categories
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort("dishes")}
            >
              Dishes
            </th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {foodItems?.length < 0 ? (
            <tr className="flex w-full p-3 item-center justify-center">
              <td>No data found</td>
            </tr>
          ) : (
            <>
              {sortedFoodItems?.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item.restaurant}</td>
                  <td className="py-2 px-4 border-b">{item.location}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex gap-4">
                      {item.categoriesInRestaurant.map((category) => (
                        <div
                          className="bg-gray-200 p-1 rounded-md text-sm mr-1 "
                          key={category.id}
                        >
                          {category?.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex flex-wrap gap-2">
                      {item.dishes.map((dish, dishIndex) => (
                        <div
                          key={dishIndex}
                          className="bg-gray-200 p-2 rounded-md text-sm border border-gray-300 relative pr-6"
                        >
                          {dish.isVegetarian && (
                            <div className="absolute top-2 right-2 h-3 w-3 bg-green-500 rounded-full"></div>
                          )}
                          {!dish.isVegetarian &&
                            dish.isVegetarian !== undefined && (
                              <div className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full"></div>
                            )}
                          <div className="font-bold">{dish.title}</div>

                          <div>${dish.price}</div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => {
                        handleEdit(item?.restaurantID);
                        handleOpen();
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                    >
                      <EditRestaurantModal
                        open={open}
                        handleClose={handleClose}
                      >
                        <EditForm data={item} />
                      </EditRestaurantModal>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRestaurant;
