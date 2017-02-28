
var helpers = require('../server-helpers')
var expect = require('chai').expect;


describe('helper functions', function() {
  const grudges = [{id: 1, name: 'Andrew Crist', offense: 'chowder', forgiven: false, date: '1974-31-01'}, {id: 2, name: 'Ricky Martin', offense: 'la vida loca', forgiven: false, date: '1999-09-09'}, {id: 3, name: 'Matt Kaufman', offense: 'sphongle', forgiven: true, date: '2012-08-31'}]

  it('the findGrudge function should return an array of a single grudge', function() {
    var id = 1;
    var grudge = helpers.findGrudge(id, grudges);
    expect(helpers.findGrudge(id, grudge)).to.be.a('array')
    expect(grudge[0].id).to.equal(1);
    expect(grudge[0].name).to.equal('Andrew Crist');
    expect(grudge[0].offense).to.equal('chowder');
  });

  it('the checkForgivenStatus should change the forgiven status of the grudge to the opposite of what it previously was', function() {
  var newArray = [{id: 1, name: 'Andrew Crist', offense: 'chowder', forgiven: true, date: '1974-31-01'}, {id: 2, name: 'Ricky Martin', offense: 'la vida loca', forgiven: false, date: '1999-09-09'}, {id: 3, name: 'Matt Kaufman', offense: 'sphongle', forgiven: true, date: '2012-08-31'}]
  var a = helpers.changeForgivenStatus(1, grudges)
  expect(a[0].forgiven).to.equal(newArray[0].forgiven)
  })
});
