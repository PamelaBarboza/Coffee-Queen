import React from "react";
import "../styles/cart.css";
import ButtonsCancel from "../components/ButtonsCancel";
import ButtonSend from "../components/ButtonSend";
import ButtonsOrder from "../components/ButtonsOrder";
import Trash from "../components/Trash";
import { firebase } from "../firebase";
import { Link } from "react-router-dom";
import check from "../img/check.png";

const db = firebase.firestore();
//console.log(db);

const ShoppingCart = ({ order, handleDelete }) => {
  //Eliminar items
  function deleteCart(id) {
    console.log(id);
    const filterProduct = order.filter((item) => item.id !== id);
    handleDelete(filterProduct);
    console.log(filterProduct);
  }

  //Sumar el total de los items
  const calcular = order.map((item) => Math.floor(item.price));
  //console.log(calcular);
  const Add = calcular.reduce((a, b) => a + b, 0);
  //console.log(Add);

  //Cancelar pedido
  const deleteOrder = (id) => {
    const filterCart = order.filter((item) => item.id === id);
    handleDelete(filterCart);
  };

  //Subir pedido a Firebase
  const SendOrder = () => {
    const clientOrder = order.map((item) => item.name);
    console.log(clientOrder);
    const dateOrder = new Date();
    const newUser = client;

    db.collection("orders")
      .add({
        product: clientOrder,
        date: dateOrder.toLocaleString(),
        status: "En espera",
        nameClient: newUser,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        deleteOrder();
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  const [client, setClient] = React.useState("");

  //Guarda el nombre del usuario para enviar al firebase
  const oki = async (e) => {
    e.preventDefault();

    if (!client.trim()) {
      console.log("No hay cliente");
      return;
    }
    try {
      const db = firebase.firestore();
      const newUser = {
        name: client,
      };
      const data = await db.collection("users").add(newUser);

      setClient([...client, { ...newUser, id: data.id }]);
      setClient("");
    } catch (error) {
      console.log(error);
    }

    console.log(client);
  };

  return (
    <div className="containerCart">
      <div className="Tables">
        <form className="form" onSubmit={oki}>
          <input
            className="client"
            type="text"
            placeholder="Nombre del cliente"
            name="cliente"
            onChange={(e) => setClient(e.target.value)}
            value={client}
          />
          <div className="boton">
            <button className="button-form" type="submit">
              <img src={check} alt="Check" />
            </button>
          </div>
        </form>
      </div>
      <div className="StylesTitle">
        <p>PRODUCTOS</p>
        <p>PRECIO</p>
        <p>ELIMINAR</p>
      </div>
      <div className="ListProducts">
        {order.map((item, index) => (
          <div className="Hola" key={index}>
            <div className="cartProducts">{item.name}</div>
            <div className="cartProducts">${item.price}</div>
            <Trash onClick={() => deleteCart(item.id)} key={"hola" + index} />
          </div>
        ))}
      </div>
      <div className="StylesTitle">
        <p>TOTAL</p>
        <p>${Add}</p>
      </div>
      <div className="ContainerBtnCart">
        <div className="BtnTwo">
          <ButtonsCancel onClick={() => deleteOrder()} />
          <Link to="/FoodOrders">
            <ButtonsOrder />
          </Link>
        </div>
        <div className="BtnThree">
          <ButtonSend onClick={() => SendOrder()} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
