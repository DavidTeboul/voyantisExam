import React, { useState, useEffect } from 'react'; // Import React and hooks
import axios from 'axios'; // Import axios to make HTTP requests
import './App.css';

function App() {
  const [queues, setQueues] = useState([]);
  const [selectedQueue, setSelectedQueue] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQueues(); // Fetch queues when page loads
  }, []);

  const fetchQueues = () => {
    setLoading(true); // Set loading to true when starting the fetch
    setError(null); // Reset any previous errors
    axios
      .get(`http://localhost:3000/api/queues`)
      .then((response) => {
        setQueues(response.data); // Set the queues data from the response
        setLoading(false); // Set loading to false when finished
      })
      .catch((error) => {
        setError("Error fetching queues: " + error.message); // Handle error
        setLoading(false); // Set loading to false even on error
      });
  };

  const fetchMessage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/${selectedQueue}?timeout=10000`
      );
      if (response.status === 200) {
        setMessage(response.data); // Assuming the message is sent directly in the response body
      } else {
        setMessage("No message available");
      }
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Message Queue Viewer</h1>
      <div className="queue-selection">
        <label htmlFor="queue-select">Select Queue:</label>
        <select
          id="queue-select"
          onChange={(e) => setSelectedQueue(e.target.value)}
          value={selectedQueue}
        >
          <option value="" disabled>
            Select a queue
          </option>
          {queues.map((queue) => (
            <option key={queue.name} value={queue.name}>
              {queue.name} ({queue.messageCount} messages)
            </option>
          ))}
        </select>
        <button
          onClick={fetchMessage}
          disabled={!selectedQueue || loading}
          className="go-button"
        >
          {loading ? "Loading..." : "Go"}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="message-container">
        <h3>Message:</h3>
        <p>{message || "No message available"}</p>
      </div>
    </div>
  );
}

export default App;
