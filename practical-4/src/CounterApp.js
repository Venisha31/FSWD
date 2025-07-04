import React, { useState } from "react";
import "./App.css"; // Assuming styles are in App.css

function CounterApp() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const incrementFive = () => setCount((prev) => prev + 5);
  const reset = () => setCount(0);

  return (
    <div className="container">
      <div className="card">
        <h1>🚀 Counter App</h1>
        <h2 className="count">Count: {count}</h2>

        <div className="button-group">
          <button onClick={reset}>Reset</button>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={incrementFive}>Increment 5</button>
        </div>

        <h2>🎓 Welcome to CHARUSAT!</h2>

        <div className="form">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="output">
          <p><strong>First Name:</strong> {firstName}</p>
          <p><strong>Last Name:</strong> {lastName}</p>
        </div>
      </div>
    </div>
  );
}

export default CounterApp;
