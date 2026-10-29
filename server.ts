import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { findDealsWithGemini } from './server/geminiDealFinder.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API endpoints
app.post('/api/deals', async (req, res) => {
  try {
    const query = req.body?.query || 'iPhone 16';
    const result = await findDealsWithGemini(query);
    res.json(result);
  } catch (error: any) {
    console.error('Server error finding deals:', error);
    res.status(500).json({ error: error.message || 'Failed to search deals' });
  }
});

app.get('/api/deals', async (req, res) => {
  try {
    const query = (req.query.q as string) || 'iPhone 16';
    const result = await findDealsWithGemini(query);
    res.json(result);
  } catch (error: any) {
    console.error('Server error finding deals:', error);
    res.status(500).json({ error: error.message || 'Failed to search deals' });
  }
});

// Serve frontend static build if exists
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Jugaddu.RJ.COM server running on port ${PORT}`);
});
