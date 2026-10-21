
import { useState } from "react";

const API_URL = "http://localhost:3001/services";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  workdays: "",
  category: "Dresses",
  image: "",
  accepted: true,
};

function getImagePath(image) {
  if (!image) return "";
  if (/^(https?:\/\/|data:|blob:)/i.test(image)) return image;
  return image.startsWith("/") ? image : `/${image}`;
}

export default function ManageServices({ services, setServices }) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !form.title.trim() ||
      Number(form.price) <= 0 ||
      Number(form.workdays) <= 0
    ) {
      setError("Enter a name, a valid price, and workdays.");
      return;
    }

    const serviceData = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      workdays: Number(form.workdays),
      image: form.image.trim(),
    };

    setSaving(true);

    try {
      const response = await fetch(
        editingId !== null
          ? `${API_URL}/${editingId}`
          : API_URL,
        {
          method: editingId !== null ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serviceData),
        }
      );

      if (!response.ok) {
        throw new Error("Could not save the service.");
      }

      const savedService = await response.json();

      if (editingId !== null) {
        setServices((previous) =>
          previous.map((service) =>
            String(service.id) === String(editingId)
              ? savedService
              : service
          )
        );
      } else {
        setServices((previous) => [...previous, savedService]);
      }

      setForm(emptyForm);
      setEditingId(null);
    } catch {
      setError(
        "Could not save the service. Make sure the backend is running."
      );
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(service) {
    setEditingId(service.id);
    setError("");

    setForm({
      title: service.title,
      description: service.description || "",
      price: String(service.price),
      workdays: String(service.workdays),
      category: service.category,
      image: service.image || "",
      accepted: service.accepted,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this service?")) return;

    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete the service.");
      }

      setServices((previous) =>
        previous.filter((service) => String(service.id) !== String(id))
      );

      if (String(editingId) === String(id)) {
        setEditingId(null);
        setForm(emptyForm);
      }
    } catch {
      setError(
        "Could not delete the service. Make sure the backend is running."
      );
    }
  }

  async function toggleAccepted(service) {
    setError("");

    try {
      const response = await fetch(`${API_URL}/${service.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accepted: !service.accepted,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not update the service.");
      }

      const updatedService = await response.json();

      setServices((previous) =>
        previous.map((item) =>
          String(item.id) === String(service.id)
            ? updatedService
            : item
        )
      );

      if (String(editingId) === String(service.id)) {
        setForm((previous) => ({
          ...previous,
          accepted: updatedService.accepted,
        }));
      }
    } catch {
      setError(
        "Could not update the service. Make sure the backend is running."
      );
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <section className="mb-10 text-center">
        <p className="font-semibold uppercase tracking-[0.3em] text-[#A17A32]">
          STYLE FARDA
        </p>

        <h1 className="mt-3 text-4xl font-black text-[#17243A] sm:text-5xl">
          Manage Services
        </h1>

        <p className="mt-4 text-[#6D6254]">
          Add, edit, and manage your tailoring services.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mb-12 rounded-2xl border border-[#D6B779] bg-white p-5 shadow-sm sm:p-8"
      >
        <h2 className="mb-6 text-2xl font-bold text-[#17243A]">
          {editingId !== null ? "Edit Service" : "Add New Service"}
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Clothing Name
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Blue Dress"
              required
              className="mt-2 w-full rounded-xl border border-[#D6B779] px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-[#D6B779]"
            />
          </label>

          <label className="text-sm font-semibold">
            Category
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-[#D6B779] bg-white px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-[#D6B779]"
            >
              <option value="Dresses">Dresses</option>
              <option value="Masculine">Masculine</option>
              <option value="Repairs">Repairs</option>
            </select>
          </label>

          <label className="text-sm font-semibold">
            Price (AFN)
            <input
              name="price"
              type="number"
              min="1"
              value={form.price}
              onChange={handleChange}
              placeholder="800"
              required
              className="mt-2 w-full rounded-xl border border-[#D6B779] px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-[#D6B779]"
            />
          </label>

          <label className="text-sm font-semibold">
            Workdays
            <input
              name="workdays"
              type="number"
              min="1"
              value={form.workdays}
              onChange={handleChange}
              placeholder="4"
              required
              className="mt-2 w-full rounded-xl border border-[#D6B779] px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-[#D6B779]"
            />
          </label>

          <label className="text-sm font-semibold sm:col-span-2">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe this clothing service..."
              rows="3"
              className="mt-2 w-full rounded-xl border border-[#D6B779] px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-[#D6B779]"
            />
          </label>

          <label className="text-sm font-semibold sm:col-span-2">
            Image URL or Local Path (Optional)
            <input
              name="image"
              type="text"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/dress.jpg or woman1.png"
              className="mt-2 w-full rounded-xl border border-[#D6B779] px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-[#D6B779]"
            />
            <span className="mt-2 block font-normal text-[#6D6254]">
              Leave empty if you do not have a picture.
            </span>
          </label>

          <div className="sm:col-span-2">
            <p className="mb-2 text-sm font-semibold">Image Preview</p>

            <div className="flex h-48 w-40 items-center justify-center overflow-hidden rounded-xl border border-[#D6B779] bg-[#F8F3E9]">
              {form.image.trim() ? (
                <img
                  src={getImagePath(form.image.trim())}
                  alt="Clothing preview"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.nextElementSibling.style.display = "flex";
                  }}
                  onLoad={(event) => {
                    event.currentTarget.style.display = "block";
                    event.currentTarget.nextElementSibling.style.display = "none";
                  }}
                  className="h-full w-full object-cover"
                />
              ) : null}

              <span
                className="h-full w-full items-center justify-center text-sm text-[#6D6254]"
                style={{ display: form.image.trim() ? "none" : "flex" }}
              >
                No Image
              </span>
            </div>
          </div>

          <label className="flex items-center gap-3 text-sm font-semibold sm:col-span-2">
            <input
              type="checkbox"
              checked={form.accepted}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  accepted: event.target.checked,
                }))
              }
              className="h-4 w-4 accent-[#A17A32]"
            />
            Accepting new orders
          </label>
        </div>

        {error && (
          <p role="alert" className="mt-5 text-sm font-semibold text-red-600">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[#17243A] px-6 py-3 font-bold text-white hover:bg-[#263B5A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : editingId !== null
                ? "Save Changes"
                : "Add Service"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-xl border border-[#D6B779] px-6 py-3 font-bold text-[#17243A] hover:bg-[#F8F3E9]"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="mb-6 text-2xl font-bold text-[#17243A]">
        Current Services ({services.length})
      </h2>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.id}
            className="overflow-hidden rounded-2xl border border-[#D6B779] bg-white shadow-sm"
          >
            <div className="flex min-h-56">
              <div className="flex w-[60%] flex-col justify-between p-4 sm:p-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#A17A32]">
                    {service.category}
                  </p>

                  <h3 className="mt-2 break-words text-xl font-black text-[#17243A]">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#6D6254]">
                    {service.description}
                  </p>

                  <p className="mt-3 font-bold text-[#17243A]">
                    {service.price} AFN
                  </p>

                  <p className="text-sm text-[#6D6254]">
                    Ready in {service.workdays} days
                  </p>

                  <p
                    className={`mt-2 text-sm font-semibold ${
                      service.accepted ? "text-green-700" : "text-red-600"
                    }`}
                  >
                    {service.accepted
                      ? "Accepting Orders"
                      : "Not Accepting Orders"}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(service)}
                    className="rounded-lg bg-[#17243A] px-3 py-2 text-sm font-semibold text-white hover:bg-[#263B5A]"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleAccepted(service)}
                    className="rounded-lg border border-[#D6B779] px-3 py-2 text-sm font-semibold text-[#17243A] hover:bg-[#F8F3E9]"
                  >
                    {service.accepted ? "Turn Off" : "Turn On"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(service.id)}
                    className="rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="flex w-[40%] items-center justify-center bg-[#F8F3E9]">
                {service.image ? (
                  <img
                    src={getImagePath(service.image)}
                    alt={service.title}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      event.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                    onLoad={(event) => {
                      event.currentTarget.style.display = "block";
                      event.currentTarget.nextElementSibling.style.display = "none";
                    }}
                    className="h-full min-h-56 w-full object-cover"
                  />
                ) : null}

                <span
                  className="min-h-56 w-full items-center justify-center text-sm text-[#6D6254]"
                  style={{ display: service.image ? "none" : "flex" }}
                >
                  No Image
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
