import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createFood, getFood, updateFood } from "./api/foodsApi";
import { Input } from "./components/Input";
import { Select } from "./components/Select";
import { Food } from "./types";
import { useHistory, useParams } from "react-router-dom";

const emptyFood: Food = {
  name: "",
  quantity: 0,
  minimumQuanlity: 0,
  type: "",
};

export function FoodForm() {
  const [newFood, setNewFood] = useState<Food>(emptyFood);
  const history = useHistory();
  const { foodId } = useParams<{ foodId: string }>();

  useEffect(() => {
    async function getData() {
      if (foodId) {
        const food = await getFood(+foodId);
        setNewFood(food);
      }
    }
    getData();
  }, [foodId]);

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
    if (foodId) {
      try {
        const returnFood = await updateFood(newFood);
        toast.success(returnFood.name + " has been updated!");
        setNewFood(emptyFood);
        history.push("/");
      } catch (error) {
        toast.error("Can't update food");
      }
    } else {
      try {
        const returnFood = await createFood(newFood);
        toast.success(returnFood.name + " has been created!");
        setNewFood(emptyFood);
        history.push("/");
      } catch (error) {
        toast.error("Can't create new food");
      }
    }
  }

  return (
    <>
      <h1>{foodId ? "Edit Food" : "Add Food"}</h1>
      <form className="row mb-3 text-center" onSubmit={onSubmit}>
        <Input
          className="col-md-6"
          onChange={onChangeHandler}
          value={newFood.name}
          label="Name"
          id="name"
        />
        <Input
          className="col-md-6"
          onChange={onChangeHandler}
          value={newFood.quantity.toString()}
          label="Quantity"
          id="quantity"
          type="number"
        />
        <Input
          className="col-md-6"
          onChange={onChangeHandler}
          value={newFood.minimumQuanlity.toString()}
          label="Minimum Quanlity"
          id="minimumQuanlity"
          type="number"
        />
        <Select
          className="col-md-6"
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
        <div className="col-12 text-center">
          <input className="btn btn-primary" type="submit" value="Save Food" />
        </div>
      </form>
    </>
  );
}
