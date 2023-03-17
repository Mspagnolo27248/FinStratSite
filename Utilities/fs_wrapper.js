import fs from 'fs'
import path from 'path'



export const GetTestData=  (file) =>{
    const testDataPath = path.join(process.cwd(),'Test',file)
    const  jsonData =  fs.readFileSync(testDataPath)
    const data = JSON.parse(jsonData)
    console.log(testDataPath)
    return data
}

export const GetJsonFromFile = (folder,file) =>{
  const testDataPath = path.join(process.cwd(),folder,file)
  const  jsonData =  fs.readFileSync(testDataPath)
  const data = JSON.parse(jsonData)
  console.log(testDataPath)
  return data
}
export const WriteToFile = (path,fileName,jsonData)=>{
    let testDataPath = path.join(process.cwd(),path)
    fs.writeFile(testDataPath+fileName, jsonData
    ,(err)=>{if(err){
      console.log(err)
      return 
    }
      else{
        console.log('Success')
      return  
      }
    
    }
    )
}