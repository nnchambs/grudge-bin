$(document).ready(function(){
  getGrudges()
});


function getGrudges() {
  $.get('/grudges', function(grudges) {
    console.log(grudges)
  })
}
