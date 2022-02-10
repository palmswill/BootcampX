const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];

const values = [`%${cohortName}%`];

const queryString=`
SELECT DISTINCT assistance_requests.teacher_id , teachers.name as name, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teachers.id = assistance_requests.teacher_id
JOIN students on students.id = assistance_requests.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
ORDER BY name;
`


pool.connect(()=>console.log("connected"));

pool.query(queryString,values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort} : ${user.name}`);
  })})
  .catch(err => console.error('query error', err.stack))
  .finally(()=>{
    pool.end(console.log("disconnected"));
  });