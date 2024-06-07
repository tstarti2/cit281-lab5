// Project: CIT 281 Lab 5
// Author: Tyler Startin

// Fastify init
const fs = require('fs')
const Fastify = require('fastify')
const fastify = require('fastify')({
  logger: true
})

const students = [
  {
    id: 1,
    last: 'Last1',
    first: 'First1'
  },
  {
    id: 2,
    last: 'Last2',
    first: 'First2'
  },
  {
    id: 3,
    last: 'Last3',
    first: 'First3'
  }
]

// Declare base route
fastify.get('/', function (request, reply) {
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(students)
})

// Declare a route /cit, return the entire list of students from student array
fastify.get('/cit', function (request, reply) {
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(students)
})

// Declare a route /cit/student, return the entire list of students from student array
fastify.get('/cit/student', function (request, reply) {
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(students)
})

// Declare cit/student/:id
fastify.get('/cit/student/:id', function (request, reply) {
  const id = parseInt(request.params.id)
  let student = null

  for (let i of students) {
    if (i.id === id) {
      student = i
      break
    }
  }

  if (student) {
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(student)
  } else {
    reply
      .code(404)
      .header('Content-Type', 'text/html; charset=utf-8')
      .send('Not Found')
  }
})

// Deconstruct body request, initialize newStudent, find max id value in students array, 
// add 1 to newStudent, push newStudent to students
fastify.post('/cit/student/name', function (request, reply) {
  const { id, last, first } = request.body
  let newStudent = { id, first, last }

  let idValues = students.map(student => student.id)
  let max = Math.max(...idValues)

  newStudent.id = max + 1
  students.push(newStudent)

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ newStudent })
})

fastify.get('*', function (request, reply) {
  let invalid = `Invalid path`
  reply
    .code(404)
    .header('Content-Type', 'text/html; charset=utf-8')
    .send(invalid)
})

// Run the server
const listenIP = 'localhost'
const listenPort = 8080
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log(`Server listening on ${address}`)
})
