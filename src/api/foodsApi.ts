import { Food } from "../types";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function getFoods() {
  const response = await fetch(baseURL + "foods");
  if (!response.ok) throw new Error("call to get foods failed");
  return response.json();
}

export async function deleteFood(id: number) {
  const response = await fetch(baseURL + `foods/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("call to delete foods failed");
  return response.json();
}

export async function createFood(newFood: any) {
  const response = await fetch(baseURL + "foods", {
    method: "POST",
    body: JSON.stringify(newFood),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("failed to create food");
  return response.json();
}

export async function updateFood(food: Food) {
  const response = await fetch(baseURL + "foods/" + food.id, {
    method: "PUT",
    body: JSON.stringify(food),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("failed to update food");
  return response.json();
}

export async function getFood(id: number) {
  const response = await fetch(baseURL + `foods/${id}`);
  if (!response.ok) throw new Error("call to delete foods failed");
  return response.json() as Promise<Food>;
}
