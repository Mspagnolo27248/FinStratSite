


export  function convertFullStringDateToShortDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  export function getTodaysDate(){
    // Get today's date
      let today = new Date();

      // Format the date as yyyy-mm-dd
      let year = today.getFullYear();
      let month = String(today.getMonth() + 1).padStart(2, '0');
      let day = String(today.getDate()).padStart(2, '0');
      let formattedDate = `${year}-${month}-${day}`;
      return formattedDate
  };

  export function getPastDate(yearOffest){
  // Get today's date
  let today = new Date();
  
  // Subtract X  years from the date
  let prevDate = new Date(today.getFullYear()  +yearOffest, today.getMonth(), today.getDate());
  
  // Format the date as yyyy-mm-dd
  let year = prevDate.getFullYear();
  let month = String(prevDate.getMonth() + 1).padStart(2, '0');
  let day = String(prevDate.getDate()).padStart(2, '0');
  let formattedDate = `${year}-${month}-${day}`;
  
 return formattedDate; // Example output: "2018-03-24"
};
  