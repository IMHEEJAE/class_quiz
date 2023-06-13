import React, { useState } from "react";
import MapContainer from "./MapContainer";

export default function LandingPage() {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (event: any) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setPlace(inputText);
  };

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form>
      <MapContainer searchPlace={place} />
    </>
  );
}
