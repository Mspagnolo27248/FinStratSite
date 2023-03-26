
import { useState } from "react";
import Field from "../../Academy/Field/Field"

function FutureValueForm(){

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
     const result = fv(params.rate,params.pv,params.nper)
     setCalcSolution(result)     
  }

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', 
  });

  function fv(rate,pv,nper){
     const _pv = parseFloat(pv.replace(/\$|,/g, ''))
     const _rate = parseFloat(rate)
     const _nper = parseFloat(nper)
     var _fv = _pv*((1+_rate)**_nper)
     return _fv
    }


    return(
        <div className="fin-div">
        <div className="title">Future Value Calculator</div>
        <form  >          

        <Field name ="pv" desc="Present Value" handleChange = {handleChange}/>
        <Field name="rate" desc="Rate" handleChange = {handleChange}/>          
        <Field name ="nper" desc="Periods" handleChange = {handleChange} />
        <Field name ="fv" desc="Future Value" value = {formatter.format(calcSolution)} readonly/>

        <div >
          <h3 className="result">FV: = {formatter.format(calcSolution)}</h3>
        </div>
     
        <button type="button" className="submit" onClick={handleClick}>Calculate</button>
      
        </form>

    </div>
    )

}

export default FutureValueForm;