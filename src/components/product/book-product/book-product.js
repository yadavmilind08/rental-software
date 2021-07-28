import { Modal, Button, Select, DatePicker, Space } from "antd";
import { useState } from "react";
import { ConfirmModal } from "../../../shared/confirm-modal";

const { Option } = Select;

export const BookProduct = ({
  visible,
  handleOk,
  handleCancel,
  confirmedBooking,
  data,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [price, setPrice] = useState(0);

  const handleBook = () => {
    setShowConfirmModal(true);
    setPrice(data?.minimum_rent_period * data?.price);
    if (startDate && endDate && endDate >= startDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setPrice(diffDays * data?.price);
    }
    handleOk();
  };

  const handleConfirmOk = () => {
    confirmedBooking();
    setShowConfirmModal(false);
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
  };

  const handleStartDate = (date, dateString) => {
    setStartDate(date);
  };

  const handleEndDate = (date, dateString) => {
    setEndDate(date);
  };

  return (
    <>
      <Modal
        visible={visible}
        title="Book a Product"
        onOk={handleBook}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            No
          </Button>,
          <Button key="submit" type="primary" onClick={handleBook}>
            Yes
          </Button>,
        ]}
      >
        <Space direction="vertical">
          <Select defaultValue={data?.name} style={{ width: 280 }}>
            <Option value={data?.name}>{data?.name}</Option>
          </Select>
          <>
            <Space>
              <DatePicker
                placeholder="From"
                name="fromDate"
                onChange={handleStartDate}
              />
              <DatePicker
                placeholder="To"
                name="toDate"
                onChange={handleEndDate}
              />
            </Space>
          </>
        </Space>
      </Modal>
      <ConfirmModal
        title="Book a product"
        visible={showConfirmModal}
        handleOk={handleConfirmOk}
        handleCancel={handleConfirmCancel}
      >
        <>
          <p>
            Your estimated price is <strong>$&nbsp;{price}</strong>
          </p>
          <p>Do you want to proceed?</p>
        </>
      </ConfirmModal>
    </>
  );
};
