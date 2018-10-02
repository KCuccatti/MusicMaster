const APIKey = 'f8477fddee9461f418456f94354b3ec8';

const queryURL = `https://rest.bandsintown.com/artists/Kiss?app_id=f8477fddee9461f418456f94354b3ec8`;

$.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {    
      console.log(response);
  });