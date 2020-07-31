const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started in PORT: ${port}...`));

const courses = [
  { id: 1, name: 'ICS 233'},
  { id: 2, name: 'ICS 254'},
  { id: 3, name: 'SWE 205'}
];

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

// POST Usage
app.post('/api/courses', (req, res) => {
  // Validation Process
  const { error } = validateCourse(req.body); // Obj distraction 
  if (error) return res.status(400).send(error.details[0].message);

  // Create Course
  const course = {
    id: courses.length+1,
    name: req.body.name
  };

  // Post Course
  courses.push(course);
  res.send(course);
});


// GET Usage
app.get('/', (req, res) => {
  res.send('Hello, World. This is a simple web app using nodejs and express framework. See you soon ma man. <3');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course not found...!")
  res.send(course);
});



//PUT Usage
app.put('/api/courses/:id', (req, res) => {
  // Search
  const course = courses.find(c => c.id === parseInt(req.params.id));

  // Check existence
  if (!course) return res.status(404).send("The course not found...!")

  // Validation
  const { error } = validateCourse(req.body); // Obj distraction 
  if (error) return res.status(400).send(error.details[0].message);

  //Update Course
  course.name = req.body.name;
  res.send(course);
});


// DELETE Usage 
app.delete('/api/courses/:id', (req, res) => {
  // Search
  const course = courses.find(c => c.id === parseInt(req.params.id));

  // Check existence
  if (!course) return res.status(404).send("The course not found...!")

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});
