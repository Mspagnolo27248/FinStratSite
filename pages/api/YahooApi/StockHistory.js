
var yahooFinance = require('yahoo-finance2').default;


    export default async function handler(req, res) {
        const { method } = req;
      
        switch (method) {
          case 'GET':
            // Handle GET request
          
            await yahooFinance.chart('SPY',{               
                period1:'2018-01-01',
                //period2:'2023-04-01',            
            })
            .then((data) => res.send(data.quotes))
      


            break;
          case 'POST':
            // Handle POST request
            const bodyObject = JSON.parse(req.body);
            const symbol = bodyObject.symbol;
            const startDate = bodyObject.from;
            const endDate = bodyObject.to;
            const period = bodyObject.period;
            await yahooFinance.chart(symbol,{                
                period1:startDate,
                period2:endDate,
                interval:period // see the docs for the full list
            })
            .then((data) => res.send(data.quotes))
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
      





