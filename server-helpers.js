module.exports = {
  changeForgivenStatus: function(id, newForgiven, locals) {
    locals = locals.map((m) => {
      if (m.id === JSON.parse(id)) {
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
    return m.id === JSON.parse(id)
    })
  }
}
