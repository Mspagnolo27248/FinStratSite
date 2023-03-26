

function Field(props){
  
  
    return(
        <div className="input-container ic2">
        <input id={props.name} name={props.name} className="input" type="text" value={props.value}
        placeholder=" " onChange={props.handleChange}/>
        <div className="cut"></div>
        <label htmlFor={props.name} className="placeholder">{props.desc}</label>
      </div>

    
    )
}
export default Field;


