import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import styled from "@emotion/styled";

const FETCH_PRODUCTS = gql`
  query fetchProducts($page: Int) {
    fetchProducts(page: $page) {
      _id
      seller
      name
      detail
      price
      createdAt
    }
  }
`;
const DELETE_PRODUCT = gql`
  mutation deleteProduct($productId: ID) {
    deleteProduct(productId: $productId) {
      message
    }
  }
`;
const Row = styled.div`
  display: flex;
`;
const Column = styled.div`
  width: 25%;
`;
export default function Page07() {
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const { data } = useQuery(FETCH_PRODUCTS);
  const onClickDelete = async (event) => {
    await deleteProduct({
      variables: { productId: event._id },
      refetchQueries: [{ query: FETCH_PRODUCTS }],
    });
    console.log(event.target._id);
  };
  return (
    <>
      {data?.fetchProducts.map((el) => {
        return (
          <Row key={el._id}>
            <Column>{el.seller}</Column>
            <Column>{el.name}</Column>
            <Column>{el.detail}</Column>
            <Column>
              <button id={el._id} onClick={onClickDelete}>
                삭제
              </button>
            </Column>
          </Row>
        );
      })}
    </>
  );
}
