describe('an instance of Grudge', function () {
  it('should instantiate a grudge and that grudge should start out as unforgiven', function() {
    var grudge = new Grudge();
    expect(grudge.forgiven).to.equal(false);
  })
})

// describe('changeIndividualForgiven', function() {
//   var localGrudges = [{id: 1, name: 'Andrew Crist', offense: 'chowder', forgiven: false, date: '1974-31-01'}, {id: 2, name: 'Ricky Martin', offense: 'la vida loca', forgiven: false, date: '1999-09-09'}, {id: 3, name: 'Matt Kaufman', offense: 'sphongle', forgiven: true, date: '2012-08-31'}]
//   it('should hange the forgiven status of a grudge and return an array', function() {
//
//   })
//
// })

describe('changeForgivenStatus', function () {
  it('should change a forgivenStatus from falsey to truthy', function() {
    expect(changeForgivenStatus('false')).to.equal('true');
  })
})
