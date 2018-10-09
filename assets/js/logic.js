
// Declare global variables.
var bandImage;
var bandSchedule = [];
var bio;
var bandTop10 = [];
var events = [];


// Hide necessary elements on page load.
$('#buttons, #bandSearchDiv, #genreSearchDiv, #locationSearchDiv, #homeBtn').hide();


// If any of the three main buttons are clicked, clear the necessary search text boxes.
// Also, hide the div containing the three main buttons and the 'Search By' text. 
$('#bandNameBtn, #genreBtn, #locationBtn').on('click', function () {
  $('#bandTextBox, #genreTextBox, #locationTextBox').val('');
  $('#mainButtonsDiv, #searchBy').hide();
  $('#homeBtn').show();
  $('#formDiv').show();


  // If band name button is clicked, show div for band name search functionality.
  if (this.id == 'bandNameBtn') {
    $('#bandSearchDiv').show();
    $('#bandTextBox').focus();
  }

  // If genre button is clicked, show the div for genre search  functionality.
  if (this.id == 'genreBtn') {
    $('#genreSearchDiv').show();
    $('#genreTextBox').focus();
  }

  // If location button is clicked, show div for location search functionality.
  if (this.id == 'locationBtn') {
    $('#locationSearchDiv').show();
    $('#locationTextBox').focus();
  }
})


// When 'Bio' button is clicked, hide band schedule then show band bio.
$('#bioBtn').on('click', function () {
  $('#bandSchedule').hide();
  $('#bioBtn').hide();
  $('#scheduleBtn').show();
  $('#bandContent').show();
})


// On click of 'Schedule' button, checks if the band has any upcoming events,
// hides band bio then shows band schedule.
$('#scheduleBtn').on('click', function () {
  if (!Array.isArray(bandSchedule) || !bandSchedule.length) {
    // Array does not exist, is not an array, or is empty
    $('#bandSchedule').html("There are no upcoming events for this artist/band.");
  }

  $('#bandContent').hide();
  $('#scheduleBtn').hide();
  $('#bioBtn').show();
  $('#bandSchedule').show();
})

// On click of the 'Home' button, show main buttons, 'Search By' text, and
// hide necessary text boxes, images, and buttons. 
$('#homeBtn').on('click', function () {
  $('#searchBy, #mainButtonsDiv').show();
  $('#bandSearchDiv, #genreSearchDiv, #locationSearchDiv, #homeBtn, #bandContent, #bioBtn, ' +
    '#scheduleBtn, #bandImg, #bandSchedule').hide();
  toggleBackground(false);
})


// When "Band name" search button is clicked, show the bio and schedule buttons, show the band 
// content, and toggle different background.
$('#searchBtn1').on('click', function () {

  switchToBandNameView(); // Show/Hide various content relavent/not relevant to band name view.

  // When the ajax calls and the funtions within those calls are finished, display bio and schedule information on page
  $.when(ajaxGetBandInfo($('#bandTextBox').val()), ajaxGetBandSchedule($('#bandTextBox').val())).done(function (a1, a2) {
    setBandNameContent();
  });
})


// Switches the necessary view for band name functionality 
function switchToBandNameView() {
  $('#buttons, #bandContent, #scheduleBtn, #bioBtn, #bandImg').show();
  $('#bandSearchDiv').hide();
  $('#bioBtn').hide();
  toggleBackground(true);
}

// Displays band image, bio and hides the schedule
function setBandNameContent() {
  // Display the image as well as the band bio information.
  $('#bandImg').html(`<img src="${bandImage}"/>`);
  $('#bandContent').html(bio);
  $('#bandSchedule').html(buildSchedule()).hide();
}

// Builds the format of the band schedule
function buildSchedule() {
  let schedule = "";
  // Loops through schedule array provided by the API, and puts it on the page
  for (let i = 0; i < bandSchedule.length; i++) {
    schedule = schedule + "<br>" +
      bandSchedule[i].datetime + "<br>" +
      bandSchedule[i].country + "<br>" +
      bandSchedule[i].region + "<br>" +
      bandSchedule[i].city + "<br>" +
      bandSchedule[i].name + "<br><br><br>";
  }
  return schedule;
}


