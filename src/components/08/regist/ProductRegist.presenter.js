export default function ProductRegistPresenter(props) {
  return (
    <>
      <h1>{props.isEdit ? "등록" : "수정"} </h1>
      <div>
        seller : <input type="text" onChange={props.onChangeSeller} />
      </div>
      <div>
        name : <input type="text" onChange={props.onChangeName} />
      </div>
      <div>
        detail : <input type="text" onChange={props.onChangeDetail} />
      </div>
      <div>
        price : <input type="number" onChange={props.onChangePrice} />
      </div>
      <button onClick={props.isEdit ? props.onClickSubmit : props.onClickEdit}>
        {props.isEdit ? "등록" : "수정"}
      </button>
    </>
  );
}
