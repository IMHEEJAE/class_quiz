import { useState } from "react";

export default function Page0204() {
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [passwordConfirmError, setPasswordConfirmError] = useState();
  const [submitMessage, setSubmitMessage] = useState();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
    if (event.target.vaule !== "") {
      setEmailError("");
    }
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setPasswordError("");
    }
  };
  const onChangePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);
    if (event.target.value !== "") {
      setPasswordConfirmError("");
    }
  };
  const onClickSignup = () => {
    if (!email) {
      setEmailError("이메일이 올바르지 않습니다. ");
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    }
    if (email.includes("@") !== true) {
      setEmailError("@가 없습니다.");
    } else if (password !== passwordConfirm) {
      setPasswordConfirmError("비밀번호 틀림");
    } else if (email && password && passwordConfirm) {
      setSubmitMessage("완료");
    } else {
      setPasswordConfirmError("");
    }
  };
  return (
    <>
      이메일 : <input type="text" onChange={onChangeEmail} />
      <div style={{ color: "red" }}>{emailError}</div>
      <br />
      비밀번호 : <input type="password" onChange={onChangePassword} />
      <div style={{ color: "red" }}>{passwordError}</div>
      <br />
      비밀번호확인 :{" "}
      <input type="password" onChange={onChangePasswordConfirm} />
      <div style={{ color: "red" }}>{passwordConfirmError}</div>
      <br />
      <button onClick={onClickSignup}>회원가입</button>
      <div style={{ color: "blue" }}>{submitMessage}</div>
    </>
  );
}
