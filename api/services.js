import { sql } from "../lib/db.js";

export default async function handler(req, res) {
  try {
    // ۱. متد خواندن اطلاعات (GET)
    if (req.method === "GET") {
      const services = await sql`
        SELECT * FROM services ORDER BY id ASC
      `;
      return res.status(200).json(services);
    }

    // ۲. متد ثبت تغییرات و اطلاعات جدید (POST)
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

      // اعتبار سنجی اطلاعات ورودی
      if (!title || price === undefined || Number(price) < 0) {
        return res.status(400).json({
          error: "Valid title and price are required",
        });
      }

      // اجرای کوئری با ساختار صحیح await برای جلوگیری از خطای سرور در ورسل
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

      // در متد sql نئون، خروجی یک آرایه است؛ گرفتن ردیف اول ثبت شده به صورت ایمن:
      const savedService = result && result.length > 0 ? result[0] : result;

      return res.status(201).json(savedService);
    }

    // اگر متدی غیر از GET و POST فرستاده شد
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Method not allowed" });
    
  } catch (error) {
    // چاپ خطای دقیق در داشبورد ورسل برای عیب‌یابی ساده‌تر
    console.error("Services API error detail:", error.message);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
}
