const moment = require('moment')

const updatedDate = (date) => {
  return moment(date).format('dddd, MMMM Do YYYY [at] h:mma')
}

module.exports = updatedDate
