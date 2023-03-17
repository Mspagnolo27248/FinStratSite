

export function YearOverYearPercentMonthly(FredObservations = {}){
            // Input:  <FredObservations>{FRED Observation Model} 
            //Params:  <DataValues> = [] Data Array of Decimals > Len 24
            //          <DataPercents> = [] Array of DEcimals Data.Length - 12
            //Output: <FredOutput
    const DataValues = FredObservations.observations.map((obj)=> obj.value)
    const DateValues = FredObservations.observations.map((obj)=> obj.date)

    if(DataValues.length<24){
        console.log("Input Data Array is too small")
        return [];
    }

    const percentageChangeArray = []
    for(const indx in DataValues){
        if(+indx>11){    
        const change  =  (((DataValues[indx]/DataValues[indx-12])-1)*100).toFixed(2)
        percentageChangeArray.push({value:change,date:DateValues[indx]})
        }
    }

    return {observations:percentageChangeArray}
}




export function MonthOverMonthPercentMonthly(FredObservations = {}){
    // Input:  <FredObservations>{FRED Observation Model} 
    //Params:  <DataValues> = [] Data Array of Decimals > Len 24
    //          <DataPercents> = [] Array of DEcimals Data.Length - 12
    //Output: <FredOutput
const DataValues = FredObservations.observations.map((obj)=> obj.value)
const DateValues = FredObservations.observations.map((obj)=> obj.date)

if(DataValues.length<2){
console.log("Input Data Array is too small")
return [];
}

const percentageChangeArray = []
for(const indx in DataValues){
if(+indx>1){    
const change  =  (((DataValues[indx]/DataValues[indx-1])-1)*100).toFixed(2)
percentageChangeArray.push({value:change,date:DateValues[indx]})
}
}

return {observations:percentageChangeArray}
}

export function ConvertToYearOverYearPercentMonthly(FredObservations = {}){
    // Input:  <FredObservations>{FRED Observation Model} 
    //Params:  <DataValues> = [] Data Array of Decimals > Len 24
    //          <DataPercents> = [] Array of DEcimals Data.Length - 12
    //Output: <FredOutput
const DataValues = FredObservations.observations.map((obj)=> obj.value)
const DateValues = FredObservations.observations.map((obj)=> obj.date)

if(DataValues.length<13){
console.log("Input Data Array is too small")
return [];
}

const percentageChangeArray = []
for(const indx in DataValues){
if(+indx>11){    
const change  =  (((DataValues[indx]/DataValues[indx-12])-1)*100).toFixed(2)
percentageChangeArray.push({value:change,date:DateValues[indx]})
}
}
FredObservations.observations = percentageChangeArray
return FredObservations
}




export function ConvertToMonthOverMonthPercentMonthly(FredObservations = {}){
// Input:  <FredObservations>{FRED Observation Model} 
//Params:  <DataValues> = [] Data Array of Decimals > Len 24
//          <DataPercents> = [] Array of DEcimals Data.Length - 12
//Output: <FredOutput
const DataValues = FredObservations.observations.map((obj)=> obj.value)
const DateValues = FredObservations.observations.map((obj)=> obj.date)

if(DataValues.length<2){
console.log("Input Data Array is too small")
return [];
}

const percentageChangeArray = []
for(const indx in DataValues){
if(+indx>1){    
const change  =  (((DataValues[indx]/DataValues[indx-1])-1)*100).toFixed(2)
percentageChangeArray.push({value:change,date:DateValues[indx]})
}
}
FredObservations.observations = percentageChangeArray;
return FredObservations
}

export function ConvertToAnnualizedPeriodOverPeriodPercent(FredObservations = {}){
    // Input:  <FredObservations>{FRED Observation Model} 
    //Params:  <DataValues> = [] Data Array of Decimals > Len 24
    //          <DataPercents> = [] Array of DEcimals Data.Length - 12
    //Output: <FredOutput
    const DataValues = FredObservations.observations.map((obj)=> obj.value)
    const DateValues = FredObservations.observations.map((obj)=> obj.date)
    
    if(DataValues.length<2){
    console.log("Input Data Array is too small")
    return [];
    }
    
    const percentageChangeArray = []
    for(const indx in DataValues){
    if(+indx>1){    
    const change  =  (((DataValues[indx]/DataValues[indx-1])-1)*100).toFixed(2)
    percentageChangeArray.push({value:change*4,date:DateValues[indx]})
    }
    }
    FredObservations.observations = percentageChangeArray;
    return FredObservations
    }