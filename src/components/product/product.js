import { useState, useEffect } from "react";
import { Button, Input, Space } from "antd";
import { ProductList } from "./product-list";
import { BookProduct } from "./book-product";
import { ReturnProduct } from "./return-product";

import "./product.css";

export const Product = () => {
  const [visible, setVisible] = useState(false);
  const [visibleReturn, setVisibleReturn] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);

  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
        const mappedData = res.map((x, index) => {
          return { ...x, key: x.code, index };
        });
        setData(mappedData);
        setFilteredData(mappedData);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showReturnModal = () => {
    setVisibleReturn(true);
  };

  const handleReturnOk = () => {
    setVisibleReturn(false);
  };

  const handleReturnCancel = () => {
    setVisibleReturn(false);
  };

  const handleSearch = (event) => {
    const { target } = event;
    const value = target.value;
    if (value) {
      const filtered = data.filter((o) =>
        o.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setDisabled(selectedRows.length <= 0);
    setSelectedRow(selectedRows[0]);
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  };

  return (
    <>
      <Input
        className="input-search"
        placeholder="Search"
        onChange={handleSearch}
      />
      <ProductList
        data={filteredData}
        handleRowSelection={handleRowSelection}
      />
      <Space className="action-buttons">
        <Button type="primary" onClick={showModal} disabled={disabled}>
          Book
        </Button>
        <Button onClick={showReturnModal} disabled={disabled}>
          Return
        </Button>
      </Space>
      <BookProduct
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        data={selectedRow}
      />
      <ReturnProduct
        visible={visibleReturn}
        handleOk={handleReturnOk}
        handleCancel={handleReturnCancel}
        data={selectedRow}
      />
    </>
  );
};
