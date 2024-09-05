const express = require('express');
const router = express.Router();
const Teacher = require('../Models/teacherModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/add', (req, res) => {
  console.log(req.body);
  new Teacher(req.body).save()
      .then((result) => {
          res.status(200).json(result);
      }).catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});



router.post('/authenticate', (req, res) => {
  console.log(req.body);
  Teacher.findOne(req.body)
      .then((result) => {
          if (result) {
              const { _id, name, email, password } = result;
              const payload = { _id, name, email,password };
              jwt.sign(
                  payload,
                  process.env.JWT_SECRET,
                  { expiresIn: '2 days' },
                  (err, token) => {

                      if (err) {
                          console.log(err);
                          res.status(500).json({ message: 'error creating token' })
                      } else {
                          res.status(200).json({ token, email, _id, name })
                      }

                  }

              )
          } else {
              res.status(401).json({ message: 'Invalid Credentials' })
          }
      }).catch((err) => {
          console.log(err);
          res.status(500).json(err)
      })
});

// Submit a response
router.post('/submit/:id', (req, res) => {
  const TeacherId = req.params.id;
  const { responses } = req.body;
  Teacher.findById(TeacherId)
    .then(Teacher => {
      if (!Teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      Teacher.responses.push(...responses);
      return Teacher.save();
    })
    .then(() => {
      res.status(200).json({ message: 'Responses submitted successfully' });
    })
    .catch(error => {
      console.error('Error submitting responses:', error);
      res.status(500).json({ message: 'An error occurred while submitting the responses' });
    });
});

// Get all Teachers
router.get('/getall', (req, res) => {
  Teacher.find()
    .then(Teachers => {
      res.status(200).json(Teachers);
    })
    .catch(error => {                                                                                                                       
      console.error('Error fetching Teachers:', error);
      res.status(500).json({ message: 'An error occurred while fetching the Teachers' });
    });
});

// Get a specific Teacher
router.get('/getbyid/:id', (req, res) => {
  const TeacherId = req.params.id;
  Teacher.findById(TeacherId)
    .then(Teacher => {
      if (!Teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json(Teacher);
    })
    .catch(error => {
      console.error('Error fetching Teacher:', error);
      res.status(500).json({ message: 'An error occurred while fetching the Teacher' });
    });
});

router.put('/getbyid/:id', (req, res) => {
  Teacher.findById(req.params.id)
    .then(Teacher => {
      if (!Teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      Teacher.title = req.body.title || Teacher.title;
      Teacher.questions = req.body.questions || Teacher.questions;
      return Teacher.save();
    })
    .then(updatedTeacher => {
      res.json(updatedTeacher);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});


router.delete("/delete/:id", (req,res) => {
  Teacher.findByIdAndDelete(req.params.id)
  .then((result) => {
    res.json(result)
    
  }).catch((err) => {
    console.error(err)
    res.status(500).json(err)
    
  });
})

router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  Teacher.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  })
    .then(updatedTeacher => {
      if (!updatedTeacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json(updatedTeacher);
    })
    .catch(error => {
      console.error('Error updating Teacher:', error);
      res.status(500).json({ message: 'An error occurred while updating the Teacher', error: error.message });
    });
});

router.get('/getActive', (req, res) => {
  Teacher.findOne({ status: 'published' })
    .then(test => {
      if (!test) {
        return res.status(404).json({ message: 'No active test found' });
      }
      res.json(test);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.put('/updateStatus/:id', (req, res) => {
  Teacher.findById(req.params.id)
    .then(test => {
      if (!test) {
        return res.status(404).json({ message: 'Test not found' });
      }
      test.status = req.body.status;
      return test.save();
    })
    .then(updatedTest => {
      res.json(updatedTest);
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;