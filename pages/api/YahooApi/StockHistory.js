
var yahooFinance = require('yahoo-finance');


    export default async function handler(req, res) {
        const { method } = req;
      
        switch (method) {
          case 'GET':
            // Handle GET request
          
            await yahooFinance.historical({
                symbol: 'SPY',
                from:'2018-03-24',
                to:'2023-03-24',
                period:'d' // see the docs for the full list
            })
            .then((data) => res.send(data))
      


            break;
          case 'POST':
            // Handle POST request
            const bodyObject = JSON.parse(req.body);
            const symbol = bodyObject.symbol;
            const startDate = bodyObject.from;
            const endDate = bodyObject.to;
       
            await yahooFinance.historical({
                symbol: symbol,
                from:startDate,
                to:endDate,
                period:'d' // see the docs for the full list
            })
            .then((data) => res.send(data))
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
      





