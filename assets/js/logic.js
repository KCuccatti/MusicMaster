$(document).ready(function () {
  const APIKey = 'f8477fddee9461f418456f94354b3ec8';





  $('#btn1').on('click', function (event) {
    event.preventDefault();
    var artistname = $('#bandTextBox').val();
    const queryGetBandInfo = `https://rest.bandsintown.com/artists/${artistname}?app_id=f8477fddee9461f418456f94354b3ec8`;

    $.ajax({
      url: queryGetBandInfo,
      method: 'GET'
    }).then(function (response) {
      console.log(response);
    });
  })
})
