type Food = {
    name: string,
    quantity: number
}
const items: Food[] = [
    {name: "Carrot", quantity: 10},
    {name: "Potato", quantity: 20}
]

function renderFood(){
    return items.map((food) => <li>{food.name}: {food.quantity}</li>);
}

export function App() {
    
    return (
        <>
            <h1>Pantry Manager</h1>
            <ul>
                {renderFood()}
            </ul>
        </>
    )
}

