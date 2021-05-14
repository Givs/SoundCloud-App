//get input value
function inputValue(){
  var input = document.querySelector('input').value;
  clean();
  SoundCloudAPI.getTracks(input);
}

//clean input
function clean(){
  var container = document.querySelector('.search-results');
  container.innerHTML = '';
}

//clean playlist and localStorage
function clearPlaylist(){
  var sideBar = document.querySelector('.js-playlist');
  sideBar.innerHTML = '';
  localStorage.clear("key");
}


//SoundCloud API
var SoundCloudAPI = {};

SoundCloudAPI.init =  () => {

  SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });
  
}

SoundCloudAPI.init()

SoundCloudAPI.getTracks =  (inputValue) => {

  // find all sounds of buskers licensed under 'creative commons share alike'
  SC.get('/tracks', {
    q: inputValue
  }).then(function(tracks) {
    console.log(tracks);
    SoundCloudAPI.renderTracks(tracks)
  });
  
}



SoundCloudAPI.renderTracks = function(tracks){

  tracks.forEach(function(track){
    var card = document.createElement('div');
  card.classList.add('card');

  var imageDiv = document.createElement('div');
  imageDiv.classList.add('image');

  var image_img = document.createElement('img');
  image_img.classList.add('image_img');
  image_img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract';

  imageDiv.appendChild(image_img);

  var content = document.createElement('div');
  content.classList.add('content');

  var header = document.createElement('div');
  header.classList.add('header');
  header.innerHTML = `<a href="${track.permalink_url}" target="_blank">${track.title}</a>`

  var button = document.createElement('div');
  button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

  var icon = document.createElement('i');
  icon.classList.add('add', 'icon');

  var buttonText = document.createElement('span');
  buttonText.innerHTML = 'Add to playlist'

  content.appendChild(header);

  button.appendChild(icon);
  button.appendChild(buttonText);
  button.addEventListener('click', function(){
    SoundCloudAPI.getEmbed(track.permalink_url);
  })

  card.appendChild(imageDiv);
  card.appendChild(content);
  card.appendChild(button);


  var searchResults = document.querySelector('.js-search-results');
  searchResults.appendChild(card);
  });
}

SoundCloudAPI.getEmbed = function(trackURL){
  console.log('clique')
  SC.oEmbed(trackURL, {
    auto_play: true
  }).then(function(embed){
    console.log('oEmbed response: ', embed);
  
    var sideBar = document.querySelector('.js-playlist');
    
    //put the sounds on playlist
    var box = document.createElement('div');
    box.innerHTML = embed.html;
    sideBar.insertBefore(box, sideBar.firstChild)

    //using localStorage
    localStorage.setItem("key", sideBar.innerHTML);


  });
}

//Recover data from the localStorage
var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem("key");


