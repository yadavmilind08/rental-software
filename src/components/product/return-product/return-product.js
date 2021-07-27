import { Modal, Button, Select, Space, Input } from "antd";
import { useState } from "react";
import { ConfirmModal } from "../../../shared/confirm-modal";

import "./return-product.css";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export const ReturnProduct = ({ visible, handleOk, handleCancel }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleReturn = () => {
    setShowConfirmModal(true);
    handleOk();
  };

  const handleConfirmOk = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
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
          <Select
            defaultValue="Air Compressor 12 GAS"
            onChange={handleChange}
            className="select-input"
          >
            <Option value="Air Compressor 12 GAS">Air Compressor 12 GAS</Option>
            <Option value="Air Compressor 5 Electric">
              Air Compressor 5 Electric
            </Option>
            <Option value="Dia Blade 14 inch">Dia Blade 14 inch</Option>
            <Option value="Copper Blade 5 inch">Copper Blade 5 inch</Option>
          </Select>
          <Input value="3000" />
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
            Your total price is <strong>$###</strong>
          </p>
          <p>Do you want to proceed?</p>
        </>
      </ConfirmModal>
    </>
  );
};
