import styled from "@emotion/styled";

const Wrapper = styled.div`
  height: 100px;
  background: red;
`;
export default function LayoutHeader(props: any) {
  return (
    <>
      <Wrapper>헤더영역</Wrapper>
    </>
  );
}
