const { v4: uuidv4 } = require('uuid');


function createSession() {
    return uuidv4.toString();
}
 
module.exports = createSession;
