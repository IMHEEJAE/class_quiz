export default function ProductDetailPresenter(props) {
  return (
    <>
      <h1>상세</h1>
      <div>seller : {props.data?.fetchProduct.seller}</div>
      <div>name : {props.data?.fetchProduct.name}</div>
      <div>detail :{props.data?.fetchProduct.detail}</div>
      <div>price : {props.data?.fetchProduct.price}</div>
      <button onClick={props.onClickEdit}>수정하기</button>
    </>
  );
}
