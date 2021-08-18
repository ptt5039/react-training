import { useEffect, useState } from "react";
import { getFoods, deleteFood, createFood } from "./api/foodsApi";
import { Input } from "./components/Input";
import { Select } from "./components/Select";
import { ToastContainer, toast } from "react-toastify";

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
      toast.success("Food has been deleted!");
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
    try {
      const returnFood = await createFood(newFood);
      setFoods([...foods, returnFood]);
      toast.success(returnFood.name + " has been created!");
      setNewFood(emptyFood);
    } catch (error) {
      toast.error("Can't create");
    }
  }

  return (
    <>
      <ToastContainer />
      <h1 className="text-center">Pantry Manager</h1>

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
          <input
            className="btn btn-primary"
            type="submit"
            value="Create Food"
          />
        </div>
      </form>

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
