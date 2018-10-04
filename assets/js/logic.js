$(document).ready(function () {
  const APIKey = 'f8477fddee9461f418456f94354b3ec8';
  const APIKey2 = `e4d5624dac1c385cf0ee73ab867db27a`;

  var bandImage = "";
  var bandSchedule = [];
  var bio = "";

  $('#btn1').on('click', function (event) {
    toggleBackground(true);
    event.preventDefault();
    //  const queryGetBandContent = `https://rest.bandsintown.com/artists/ArtistData/${artistname}?app_id=f8477fddee9461f418456f94354b3ec8`;

    $.when(ajaxGetBandInfo($('#bandTextBox').val()), ajaxGetBandSchedule($('#bandTextBox').val())).done(function (a1, a2) {
      $('#bandImg').html(`<img src="${bandImage}"/>`);
      $('#bandContent').html(bio);
      console.log(bandSchedule);  
      let schedule = "<ul>";
      for (let i=0; i<bandSchedule.length; i++) {
        schedule = schedule + "<li>" + 
                            bandSchedule[i].datetime + " - " +
                            bandSchedule[i].country + " - " + 
                            bandSchedule[i].region + " - " + 
                            bandSchedule[i].city + " - " + 
                            bandSchedule[i].name 
                            + "</li>";
      }
      schedule = schedule + "</ul>";
      $('#bandSchedule').html(schedule);
    });


  })

  function ajaxGetBandInfo(artistname) {
    return $.ajax({
      type: "GET",
      url: `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistname}&api_key=e4d5624dac1c385cf0ee73ab867db27a&format=json`,
      datatype: "json",
      success: getBandInfo,
    });
  }

  // Gets Band Image 
  function getBandInfo(response) {
   // console.log(response);
    bandImage = response.artist.image[3]["#text"];
    bio = response.artist.bio.content;
  }


  function ajaxGetBandSchedule(artistname) {
    return $.ajax({
      type: "GET",
      url: `https://rest.bandsintown.com/artists/${artistname}/events/?app_id=f8477fddee9461f418456f94354b3ec8&date=upcoming`,
      datatype: "json",
      success: getBandSchedule,
    });
  }

  // Gets Band Schedule
  function getBandSchedule(response) {
    for (let i=0; i<response.length; i++) {
      bandSchedule.push({ datetime: response[i].datetime.substring(0,10), country: response[i].venue.country, city: response[i].venue.city, name: response[i].venue.name, region: response[i].venue.region });
    }
    //console.log(response);
  }



  function toggleBackground(display) {
    if (!display) {
      $('html').css('background', "");
    } else {
      $('html').css('background-image', "url(../images/Background.jpg)");
    }
  }

})

