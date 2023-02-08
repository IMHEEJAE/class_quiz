import { useState } from "react";

export default function Page0203() {
  const [cert, setCert] = useState(0);
  function handleCertBtn() {
    setCert(cert + Number(Math.random() * 1000000).toFixed());
  }
  function handleRandomBtn() {
    const certRandom = Number(Math.random() * 1000000).toFixed();
    document.getElementById("certRandom").innerText = certRandom;
  }
  return (
    <>
      <div>{cert}</div>
      <button onClick={handleCertBtn}>인증번호전송</button>

      <div id="certRandom">000000</div>
      <button onClick={handleRandomBtn}>인증번호전송</button>
    </>
  );
}
