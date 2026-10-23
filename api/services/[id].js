import { sql } from "../../lib/db.js";

export default async function handler(req, res) {
  const id = Number(req.query.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Invalid service ID" });
  }

  try {
    if (req.method === "PATCH") {
      const body = req.body || {};
      const allowed = ["title", "description", "image", "price", "workdays", "category", "accepted"];
      if (!allowed.some((field) => body[field] !== undefined)) {
        return res.status(400).json({ error: "No fields to update" });
      }
      if (body.title !== undefined && (typeof body.title !== "string" || !body.title.trim())) {
        return res.status(400).json({ error: "Title cannot be empty" });
      }
      if (body.price !== undefined && (!Number.isFinite(Number(body.price)) || Number(body.price) <= 0)) {
        return res.status(400).json({ error: "Price must be greater than zero" });
      }
      if (body.workdays !== undefined && (!Number.isInteger(Number(body.workdays)) || Number(body.workdays) < 1)) {
        return res.status(400).json({ error: "Workdays must be a whole number greater than zero" });
      }
      if (body.accepted !== undefined && typeof body.accepted !== "boolean") {
        return res.status(400).json({ error: "Invalid acceptance status" });
      }

      const result = await sql`
        UPDATE services SET
          title = COALESCE(${body.title === undefined ? null : body.title.trim()}, title),
          description = COALESCE(${body.description === undefined ? null : String(body.description)}, description),
          image = COALESCE(${body.image === undefined ? null : String(body.image)}, image),
          price = COALESCE(${body.price === undefined ? null : Number(body.price)}, price),
          workdays = COALESCE(${body.workdays === undefined ? null : Number(body.workdays)}, workdays),
          category = COALESCE(${body.category === undefined ? null : String(body.category)}, category),
          accepted = COALESCE(${body.accepted === undefined ? null : body.accepted}, accepted)
        WHERE id = ${id}
        RETURNING *
      `;
      if (!result.length) return res.status(404).json({ error: "Service not found" });
      return res.status(200).json(result[0]);
    }

    if (req.method === "DELETE") {
      const result = await sql`DELETE FROM services WHERE id = ${id} RETURNING id`;
      if (!result.length) return res.status(404).json({ error: "Service not found" });
      return res.status(200).json({ message: "Service deleted" });
    }

    res.setHeader("Allow", "PATCH, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Service item API error:", error);
    return res.status(500).json({ error: "Could not update service. Check the database connection and services table." });
  }
}
