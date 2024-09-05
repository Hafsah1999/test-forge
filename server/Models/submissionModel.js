const { Schema, model } = require('../connection');

const responseSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'student', required: true },
    answers: { type: Map, of: String },
    score: { type: Number, required: true, default: 0 },
    submittedAt: { type: Date, default: Date.now },
    points: {
        type: Map,
        of: Number
      },
    formId: { type: Schema.Types.ObjectId, ref: 'Form', required: true },
});


module.exports = model('response', responseSchema)