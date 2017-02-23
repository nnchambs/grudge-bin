class Grudge {
  constructor(name, offense, date) {
    this.id = Date.now();
    this.name = name;
    this.offense = offense;
    this.forgiven = false;
    this.date = date;
  }
}

const localGrudges = []

//listeners
$(document).ready(() => {
  getGrudges()
});

$('.grudge-submit').click('click', (e) => {
  e.preventDefault()
  const newGrudge = createGrudge()
  postGrudge(newGrudge)
})

$('.sort-scumbag-by-date').click(() => {
  sortByDate()
})

$('.sort-scumbag-by-name').click(() => {
  sortByName()
})

$('.grudge-list').on('click', '.scumbag-name', function() {
  routeToIndividualScumbag(this.id)
})

//functions
function getGrudges() {
  $.get('/api/grudges', (grudges) => {
    grudges.forEach((g) => {
      localGrudges.push(g)
    })
    appendGrudgeList(localGrudges)
  })
}

function postGrudge(grudge) {
  $.post('/api/grudges', grudge, (grudges) => {
    let newGrudge = grudges.pop()
      localGrudges.push(newGrudge)
    })
  appendGrudgeList(localGrudges)
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
    $('.grudge-list').append(`<a href='/scumbag/${g.id}'><h4 class='scumbag-name'id=${g.id}>${g.name}</h4></a><li>${g.date}</li>`)
  })
}

function sortByDate() {
  return localGrudges.sort((a, b) => {
    return a.date > b.date
  })
}

function sortByName() {
  return localGrudges.sort((a, b) => {
    return a.name.toLowerCase() > b.name.toLowerCase()
  })
}

function routeToIndividualScumbag(id) {
  $.get(`/scumbag/${id}`, (req, res) => {
    console.log(res)
  })
}
