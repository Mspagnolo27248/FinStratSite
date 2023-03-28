import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import  styles from "./InputGroup.module.css";

export default function InputGroup(props) {
  ///Class Input = {labelValue,placeholder,inputName}

  const [inputValues, setInputValues] = useState({});

  const updadeInputHanlder = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setInputValues((prevState) => ({
      ...prevState,
      [inputName]: inputValue,
    }));
  };

  useEffect(() => {
    console.log(inputValues);
  }, [inputValues]);

  const ageInputProps = {
    placeholder: "Enter Your Age",
    labelValue: "Age",
    inputName: "age",
    changeHandler: updadeInputHanlder,
  };

  const nameInputProps = {
    placeholder: "Enter Your Name",
    labelValue: "Name",
    inputName: "name",
    changeHandler: updadeInputHanlder,
  };

  return (
    <div className={styles["input-group"]}>
      <InputField {...nameInputProps} />
      <InputField {...ageInputProps} />
    </div>
  );
}
