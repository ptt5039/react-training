import { create } from "cypress/types/lodash";
import { useEffect, useState } from "react";
import { getFoods, deleteFood, createFood } from "./api/foodsApi";
import { Input } from "./components/Input";
import { Select } from "./components/Select";

type Food = {
  id?: number;
  name: string;
  quantity: number;
  minimumQuality: number;
  type: string;
};

const emptyFood: Food = {
  name: "",
  quantity: 0,
  minimumQuality: 0,
  type: "",
};

export function App() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [newFood, setNewFood] = useState<Food>(emptyFood);
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
      // set new foods
      setFoods(foods.filter((food) => food.id !== id));
    }
  }

  function onChangeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { value, id } = e.target;
    const changeFood = {
      ...newFood,
      [id]: value,
    };
    setNewFood(changeFood);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const returnFood = await createFood(newFood);
    setFoods([...foods, returnFood]);
  }

  return (
    <>
      <h1>Pantry Manager</h1>

      <form onSubmit={onSubmit}>
        <Input
          onChange={onChangeHandler}
          value={newFood.name}
          label="Name"
          id="name"
        />
        <Input
          onChange={onChangeHandler}
          value={newFood.quantity.toString()}
          label="Quantity"
          id="quantity"
          type="number"
        />
        <Input
          onChange={onChangeHandler}
          value={newFood.minimumQuality.toString()}
          label="Minimum Quality"
          id="minimumQuality"
          type="number"
        />
        <Select
          value={newFood.type}
          onChange={onChangeHandler}
          label="Type"
          id="type"
          options={[
            { label: "Vegetable", value: "Vegetable" },
            { label: "Grain", value: "Grain" },
            { label: "Fruit", value: "Fruit" },
          ]}
        />
        <button type="submit">Create</button>
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
