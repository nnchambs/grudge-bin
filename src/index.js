'use strict'

// var $ = require('jquery');

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
window.onload = function() {
  getGrudges()
};

$('.grudge-submit').click('click', (e) => {
  e.preventDefault()
  let name = $('.grudge-name').val()
  let description = $('.grudge-description').val()
  let date = $('.grudge-date').val()
  const newGrudge = createGrudge(name, description, date)
  postGrudge(newGrudge)
})

$('.sort-scumbag-by-date').click(() => {
  sortByDate()
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
})

//async functions
function getGrudges() {
  $.get('/api/grudges', (grudges) => {
    console.log(grudges);
    grudges.forEach((g) => {
      localGrudges.push(g)
    })
    updateDom(localGrudges)
  })
}

function postGrudge(grudge) {
  console.log(grudge);
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
        let updated = changeIndividualForgiven(response)
        updateDom(updated)
      }
  })
}
//functions
function createGrudge(name, description, date) {
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
    if (g.forgiven !== 'true') return g
  })
  $('.scumbag-unforgiven-counter').text(unforgiven.length)
}

function updateForgivenCounter(grudges) {
  let forgiven = grudges.filter((g) => {
    if (g.forgiven == 'true') return g
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
  let stringifyId = JSON.stringify(id)
  $.get(`api/grudge/${stringifyId}`, (scumbag) => {
    appendIndividualScumbag(scumbag)
  })
}

function appendIndividualScumbag(scumbag) {
  $('.individual-scumbag-container').append(`<div class=${scumbag.forgiven} id=${scumbag.id}><h2 class='scumbag-name'>${scumbag.name}</h2><li>${scumbag.offense}</li><li>Forgiven : <span>${scumbag.forgiven}</span></li><button class='forgive'>Forgive the scumbag?</button></div>`)
}

function changeIndividualForgiven(grudge) {
  let newGrudge = grudge.pop()
  return localGrudges.map((m) => {
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
