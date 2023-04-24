import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../src/commons/types/generated/types";
import { Modal } from "antd";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../src/commons/store";
import { useRouter } from "next/router";
const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;
export default function loginPage() {
  const router = useRouter();
  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const onChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.target.id]: event.target.value,
    });
  };
  const onClickLogin = async () => {
    try {
      const result = await loginUser({
        variables: {
          ...inputs,
        },
      });
      const accessToken = result.data?.loginUser.accessToken;
      if (!accessToken) {
        Modal.error({ content: "로그인을 먼저 해주세요." });
        window.location.replace("/14-2/login");
        return;
      }
      setAccessToken(accessToken);
      void router.push("/14-2/login-successd");
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };
  return (
    <>
      이메일 : <input id="email" type="text" onChange={onChangeInputs} />
      <br />
      비밀번호 :
      <input id="password" type="password" onChange={onChangeInputs} />
      <br />
      <button onClick={onClickLogin}>로그인</button>
    </>
  );
}
