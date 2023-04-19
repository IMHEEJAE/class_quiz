import { gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import { ChangeEvent, MouseEvent, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const FETCH_BOARDS = gql`
  query fetchBoards($search: String, $page: Int) {
    fetchBoards(search: $search, page: $page) {
      _id
      writer
      title
    }
  }
`;

export default function Page1301() {
  const [search, setSearch] = useState("");
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    void refetch({ page: Number(event.currentTarget.id) });
  };
  const Debounce = _.debounce((value) => {
    void refetch({ search: value, page: 1 });
    setSearch(value);
  }, 500);
  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    Debounce(event.target.value);
  };

  return (
    <>
      <input style={{ margin: "20px" }} onChange={onChangeSearch} type="text" />
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "20px" }}>{el.writer}</span>
          <span style={{ margin: "20px" }}>
            {el.title
              .replaceAll(search, `!@##$${search}!@##$`)
              .split("!@##$")
              .map((el: any) => (
                <span
                  key={uuidv4()}
                  style={{ color: el === search ? "red" : "black" }}
                >
                  {el}
                </span>
              ))}
          </span>
        </div>
      ))}
      {Array(10)
        .fill(1)
        .map((el, index) => (
          <span
            key={index}
            id={String(index + 1)}
            onClick={onClickPage}
            style={{ margin: "10px" }}
          >
            {index + 1}
          </span>
        ))}
    </>
  );
}