// When 'Genre' search button is clicked, hide necessary buttons/elements and clear the necessary search
// text boxes.
$('#searchBtn2').on('click', function () {

  switchToGenreView(); // Show/Hide various content relavent/not relevant to topTenList view.

  // When the ajax call and function within it is finished, display information on page
  $.when(ajaxGetBandTop10($('#genreTextBox').val()).done(function (a1) {
    $('#bandContent').html(buildGenreTop10List());
    $('#genreTextBox').val('');
  }))

})

// Switches to a specific view for the 
function switchToGenreView() {
  toggleBackground(true);
  $('#bandImg, #buttons').hide();
  $('#bandContent').html("");
  $('#bandContent').show();
}


function buildGenreTop10List() {
  let genre = "<br><h2>*** " + $('#genreTextBox').val().toUpperCase() + " Top 10 List ***</h2>";
  // Loop through the first 10 top artist images and put them on the page 
  for (let i = 0; i < bandTop10.length; i++) {
    genre = genre +
      "<br><br>" +
      '<img class="top" src="' + bandTop10[i].img + '" id="' + bandTop10[i].name + '"/>' +
      "<br>" +
      bandTop10[i].name +
      " (<label class='topNumber'> #" + (i + 1) + "</label>)" +
      "<br>";
  }
  return genre;
}


// On click of the 'Location' text box's search button, 
$('#searchBtn3').on('click', function () {
  toggleBackground(true);

  $.when(ajaxGetEvents($('#locationDropDown').val()).done(function (a1) {
    $('#bandContent').html(buildEventList);
    $('#bandContent').show();
  }))

})

// Build the list of upcoming events for the selected state.
function buildEventList() {
  let events = "<br><h1 class= mb-4 style='font-size: 1.8em; text-align: center;'>Upcoming Events</h1>" + '';
  for (let i = 0; i < cityEvents.length; i++) {
    events = events + "<br>" +
      cityEvents[i].date + "<br>" +
      cityEvents[i].country + "<br>" +
      cityEvents[i].state + "<br>" +
      cityEvents[i].city + "<br>" +
      cityEvents[i].name + "<br><br><br>";
  }
  return events;
}


// Gets band information from the API 
function ajaxGetBandInfo(artistname) {
  return $.ajax({
    type: "GET",
    url: `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistname}&api_key=e4d5624dac1c385cf0ee73ab867db27a&format=json`,
    datatype: "json",
    success: getBandInfo,
  });
}

// Gets band schedule from the API 
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

// Gets the upcomings events of a state from API
function ajaxGetEvents(stateCode) {

  return $.ajax({
    type: "GET",
    url: `https://app.ticketmaster.com/discovery/v2/events?apikey=unG33A5iKl7rEv9Ya9shIelxxXBaskA7&size=50&sort=date,asc&stateCode=${stateCode}&classificationName=music`,
    datatype: "json",
    success: getCityEvents,
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
      datetime: response[i].datetime.substring(0, 10), country: response[i].venue.country,
      city: response[i].venue.city, name: response[i].venue.name, region: response[i].venue.region
    });
  }
}


// Pushes 10 of the top artists in a given genre to the bandTop10 array
function getBandTop10(response) {
  bandTop10 = [];
  for (let i = 0; i < 10; i++) {
    bandTop10.push({ name: response.topartists.artist[i].name, img: response.topartists.artist[i].image[2]["#text"] });
  }
}


// Function to  get all the events data from the API
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


// Toggles between two backgrounds depending on if information is being displayed
// When there is a lot of raw text on screen you do not want to place it onto a 
// busy background. A true value will show the background, false will clear it.
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


// Enter key submits text box input
$('#locationTextBox').on('keyup', function (e) {
  if (event.which == 13 || event.keyCode == 13) {
    $('#searchBtn3').trigger('click');
  }
})
