$(document).ready(function () {
  const APIKey = "f8477fddee9461f418456f94354b3ec8";

   let bandName = $('#bandTestBox').val();
  const queryGetBandInfo = `https://rest.bandsintown.com/artists/${artistname}?app_id=f8477fddee9461f418456f94354b3ec8`;
  alert(bandName);

  $('#btn1').on('click', function () {
    event.preventDefault();
    

    $.ajax({
      url: queryGetBandInfo,
      method: 'GET'
    }).then(function(response) {
       console.log(response);
});
  

ajaxGetBandInfo();
  })

  function ajaxGetBandInfo() {
    return $.ajax({
      type: "GET",
      url: queryGetBandInfo,
      datatype: "json",
      success: getBandInfo()
    })
  }

  function getBandInfo() {
  
  }

})
