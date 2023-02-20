import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $seller: String
    $createProductInput: CreateProductInput!
  ) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }
`;
export default function Page05() {
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
      router.push(`05/${result.data.createProduct._id}`);
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
      판매자 : <input type="text" onChange={onChangeSeller} />
      <br />
      상품명 : <input type="text" onChange={onChangeName} />
      <br />
      상품내용 : <input type="text" onChange={onChangeDetail} />
      <br />
      상품가격 : <input type="text" onChange={onChangePrice} />
      <br />
      <button onClick={onClickSubmit}>상품등록</button>
    </>
  );
}
