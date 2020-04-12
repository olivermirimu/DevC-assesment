/* eslint-disable import/newline-after-import */
/* jslint es6 */
/* jslint white: true */

const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const logModel = new Schema({
  requestType: {
    type: String
  },
  endpoint: {
    type: String
  },
  responseStatus: {
    type: Number
  },
  duration: {
    type: String
  }
});

module.exports = mongoose.model('Logs', logModel);
