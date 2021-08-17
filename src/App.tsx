import { useEffect, useState } from "react";
import { getFoods } from "./api/foodsApi";

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
      if (!response.ok) throw new Error("call to get foods failed");
      const items = await response.json();
      setFoods(items);
    }
    fetchData();
  });

  return (
    <>
      <h1>Pantry Manager</h1>
      <table>
        <thead>
          <tr>
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
