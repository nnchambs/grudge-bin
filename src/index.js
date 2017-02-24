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
  sortByDate(localGrudges)
})

$('.sort-scumbag-by-name').click(() => {
  sortByName()
})

$('.grudge-list').on('click', '.scumbag-name', function() {
  updateDom(localGrudges)
  getIndividualScumbag(this.id)
})

$('.individual-scumbag-container').on('click', '.forgive', function() {
  let id = $(this).parent().attr('id')
  let forgivenStatus = $(this).parent().attr('class')
  let newForgivenStatus = changeForgivenStatus(forgivenStatus)
  patchForgivenStatus(id, newForgivenStatus)
  updateDom(localGrudges)
})

//async functions
function getGrudges() {
  $.get('/api/grudges', (grudges) => {
    grudges.forEach((g) => {
      localGrudges.push(g)
    })
    updateDom(localGrudges)
  })
}

function postGrudge(grudge) {
  $.post('/api/grudges', grudge, (grudges) => {
    let newGrudge = grudges.pop()
    localGrudges.push(newGrudge)
    updateDom(localGrudges)
  })
}

function patchForgivenStatus(id, forgivenStatus) {
  $.ajax(
    {
      url: `/api/grudge/${id}`,
      type: 'PATCH',
      data: {forgivenStatus: forgivenStatus},
      success: function(response) {
        findIndividualGrudge(response)
      }
  })
}
//functions
function createGrudge() {
  let name = $('.grudge-name').val()
  let description = $('.grudge-description').val()
  let date = $('.grudge-date').val()
  return new Grudge(name, description, date)
}

function clearGrudgeList() {
  $('.grudge-list').empty()
}

function clearIndividualGrudgeDisplay() {
  $('.individual-scumbag-container').empty()
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
    if (g.forgiven == true) return g
  })
  let counter = forgiven.length ? forgiven.length : 0
  $('.scumbag-forgiven-counter').text(counter)
}

function appendGrudgeList(grudges) {
  grudges.map((g) => {
    $('.grudge-list').append(`<h4 class='scumbag-name'id=${g.id}>${g.name}</h4></a><li>${g.date}</li>`)
  })
}

function sortByDate() {
  let sortedByDate = localGrudges.sort((a, b) => {
    return a.date > b.date
  })
  updateDom(sortedByDate)
}

function sortByName() {
  let sortedByName = localGrudges.sort((a, b) => {
    return a.name.toLowerCase() > b.name.toLowerCase()
  })
  updateDom(sortedByName)
}

function getIndividualScumbag(id) {
  $.get(`api/grudge/${id}`, (scumbag) => {
    appendIndividualScumbag(scumbag)
  })
}

function appendIndividualScumbag(scumbag) {
  $('.individual-scumbag-container').append(`<div class=${scumbag.forgiven} id=${scumbag.id}><h2>${scumbag.name}</h2><li>${scumbag.offense}</li><li>Forgiven : <span>${scumbag.forgiven}</span></li><button class='forgive'>Forgive the scumbag?</button></div>`)
}

function findIndividualGrudge(grudge) {
  let newGrudge = grudge.pop()
  localGrudges.map((m) => {
    if (newGrudge.id == m.id) {
      m.forgiven = newGrudge.forgiven
      return m
    } else {
      return m
    }
  })
}

function changeForgivenStatus(forgivenStatus) {
  if (forgivenStatus === 'false') {
    return forgivenStatus = 'true'
  } else if (forgivenStatus === 'true') {
    return forgivenStatus = 'false'
  }
  return forgivenStatus
}

function updateDom(grudges) {
  clearGrudgeList()
  clearIndividualGrudgeDisplay()
  appendGrudgeList(grudges)
  updateCounter(grudges)
  updateUnforgivenCounter(grudges)
  updateForgivenCounter(grudges)
}
