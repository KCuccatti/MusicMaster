$(document).ready(function () {
 //  const APIKey = 'f8477fddee9461f418456f94354b3ec8';
  const APIKey2 = `e4d5624dac1c385cf0ee73ab867db27a`;

  $('#btn1').on('click', function (event) {
    event.preventDefault();
  //  var artistname = $('#bandTextBox').val();
    const queryGetBandInfo = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=e4d5624dac1c385cf0ee73ab867db27a&format=json`;
  //  const queryGetBandContent = `https://rest.bandsintown.com/artists/ArtistData/${artistname}?app_id=f8477fddee9461f418456f94354b3ec8`;

    $.ajax({
      url: queryGetBandInfo, 
      method: 'GET'
    }).then(function (response) {
      console.log(response);
  //    var bandImage = response;
   //   var bandInfo = response.name;
  //    $('#bandImg').html(`<img src="${bandImage}" height=400"/>`)
   //   $('#bandContent').html(bandInfo);
    //  $('#clear').empty();
    });
  })
})
