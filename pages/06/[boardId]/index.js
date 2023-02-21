import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_PRODUCT = gql`
  query fetchProduct($productId: ID!) {
    fetchProduct(productId: $productId) {
      _id
      seller
      name
      detail
      price
    }
  }
`;

export default function PageBoard() {
  const router = useRouter();
  console.log(router.query.boardId); 
  const { data } = useQuery(FETCH_PRODUCT, {
    variables: { productId: router.query.boardId },
  });

  return (
    <>
      <div>판매자 : {data ? data.fetchProduct.seller : "잠시만..."}</div>
      <div>상품명 : {data ? data.fetchProduct.name : "기다려죠..."}</div>
      <div>상품내용 : {data?.fetchProduct.detail}</div>
      <div>가격 : {data && data.fetchProduct.price}</div>
    </>
  );
}
