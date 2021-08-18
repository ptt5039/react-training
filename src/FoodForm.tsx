import { useState } from "react";
import { toast } from "react-toastify";
import { createFood } from "./api/foodsApi";
import { Input } from "./components/Input";
import { Select } from "./components/Select";
import { Food } from "./types";
import { useHistory } from "react-router-dom";

const emptyFood: Food = {
  name: "",
  quantity: 0,
  minimumQuality: 0,
  type: "",
};
export function FoodForm() {
  const [newFood, setNewFood] = useState<Food>(emptyFood);
  const history = useHistory();

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
    try {
      const returnFood = await createFood(newFood);
      toast.success(returnFood.name + " has been created!");
      setNewFood(emptyFood);
      history.push("/");
    } catch (error) {
      toast.error("Can't create");
    }
  }

  return (
    <form className="row mb-3" onSubmit={onSubmit}>
      <Input
        className="col-md-3"
        onChange={onChangeHandler}
        value={newFood.name}
        label="Name"
        id="name"
      />
      <Input
        className="col-md-3"
        onChange={onChangeHandler}
        value={newFood.quantity.toString()}
        label="Quantity"
        id="quantity"
        type="number"
      />
      <Input
        className="col-md-3"
        onChange={onChangeHandler}
        value={newFood.minimumQuality.toString()}
        label="Minimum Quality"
        id="minimumQuality"
        type="number"
      />
      <Select
        className="col-md-3"
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
      <div className="col-12 float-end">
        <input className="btn btn-primary" type="submit" value="Create Food" />
      </div>
    </form>
  );
}
