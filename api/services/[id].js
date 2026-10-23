
import { sql } from "../../lib/db.js";

export default async function handler(req, res) {
  const id = Number(req.query.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Invalid service ID" });
  }

  try {
    if (req.method === "PATCH") {
      const fields = [
        "title",
        "description",
        "image",
        "price",
        "workdays",
        "category",
        "accepted",
      ];

      const updates = fields.filter(
        (field) => req.body[field] !== undefined
      );

      if (updates.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      const result = await sql`
        UPDATE services
        SET
          title = COALESCE(${req.body.title ?? null}, title),
          description = COALESCE(${req.body.description ?? null}, description),
          image = COALESCE(${req.body.image ?? null}, image),
          price = COALESCE(${req.body.price ?? null}, price),
          workdays = COALESCE(${req.body.workdays ?? null}, workdays),
          category = COALESCE(${req.body.category ?? null}, category),
          accepted = COALESCE(${req.body.accepted ?? null}, accepted)
        WHERE id = ${id}
        RETURNING *
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: "Service not found" });
      }

      return res.status(200).json(result[0]);
    }

    if (req.method === "DELETE") {
      const result = await sql`
        DELETE FROM services
        WHERE id = ${id}
        RETURNING *
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: "Service not found" });
      }

      return res.status(200).json(result[0]);
    }

    res.setHeader("Allow", ["PATCH", "DELETE"]);
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Service API error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
