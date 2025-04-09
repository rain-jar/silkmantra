// pages/api/sarees/index.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false, // or true in Vercel
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { q, category, minPrice, maxPrice, sort } = req.query;

    let filters = [];
    let values = [];
    let index = 1;

    // 🔍 Search term
    if (q) {
      filters.push(`(name ILIKE $${index} OR description ILIKE $${index})`);
      values.push(`%${q}%`);
      index++;
    }

    // 🏷️ Categories
    if (category) {
      const categories = category.split(',').map((c) => c.trim());
      const categoryPlaceholders = categories.map((_, i) => `$${index + i}`);
      filters.push(`category IN (${categoryPlaceholders.join(', ')})`);
      values.push(...categories);
      index += categories.length;
    }

    // 💰 Price range
    if (minPrice) {
      filters.push(`price >= $${index}`);
      values.push(Number(minPrice));
      index++;
    }
    if (maxPrice) {
      filters.push(`price <= $${index}`);
      values.push(Number(maxPrice));
      index++;
    }

    // 📄 Final query
    let query = `SELECT * FROM sarees`;
    if (filters.length > 0) {
      query += ` WHERE ${filters.join(' AND ')}`;
    }

    // 🔃 Sorting
    if (sort === 'price_asc') {
      query += ` ORDER BY price ASC`;
    } else if (sort === 'price_desc') {
      query += ` ORDER BY price DESC`;
    } else {
      query += ` ORDER BY created_at DESC`;
    }

    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error filtering sarees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
