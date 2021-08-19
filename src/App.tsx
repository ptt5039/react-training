import { useEffect, useState } from "react";
import { getFoods, deleteFood } from "./api/foodsApi";
import { toast } from "react-toastify";
import { Food } from "./types";
import { Link } from "react-router-dom";

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
      <p>
        <Link className="btn btn-success" to="/food">
          Create Food
        </Link>
      </p>
      <div className="d-flex justify-content-around">
        {foods &&
          foods.map((food) => (
            <div className="card" key={food.id}>
              <div className="card-body">
                <h5 className="card-title">{food.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{food.type}</h6>
                <p className="card-text">Quantity: {food.quantity}</p>
                <p className="card-text">
                  Min Quantity: {food.minimumQuanlity}
                </p>
                <div className="d-flex justify-content-around">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteClick(food.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/food/${food.id}`} className="btn btn-secondary">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
