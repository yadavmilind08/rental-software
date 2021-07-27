import { Table } from "antd";

const columns = [
  {
    title: "Index",
    dataIndex: "index",
    render: (value, data, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Code",
    dataIndex: "code",
  },
  {
    title: "Availability",
    dataIndex: "availability",
    render: (availability) => (availability ? "True" : "False"),
  },
  {
    title: "Need to Repair",
    dataIndex: "needing_repair",
    render: (repair) => (repair ? "True" : "False"),
  },
  {
    title: "Durability",
    dataIndex: "max_durability",
  },
  {
    title: "Mileage",
    dataIndex: "mileage",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

export const ProductList = ({ data }) => {
  return (
    <Table
      rowSelection={{
        type: "radio",
        ...rowSelection,
      }}
      bordered
      columns={columns}
      dataSource={data}
      pagination={{ position: ["bottom", "left"], pageSize: "10" }}
    />
  );
};
