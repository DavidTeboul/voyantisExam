import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [queues, setQueues] = useState([]);
  const [selectedQueue, setSelectedQueue] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQueues();
  }, []);

  const fetchQueues = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:3000/api/queues`)
      .then((response) => {
        setQueues(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching queues: " + error.message);
        setLoading(false);
      });
  };

  const fetchMessage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/${selectedQueue}?timeout=10000`
      );
      if (response.status === 200) {
        setMessage(response.data.message);
      } else {
        setMessage("No message available");
      }
    } catch (error) {
      setMessage("Error fetching message");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1A1A1A",
        color: "#FFFFFF",
      }}
    >
      <h1 style={{ color: "#00D9FF" }}>Message Queue Viewer</h1>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Select Queue:</label>
        <select
          onChange={(e) => setSelectedQueue(e.target.value)}
          value={selectedQueue}
        >
          <option value="">Select a queue</option>
          {queues.map((queue) => (
            <option key={queue.name} value={queue.name}>
              {queue.name} ({queue.messageCount} messages)
            </option>
          ))}
        </select>
        <button
          onClick={fetchMessage}
          disabled={!selectedQueue}
          style={{ marginLeft: "10px", backgroundColor: "#00D9FF" }}
        >
          Go
        </button>
      </div>
      <div>
        <h3>Message:</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
