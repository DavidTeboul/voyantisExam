import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import the body-parser for parsing JSON request bodies

const app = express();
const port = 3000;

const  queues = {
  "queue1": ["Message 1", "Message 2", "Message 3"],
  "queue2": ["Message A", "Message B"],
  "queue3": []
};

// Middleware

app.use(cors());
app.use(bodyParser.json());

// POST /api/:queue_name - Add a message to the queue
app.post('/api/:queue_name', req, res) => {
  const queueName = req.params.queue_name;
  const message = req.body.message;  // Expecting { message: "some text" }
  if (!queues[queueName]) {
    queues[queueName] = [];
  }
  queues[queueName].push(message);  // Add message to the queue
  res.status(201).send("Message added to queue");
});

// GET /api/:queue_name - Get a message from the queue
app.get('/api/:queue_name', (req, res) => {
  const queueName = req.params.queue_name;
  const timeout = req.query.timeout ? parseInt(req.query.timeout) : 10000; // Default timeout is 10 seconds
  // Wait for the message or timeout
  const startTime = Date.now();
  const checkQueue = setInterval(() => {
    if (queues[queueName] && queues[queueName].length > 0) {
      const message = queues[queueName].shift();  // Pop the first message
      clearInterval(checkQueue);
      res.json({ message });  // Send the message back
    } else if (Date.now() - startTime >= timeout) {
      clearInterval(checkQueue);
      res.status(204).send();  // No message after timeout
    }
  }, 100);  // Check every 100ms
});

// GET /api/queues - List all queues and message counts
app.get('/api/queues', async (req, res) => {
console.log(queues)
  const queueData = Object.keys(queues).map((queueName) => ({
    name: queueName,
    messageCount: queues[queueName].length,
  }));
  res.json(queueData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
