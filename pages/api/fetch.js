import { ConvertToAnnualizedPeriodOverPeriodPercent, ConvertToMonthOverMonthPercentMonthly, ConvertToYearOverYearPercentMonthly } from "../../Utilities/tends-js";




export default function handler(req, res) {
    const bodyObject = JSON.parse(req.body);
    const series = bodyObject.series;
    const observation_start = bodyObject.observation_start;
    const observation_end = bodyObject.observation_end;
    const valueType = bodyObject.valueType;

    
  // Only works with POST
   fetch('https://api.stlouisfed.org/fred/series/observations?series_id='+
          `${series}&observation_start=${observation_start}&observation_end=${observation_end}`+
          '&api_key=3930e57c78d990d30f7d376f5c406e2e&file_type=json')
    .then((response) => response.json())
    .then(data=>{ 
        if(valueType==="m-pct"){
         return ConvertToMonthOverMonthPercentMonthly(data);
        }
        else if(valueType==="y-pct"){
         return  ConvertToYearOverYearPercentMonthly(data);
        }
        else if(valueType==="a-pct"){
         return ConvertToAnnualizedPeriodOverPeriodPercent(data);
        }
    else{return data}
    })
    .then((data) =>  {
     
      res.send(data)
    } 
    );
     
    }
  