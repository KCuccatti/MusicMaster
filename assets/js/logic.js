const APIKey = 'f8477fddee9461f418456f94354b3ec8';
const APIKey2 = `e4d5624dac1c385cf0ee73ab867db27a`;

var bandImage = "";
var bandSchedule = [];
var bio = "";

$('#buttons').hide();

$('#btnBio').on('click', function () {
  $('#bandSchedule').hide();
  $('#bandContent').show();
})

$('#btnSchedule').on('click', function () {
  $('#bandContent').hide();
  $('#bandSchedule').show();
  if(schedule = []) {
    $('#');
  }
})


$('#btn1').on('click', function (event) {
  $('#buttons').show();
  toggleBackground(true);
  event.preventDefault();
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
  bio = response.artist.bio.summary;

  genre = response.artist.getTopAlbums;
  console.log(genre);

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
    bandSchedule.push({ datetime: response[i].datetime.substring(0, 10), country: response[i].venue.country, city: response[i].venue.city, name: response[i].venue.name, region: response[i].venue.region });
  }
}


function toggleBackground(display) {
  if (!display) {
    $('html').css('background', "");
  } else {
    $('html').css('background-image', "url(../images/Background.jpg)");
  }
}


function submitOnEnter() {
  $("#bandTextBox").keypress(function (event) {
    if (event.keyCode == 13) {
      $("#btn1").click();
    }
  });
}


