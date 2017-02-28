module.exports = {
  changeForgivenStatus: function(id, locals) {
    locals = locals.map((m) => {
      if (m.id === JSON.parse(id)) {
        m.forgiven = true
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
