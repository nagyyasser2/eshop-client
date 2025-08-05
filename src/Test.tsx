import * as React from "react";

const Test = () => {
  return (
    <div>
      <h1>Test Component</h1>
    </div>
  );
};

export default function Counter() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  console.log(Test());

  return (
    <main>
      <h1>{count}</h1>
      <button onClick={handleClick}>+</button>
    </main>
  );
}
