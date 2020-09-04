import React from "react";
import "./styles.css";

let ID = 0;

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return state.concat({
        id: ++ID,
        amount: 1,
        product: action.product
      });
    case "REMOVE_PRODUCT":
      return state.filter((row) => action.id !== row.id);
    default:
      return state;
  }
}

export default function App() {
  const [cart, dispatch] = React.useReducer(cartReducer, []);

  function onAddProduct(product) {
    dispatch({
      type: "ADD_PRODUCT",
      product: product
    });
  }

  function onRemoveProduct(id) {
    dispatch({
      type: "REMOVE_PRODUCT",
      id: id
    });
  }

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <Products onAddProduct={onAddProduct} />
        <Cart cart={cart} onRemoveProduct={onRemoveProduct} />
      </div>
    </div>
  );
}

function Products({ onAddProduct }) {
  return (
    <ul
      style={{
        paddingRight: 24,
        marginRight: 24,
        borderRight: "2px solid silver"
      }}
    >
      <Product onAddProduct={onAddProduct} name="iPhone" />
      <Product onAddProduct={onAddProduct} name="iPad" />
      <Product onAddProduct={onAddProduct} name="MacBook" />
      <Product onAddProduct={onAddProduct} name="AirPods" />
    </ul>
  );
}

function Product({ name, onAddProduct }) {
  return (
    <li>
      {name} <button onClick={() => onAddProduct(name)}>+</button>
    </li>
  );
}

function Cart({ cart, onRemoveProduct }) {
  if (cart.length === 0) {
    return <p>Il carrello è vuoto</p>;
  }

  return (
    <ul>
      {cart.map((row) => (
        <li key={row.id}>
          {row.product} ({row.amount}){" "}
          <button
            onClick={() => {
              onRemoveProduct(row.id);
            }}
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
}
