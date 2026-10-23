
import { sql } from "../lib/db.js";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const services = await sql`
        SELECT * FROM services ORDER BY id
      `;

      return res.status(200).json(services);
    }

    if (req.method === "POST") {
      const {
        title,
        description = "",
        image = "",
        price,
        workdays = 1,
        category = "",
        accepted = true,
      } = req.body;

      if (!title || price === undefined || Number(price) < 0) {
        return res.status(400).json({
          error: "Valid title and price are required",
        });
      }

      const result = await sql`
        INSERT INTO services
          (title, description, image, price, workdays, category, accepted)
        VALUES
          (
            ${title},
            ${description},
            ${image},
            ${Number(price)},
            ${Number(workdays)},
            ${category},
            ${accepted}
          )
        RETURNING *
      `;

      return res.status(201).json(result[0]);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Services API error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
