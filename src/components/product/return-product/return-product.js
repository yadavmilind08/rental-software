import { Modal, Button, Select, Space, Input } from "antd";
import { useState } from "react";
import { ConfirmModal } from "../../../shared/confirm-modal";

import "./return-product.css";

const { Option } = Select;

export const ReturnProduct = ({
  visible,
  handleOk,
  handleCancel,
  confirmedReturning,
  data,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [usedMileage, setUsedMileage] = useState(0);

  const handleReturn = () => {
    setShowConfirmModal(true);
    setPrice(data?.minimum_rent_period * data?.price);
    handleOk();
  };

  const handleConfirmOk = () => {
    confirmedReturning(usedMileage);
    setShowConfirmModal(false);
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setUsedMileage(value);
  };

  return (
    <>
      <Modal
        visible={visible}
        title="Book a Product"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            No
          </Button>,
          <Button key="submit" type="primary" onClick={handleReturn}>
            Yes
          </Button>,
        ]}
      >
        <Space direction="vertical">
          <Select defaultValue={data?.name} style={{ width: 280 }}>
            <Option value={data?.name}>{data?.name}</Option>
          </Select>
          <Input
            defaultValue={data?.mileage || 0}
            onChange={handleInputChange}
            placeholder="Used Mileage"
          />
        </Space>
      </Modal>
      <ConfirmModal
        title="Return a product"
        visible={showConfirmModal}
        handleOk={handleConfirmOk}
        handleCancel={handleConfirmCancel}
      >
        <>
          <p>
            Your total price is <strong>$&nbsp;{price}</strong>
          </p>
          <p>Do you want to proceed?</p>
        </>
      </ConfirmModal>
    </>
  );
};
