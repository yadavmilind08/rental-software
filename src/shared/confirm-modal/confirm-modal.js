import { Modal, Button } from "antd";

export const ConfirmModal = ({
  visible,
  title,
  handleOk,
  handleCancel,
  children,
}) => {
  return (
    <Modal
      visible={visible}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          No
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Yes
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};
