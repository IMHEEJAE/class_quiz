import styled from "@emotion/styled";
import Slider from "react-slick";
const Wrapper = styled.div`
  height: 100px;
  background: pink;
`;

export default function LayoutBanner(props: any) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Wrapper>
        <Slider {...settings}>
          <div>zz</div>
          <div>zz</div>
        </Slider>
      </Wrapper>
    </>
  );
}
