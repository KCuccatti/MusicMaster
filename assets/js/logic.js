
var bandImage = "";
var bandSchedule = [];
var bio = "";
var bandTop10 = [];
var events = [];

// Set focus on first textbox and hide buttons when page loads
$('#buttons, #bandSearchDiv, #genreSearchDiv, #locationSearchDiv, #homeBtn').hide();


$('#homeButtons').on('click', function () {
  $('#homeBtn').show();
  $('#genreBtn, #locationBtn, #bandNameBtn').hide();
})


// When bio button is clicked, hide band schedule then show band bio 
$('#btnBio').on('click', function () {
  $('#bandSchedule').hide();
  $('#bandContent').show();
})

$('#homeBtn').on('click', function () {
  $('#searchBy, #bandNameBtn, #genreBtn, #locationBtn').show();
  $('#bandSearchDiv, #genreSearchDiv, #locationSearchDiv, #homeBtn, #bandContent, #btnBio, #btnSchedule, #bandImgLeft, #bandImgRight, #bandSchedule').hide();
})

$('#bandNameBtn, #genreBtn, #locationBtn').on('click', function () {
  $('#bandTextBox, #genreTextBox, #locationTextBox').val('');
  $('#bandNameBtn, #genreBtn, #locationBtn, #searchBy').hide();
  $('#homeBtn').show();

  if (this.id == 'bandNameBtn') {
    $('#bandSearchDiv').show();
    $('#bandTextBox').focus();
  }

  if (this.id == 'genreBtn') {
    $('#genreSearchDiv').show();
    $('#genreTextBox').focus();
  }

  if (this.id == 'locationBtn') {
    $('#locationSearchDiv').show();
    $('#locationTextBox').focus();
  }

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


// When first search button is clicked, show the bio and schedule buttons,
// show the desired band content, and set the genre text box's value to nothing.
$('#searchBtn1').on('click', function () {

  $('#buttons, #bandContent, #btnSchedule, #btnBio, #bandImgLeft, #bandImgRight').show();
  $('#bandSearchDiv').hide();

  toggleBackground(true);


  // When the ajax calls and the funtions within those calls are finished, execute:
  $.when(ajaxGetBandInfo($('#bandTextBox').val()), ajaxGetBandSchedule($('#bandTextBox').val())).done(function (a1, a2, a3) {

    // Put the left and right images on the page, as well as the band bio information.
    $('#bandImgLeft').html(`<img src="${bandImage}"/>`);
    $('#bandImgRight').html(`<img src="${bandImage}"/>`);
    $('#bandContent').html(bio);
    $('#bandImgLeft').show();
    $('#bandImgRight').show();

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

  $('#bandImgLeft, #bandImgRight, #buttons').hide();
  $('#bandContent').show();

  $.when(ajaxGetBandTop10($('#genreTextBox').val()).done(function (a1) {

    let genre = "<br><h2>*** " + $('#genreTextBox').val().toUpperCase() + " Top 10 List ***</h2>";

    // Loop through the first 10 top artist images and put them on the page 

    for (let i = 0; i < bandTop10.length; i++) {
      genre = genre +
        "<br><br>" +
        "<img src='" + bandTop10[i].img + "'/>" +
        "<br>" +
        bandTop10[i].name +
        " (<label class='topNumber'> #" + (i + 1) + "</label>)" +
        "<br>";
    }
    $('#bandContent').html(genre);
    $('#genreTextBox').val('');
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
  console.log(response);
    bandImage = response.artist.image[2]["#text"];
    bio = "<h1 class= mb-4 style='font-size: 1.8em; text-align: center;'>Bio:</h1>" + response.artist.bio.summary;
} 




// Pushes the information of the band schedule to bandSchedule
function getBandSchedule(response) {
  bandSchedule = [];
  for (let i = 0; i < response.length; i++) {
    bandSchedule.push({
      datetime: response[i].datetime, country: response[i].venue.country,
      city: response[i].venue.city, name: response[i].venue.name, region: response[i].venue.region
    });
  }
  // console.log(response);
}

// Pushes 10 of the top artists in a given genre to the bandTop10 array
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

// Enter key submits text box input
$('#bandTextBox').on('keyup', function (e) {
  if (event.which == 13 || event.keyCode == 13) {
    $('#searchBtn1').trigger('click');
  }
})

// Enter key submits text box input
$('#genreTextBox').on('keyup', function (e) {
  if (event.which == 13 || event.keyCode == 13) {
    $('#searchBtn2').trigger('click');
  }
})

$('#searchBtn3').on('click', function () {
  toggleBackground(true);
  $('#bandGenreBox').val('');
  $('#bandTextBox').val('');
  $('#bandImgLeft').hide();
  $('#bandImgRight').hide();

  $.when(ajaxGetEvents($('#bandStateBox').val()).done(function (a1) {

    let events = "<h1 class= mb-4 style='font-size: 1.8em; text-align: center;'>Upcoming Events</h1>" + '';

    for (let i = 0; i < cityEvents.length; i++) {
      events = events + "<br>" +
        cityEvents[i].date + " - " +
        cityEvents[i].country + " - " +
        cityEvents[i].state + " - " +
        cityEvents[i].city + " - " +
        cityEvents[i].name + "<br>"
    }

    $('#bandContent').html(events);


  }))

})


//gets the events on the state the user inputs
function ajaxGetEvents(stateCode) {

  return $.ajax({
    type: "GET",
    url: `https://app.ticketmaster.com/discovery/v2/events?apikey=unG33A5iKl7rEv9Ya9shIelxxXBaskA7&size=50&sort=date,asc&stateCode=${stateCode}&classificationName=music`,
    datatype: "json",
    success: getCityEvents,
  });
}


//function to  get all the events data from the api
function getCityEvents(response) {

  cityEvents = [];

  console.log(response._embedded.events);

  for (let i = 0; i < 20; i++) {
    cityEvents.push({
      name: response._embedded.events[i].name,
      date: response._embedded.events[i].dates.start.localDate,
      city: response._embedded.events[i]._embedded.venues[0].city.name,
      state: response._embedded.events[i]._embedded.venues[0].state.name,
      country: response._embedded.events[i]._embedded.venues[0].country.countryCode
    });
    cityEvents.sort();
  }

}


