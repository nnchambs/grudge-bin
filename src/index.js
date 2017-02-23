class Grudge {
  constructor(name, offense, date) {
    this.id = Date.now();
    this.name = name;
    this.offense = offense;
    this.forgiven = false;
    this.date = date;
  }
}

var grudge = new Grudge()

//listeners
$(document).ready(() => {
  getGrudges()
});

$('.grudge-submit').click('click', (e) => {
  e.preventDefault()
  const newGrudge = createGrudge()
  postGrudge(newGrudge)
})

//functions
function getGrudges() {
  $.get('/api/grudges', (grudges) => {
    appendGrudgeList(grudges)
  })
}

function postGrudge(grudge) {
  $.post('/api/grudges', grudge, (grudges) => {
    appendGrudgeList(grudges)
  })
}

function createGrudge() {
  let name = $('.grudge-name').val()
  let description = $('.grudge-description').val()
  let date = $('.grudge-date').val()
  return new Grudge(name, description, date)
}

function appendGrudgeList(grudges) {
  $('.grudge-list').append(`<p>${grudges[0].name}</p>`)
}
