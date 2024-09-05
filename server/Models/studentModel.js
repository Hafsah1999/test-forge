const { Schema, model } = require('../connection');

const StudentSchema = new Schema({
    name: String,
    contact: Number,
    email: {type:String},
    studentId: {type:String},
    course: String,
    batch: String,
  });
  
  module.exports = model('student', StudentSchema);