const express = require('express');
const router = express.Router();
const Form = require('../Models/formModel');


// Add a new form
router.post('/add', (req, res) => {
  const { title, questions, createdAt, duration, teacherId } = req.body;
  console.log(req.body);
  const newForm = new Form({ title, questions, createdAt, duration, teacherId });

  newForm.save()
    .then(data => res.status(201).json(data))
    .catch(error => {
      console.error('Error creating form:', error);
      res.status(500).json({ message: 'An error occurred while creating the form' });
    });
});

// Get all forms
router.get('/getall', (req, res) => {
  Form.find()
    .then(forms => res.status(200).json(forms))
    .catch(error => {
      console.error('Error fetching forms:', error);
      res.status(500).json({ message: 'An error occurred while fetching the forms' });
    });
});

// Get a specific form by ID
router.get('/getbyid/:id', (req, res) => {
  const formId = req.params.id;
  console.log(`Attempting to fetch form with ID: ${formId}`);
  Form.findById(formId)
    .then(form => {
      if (!form) {
        console.log(`Form with ID ${formId} not found`);
        return res.status(404).json({ message: 'Form not found' });
      }
      console.log(`Successfully fetched form with ID ${formId}`);
      res.status(200).json(form);
    })
    .catch(error => {
      console.error(`Error fetching form with ID ${formId}:`, error);
      res.status(500).json({ message: 'An error occurred while fetching the form' });
    });
});

// Update a specific form by ID
router.put('/getbyid/:id', (req, res) => {
  Form.findById(req.params.id)
    .then(form => {
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      form.title = req.body.title || form.title;
      form.questions = req.body.questions || form.questions;
      return form.save();
    })
    .then(updatedForm => res.json(updatedForm))
    .catch(error => {
      console.error('Error updating form:', error);
      res.status(500).json({ message: error.message });
    });
});

// Delete a specific form by ID
router.delete('/delete/:id', (req, res) => {
  Form.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(error => {
      console.error('Error deleting form:', error);
      res.status(500).json({ message: 'An error occurred while deleting the form' });
    });
});

// Update a form

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedForm = req.body;
    const form = await Form.findByIdAndUpdate(id, updatedForm, { new: true });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(400).json({ message: 'Validation failed', errors: error.errors });
  }
});


// Get active form
router.get('/getActive', (req, res) => {
  Form.findOne({ status: 'published' })
    .then(test => {
      if (!test) {
        return res.status(404).json({ message: 'No active test found' });
      }
      res.status(200).json(test);
    })
    .catch(error => {
      console.error('Error fetching active form:', error);
      res.status(500).json({ message: 'An error occurred while fetching the active form', error: error.message });
    });
});

// Update the status of a specific form by ID
router.put('/updateStatus/:id', (req, res) => {
  Form.findById(req.params.id)
    .then(test => {
      if (!test) {
        return res.status(404).json({ message: 'Test not found' });
      }
      test.status = req.body.status;
      return test.save();
    })
    .then(updatedTest => res.status(200).json(updatedTest))
    .catch(error => {
      console.error('Error updating test status:', error);
      res.status(500).json({ message: 'An error occurred while updating the test status', error: error.message });
    });
});

// Get forms by teacher ID
router.get('/getbyteacher/:id', async (req, res) => {
  try {
    const teacherId = req.params.id;
    const forms = await Form.find({ teacherId: teacherId });
    console.log(forms);
    if (!forms || forms.length === 0) {
      return res.status(404).json({ message: 'No forms found for the teacher' });
    }

    res.status(200).json(forms);
  } catch (error) {
    console.error('Error in getbyteacher route:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.get('/submission/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid submission ID' });
    }

    const form = await Form.findOne(
      { 'responses._id': id },
      { 
        title: 1, 
        questions: 1, 
        'responses.$': 1 
      }
    ).populate('responses.studentId', 'name email').lean();
console.log(form);
    if (!form) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    const submission = form.responses[0];

    if (!submission) {
      return res.status(404).json({ message: 'Submission details not found' });
    }

    const responseData = {
      _id: submission._id,
      title: form.title,
      student: submission.studentId,
      questions: form.questions.map(q => ({
        _id: q._id,
        name: q.name,
        type: q.type,
        points: q.points
      })),
      answers: Object.fromEntries(submission.answers),
      score: submission.score,
      submittedAt: submission.submittedAt
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});



// Submit a form
// In your formRouter.js



// Generate a link for a specific form
router.get('/link/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({ link: `/student/${id}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate link' });
  }
});

router.get('/responses/:formId', async (req, res) => {
  try {
    const { formId } = req.params;

    // Find the form by ID and populate responses
    const form = await Form.findById(formId).populate('responses.studentId');
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.status(200).json(form.responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(400).json({ error: 'Failed to fetch responses' });
  }
});

router.get('/submission/:id', async (req, res) => {
  try {
    const submission = await Form.findById(req.params.id)
      .populate('form')
      .populate('student');
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    const formattedSubmission = {
      title: submission.form.title,
      student: {
        name: submission.student.name,
        email: submission.student.email,
      },
      questions: submission.form.questions,
      answers: Object.fromEntries(submission.answers),
      score: submission.score,
      submittedAt: submission.submittedAt,
    };

    res.json(formattedSubmission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/response/:responseId', async (req, res) => {
  try {
    const { responseId } = req.params;

    // Find the form by iterating over all forms
    const form = await Form.findOne({ 'responses._id': responseId }).populate('responses.studentId');
    if (!form) {
      return res.status(404).json({ error: 'Response not found' });
    }

    // Find the specific response within the form's responses
    const response = form.responses.id(responseId);
    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching response:', error);
    res.status(400).json({ error: 'Failed to fetch response' });
  }
});


module.exports = router;
