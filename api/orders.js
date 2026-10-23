
import { sql } from "../lib/db.js";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const orders = await sql`
        SELECT *, duedate AS "dueDate"
        FROM orders
        ORDER BY id DESC
      `;

      return res.status(200).json(orders);
    }

    if (req.method === "POST") {
      const body = req.body || {};
      const title = typeof body.title === "string" ? body.title.trim() : "";
      const customer = typeof body.customer === "string" ? body.customer.trim() : "";
      const phone = typeof body.phone === "string" ? body.phone.trim() : String(body.phone || "");
      const price = Number(body.price);
      const quantity = Number(body.quantity);
      const total = Number(body.total);
      const deposit = body.deposit === undefined ? 0 : Number(body.deposit);
      const image = typeof body.image === "string" ? body.image : "";
      const color = typeof body.color === "string" ? body.color : "";
      const size = typeof body.size === "string" ? body.size : "";
      const dueDate = body.dueDate || null;

      if (!title || customer.length < 3 || !/^\d{10,}$/.test(phone) ||
          !Number.isFinite(price) || price <= 0 || !Number.isInteger(quantity) || quantity < 1 ||
          !Number.isFinite(total) || total !== price * quantity ||
          !Number.isInteger(deposit) || deposit < 0 || deposit > total || !dueDate) {
        return res.status(400).json({ error: "Invalid order information" });
      }

      const remaining = total - deposit;
      const result = await sql`
        INSERT INTO orders (
          title, image, price, customer, phone, color, size,
          quantity, duedate, total, deposit, remaining, stage
        ) VALUES (
          ${title}, ${image}, ${price}, ${customer}, ${phone}, ${color}, ${size},
          ${quantity}, ${dueDate}, ${total}, ${deposit}, ${remaining}, 'Order Received'
        )
        RETURNING *, duedate AS "dueDate"
      `;
      return res.status(201).json(result[0]);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({
      error: "Method not allowed",
    });
  } catch (error) {
    console.error("Orders API error:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        error: "This order ID already exists",
      });
    }

    return res.status(500).json({
      error: "Could not process orders request. Check the database connection and orders table.",
    });
  }
}
