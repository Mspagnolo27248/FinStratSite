export const validateDecimal = (input) => {
    return /^\d*\.?\d*$/.test(input)
  };

 export  const validateInteger= (input) => {
    return /^\d*$/.test(input) 
  };

  export const validateStringIsDate = (input) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$|^\d{2}\/\d{2}\/\d{4}$/;
    return dateRegex.test(input)
  };