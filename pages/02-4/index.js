import { useState } from "react";

export default function Page0204() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }
  function onChangePassword(event) {
    setPassword(event.target.value);
  }
  function onChangePasswordConfirm(event) {
    setPasswordConfirm(event.target.value);
  }

  function onClickSignup() {
    // if (email.includes("@") === false) {
    //   setEmailError("이메일이 올바르지 않습니다. @가 없음!!");
    // } else {
    //   alert("회원가입을 축하합니다.");
    // }
    // if (password !== passwordConfirm) {
    //   setPasswordError("틀림");
    // } else {
    // }
  }
  return (
    <>
      이메일 : <input type="text" onChange={onChangeEmail} />
      <div style={{ color: "red" }}>{emailError}</div>
      <br />
      비밀번호 : <input type="password" onChange={onChangePassword} />
      <br />
      비밀번호확인 :{" "}
      <input type="password" onChange={onChangePasswordConfirm} />
      <div style={{ color: "red" }}>{setPasswordError}</div>
      <br />
      <button onClick={onClickSignup()}>회원가입</button>
    </>
  );
}
