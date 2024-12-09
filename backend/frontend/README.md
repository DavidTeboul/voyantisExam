
Message Queue System
This is a simple message queue system with a backend API built using Node.js and Express, and a frontend UI built with React. The backend allows adding and retrieving messages from queues, while the frontend provides an interface to interact with the queues.

Features
Backend API to manage message queues:

POST /api/{queue_name}: Add a message to a specific queue.
GET /api/{queue_name}?timeout={ms}: Retrieve the next message from a queue with a timeout (default is 10 seconds).
GET /queues: List all available queues and the number of messages in each.
Frontend UI built with React:

Displays available queues and message count.
Allows selecting a queue and fetching the next message.
Requirements
Node.js (>= v14)
npm (Node package manager)
Setup and Installation
1. Backend Setup
Clone the repository and navigate to the backend folder:
bash
Copy code
git clone <your-repo-url>
cd message-queue-app
Install backend dependencies:
bash
Copy code
npm install
Start the backend server:
bash
Copy code
node server.js
The backend will run on http://localhost:3000.

2. Frontend Setup
Navigate to the frontend folder:
bash
Copy code
cd message-queue-frontend
Install frontend dependencies:
bash
Copy code
npm install
Start the frontend React app:
bash
Copy code
npm start
The frontend will run on http://localhost:3001.


Here’s a sample README.md file for your project:

Message Queue System
This is a simple message queue system with a backend API built using Node.js and Express, and a frontend UI built with React. The backend allows adding and retrieving messages from queues, while the frontend provides an interface to interact with the queues.

Features
Backend API to manage message queues:

POST /api/{queue_name}: Add a message to a specific queue.
GET /api/{queue_name}?timeout={ms}: Retrieve the next message from a queue with a timeout (default is 10 seconds).
GET /queues: List all available queues and the number of messages in each.
Frontend UI built with React:

Displays available queues and message count.
Allows selecting a queue and fetching the next message.
Requirements
Node.js (>= v14)
npm (Node package manager)
Setup and Installation
1. Backend Setup
Clone the repository and navigate to the backend folder:
bash
Copy code
git clone <your-repo-url>
cd message-queue-app
Install backend dependencies:
bash
Copy code
npm install
Start the backend server:
bash
Copy code
node server.js
The backend will run on http://localhost:3000.

2. Frontend Setup
Navigate to the frontend folder:
bash
Copy code
cd message-queue-frontend
Install frontend dependencies:
bash
Copy code
npm install
Start the frontend React app:
bash
Copy code
npm start
The frontend will run on http://localhost:3001.

API Endpoints
1. POST /api/{queue_name}
Description: Adds a new message to the specified queue.
Request Body:
json
Copy code
{ "message": "Your custom message here" }
Example:
URL: http://localhost:3000/api/myQueue
Body:
json
Copy code
{ "message": "Hello, Queue!" }
2. GET /api/{queue_name}?timeout={ms}
Description: Retrieves the next message from the specified queue. Returns 204 if no message is available after the specified timeout (default is 10 seconds).
Example:
URL: http://localhost:3000/api/myQueue?timeout=10000
3. GET /queues
Description: Lists all available queues and the number of messages in each queue.
Response Example:
json
Copy code
[
  { "name": "queue1", "messageCount": 2 },
  { "name": "queue2", "messageCount": 0 }
]
Frontend Usage
Select a queue: From the dropdown, choose the queue you want to interact with.
Click 'Go': Click the "Go" button to fetch the next message from the selected queue.
Message Display: The message from the queue will be displayed, or a message saying "No message available" will appear if the queue is empty.
Example Workflow
Add a message using the backend API (or via the frontend UI).
Example: POST a message "Test Message" to myQueue.
Fetch a message using the frontend or the backend API.
Example: GET the next message from myQueue.
Notes
The backend stores queues and messages in memory, meaning they will be lost when the server is restarted.
The frontend provides a simple UI with basic styling. You can customize the styling to match your desired look and feel.
GitHub Repository
You can find this project hosted on GitHub at: <your-repo-url>.