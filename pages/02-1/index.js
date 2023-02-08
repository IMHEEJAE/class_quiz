import { useState } from "react";

export default function Page0201() {
  const [hello, setHello] = useState("안녕하세요");

  function onClickbtn() {
    setHello("반갑습니다.");
  }
  function onClickbtn02() {
    const test = (document.getElementById("hellobtn").innerHTML =
      "반갑습니다.");
  }
  return (
    <>
      <button onClick={onClickbtn}>{hello}</button>
      <button onClick={onClickbtn02} id="hellobtn">
        안녕하세요
      </button>
    </>
  );
}
