import { useState, useEffect } from "react";
import ProductList from "./components/product-list/product-list"
import { Button, Input } from 'antd';

import 'antd/dist/antd.css';
import "./index.css";
import BookProduct from "./components/book-product/book-product";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const getData = () => {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((response) => {
      return response.json();
    }).then((res) => {
      console.log(res);
      const mappedData = res.map((x, index) => {
        return { ...x, key: x.code, index }
      });
      setData(mappedData);
      setFilteredData(mappedData);
    });
  }

  useEffect(() => {
    getData()
  }, [])

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    if (value) {
      const filtered = data.filter(o => o.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData(data)
    }
  }

  return (
    <>
      <Input
        placeholder="Search"
        style={{ width: '150px', margin: '20px', float: 'right' }}
        onChange={handleChange}
      />
      <ProductList data={filteredData} />
      <div style={{ padding: '20px 0', float: 'right' }}>
        <Button type="primary" onClick={showModal}>Book</Button>
        <Button style={{ marginLeft: '5px' }}>Return</Button>
      </div>
      <BookProduct
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}

export default App;
