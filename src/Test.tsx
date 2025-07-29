import { useCallback, useState } from "react";

function sum(a: number, b: number): number {
  console.log("sum() ran");
  return a + b;
}

export default function Test() {
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);
  const [name, setName] = useState("Jim");

  // Correct use of useCallback: memoize the sum function
  const computeSum = useCallback(() => {
    return sum(val1, val2);
  }, [val1, val2]);

  return (
    <div className="App">
      <input
        value={val1}
        onChange={({ target }) => setVal1(parseInt(target.value || "0", 10))}
      />
      <input
        value={val2}
        onChange={({ target }) => setVal2(parseInt(target.value || "0", 10))}
      />
      <input
        placeholder="Name"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <p>{computeSum()}</p>
    </div>
  );
}
