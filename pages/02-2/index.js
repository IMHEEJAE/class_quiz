import { useState } from "react";

export default function CountPage() {
  const [count, setCount] = useState(0);

  function handlebtn() {
    setCount(count + 1);
  }
  function handlebtn02() {
    const counter = Number(document.getElementById("counter").innerText) + 1;
    document.getElementById("counter").innerText = counter;
  }
  return (
    <>
      <div>{count}</div>
      <button onClick={handlebtn}>카운트증가</button>

      <div id="counter">0</div>
      <button onClick={handlebtn02}>카운트증가</button>
    </>
  );
}
