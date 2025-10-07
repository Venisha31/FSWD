import React, { useState, useEffect } from "react";
import axios from "axios";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/count").then((res) => {
      setCount(res.data.count);
    });
  }, []);

  const updateCount = (newCount) => {
    axios.post("http://localhost:5000/count", { count: newCount }).then(() => {
      setCount(newCount);
    });
  };

  return (
    <div className="counter-card">
      <div className="count-display">{count}</div>
      <div className="buttons">
        <button onClick={() => updateCount(count + 1)}>+1</button>
        <button onClick={() => updateCount(Math.max(count - 1, 0))}>−1</button>
        <button className="reset" onClick={() => updateCount(0)}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;
