import { useEffect, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";

const API_URL = "/api/orders";

const stages = [
  "Order Received",
  "In Progress",
  "Completed",
  "Delivered",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Black", "White", "Blue", "Red", "Green", "Pink", "Other"];

function getImagePath(image) {
  if (!image) return "";
  if (/^(https?:\/\/|data:|blob:)/i.test(image)) return image;
  return image.startsWith("/") ? image : `/${image}`;
}

export default function Orders() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const title = params.get("title") || "";
  const price = Number(params.get("price")) || 0;
  const image = params.get("image") || "";

  const hasSelectedService = title.trim() !== "" && price > 0;

  const [showForm, setShowForm] = useState(hasSelectedService);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [color, setColor] = useState("Black");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState("1");
  const [dueDate, setDueDate] = useState("");
  const [deposit, setDeposit] = useState("");
  const [orders, setOrders] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {



        const response = await fetch(API_URL);

if (!response.ok) {
  const details = await response.text();
  throw new Error(
    `Orders API failed (${response.status}): ${details}`
  );
}


 

        const data = await response.json();
        setOrders(data);
        setError("");
      } catch {
        setError("Could not connect to the backend. Start the API server.");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  const qty = Number(quantity);
  const total = price * (Number.isInteger(qty) && qty > 0 ? qty : 0);
  const paid = deposit.trim() === "" ? 0 : Number(deposit);

  const validDeposit =
    deposit.trim() !== "" &&
    Number.isFinite(paid) &&
    Number.isInteger(paid) &&
    paid >= 0 &&
    paid <= total;

  const nameError =
    customer.trim().length > 0 && customer.trim().length < 3
      ? "Name must contain at least 3 characters."
      : "";

  const phoneError =
    phone.length > 0 && !/^\d{10,}$/.test(phone)
      ? "Phone number must contain at least 10 digits."
      : "";

  async function createOrder(event) {
    event.preventDefault();
    setError("");

    if (!hasSelectedService) {
      setError("Please select a service from the Services page.");
      return;
    }

    if (customer.trim().length < 3) {
      setError("Customer name must contain at least 3 characters.");
      return;
    }

    if (!/^\d{10,}$/.test(phone)) {
      setError("Phone number must contain at least 10 digits.");
      return;
    }

    if (!Number.isInteger(qty) || qty < 1) {
      setError("Quantity must be at least 1.");
      return;
    }

    if (!dueDate) {
      setError("Please select a delivery date.");
      return;
    }

    if (!validDeposit) {
      setError("Deposit must be a whole amount between 0 and the total price.");
      return;
    }

    const newOrder = {
      title,
      image,
      price,
      customer: customer.trim(),
      phone,
      color,
      size,
      quantity: qty,
      dueDate,
      total,
      deposit: paid,
      remaining: total - paid,
      stage: "Order Received",
    };

    setSaving(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error("Could not save the order.");
      }

      const savedOrder = await response.json();

      setOrders((previous) => [...previous, savedOrder]);

      setCustomer("");
      setPhone("");
      setColor("Black");
      setSize("M");
      setQuantity("1");
      setDueDate("");
      setDeposit("");

      setShowForm(false);
      setSubmitted(true);
      navigate("/orders", { replace: true });

    } catch {
      setError(". Check that the API server is running.");
    } finally {
      setSaving(false);
    }
  }

  async function advanceOrder(id) {
    if (updatingId !== null) return;

    const order = orders.find(
      (item) => String(item.id) === String(id)
    );

    if (!order) return;

    const index = stages.indexOf(order.stage);

    if (index < 0 || index >= stages.length - 1) return;

    const nextStage = stages[index + 1];

    setError("");
    setUpdatingId(id);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stage: nextStage }),
      });

      if (!response.ok) {
        throw new Error("Could not update the order.");
      }

      const updatedOrder = await response.json();

      setOrders((previous) =>
        previous.map((item) =>
          String(item.id) === String(id) ? updatedOrder : item
        )
      );
    } catch {
      setError("Could not update the order stage. Check the API server.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteOrder(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this delivered order?"
    );

    if (!confirmed) return;

    setError("");
    setDeletingId(id);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete the order.");
      }

      setOrders((previous) =>
        previous.filter((item) => String(item.id) !== String(id))
      );
    } catch {
      setError("Could not delete the order. Check the API server.");
    } finally {
      setDeletingId(null);
    }
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

      {error && (
        <p
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
        >
          {error}
        </p>
      )}

      {showForm && hasSelectedService && (
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
                onChange={(event) => setCustomer(event.target.value)}
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
                onChange={(event) =>
                  setPhone(event.target.value.replace(/\D/g, ""))
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
                onChange={(event) => setColor(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#D6B779] bg-white px-4 py-3"
              >
                {colors.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold">
              Size
              <select
                value={size}
                onChange={(event) => setSize(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#D6B779] bg-white px-4 py-3"
              >
                {sizes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
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
                onChange={(event) => setQuantity(event.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-[#D6B779] px-4 py-3"
              />
            </label>

            <label className="text-sm font-semibold">
              Delivery Date
              <input
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
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
              onChange={(event) => setDeposit(event.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-[#D6B779] px-4 py-3 sm:max-w-md"
            />
          </label>

          {deposit !== "" && !validDeposit && (
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
            disabled={saving}
            className="w-full rounded-xl bg-[#A17A32] px-6 py-3 font-bold text-white hover:bg-[#866326] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving Order..." : "Confirm Order"}
          </button>
        </form>
      )}

      {!showForm && submitted && (
        <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-4 text-center font-bold text-green-800">
          Order submitted successfully!
        </div>
      )}

      {!showForm && !submitted && !hasSelectedService && (
        <section className="rounded-2xl border border-[#D6B779] bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-black text-[#17243A]">
            No Order to Display
          </h2>

          <p className="mt-3 leading-7 text-[#6D6254]">
            Your order section is currently empty. Visit Services and
            select a clothing item to start a new order.
          </p>

          <NavLink
            to="/services"
            className="mt-6 inline-block rounded-xl bg-[#A17A32] px-6 py-3 font-bold text-white hover:bg-[#866326]"
          >
            Go to Services
          </NavLink>
        </section>
      )}

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-black text-[#17243A]">
          Order Tracking ({orders.length})
        </h2>

        {loading ? (
          <p className="rounded-xl bg-white p-5 text-[#6D6254]">
            Loading orders...
          </p>
        ) : orders.length === 0 ? (
          <p className="rounded-xl bg-white p-5 text-[#6D6254]">
            No orders have been submitted yet.
          </p>
        ) : (
          orders.map((order) => (
            <article
              key={order.id}
              className="mb-5 overflow-hidden rounded-2xl border border-[#D6B779] bg-white shadow-sm"
            >
              <div className="flex min-h-60">
                <div className="w-[70%] p-4 sm:p-6">
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
                      disabled={updatingId !== null}
                      onClick={() => advanceOrder(order.id)}
                      className="mt-5 w-full rounded-xl bg-[#17243A] px-4 py-3 font-bold text-white hover:bg-[#263B5A] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {updatingId === order.id
                        ? "Updating..."
                        : order.stage === "Order Received"
                          ? "Start Stitching"
                          : order.stage === "In Progress"
                            ? "Mark as Completed"
                            : "Mark as Delivered"}
                    </button>
                  ) : (
                    <div className="mt-5 space-y-3">
                      <p className="rounded-xl bg-green-50 p-3 text-center font-bold text-green-700">
                        Order Delivered
                      </p>

                      <button
                        type="button"
                        disabled={deletingId === order.id}
                        onClick={() => deleteOrder(order.id)}
                        className="w-full rounded-xl bg-red-600 px-4 py-3 font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId === order.id
                          ? "Deleting..."
                          : "Delete Order"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="w-[30%] overflow-hidden bg-white">
                  {order.image && (
                    <img
                      src={getImagePath(order.image)}
                      alt={order.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
