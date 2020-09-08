import React, { useState } from "react";
import data from "../data/menu.json";
import Drinks from "../components/Drinks";
import CakeShop from "../components/CakeShop";
import "../styles/BtnMenu.css";
import { firebase } from '../firebase'

const db = firebase.firestore();
console.log(db);

const Products = (props) => {
  const {order, handleSetOrder} = props;
  const MenuBebidas = data.filter((items) => items.type === "bebida");
  const MenuPasteleria = data.filter((items) => items.type === "pastelería");

//Estado del pedido
  const [options, setOptions] = useState(MenuBebidas);
  // const [quantity, setquantity] = useState(1);

  const addCart = (menu) => {
    const newOrder = ([...order, {name: menu.name, price: menu.value, id: menu.sku} ]);
    handleSetOrder(newOrder)
  }

  const cakeClick = () => {
    console.log("Hola, traigo ricos Pasteles");
    setOptions(MenuPasteleria);
  };

  const drinkClick = () => {
    console.log("Hola, vendo muchos tipos de café");
    setOptions(MenuBebidas);
  };
  

  return (
    <div>
      <div className="Cookies">
        <Drinks onClick={() => drinkClick()} />
        <CakeShop
          onClick={() => cakeClick()}
          style={{ background: "#BF7111" }}
        />
      </div>
      <div className="MenuButtons">
        {options.map((item, index) => (
          <button name={item.name} value={item.price} onClick={(e) => addCart(e.target)} className="optionsButtons" key={index}>
            {item.name} <br></br>${item.price}
          </button>
        ))}
    </div>
     
    </div>
  );
};

export default Products;
