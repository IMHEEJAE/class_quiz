import { useRecoilState } from "recoil";
import BoardContainer from "../../src/components/14/board.container";
import { isEditState } from "../../src/commons/store";
import { useEffect } from "react";

export default function Page1401() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  useEffect(() => {
    setIsEdit(true);
  }, []);
  return (
    <>
      <BoardContainer />
    </>
  );
}
