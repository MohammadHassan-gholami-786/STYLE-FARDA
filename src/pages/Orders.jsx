
import { useState } from "react";
import { useLocation } from "react-router-dom";

const stages = [
  "Order Received",
  "In Progress",
  "Completed",
  "Delivered",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Black", "White", "Blue", "Red", "Green", "Pink", "Other"];

export default function Orders() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [title] = useState(params.get("title") || "");
  const [price] = useState(Number(params.get("price")) || 0);

  const [customer, setCustomer] = useState("");
const [phone, setPhone] = useState("");

const nameError =
  customer.trim().length > 0 && customer.trim().length < 3
    ? "Name must contain at least 3 characters."
    : "";

const phoneError =
  phone.length > 0 && !/^\d{10,}$/.test(phone)
    ? "Phone number must contain at least 10 digits."
    : "";
 
  const [color, setColor] = useState("Black");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState("1");
  const [dueDate, setDueDate] = useState("");
  const [deposit, setDeposit] = useState("");
  const [orders, setOrders] = useState([]);

  const qty = Number(quantity);
  const total = price * (Number.isInteger(qty) && qty > 0 ? qty : 0);
  const paid = deposit.trim() === "" ? 0 : Number(deposit);
  const validDeposit =
    deposit.trim() !== "" &&
    Number.isFinite(paid) &&
    paid >= 0 &&
    paid <= total;

  const remaining = total - (Number.isFinite(paid) ? paid : 0);

  function createOrder(event) {
    event.preventDefault();

    if (!title || price <= 0) {
      alert("Please select a service from the Services page.");
      return;
    }

    if (customer.trim().length < 3) {
      alert("Customer name must contain at least 3 characters.");
      return;
    }

    
    if (!/^\d{10,}$/.test(phone)) {
      alert("Order not submitted: Phone number must contain at least 10 digits.");
      return;
    }


    if (!Number.isInteger(qty) || qty < 1) {
      alert("Quantity must be at least 1.");
      return;
    }

    if (!dueDate) {
      alert("Please select a delivery date.");
      return;
    }

    if (!validDeposit) {
      alert("Deposit must be between 0 and the total price.");
      return;
    }

    setOrders((previous) => [
      ...previous,
      {
        id: Date.now(),
        title,
        price,
        customer: customer.trim(),
        phone: phone.trim(),
        color,
        size,
        quantity: qty,
        dueDate,
        total,
        deposit: paid,
        remaining: total - paid,
        stage: "Order Received",
      },
    ]);

    setCustomer("");
    setPhone("");
    setColor("Black");
    setSize("M");
    setQuantity("1");
    setDueDate("");
    setDeposit("");
  }

  function advanceOrder(id) {
    setOrders((previous) =>
      previous.map((order) => {
        if (order.id !== id) return order;

        const index = stages.indexOf(order.stage);
        if (index < 0 || index >= stages.length - 1) return order;

        return { ...order, stage: stages[index + 1] };
      })
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-10 text-center">
        <p className="font-bold uppercase tracking-[0.3em] text-[#A17A32]">
          STYLE FARDA
        </p>
        <h1 className="mt-3 text-4xl font-black text-[#17243A]">
          Place Your Order
        </h1>
      </header>

      <form
        onSubmit={createOrder}
        className="space-y-5 rounded-2xl border border-[#D6B779] bg-white p-5 shadow-sm sm:p-8"
      >
        <h2 className="text-2xl font-bold text-[#17243A]">
          Order Details
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Clothing
            <input
              value={title}
              readOnly
              className="mt-2 w-full rounded-xl border border-[#D6B779] bg-gray-100 px-4 py-3"
            />
          </label>

          <label className="text-sm font-semibold">
            Price per Item (AFN)
            <input
              value={price}
              readOnly
              className="mt-2 w-full rounded-xl border border-[#D6B779] bg-gray-100 px-4 py-3"
            />
          </label>
           

          <label className="text-sm font-semibold">
  Customer Name
  <input
    value={customer}
    onChange={(e) => setCustomer(e.target.value)}
    minLength={3}
    required
    className="mt-2 w-full rounded-xl border border-[#D6B779] px-4 py-3"
    placeholder="Enter your name"
  />
  {nameError && (
    <span className="mt-2 block text-sm font-medium text-red-600">
      {nameError}
    </span>
  )}
</label> 




            <label className="text-sm font-semibold">
  Phone Number
  <input
    type="tel"
    inputMode="numeric"
    value={phone}
    onChange={(e) =>
      setPhone(e.target.value.replace(/\D/g, ""))
    }
    minLength={10}
    required
    className="mt-2 w-full rounded-xl border border-[#D6B779] px-4 py-3"
    placeholder="Enter at least 10 digits"
  />
  {phoneError && (
    <span className="mt-2 block text-sm font-medium text-red-600">
      {phoneError}
    </span>
  )}
</label>

          <label className="text-sm font-semibold">
            Color
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#D6B779] bg-white px-4 py-3"
            >
              {colors.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold">
            Size
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#D6B779] bg-white px-4 py-3"
            >
              {sizes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold">
            Quantity
            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-[#D6B779] px-4 py-3"
            />
          </label>

          <label className="text-sm font-semibold">
            Delivery Date
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
              className="mt-2 w-full rounded-xl border border-[#D6B779] px-4 py-3"
            />
          </label>
        </div>

        <div className="rounded-xl bg-[#17243A] p-5 text-white">
          <p className="text-sm text-white/70">Total Price</p>
          <p className="text-3xl font-black">{total} AFN</p>
        </div>

        <label className="block text-sm font-semibold">
          Deposit / Advance Payment (AFN)
          <input
            type="number"
            min="0"
            max={total}
            step="1"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-[#D6B779] px-4 py-3 sm:max-w-md"
          />
        </label>

        {deposit !== "" && (!validDeposit || !Number.isInteger(paid)) && (
          <p className="text-sm font-semibold text-red-600">
            Enter a whole amount between 0 and {total} AFN.
          </p>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-green-50 p-4">
            <p className="text-sm text-green-800">Amount Paid</p>
            <p className="mt-1 text-2xl font-black text-green-700">
              {validDeposit ? paid : 0} AFN
            </p>
          </div>

          <div className="rounded-xl bg-amber-50 p-4">
            <p className="text-sm text-amber-800">Remaining Balance</p>
            <p className="mt-1 text-2xl font-black text-amber-800">
              {validDeposit ? total - paid : total} AFN
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#A17A32] px-6 py-3 font-bold text-white hover:bg-[#866326]"
        >
          Confirm Order
        </button>
      </form>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-black text-[#17243A]">
          Order Tracking ({orders.length})
        </h2>

        {orders.map((order) => (
          <article
            key={order.id}
            className="mb-5 rounded-2xl border border-[#D6B779] bg-white p-5"
          >
            <div className="flex flex-wrap justify-between gap-3">
              <h3 className="text-xl font-black text-[#17243A]">
                {order.title}
              </h3>
              <span className="rounded-full bg-[#F8F3E9] px-3 py-1 text-sm font-bold">
                {order.stage}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm text-[#6D6254]">
              <p>Customer: {order.customer}</p>
              <p>Phone: {order.phone}</p>
              <p>Color: {order.color} · Size: {order.size}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Delivery Date: {order.dueDate}</p>
              <p>Total Price: {order.total} AFN</p>
              <p>Amount Paid: {order.deposit} AFN</p>
              <p>Remaining Balance: {order.remaining} AFN</p>
            </div>

            {order.stage !== "Delivered" ? (
              <button
                type="button"
                onClick={() => advanceOrder(order.id)}
                className="mt-5 w-full rounded-xl bg-[#17243A] px-4 py-3 font-bold text-white hover:bg-[#263B5A]"
              >
                {order.stage === "Order Received" && "Start Stitching"}
                {order.stage === "In Progress" && "Mark as Completed"}
                {order.stage === "Completed" && "Mark as Delivered"}
              </button>
            ) : (
              <p className="mt-5 rounded-xl bg-green-50 p-3 text-center font-bold text-green-700">
                Order Delivered
              </p>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
