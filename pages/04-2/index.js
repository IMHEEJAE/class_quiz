import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;
export default function Page0402() {
  const [graphqlAPI] = useMutation(CREATE_BOARD);
  const [writer, setWriter] = useState();
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();

  const onChagneWriter = (event) => {
    setWriter(event.target.value);
    console.log(event.target.value);
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  };
  const onChangeContent = (event) => {
    setContents(event.target.value);
    console.log(event.target.value);
  };

  const onClickBtn = async () => {
    const result = await graphqlAPI({
      variables: {
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    console.log(result);
  };
  return (
    <>
      작성자 : <input type="text" onChange={onChagneWriter} />
      <br />
      제목 : <input type="text" onChange={onChangeTitle} />
      <br />
      내용 : <input type="text" onChange={onChangeContent} />
      <br />
      <button onClick={onClickBtn}>GPAPHQL-API 요청하기</button>
    </>
  );
}
