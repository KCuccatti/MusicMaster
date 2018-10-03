$(document).ready(function () {
  const APIKey = "f8477fddee9461f418456f94354b3ec8";

   let bandName = $('#bandTestBox').val();
  const queryGetBandInfo = `https://rest.bandsintown.com/artists/${artistname}?app_id=f8477fddee9461f418456f94354b3ec8`;
  alert(bandName);

  $('#btn1').on('click', function () {
    event.preventDefault();
<<<<<<< HEAD
    
=======
    var artistname = $('#bandTextBox').val();
    const queryGetBandInfo = `https://rest.bandsintown.com/artists/${artistname}?app_id=f8477fddee9461f418456f94354b3ec8`;

>>>>>>> 7a6690aa7876f47e61442a7f88536efeb319fc61

    $.ajax({
      url: queryGetBandInfo,
      method: 'GET'
<<<<<<< HEAD
    }).then(function(response) {
       console.log(response);
});
  

ajaxGetBandInfo();
=======
    }).then(function (response) {
      console.log(response);

      var bandImage = response.image_url
      $('#bandImg').append(`<img src="${bandImage}" height=60%"/>`)
      $('#clear').empty();



    });
>>>>>>> 7a6690aa7876f47e61442a7f88536efeb319fc61
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
