
import { useState } from "react";
import Field from "../Field/Field";

function LoanPaymentForm(){

  const [calcSolution,setCalcSolution] =useState("")
  const [params ,setParams] = useState({
    nper:"",
    rate:"",
    pv:""
  })


 function handleChange(event){
   const {name,value} = event.target
   setParams(prevState => ({
    ...prevState,
    [name]: value
    }));
  } 

 function handleClick(e){     
     const result = pmt(params.rate,params.pv,params.nper)
     setCalcSolution(result)     
  }

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', 
  });

  function pmt(rate,pv,nper){
     const _pv = parseFloat(pv.replace(/\$|,/g, ''))
     const _rate = parseFloat(rate)/12
     const _nper = parseFloat(nper)
     var _pmt = (_pv*(_rate))/(1-(1+_rate)**-_nper)
     return _pmt
    }

    return(
        <div class="fin-div">
        <div class="title">Loan Payment Calculator</div>
        <form  >          

        <Field name ="pv" desc="Present Value" handleChange = {handleChange}/>
        <Field name="rate" desc="Rate" handleChange = {handleChange}/>          
        <Field name ="nper" desc="Periods" handleChange = {handleChange} />
        <Field name ="pmt" desc="Loan Payment" value = {formatter.format(calcSolution)} readonly/>
      
        <div >
          <h3 class="result">PMT: = {formatter.format(calcSolution)}</h3>
        </div>
     
        <button type="button" class="submit" onClick={handleClick}>Calculate</button>
      
        </form>

    </div>
    )

}

export default LoanPaymentForm;