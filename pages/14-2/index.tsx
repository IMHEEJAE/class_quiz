import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationCreateUserArgs,
} from "../../src/commons/types/generated/types";
import { Modal } from "antd";
import { useRouter } from "next/router";

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;
export default function login() {
  const router = useRouter();
  const [createUser] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });
  const onChnageInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.target.id]: event.target.value,
    });
    console.log(inputs);
  };
  const onClickSubmit = async () => {
    try {
      // 회원가입 완
      const result = await createUser({
        variables: {
          createUserInput: {
            ...inputs,
          },
        },
      });
      console.log(result);
      // 페이지 넘기기
      void router.push("/14-2/login");
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <>
      이름 : <input id="name" type="text" onChange={onChnageInputs} />
      <br />
      이메일 : <input id="email" type="text" onChange={onChnageInputs} />
      <br />
      비밀번호 <input id="password" type="password" onChange={onChnageInputs} />
      <br />
      <button onClick={onClickSubmit}>회원가입버튼</button>
    </>
  );
}
