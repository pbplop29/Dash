import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { PieChart, Pie } from "recharts";

function App() {
  const [productName, setProductName] = useState();
  const [star, setStar] = useState(0);
  const [price, setPrice] = useState(0);
  const [productList, setProductList] = useState([]);

  const renderCustomizedLabel = ({ x, y, name }) => {
    return (
      <text x={x - 1} y={y + 1} fill="white" textAnchor="middle" dominantBaseline="central">
        {name}
      </text>
    );
  };

  // const getPath = (x, y, width, height) =>
  //   `M${x},${y + height}
  //    C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
  //    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${
  //     y + height
  //   }
  //    Z`;

  // const TriangleBar = props => {
  //   const { fill, x, y, width, height } = props;

  //   return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  // };

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then(response => {
      setProductList(response.data);
    });
  }, []);

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      productName: productName,
      star: star,
      price: price,
    }).then(response => {
      setProductList([
        ...productList,
        {
          productName: productName,
          star: star,
          price: price,
        },
      ]);
    });
  };

  return (
    <div id="capture">
      <div className="category">
        <div className="heading">Products Price</div>
        <div className="bar-pie-dad">
          <div className="bar-pie">
            <BarChart width={800} height={500} data={productList}>
              <XAxis dataKey="productName" stroke="white" fontSize="12px" />
              <YAxis dataKey="price" stroke="white" fontSize="12px" />
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#FD8755" }} />
              <Legend
                width={100}
                wrapperStyle={{
                  top: 40,
                  right: 20,
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #d5d5d5",
                  borderRadius: 50,
                  lineHeight: "40px",
                }}
              />
              <CartesianGrid stroke="white" strokeDasharray="2 2" />
              <Bar dataKey="price" fill="#FD8755" barSize={30} /*shape={<TriangleBar />}*/ />
            </BarChart>
          </div>
          <div className="bar-pie">
            <PieChart width={500} height={500}>
              <Pie
                dataKey="price"
                isAnimationActive={false}
                data={productList}
                cx="50%"
                cy="50%"
                outerRadius={150}
                innerRadius={75}
                fill="#FD8755"
                label={renderCustomizedLabel}
                nameKey="productName"
              />
              <Tooltip />;
            </PieChart>
          </div>
        </div>
      </div>
      <div className="category">
        <div className="heading">Products Star</div>
        <div className="bar-pie-dad">
          <div className="bar-pie">
            <BarChart width={800} height={500} data={productList}>
              <XAxis dataKey="productName" stroke="white" fontSize="12px" />
              <YAxis dataKey="star" stroke="white" fontSize="12px" />
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#FD8755" }} />
              <Legend
                width={100}
                wrapperStyle={{
                  top: 40,
                  right: 20,
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #d5d5d5",
                  borderRadius: 50,
                  lineHeight: "40px",
                }}
              />
              <CartesianGrid stroke="white" strokeDasharray="2 2" />
              <Bar dataKey="star" fill="#FD8755" barSize={30} /*shape={<TriangleBar />}*/ />
            </BarChart>
          </div>

          <div className="bar-pie">
            <PieChart width={500} height={500}>
              <Pie
                dataKey="star"
                isAnimationActive={false}
                data={productList}
                cx="50%"
                cy="50%"
                outerRadius={150}
                innerRadius={75}
                fill="#FD8755"
                label={renderCustomizedLabel}
                nameKey="productName"
              />
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
      <section>
        <div className="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>Product</th>
                <th>Star</th>
                <th>Price</th>
              </tr>
            </thead>
          </table>
        </div>
        {productList.map((val, key) => {
          return (
            <div className="tbl-content">
              <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
                  <tr>
                    <td>{val.productName}</td>
                    <td>{val.star} </td>
                    <td>{val.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </section>

      <div className="container">
        <div className="heading-2"> Upadte database</div>
        <div className="inputs">
          <label>Product</label>
          <input
            onChange={event => {
              setProductName(event.target.value);
            }}
          />
          <label>Star</label>
          <input
            onChange={event => {
              setStar(event.target.value);
            }}
          />
          <label>Price</label>
          <input
            onChange={event => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <button onClick={addToList}>Submit</button>
      </div>
    </div>
  );
}

export default App;
