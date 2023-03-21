import { Rate, DatePicker, Button, Modal } from "antd";
import type { DatePickerProps } from "antd";
import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function Page09() {
  const [value, setValue] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const star = (value: any) => {
    setValue(value);
    // alert(value + "점입니다");
  };
  const [datePickerValuez, setDatePickerValuez] = useState("");
  const DatePickerValue: DatePickerProps["onChange"] = (
    date: string,
    dateString: string
  ) => {
    setDatePickerValuez(Number(date.$M) + 1);
  };
  // 모달
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onCompleteAddressSearch = (data: any) => {
    setAddress(data.address);
    console.log(data.address);
    setIsModalOpen(false);
  };
  return (
    <>
      <Rate onChange={star} />
      <DatePicker onChange={DatePickerValue} />
      {datePickerValuez}월 입니다.
      <br />
      <Button type="primary" onClick={showModal}>
        주소모달
      </Button>
      {address ?? ""}
      {isModalOpen && (
        <Modal
          title="주소검색"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} />
        </Modal>
      )}
    </>
  );
}
