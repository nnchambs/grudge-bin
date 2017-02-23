$(document).ready(function(){
  getGrudges()
});

function getGrudges() {
  $.get('/grudges', function(grudges) {
    appendGrudgeList(grudges)
  })
}

function appendGrudgeList(grudges) {
  $('.grudge-list').append(`<p>${grudges[0].name}</p>`)
}
