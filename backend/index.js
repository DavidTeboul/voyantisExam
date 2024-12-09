// Import required modules
import express from 'express'; // Import the Express framework
import bodyParser from 'body-parser'; // Import the body-parser for parsing JSON request bodies
import cors from 'cors'; // Import CORS for cross-origin requests (optional, for frontend-backend interaction)
import axios from 'axios';


/** const express = require('express'); // Import the Express framework
const bodyParser = require('body-parser'); // Import the body-parser for parsing JSON request bodies
const cors = require('cors'); // Import CORS for cross-origin requests (optional, for frontend-backend interaction)
**/

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const  queues = {
  "queue1": ["Message 1", "Message 2", "Message 3"],
  "queue2": ["Message A", "Message B"],
  "queue3": []
};

// GET /api/queues - List all queues and message counts
app.get('/api/queues', async (req, res) => {
    const queueData = Object.keys(queues).map((queueName) => ({
      name: queueName,
      messageCount: queues[queueName].length,
    }));
    res.json(queueData);
  });


app.post('/api/:queue_name', async(req,res) => {
  const queueName = req.params.queue_name;
  const message = req.body.message;  // Expecting { message: "some text" }
  if (!queues[queueName]) {
    queues[queueName] = [];
  }
  queues[queueName].push(message);  // Add message to the queue
  res.status(201).send("Message added to queue");
});


app.get('/api/:queue_name', async(req,res) => {
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
}
); 

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
  });

// https://randomuser.me/api/?results=5000