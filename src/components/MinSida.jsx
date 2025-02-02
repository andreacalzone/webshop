import React, { useEffect, useState } from "react";

const MinSida = () => {
  const [orders, setOrders] = useState([]);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthError(true);
        return;
      }

      try {
        const response = await fetch("https://js2-ecommerce-api.vercel.app/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Kunde inte hämta orderhistoriken.");

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Fel vid hämtning av orderhistorik:", error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Min Sida - Orderhistorik</h2>

      {authError ? (
        <p className="text-red-500">Du måste vara inloggad för att se din orderhistorik.</p>
      ) : orders.length === 0 ? (
        <p>Du har inga tidigare beställningar.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border p-4 rounded-lg">
              <p className="font-semibold">Ordernummer: {order._id}</p>
              <p>Antal produkter: {order.products.length}</p>
              <p>Summa: {order.totalPrice}:-</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MinSida;
