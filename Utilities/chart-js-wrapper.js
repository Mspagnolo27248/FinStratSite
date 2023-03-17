


export function SetChartOptions(titleText ='Title'){
     return {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: titleText,
          },
        },
      };

   
}

export function SetChartData(data =[1,2,3],label = [] ,labelText = 'labelText',){
    return  {
        labels: label,
        datasets: [{
          label: labelText,
          borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          data: data,
        }]
      }
}