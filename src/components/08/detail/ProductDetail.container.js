import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ProductDetailPresenter from "./ProductDetail.presenter";
import { FETCH_PRODUCT } from "./ProductDetail.queries";

export default function ProductDetailContainer() {
  const router = useRouter();
  const { data } = useQuery(FETCH_PRODUCT, {
    variables: { productId: router.query.detail },
  });
  const onClickEdit = () => {
    router.push(`${router.query.detail}/edit`);
  };
  return (
    <>
      <ProductDetailPresenter data={data} onClickEdit={onClickEdit} />
    </>
  );
}
