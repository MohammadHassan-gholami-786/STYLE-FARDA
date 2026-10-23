
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
      const {
        id,
        title,
        image = "",
        price,
        customer,
        phone,
        color = "",
        size = "",
        quantity = 1,
        dueDate,
        total,
        deposit = 0,
        remaining,
        stage = "Order Received",
      } = req.body;

      if (
        !id ||
        !title ||
        !customer ||
        !phone ||
        Number(price) < 0 ||
        Number(quantity) < 1 ||
        Number(deposit) < 0 ||
        Number(deposit) > Number(total)
      ) {
        return res.status(400).json({
          error: "Invalid order information",
        });
      }

      const result = await sql`
        INSERT INTO orders (
          id, title, image, price, customer, phone,
          color, size, quantity, duedate, total,
          deposit, remaining, stage
        )
        VALUES (
          ${String(id)},
          ${title},
          ${image},
          ${Number(price)},
          ${customer},
          ${phone},
          ${color},
          ${size},
          ${Number(quantity)},
          ${dueDate || null},
          ${Number(total)},
          ${Number(deposit)},
          ${Number(remaining)},
          ${stage}
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
      error: "Server error",
    });
  }
}
