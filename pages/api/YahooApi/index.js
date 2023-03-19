
var yahooFinance = require('yahoo-finance');


    export default async function handler(req, res) {
        const { method } = req;
      
        switch (method) {
          case 'GET':
            // Handle GET request
          const data =  await  yahooFinance.quote({
                symbol: 'AAPL',
                modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
              }, function (err, quotes) {
                // ...
              });
            res.status(200).json({ message: 'Handling GET request',data:data });
            break;
          case 'POST':
            // Handle POST request
            res.status(200).json({ message: 'Handling POST request' });
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
      



