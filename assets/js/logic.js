//$(document).ready(function () {
 

const displayInfo = function() {

 // const APIKey = 'f8477fddee9461f418456f94354b3ec8';
  
 const name = $(this).attr('data-name');
  const queryURL = `https://rest.bandsintown.com/artists/${name}?app_id=f8477fddee9461f418456f94354b3ec8`;
  // alert(bandName);
 
   
    // event.preventDefault();
  
     $.ajax({
       url: queryURL,
       method: 'GET'
     }).then(function(response) {

      console.log(queryURL);

        console.log(response);
 });

}
  
$('#btn1').on('click', displayInfo);
  
 
  

// ajaxGetBandInfo();
//   })

//   function ajaxGetBandInfo() {
//     return $.ajax({
//       type: "GET",
//       url: queryGetBandInfo,
//       datatype: "json",
//       success: getBandInfo()
//     })
//   }

//   function getBandInfo() {
  
//   }

// })
