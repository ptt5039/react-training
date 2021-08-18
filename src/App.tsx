import { useEffect, useState } from "react";
import { getFoods, deleteFood, createFood } from "./api/foodsApi";
import { Input } from "./components/Input";
import { Select } from "./components/Select";
import { ToastContainer, toast } from "react-toastify";
import { Food } from "./types";

export function App() {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getFoods();
      setFoods(response);
    }
    fetchData();
    // Using empty array to stop the useEffect to run it again when state is changed
  }, []);

  async function deleteClick(id?: number) {
    if (id) {
      // call delete food
      await deleteFood(id);
      toast.success("Food has been deleted!");
      // set new foods
      setFoods(foods.filter((food) => food.id !== id));
    }
  }

  return (
    <>
      <h1 className="text-center">Pantry Manager</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Minimum Quality</th>
            <th>Quality</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {foods &&
            foods.map((food) => (
              <tr key={food.id}>
                <td>{food.name}</td>
                <td>{food.type}</td>
                <td>{food.minimumQuality}</td>
                <td>{food.quantity}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteClick(food.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
