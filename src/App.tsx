import { useEffect, useState } from "react";
import { getFoods, deleteFood } from "./api/foodsApi";
import { Input } from "./components/Input";
import { Select } from "./components/Select";

type Food = {
  id: number;
  name: string;
  quantity: number;
  minimumQuality: number;
  type: string;
};

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

  async function deleteClick(id: number) {
    // call delete food
    await deleteFood(id);
    // set new foods
    setFoods(foods.filter((food) => food.id !== id));
  }

  return (
    <>
      <h1>Pantry Manager</h1>

      <form>
        <Input label="Name" id="name" />
        <Input label="Quantity" id="quantity" />
        <Input label="Minimum Quality" id="minimumQuality" />
        <Select
          label="Type"
          id="type"
          options={[
            { label: "Vegetable", value: "Vegetable" },
            { label: "Grain", value: "Grain" },
            { label: "Fruit", value: "Fruit" },
          ]}
        />
      </form>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Type</th>
            <th>Minimum Quality</th>
            <th>Quality</th>
          </tr>
        </thead>
        <tbody>
          {foods &&
            foods.map((food) => (
              <tr key={food.id}>
                <td>
                  <button onClick={() => deleteClick(food.id)}>Delete</button>
                </td>
                <td>{food.name}</td>
                <td>{food.type}</td>
                <td>{food.minimumQuality}</td>
                <td>{food.quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
