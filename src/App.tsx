type Food = {
  name: string;
  quantity: number;
  minimumQuality: number;
  type: string;
};

const items: Food[] = [
  { name: "Carrot", quantity: 10, minimumQuality: 2, type: "Vegetable" },
  { name: "Potato", quantity: 20, minimumQuality: 2, type: "Vegetable" },
];

export function App() {
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
          {items.map((food) => (
            <tr key={food.name}>
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
