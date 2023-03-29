import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Form from "../../components/FormElements/Form/Form";
import InputField from "../../components/FormElements/InputField/InputField";
import DateInput from "../../components/FormElements/DateInput/DateInput";
import SelectInput from "../../components/FormElements/SelectInput/SelectInput";

import { StockTrader } from "../../Utilities/stock-trader";

import styles from '../../styles/Markets/backtest.module.css';

export default function Backtest() {
  const [stockData, setStockData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [formData, setFormData] = useState({
    ticker:"",
    from:"",
    to:"",
    period:"d",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = await fetch("/api/YahooApi/StockHistory", {
      method: "POST",
      body: JSON.stringify({
        symbol: formData.ticker,
        from: formData.from,
        to: formData.to,
        period: formData.period,
      }),
    }).then((response) => response.json());

    const results = StockTrader.Trader(data, 3, 9, -0.02);
    const tbl = StockTrader.TraderResults(results);
    console.log(results);
    console.log(tbl);
    setStockData(results);
    setResultData(tbl);
  };

  const changeHandler = (event) => {
    if (!event.target) return; // add this line to check if target property exists
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formProps = {
    submitHandler: submitHandler,
    btnText: "Get Results",
  };
  const inputTickerProps = {
    labelValue: "Stock Ticker",
    placeholder: "Enter Stock Ticker",
    inputName: "ticker",
    changeHandler: changeHandler,
  };

  const inputFromDateProps = {
    label: "From",
    name: "from",
    value: formData.from,
    onChange: changeHandler,
  };

  const inputToDateProps = {
    label: "To",
    name: "to",
    value: formData.to,
    onChange: changeHandler,
  };

  const selectInputProps = {
    label: "Period",
    name: "period",
    value: formData.period,
    options: [
      { label: "Daily", value: "d" },
      { label: "Monthly", value: "m" },
    ],
    onChange: changeHandler,
  };

  return (
    <>
      <div className={styles["page"]}>
        <h1>Back Test Momentum Strategy</h1>
  

        <Form {...formProps}>
          <InputField {...inputTickerProps} />
          <DateInput {...inputFromDateProps} />
          <DateInput {...inputToDateProps} />
          <SelectInput {...selectInputProps} />
        </Form>

        {stockData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Dip</th>
              <th>Max</th>
              <th>Days to Max</th>
             
              
            </tr>
          </thead>
          <tbody>
            {stockData.map((data, index) => (
              <tr key={index}>
                <td>{data.date.slice(0,10)}</td>
                <td>{(data.value*100).toFixed(2)}%</td>
                <td>{(data.max*100).toFixed(2)}%</td>
                <td>{data.days_to_max}</td>
    
               
              </tr>
            ))}
          </tbody>
        </table>
      )}

      </div>
    </>
  );
}
