export async function getFoods() {
  const response = await fetch("http://localhost:3001/foods");
  if (!response.ok) throw new Error("call to get foods failed");
  return response.json();
}

export async function deleteFood(id: number) {
  const response = await fetch(`http://localhost:3001/foods/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("call to get foods failed");
  return response.json();
}

export async function createFood(newFood: any) {
  return fetch("http://localhost:3001/foods", {
    method: "POST",
    body: JSON.stringify(newFood),
  });
}
