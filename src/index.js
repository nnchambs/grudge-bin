class Grudge {
  constructor(name, offense, date) {
    this.id = Date.now();
    this.name = name;
    this.offense = offense;
    this.forgiven = false;
    this.date = date;
  }
}

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

function clearGrudgeList() {
  $('.grudge-list').empty()
}

function updateCounter(grudges) {
  const counter = grudges.length
  $('.scumbag-counter').text(counter)
}

function updateUnforgivenCounter(grudges) {
  let unforgiven = grudges.filter((g) => {
    if (g.forgiven !== true) return g
  })
  $('.scumbag-unforgiven-counter').text(unforgiven.length)
}

function updateForgivenCounter(grudges) {
  let forgiven = grudges.filter((g) => {
    if (g.forgiven === true) return g
  })
  let counter = forgiven.length ? forgiven.length : 0
  $('.scumbag-forgiven-counter').text(counter)
}

function appendGrudgeList(grudges) {
  clearGrudgeList()
  updateCounter(grudges)
  updateUnforgivenCounter(grudges)
  updateForgivenCounter(grudges)
  grudges.map((g) => {
    $('.grudge-list').append(`<h4>${g.name}</h4>`)
  })
}
