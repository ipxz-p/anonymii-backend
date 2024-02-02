import mysql from 'mysql';
const db = mysql.createConnection({
    host     : 'anonymii-db.ctqa02eea9dy.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : '13524576131Za',
    database : 'anonymii'
});
db.connect((err) => {
    if(err) {
        console.error('Error connecting to MySQL RDS: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL RDS as ID ' + db.threadId);
});
export default db