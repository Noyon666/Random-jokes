// App.js

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Spinner } from "react-bootstrap";

const App = () => {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jokeData = await response.json();
      setJoke(`${jokeData.setup} - ${jokeData.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Oops! Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div
        className="card text-center shadow-lg rounded"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <div className="card-header bg-primary text-white">
          <h1 className="mb-0">Random Joke Generator</h1>
        </div>
        <div className="card-body">
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <p className="card-text joke">{joke}</p>
          )}
          <button onClick={fetchJoke} className="btn btn-outline-success">
            Get Another Joke
          </button>
        </div>
      </div>
      <footer className="mt-5">
        <p className="text-muted">Powered by Official Joke API</p>
      </footer>
    </div>
  );
};

export default App;
