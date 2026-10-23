
import { sql } from "../../lib/db.js";

const stages = [
  "Order Received",
  "In Progress",
  "Completed",
  "Delivered",
];

export default async function handler(req, res) {
  const id = String(req.query.id || "");

  if (!id) {
    return res.status(400).json({ error: "Invalid order ID" });
  }

  try {
    if (req.method === "PATCH") {
      const { stage } = req.body || {};
      const index = stages.indexOf(stage);
      if (index < 0) {
        return res.status(400).json({ error: "Invalid order stage" });
      }

      const current = await sql`SELECT stage FROM orders WHERE id = ${id}`;
      if (!current.length) {
        return res.status(404).json({ error: "Order not found" });
      }
      const currentIndex = stages.indexOf(current[0].stage);
      if (currentIndex < 0 || index !== currentIndex + 1) {
        return res.status(400).json({ error: "Order must move to the next stage only" });
      }

      const result = await sql`
        UPDATE orders
        SET stage = ${stage}
        WHERE id = ${id}
        RETURNING *, duedate AS "dueDate"
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.status(200).json(result[0]);
    }

    if (req.method === "DELETE") {
      const result = await sql`
        DELETE FROM orders
        WHERE id = ${id} AND stage = 'Delivered'
        RETURNING id
      `;

      if (result.length === 0) {
        return res.status(404).json({
          error: "Order not found or not delivered",
        });
      }

      return res.status(200).json({
        message: "Order deleted successfully",
      });
    }

    res.setHeader("Allow", ["PATCH", "DELETE"]);
    return res.status(405).json({
      error: "Method not allowed",
    });
  } catch (error) {
    console.error("Order API error:", error);

    return res.status(500).json({
      error: "Server error",
    });
  }
}
