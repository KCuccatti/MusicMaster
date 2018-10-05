
var bandImage = "";
var bandSchedule = [];
var bio = "";
var bandTop10 = [];

// Set focus on first textbox and hide buttons when page loads
$('#bandTextBox').focus();
$('#buttons').hide();

// When bio button is clicked, hide band schedule then show band bio 
$('#btnBio').on('click', function () {
  $('#bandSchedule').hide();
  $('#bandContent').show();
})


// On click of 'schedule' button, checks if the band has any upcoming events
// and hides band bio then shows band schedule
$('#btnSchedule').on('click', function () {
  if (!Array.isArray(bandSchedule) || !bandSchedule.length) {
    // array does not exist, is not an array, or is empty
    $('#bandSchedule').html("There are no upcoming events for this artist/band.");
  }

  $('#bandContent').hide();
  $('#bandSchedule').show();
})


// Allows the enter key to submit the button form
$("#bandTextBox").on('keyup', function (e) {
  if (e.keyCode == 13) {
    $('#searchBtn1').click();
  }
});

// Same as function directly above
$("#bandGenreBox").on('keyup', function (e) {
  if (e.keyCode == 13) {
    $('#searchBtn2').click();
  }
});


// When first search button is clicked, show the bio and schedule buttons,
// show the desired band content, and set the genre text box's value to nothing.
$('#searchBtn1').on('click', function () {
  $('#buttons').show();
  $('#bandContent').show();
  $('#bandGenreBox').val('');
  toggleBackground(true);


  // When the ajax calls and the funtions within those calls are finished, execute:
  $.when(ajaxGetBandInfo($('#bandTextBox').val()), ajaxGetBandSchedule($('#bandTextBox').val())).done(function (a1, a2, a3) {

    // Put the left and right images on the page, as well as the band bio information.
    $('#bandImgLeft').html(`<img src="${bandImage}"/>`);
    $('#bandImgRight').html(`<img src="${bandImage}"/>`);
    $('#bandContent').html(bio);


    let schedule = "";
    // Loop through schedule array provided by the API, and puts it on the page
    for (let i = 0; i < bandSchedule.length; i++) {
      schedule = schedule + "<br>" +
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

// When second search button is clicked, hide buttons, and set value
// of first text box to nothing.
$('#searchBtn2').on('click', function () {
  toggleBackground(true);
  $('#buttons').hide();
  $('#bandTextBox').val('');


  $.when(ajaxGetBandTop10($('#bandGenreBox').val()).done(function (a1) {
    let genre = '';

    // Loop through the first 10 top artist images and put them on the page 
    for (let i = 0; i < bandTop10.length; i++) {
      console.log(bandTop10[i].img);
      genre = genre +
        "<br><br>" +
        "<img src='" + bandTop10[i].img + "'/>" +
        "<br>" +
        bandTop10[i].name +
        " (<label class='topNumber'> #" + (i + 1) + "</label>)" +
        "<br>";
    }
    $('#bandContent').html(genre);

  }))
})

// Gets the band information from the API 
function ajaxGetBandInfo(artistname) {
  return $.ajax({
    type: "GET",
    url: `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistname}&api_key=e4d5624dac1c385cf0ee73ab867db27a&format=json`,
    datatype: "json",
    success: getBandInfo,
  });
}

// Gets the band schedule from the API 
function ajaxGetBandSchedule(artistname) {
  return $.ajax({
    type: "GET",
    url: `https://rest.bandsintown.com/artists/${artistname}/events/?app_id=f8477fddee9461f418456f94354b3ec8&date=upcoming`,
    datatype: "json",
    success: getBandSchedule,
  });
}

// Gets the top artist of a genre from API 
function ajaxGetBandTop10(bandTop10) {
  return $.ajax({
    type: "GET",
    url: `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${bandTop10}&api_key=e4d5624dac1c385cf0ee73ab867db27a&format=json`,
    datatype: "json",
    success: getBandTop10,
  });
}


// Sets bandImage and bio variables equal to their necessary JSON equilivents respectively 
function getBandInfo(response) {
  bandImage = response.artist.image[2]["#text"];
  bio = "<h1 class= mb-4 style='font-size: 1.8em; text-align: center;'>Bio:</h1>" + response.artist.bio.summary;
}


// 
function getBandSchedule(response) {
  bandSchedule = [];
  for (let i = 0; i < response.length; i++) {
    bandSchedule.push({
      datetime: response[i].datetime.substring(0, 10), country: response[i].venue.country,
      city: response[i].venue.city, name: response[i].venue.name, region: response[i].venue.region
    });
  }
 // console.log(response);
}

// 
function getBandTop10(response) {
  bandTop10 = [];
  for (let i = 0; i < 10; i++) {
    bandTop10.push({ name: response.topartists.artist[i].name, img: response.topartists.artist[i].image[2]["#text"] });
  }
}

// Toggles between two backgrounds depending on if information is being displayed
function toggleBackground(display) {
  if (!display) {
    $('html').css('background', '');
  } else {
    $('html').css('background-image', "url(../images/Background.jpg)");
  }
}




// function ajaxGetEvents() {

//  // const cityName =  $(this).attr('.data-name');

//   return $.ajax({
//     type: "GET",
//     url: `https://rest.bandsintown.com/events?app_id=f8477fddee9461f418456f94354b3ec8&date=upcoming`,
//     datatype: "json",
//     success: getCityEvents,
//   });
// }

// function getCityEvents(response){

//   console.log(response);
// }


// $('#btn3').on('click', function (event) {

//   $.when(ajaxGetEvents($('#cityName').val()).done(function (a1, a2) {

 
//   }))

// })