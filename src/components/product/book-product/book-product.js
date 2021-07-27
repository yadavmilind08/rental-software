import { Modal, Button, Select, DatePicker, Space } from "antd";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function onChange(date, dateString) {
  console.log(date, dateString);
}

export const BookProduct = ({ visible, handleOk, handleCancel }) => {
  return (
    <Modal
      visible={visible}
      title="Book a Product"
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
      <Space direction="vertical">
        <Select
          defaultValue="Air Compressor 12 GAS"
          onChange={handleChange}
          style={{ width: 280 }}
        >
          <Option value="Air Compressor 12 GAS">Air Compressor 12 GAS</Option>
          <Option value="Air Compressor 5 Electric">
            Air Compressor 5 Electric
          </Option>
          <Option value="Dia Blade 14 inch">Dia Blade 14 inch</Option>
          <Option value="Copper Blade 5 inch">Copper Blade 5 inch</Option>
        </Select>
        <>
          <Space>
            <DatePicker placeholder="From" onChange={onChange} />
            <DatePicker placeholder="To" onChange={onChange} />
          </Space>
        </>
      </Space>
    </Modal>
  );
};
