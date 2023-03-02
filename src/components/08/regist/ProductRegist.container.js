import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import ProductRegistPresenter from "./ProductRegist.presenter";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "./ProductRegist.queries";

export default function ProductRegistContainer(props) {
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [seller, setSeller] = useState();
  const [name, setName] = useState();
  const [detail, setDetail] = useState();
  const [price, setPrice] = useState();
  const router = useRouter();
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
  const onClickSubmit = async () => {
    const result = await createProduct({
      variables: {
        seller: seller,
        createProductInput: {
          name,
          detail,
          price: Number(price),
        },
      },
    });
    console.log(result.data.createProduct._id);
    alert(result.data.createProduct.message);
    router.push(`./08/${result.data.createProduct._id}`);
  };

  const onClickEdit = async () => {
    console.log(router.query.detail);
    const result = await updateProduct({
      variables: {
        productId: router.query.productId,
        updateProductInput: {
          name,
          detail,
          price: Number(price),
        },
      },
    });
    alert(result.data.updateProduct.message);
    console.log(result.data.updateProduct);
  };
  return (
    <>
      <ProductRegistPresenter
        onChangeSeller={onChangeSeller}
        onChangeName={onChangeName}
        onChangeDetail={onChangeDetail}
        onChangePrice={onChangePrice}
        onClickSubmit={onClickSubmit}
        onClickEdit={onClickEdit}
        isEdit={props.isEdit}
      />
    </>
  );
}
