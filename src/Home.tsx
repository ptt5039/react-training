import { deleteFood, getFoods } from "./api/foodsApi";
import { Food } from "./types";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

export function Home() {
  const { data: foods, isLoading } = useQuery("foods", getFoods);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="text-center">Pantry Manager</h1>
      <p>
        <Link className="btn btn-success" to="/food">
          Create Food
        </Link>
      </p>
      {foods.length > 0 ? (
        <div className="d-flex justify-content-center flex-wrap gap-2">
          {foods.map((food: Food) => (
            <div className="card" style={{ width: 300 }} key={food.id}>
              <div className="card-body">
                <h5 className="card-title">{food.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{food.type}</h6>
                {+food.quantity < +food.minimumQuanlity ? (
                  <p className="card-text fw-bold link-danger">
                    Quantity: {food.quantity}
                  </p>
                ) : (
                  <p className="card-text">Quantity: {food.quantity}</p>
                )}
                <p className="card-text">
                  Min Quantity: {food.minimumQuanlity}
                </p>
                <div className="d-flex justify-content-around">
                  <Link to={`/food/${food.id}`} className="btn btn-secondary">
                    Edit
                  </Link>
                  <button
                    aria-label={"Delete " + food.name}
                    className="btn btn-danger"
                    onClick={() => food.id && deleteFood(food.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-center">Uh oh, no food in pantry</h3>
      )}
    </>
  );
}
