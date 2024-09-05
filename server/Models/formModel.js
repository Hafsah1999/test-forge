const { Schema, model } = require('../connection');


const questionSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['short', 'paragraph', 'multiple'] },
  options: [String],
  correctAnswer: { type: String ,default:0},
  points: { type: Number, required: true, min: 1 }
});


const formSchema = new Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true, default : 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  questions: [questionSchema],
  // responses: [submissionSchema],
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  displayScore: { type: Boolean, default: false },
  allowRetest: { type: Boolean, default: false },
});

module.exports = model('Form', formSchema)