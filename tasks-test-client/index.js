var mysql      = require('mysql'); 
// More on how to use this package here: https://github.com/mysqljs/mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin123',
  database : 'testdb'
});


var USERSDML = "CREATE TABLE IF NOT EXISTS users (\
    user_id INT AUTO_INCREMENT PRIMARY KEY,\
    name VARCHAR(255) NOT NULL,\
    email VARCHAR(255) NOT NULL,\
    status TINYINT NOT NULL,\
    description TEXT,\
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\
) ENGINE=INNODB"

var TASKSDML = "CREATE TABLE IF NOT EXISTS tasks (\
    task_id INT AUTO_INCREMENT,\
    user_id INT,\
    title VARCHAR(255) NOT NULL,\
    start_date DATE,\
    due_date DATE ,\
    status TINYINT NOT NULL,\
    priority TINYINT NOT NULL,\
    description TEXT,\
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
    PRIMARY KEY (task_id, user_id),\
    FOREIGN KEY (user_id)\
		REFERENCES users (user_id)\
        ON UPDATE RESTRICT ON DELETE CASCADE\
)  ENGINE=INNODB"

//pre defined set of users to which we will create, update or delete tasks
let USERS = ['John', 'Jane', 'Bob', 'Charles', 'Maria', 'Tod', 'Tom', 'Riddle', 'Harry', 'Potter', 'Penelope', 'Cruz']


function init () {

    // Create predifined users into DB
    connection.query(USERSDML, function (error, results, fields) {
        if (error) throw error;
    })
    let createUsersSql = USERS.map(e => `insert into users (name, email, status, description) values ('${e}', '${e}@domain.com', 1, 'The user record for ${e}')`)
    createUsersSql.map( e => connection.query(e,function (error, results, fields) {
    if (error) throw error;
    }))

    // Create tasks table
    connection.query(TASKSDML, function (error, results, fields) {
    if (error) throw error;
    })
}

var numActionsPerformed = 0
function incrementActions (num) {
    numActionsPerformed += num
}

function createRandomTasks (numActions) {
    const randomUser = Math.floor(Math.random() * USERS.length)
    let CREATESQL = `insert into tasks \
    (user_id, title, status, priority, description, start_date, due_date) \
    values \
    (${randomUser+1}, \
     'Auto generated tasks by a bot', 0, 2, \
     'This tasks was created by a bot. Assigned to user ${USERS[randomUser]} as a test. Ignore or delete it',\
     NOW(),\
     DATE_ADD(NOW(), INTERVAL ${Math.floor(Math.random() * 100)} DAY))`
    let DELETESQL = `delete from tasks where priority = 1 and user_id = ${randomUser}`
    let UPDATESQL = 'update tasks set due_date = DATE_ADD(due_date, INTERVAL 1 DAY) LIMIT 1'
    let availableActions = [CREATESQL, DELETESQL, UPDATESQL]
    let actionMapper = ['CREATE', 'DELETE', 'UPDATE']
    
    // Always create at least one taks for a random user
    connection.query(availableActions[0], function (error, results, fields) {
        if (error) throw error;
        incrementActions(results.affectedRows)
    })

    // now we can create any number of random actions for this user
    for( let i=0; i < numActions-1 ; i++ ) {
        let action = Math.floor(Math.random() * 3)
        connection.query(availableActions[action], function (error, results, fields) {
            if (error) throw error;
            incrementActions(results.affectedRows)
        })
    }
}

function generateData(timeGenerationOfsetinSeconds) {
    const rndInt = Math.floor(Math.random() * 10)
    const numTasks2Generate = Math.floor(Math.random() * 10)

    setTimeout(() => {
        createRandomTasks(numTasks2Generate)
        generateData(timeGenerationOfsetinSeconds)
        console.log(`Generated ${numActionsPerformed} operations on tasks so far. Waiting for next schedule of random actions ...`)
    }, rndInt * 1100)
}

init()

generateData(2000);


process.on('SIGINT', function() {
    console.log("... cleaning up before exiting ...")
    connection.end()
    process.exit()
});

