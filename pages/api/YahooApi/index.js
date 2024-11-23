
const yahooFinance = require('yahoo-finance2').default; // NOTE 

    export default async function handler(req, res) {
        const { method } = req;
      
        switch (method) {
          case 'GET':
            // Handle GET request
            await yahooFinance.quote
             ('SPY') .then((data) =>   res.send(data));
        
      


            break;
          case 'POST':
            // Handle POST request
            // res.status(200).json({ message: 'Handling POST request' });
            const bodyObject = JSON.parse(req.body);
            const symbol = bodyObject.symbol;
            await yahooFinance.quote(symbol)
            .then((data) =>   res.send(data));
            break;
          case 'PUT':
            // Handle PUT request
            res.status(200).json({ message: 'Handling PUT request' });
            break;
          case 'DELETE':
            // Handle DELETE request
            res.status(200).json({ message: 'Handling DELETE request' });
            break;
          default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
      }
      



