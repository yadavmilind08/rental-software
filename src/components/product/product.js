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

  const confirmedBooking = () => {
    const booked = filteredData.find((x) => x.code === selectedRow.code);
    const index = filteredData.indexOf(selectedRow);
    const newData = [...filteredData];
    newData[index] = { ...booked, availability: false };
    setSelectedRow({ ...booked, availability: false });
    setFilteredData(newData);
  };

  const confirmedReturning = (usedMileage) => {
    console.log({ usedMileage });
    const booked = filteredData.find((x) => x.code === selectedRow.code);
    const index = filteredData.indexOf(selectedRow);
    const newData = [...filteredData];
    let mileage = +usedMileage;
    if (booked.mileage) {
      mileage = mileage + usedMileage;
    }
    const availability = mileage > 0;
    newData[index] = { ...booked, mileage, availability };
    setSelectedRow({ ...booked, mileage, availability });
    setFilteredData(newData);
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
        <Button
          type="primary"
          onClick={showModal}
          disabled={!selectedRow || !selectedRow?.availability}
        >
          Book
        </Button>
        <Button
          onClick={showReturnModal}
          disabled={!selectedRow || selectedRow?.availability}
        >
          Return
        </Button>
      </Space>
      <BookProduct
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        confirmedBooking={confirmedBooking}
        data={selectedRow}
      />
      <ReturnProduct
        visible={visibleReturn}
        handleOk={handleReturnOk}
        handleCancel={handleReturnCancel}
        confirmedReturning={confirmedReturning}
        data={selectedRow}
      />
    </>
  );
};
