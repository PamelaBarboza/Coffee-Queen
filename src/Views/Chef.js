import React from "react";
import Header from "../components/Header";
import "../styles/kitchen.css";
import { firebase } from "../firebase";

//Se baja la data de firebase
function Food({ cooking, handleSetCooking }) {
  const setCooking = handleSetCooking;

  React.useEffect(() => {
    const readOrders = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("orders").orderBy("date", "asc").get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(arrayData);
        setCooking(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    readOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Envia la informacion a firebase para luego bajarla en otra vista (pedidos listos)
  const sendWaiter = (id) => {
    const waiterOrder = cooking.filter((item) => item.id === id);
    const db = firebase.firestore();
    console.log(waiterOrder);
    const dateOrder = new Date();
    const client = cooking.filter((item) => item.name === id);
    db.collection("waiter")
      .add({
        productWaiter: waiterOrder,
        date: dateOrder.toLocaleString(),
        status: "Entregar a cliente",
        nameClient: client,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };
  //Borra la informacion que estaba pintada en la cocina
  const deleteNewOrder = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("orders").doc(id).delete();

      const arrayFilter = cooking.filter((item) => item.id !== id);
      setCooking(arrayFilter);
      sendWaiter(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chefContainer">
      <div className="headerChef">
        <Header tipo={"cocina"} />
      </div>
      <div className="CardContainer">
        {cooking.map((item, index) => (
          <div key={index} className="CardOrder">
            <div className="CardLeft">
              <div className="TableClient">
                Nombre cliente: {item.nameClient}
              </div>
              <div className="TitleProduct">PRODUCTOS</div>
              <div className="listadeproductos">
                <ol className="listList">
                  {item.product.map((food, ch) => (
                    <li key={index + food + ch}>{food}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="CardRight">
              <div className="chefLe">{item.date}</div>
              <div className="btnChef">
                <button
                  onClick={() => deleteNewOrder(item.id)}
                  className="terminarChef"
                >
                  TERMINADO
                </button>
              </div>
              <div className="chefLe">{item.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Food;
