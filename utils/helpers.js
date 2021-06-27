const pluralize = require('pluralize');

module.exports = {
  pluralize: function(word, amount) {
    return pluralize(word, amount, true)
  }
}