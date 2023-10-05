import React, { useState } from 'react'
import DateInput from '../../components/FormElements/DateInput/DateInput';
import Form from '../../components/FormElements/Form/Form';
import InputField from '../../components/FormElements/InputField/InputField';
import BlackScholes from '../../Utilities/options-price-model';
import styles from '../../styles/Markets/options.module.css'
import OutputField from '../../components/FormElements/OutputField/OutputField';

export default function OptionsPrice() {

    // const [stockPrice,setStockPrice] = useState();
    // const [exercisePrice,setExercisePrice] = useState();
    // const [impliedVolatiliy,setImpliedVolatility]  = useState();
    // const [exerciseDate,setExerciseDate] = useState();
    const [callPrice,setCallPrice] = useState(0.99);
    const [formData, setFormData] = useState({
        price:0,
        exPrice:0,
        vol:.15,
        exDate:new Date().toISOString().slice(0, 10),
        rf:.048
    
      });
  
    const submitHandler = (e)=>{
        e.preventDefault();
       const callPrice =  
       BlackScholes.callPrice(
            parseFloat(formData.price), 
            parseFloat(formData.vol),
            parseFloat(formData.exPrice),
            formData.exDate,
            formData.rf
            
           ) 
       setCallPrice(callPrice.toFixed(4));

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
        btnText: "Calculate Price",
      };
      const currentPriceProps = {
        labelValue: "Stock Price",
        placeholder: "Enter Stock Price..",
        inputName: "price",
        changeHandler: changeHandler,
      };

      const exercisePriceProps = {
        labelValue: "Exercise Price",
        placeholder: "Enter Exercise Price..",
        inputName: "exPrice",
        changeHandler: changeHandler,
      };
      const impliedVolProps = {
        labelValue: "Implied Volatility",
        placeholder: "Enter as .0000",
        inputName: "vol",
        changeHandler: changeHandler,
      };

      const inputToDateProps = {
        label: "Exercise Date",
        name: "exDate",
        value: formData.exDate,
        onChange: changeHandler,
      };

      const outputCallProps = {
        labelValue: "Call Price",
        placeholder: "$0.00",
        inputName: "callPrice",
        value:callPrice
      };

  return (
    <div className={styles['page']}>
  <h1 >Calculate Options Price</h1>


  <Form {...formProps}>
          <InputField {...currentPriceProps} />  {/*Stock Price*/ }
          <InputField {...exercisePriceProps} />  {/*Exercie Price*/ }
          <DateInput {...inputToDateProps} />     {/*Exercie Date*/ }
          <InputField {...impliedVolProps} />  {/*Implied VOl Price*/ }
          <OutputField {...outputCallProps} />
        
        </Form>

    </div>
  
  )
}
