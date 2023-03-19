export default function handler(req, res) {
    const { method } = req;
  
    switch (method) {
      case 'GET':
        // Handle GET request
        res.status(200).json({ message: 'Handling GET request' });
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
  