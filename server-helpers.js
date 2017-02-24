module.exports = {
  changeForgivenStatus: function(id, newForgiven, locals) {
    locals = locals.map((m) => {
      if (m.id == id) {
        m.forgiven = newForgiven
        return m
      } else {
        return m
      }
    })
    return locals
  },

  findGrudge: function(id, locals) {
    return locals.filter((m) => {
    return m.id == id
    })
  }
}
