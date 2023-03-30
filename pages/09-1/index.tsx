import { CaretRightOutlined } from "@ant-design/icons";
import { CaretLeftOutlined } from "@ant-design/icons/lib/icons";
import { gql, useQuery } from "@apollo/client";
import { useState, MouseEvent } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

export default function Page0901() {
  const [startPage, setStartPage] = useState(1);
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const { data: dataBoardsCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);
  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    void refetch({ page: startPage - 10 });
  };

  const lastPage =
    dataBoardsCount != null
      ? Math.ceil(dataBoardsCount.fetchBoardsCount / 10)
      : 0;

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) setStartPage(startPage + 10);
    void refetch({ page: startPage + 10 });
  };
  console.log(dataBoardsCount);
  return (
    <>
      {data?.fetchBoards?.map((el) => (
        <div key={el._id} style={{ display: "flex" }}>
          <span style={{ width: "30%" }}>{el.writer}</span>
          <span style={{ width: "30%" }}>{el.title}</span>
          <span style={{ width: "30%" }}>{el.contents}</span>
        </div>
      ))}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CaretLeftOutlined onClick={onClickPrevPage} />
        {Array(10)
          .fill(1)
          .map((_, index) => {
            if (index + startPage <= lastPage) {
              return (
                <span
                  key={index}
                  style={{ marginRight: 10 }}
                  id={String(index + startPage)}
                  onClick={onClickPage}
                >
                  {index + startPage}
                </span>
              );
            } else {
              <span>zz</span>;
            }
          })}
        <CaretRightOutlined onClick={onClickNextPage} />
      </div>
    </>
  );
}
