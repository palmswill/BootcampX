const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const args = process.argv.slice(2);
console.log(args);

pool.connect(()=>console.log("connected"));

pool.query(`
SELECT DISTINCT assistance_requests.teacher_id , teachers.name as name, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teachers.id = assistance_requests.teacher_id
JOIN students on students.id = assistance_requests.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE '%${args[0]}%'
ORDER BY name;
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort} : ${user.name}`);
  })})
  .catch(err => console.error('query error', err.stack))
  .finally(()=>{
    pool.end(console.log("disconnected"));
  });