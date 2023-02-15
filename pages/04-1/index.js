import { useState } from "react";
import axios from "axios";

export default function Page0401() {
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const onClickBtn = async () => {
    const result = await axios.get("https://koreanjson.com/users/1");
    console.log(result);
    setName(result.data.name);
    setUserName(result.data.username);
    setEmail(result.data.email);
    setPhone(result.data.phone);
  };
  return (
    <>
      <button onClick={onClickBtn}>REST-API 요청하기</button>
      <div>{name}</div>
      <div>{userName}</div>
      <div>{email}</div>
      <div>{phone}</div>
    </>
  );
}
