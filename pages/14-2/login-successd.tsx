import { gql, useQuery } from "@apollo/client";
import { IQuery } from "../../src/commons/types/generated/types";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      name
      email
    }
  }
`;

export default function loginSuccessdPage() {
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  return (
    <>
      <span>{data?.fetchUserLoggedIn.name}님 환영</span>
      <br />
      <span>
        아이디는
        <span style={{ color: "red" }}>{data?.fetchUserLoggedIn.email} </span>
        입니다.
      </span>
    </>
  );
}
