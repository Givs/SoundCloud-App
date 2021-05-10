
//SoundCloud API
SC.initialize({
  client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
});

// find all sounds of buskers licensed under 'creative commons share alike'
SC.get('/tracks', {
  q: 'buskers'
}).then(function(tracks) {
  console.log(tracks);
});
