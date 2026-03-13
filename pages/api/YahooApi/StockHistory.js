import yahooFinance from './_yahooClient.js';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const data = await yahooFinance.chart('SPY', { period1: '2018-01-01' });
        res.send(data.quotes);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;
    case 'POST':
      try {
        const { symbol, from, to, period } = req.body;
        const data = await yahooFinance.chart(symbol, {
          period1: from,
          period2: to,
          interval: period,
        });
        res.send(data.quotes.reverse());
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;
    case 'PUT':
      res.status(200).json({ message: 'Handling PUT request' });
      break;
    case 'DELETE':
      res.status(200).json({ message: 'Handling DELETE request' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
