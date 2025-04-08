// pages/api/sarees/[id].js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM sarees WHERE id = $1', [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Saree not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching saree by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
