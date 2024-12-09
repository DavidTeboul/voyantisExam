React Frontend and Node.js Backend Project
This project includes a React frontend and a Node.js backend. The backend is built with Express, using axios, cors, and body-parser for handling requests and responses, while the frontend is initialized with Create React App.

🚀 Setup Instructions
📋 Prerequisites
Ensure the following are installed on your system:

Node.js (v14 or higher)
npm (v6 or higher)
🛠 Step 1: Clone the Repository
Clone the repository:

bash
Copier le code
git clone https://github.com/DavidTeboul/voyantisExam
Navigate into the project folder:

bash
Copier le code
cd voyantisExam
🔧 Step 2: Backend Setup
Navigate to the backend folder:

bash
Copier le code
cd backend
Initialize the backend:

bash
Copier le code
npm init -y
Install required dependencies:

bash
Copier le code
npm install express cors body-parser axios
Create the backend entry point (index.js):

javascript
Copier le code
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Backend is running');
});

const PORT = 3000; // Backend server port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
Run the backend server:

bash
Copier le code
node index.js
Your backend will be running at: http://localhost:3000

🌐 Step 3: Frontend Setup
Navigate to the frontend folder:

bash
Copier le code
cd frontend
Initialize the frontend using Create React App:

bash
Copier le code
npx create-react-app .
Start the React development server:

bash
Copier le code
npm start
The frontend will use the same port as the backend (http://localhost:3000). You can customize the configuration in the React app to interact with the backend.

🧪 Testing the Setup
Open your browser at: http://localhost:3000
Use axios in the React app to make API calls to the backend.