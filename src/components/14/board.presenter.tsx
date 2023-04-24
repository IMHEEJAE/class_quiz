import { isEditState } from "../../commons/store";
import { useRecoilState } from "recoil";

export default function BoardPresenter() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);
  return <>{isEdit ? "오오오오" : "크크크크"}</>;
}
