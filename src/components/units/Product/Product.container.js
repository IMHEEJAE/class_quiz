import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { CREATE_PRODUCT } from "./Product.queries";
import ProductPresenter from "./Product.presenter";

export default function ProductConteainer() {
  const [graphqlAPI] = useMutation(CREATE_PRODUCT);
  const [seller, setSeller] = useState();
  const [name, setName] = useState();
  const [detail, setDetail] = useState();
  const [price, setPrice] = useState();
  const router = useRouter();
  const onClickSubmit = async () => {
    try {
      const result = await graphqlAPI({
        variables: {
          seller: seller,
          createProductInput: {
            name: name,
            detail: detail,
            price: Number(price),
          },
        },
      });
      console.log(result);
      console.log(result.data.createProduct._id);
      router.push(`06/${result.data.createProduct._id}`);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  const onChangeSeller = (event) => {
    setSeller(event.target.value);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeDetail = (event) => {
    setDetail(event.target.value);
  };
  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };
  return (
    <>
      <ProductPresenter
        onChangeSeller={onChangeSeller}
        onChangeName={onChangeName}
        onChangeDetail={onChangeDetail}
        onChangePrice={onChangePrice}
        onClickSubmit={onClickSubmit}
      />
    </>
  );
}
