import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Form from "../../components/FormElements/Form/Form";
import InputField from "../../components/FormElements/InputField/InputField";
import DateInput from "../../components/FormElements/DateInput/DateInput";
import SelectInput from "../../components/FormElements/SelectInput/SelectInput";

import styles from '../../styles/Markets/history.module.css';

export default function History() {
  const [stockData, setStockData] = useState([]);
  const [formData, setFormData] = useState({
    ticker:"",
    from:"",
    to:"",
    period:"1d",
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

 
    setStockData(data);
 
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
      { label: "Daily", value: "1d" },
      { label: "Monthly", value: "1mo" },
    ],
    onChange: changeHandler,
  };

  return (
    <>
      <div className={styles["page"]}>
        <h1>Search Stock History</h1>
  

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
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>adjclose</th>
              <th>Volume</th>


            
             
              
            </tr>
          </thead>
          <tbody>
            {stockData.map((data, index) => (
              <tr key={index}>
                <td>{data.date.slice(0,10)}</td>
                <td>{(data.open||0).toFixed(2)}</td>
                <td>{(data.high||0).toFixed(2)}</td>
                <td>{(data.low||0).toFixed(2)}</td>
                <td>{(data.close||0).toFixed(2)}</td>
                <td>{(data.adjclose||0).toFixed(2)}</td>
                <td>{(data.volume||0).toLocaleString("en-US")}</td>            
    </tr>
            ))}
          </tbody>
        </table>
      )}

      </div>
    </>
  );
}
