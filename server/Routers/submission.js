const express = require('express');
const router = express.Router();
const Response = require('../Models/submissionModel'); // Adjust the path as needed
const Form = require('../Models/formModel'); // Adjust the path as needed



router.post('/add', async (req, res) => {
  const { formId, studentId, answers } = req.body;
  try {
    const form = await Form.findById(formId);
    let totalScore = 0;
    const points = {};

    form.questions.forEach(question => {
      const answer = answers[question._id];
      // Default points to 0 if not set
      const questionPoints = answer ? question.points : 0;
      points[question._id] = questionPoints;
      totalScore += questionPoints;
    });

    const response = new Response({
      formId,
      studentId,
      answers,
      points,
      score: totalScore
    });

    await response.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Get all responses
router.get('/getall', async (req, res) => {
  try {
    const responses = await Response.find();
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific response
router.get('/getbyformid/:formId', async (req, res) => {
    try {
      const responses = await Response.find({ formId: req.params.formId })
        .populate('studentId', 'name') // Assuming the `Student` model has a `name` field
        .populate('answers.questionId', 'answers.name'); // Assuming the `Question` model has a `question` field
  
      if (responses.length === 0) {
        return res.status(404).json({ message: 'No responses found for this form' });
      }
      res.json(responses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  

// Update a response
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { answers, points, score } = req.body;
  try {
    const response = await Response.findById(id);
    response.answers = answers;
    response.points = points;
    response.score = score;
    await response.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete a response
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedResponse = await Response.findByIdAndDelete(req.params.id);
    if (deletedResponse == null) {
      return res.status(404).json({ message: 'Response not found' });
    }
    res.json({ message: 'Response deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;