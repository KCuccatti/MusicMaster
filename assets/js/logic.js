const APIKey = 'f8477fddee9461f418456f94354b3ec8';
const APIKey2 = `e4d5624dac1c385cf0ee73ab867db27a`;

var bandImage = "";
var bandSchedule = [];
var bio = "";

$('#bandTextBox').focus();
$('#buttons').hide();

$('#btnBio').on('click', function () {
  $('#bandSchedule').hide();
  $('#bandContent').show();
})

$('#btnSchedule').on('click', function () {
  if (!Array.isArray(bandSchedule) || !bandSchedule.length) {
    // array does not exist, is not an array, or is empty
      $('#bandSchedule').html("There are no upcoming events for this artist/band");
      $('.bg-red').css({"color":"red"});
  }
  else {
    $('#bandSchedule').css('color', 'white');

  }

  $('#bandContent').hide();
  $('#bandSchedule').show();
})

$("#bandTextBox").on('keyup', function (e) {
  if (e.keyCode == 13) {
      $('#btn1').click();
  }
});

$('#btn1').on('click', function (event) {
  $('#buttons').show();
  $('#bandContent').show();
  toggleBackground(true);
  //  const queryGetBandContent = `https://rest.bandsintown.com/artists/ArtistData/${artistname}?app_id=f8477fddee9461f418456f94354b3ec8`;

  $.when(ajaxGetBandInfo($('#bandTextBox').val()), ajaxGetBandSchedule($('#bandTextBox').val())).done(function (a1, a2) {
    $('#bandImgLeft').html(`<img src="${bandImage}"/>`);
    $('#bandImgRight').html(`<img src="${bandImage}"/>`);
   
    $('#bandContent').html(bio);
  

    let schedule = "";
    for (let i = 0; i < bandSchedule.length; i++) {
      schedule = schedule +
        bandSchedule[i].datetime + " - " +
        bandSchedule[i].country + " - " +
        bandSchedule[i].region + " - " +
        bandSchedule[i].city + " - " +
        bandSchedule[i].name + "<br>";

    }
    schedule = schedule + "</ul>";
    $('#bandSchedule').html(schedule).hide();

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
  bandImage = response.artist.image[2]["#text"];
  bio = "<h1 class= mb-4 style='font-size: 1.8em; text-align: center;'>Bio:</h1>" + response.artist.bio.summary;
 
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
  bandSchedule = [];
  for (let i = 0; i < response.length; i++) {
    bandSchedule.push({ datetime: response[i].datetime.substring(0, 10), country: response[i].venue.country, 
                        city: response[i].venue.city, name: response[i].venue.name, region: response[i].venue.region });
     
  }
 // console.log(response);
}


function toggleBackground(display) {
  if (!display) {
    $('html').css('background', '');
  } else {
    $('html').css('background-image', "url(../images/Background.jpg)");
  }
}




function ajaxGetEvents() {

 // const cityName =  $(this).attr('.data-name');

  return $.ajax({
    type: "GET",
    url: `https://rest.bandsintown.com/events?app_id=f8477fddee9461f418456f94354b3ec8&date=upcoming`,
    datatype: "json",
    success: getCityEvents,
  });
}

function getCityEvents(response){

  console.log(response);
}


$('#btn3').on('click', function (event) {

  $.when(ajaxGetEvents($('#cityName').val()).done(function (a1, a2) {

 
  }))

})