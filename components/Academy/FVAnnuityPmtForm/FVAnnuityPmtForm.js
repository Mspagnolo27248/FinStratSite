
import { useState } from "react";
import Field from "../Field/Field";

function FvAnnuityPmtForm(){

  const [calcSolution,setCalcSolution] =useState("")
  const [params ,setParams] = useState({
    nper:"",
    rate:"",
    pmt:""
  })


 function handleChange(event){
   const {name,value} = event.target
   setParams(prevState => ({
    ...prevState,
    [name]: value
    }));
  } 

 function handleClick(e){     
     const result = pmt(params.rate,params.pmt,params.nper)
     setCalcSolution(result)     
  }

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', 
  });

  function pmt(rate,pmt,nper){
    debugger
     const _pmt = parseFloat(pmt.replace(/\$|,/g, ''))
     const _rate = parseFloat(rate)
     const _nper = parseFloat(nper)
     var _fv = _pmt*((((1+_rate)**_nper)-1)/_rate)
     return _fv
    }

    return(
        <div class="fin-div">
        <div class="title">Future Value of Annuity</div>
        <form  >          

        <Field name ="pmt" desc="Payment Amount" handleChange = {handleChange}/>
        <Field name="rate" desc="Rate" handleChange = {handleChange}/>          
        <Field name ="nper" desc="Periods" handleChange = {handleChange} />
        <Field name ="fv" desc="Future Annuity Value" value = {formatter.format(calcSolution)} readonly/>
      
        <div >
          <h3 class="result">FV Annuity: = {formatter.format(calcSolution)}</h3>
        </div>
     
        <button type="button" class="submit" onClick={handleClick}>Calculate</button>
      
        </form>

    </div>
    )

}

export default FvAnnuityPmtForm;