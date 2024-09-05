const { Schema, model } = require('../connection');


const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, required: true },
});

module.exports = model('admin', AdminSchema);


