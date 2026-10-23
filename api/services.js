import { sql } from "../lib/db.js";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const services = await sql`SELECT * FROM services ORDER BY id ASC`;
      return res.status(200).json(services);
    }

    if (req.method === "POST") {
      const body = req.body || {};
      const title = typeof body.title === "string" ? body.title.trim() : "";
      const price = Number(body.price);
      const workdays = body.workdays === undefined ? 1 : Number(body.workdays);
      const description = typeof body.description === "string" ? body.description.trim() : "";
      const image = typeof body.image === "string" ? body.image.trim() : "";
      const category = typeof body.category === "string" ? body.category.trim() : "";
      const accepted = body.accepted === undefined ? true : body.accepted;

      if (!title || !Number.isFinite(price) || price <= 0 || !Number.isInteger(workdays) || workdays < 1 || typeof accepted !== "boolean") {
        return res.status(400).json({ error: "Enter a title, positive price, whole workdays, and valid acceptance status." });
      }

      const result = await sql`
        INSERT INTO services (title, description, image, price, workdays, category, accepted)
        VALUES (${title}, ${description}, ${image}, ${, ${workdays}, ${category}, ${accepted})
        RETURNING *
      `;
      return res.status(201).json(result[0]);
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Services API error:", error);
    return res.status(500).json({ error: "Could not process services request. Check the database connection and services table." });
  }
}
