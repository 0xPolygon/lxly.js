if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lxly.node.min.js')
} else {
  module.exports = require('./lxly.node.js')
}
