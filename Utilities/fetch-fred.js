export async function  FetchReleaseData(
    series_id ='MORTGAGE30US',
    observation_start='2019-07-01',
    observation_end = '2022-07-01'
){

const data = await fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=${series_id}`+
                            `&${observation_start}=2019-07-01&${observation_end}=2022-07-22&`+
                            `api_key=3930e57c78d990d30f7d376f5c406e2e&file_type=json`)
const jsonObj = await data.json();
return jsonObj
 

}


export async function  FetchSeriesObservationData(
    series_id ='MORTGAGE30US',
    observation_start='2019-07-01',
    observation_end = '2022-07-01'
){
const data = await fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=${series_id}`+
                            `&observation_start=${observation_start}&observation_end=${observation_end}&`+
                            `api_key=3930e57c78d990d30f7d376f5c406e2e&file_type=json`)
const jsonObj = await data.json();
return jsonObj

}


export async function FetchReleaseCodes(series_id= ['GDP']){
const releases = {}
for(const series of series_id){
    const data = await fetch(`https://api.stlouisfed.org/fred/series/release?series_id=`+
                                `${series}&api_key=3930e57c78d990d30f7d376f5c406e2e&file_type=json`)
    const json = await data.json();
    releases[series]=json
}
return releases
}

