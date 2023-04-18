import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState, useRef } from "react";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";
import { Button, Modal } from "antd";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const UPLOADE_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
interface IPageProps {
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
  writer: any;
  password: any;
  title: any;
  contents: any;
  imageUrl: any;
}
export default function Page1201(props: IPageProps) {
  const fileRef = useRef<HTMLInputElement>();
  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOADE_FILE);
  const [imageUrl, setImageUrl] = useState("");
  const [inputs, setInputs] = useState({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const onChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,

      [event.target.id]: event.target.value,
    });
  };
  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          ...inputs,
          // images: [imageUrl],
        },
      },
    });
    console.log(result);
  };
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    try {
      const result = await uploadFile({
        variables: { file },
      });
      setImageUrl(result.data?.uploadFile.url ?? "");
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };
  const onClickImage = () => {
    fileRef.current?.click();
  };
  return (
    <>
      <div>
        작성자 : <input id="writer" type="text" onChange={onChangeInputs} />
      </div>
      <div>
        비밀번호 : <input id="password" type="password" />
      </div>
      <div>
        제목 : <input id="title" type="text" onChange={onChangeInputs} />
      </div>
      <div>
        내용 : <input id="contents" type="text" onChange={onChangeInputs} />
      </div>
      <Button onClick={onClickImage}>이미지 선택</Button>
      <input
        type="file"
        onChange={onChangeFile}
        ref={fileRef}
        style={{ display: "none" }}
      />
      <img src={`https://storage.googleapis.com/${imageUrl}`} />
      <br />
      <Button onClick={onClickSubmit}>전송</Button>
    </>
  );
}
