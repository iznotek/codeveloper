const connection = require('../mysql');
const findOrCreate = (userInfo, callback) => {
    const sql = `SELECT * FROM members WHERE user_id = '${userInfo.user_id}'`;
    connection.query(sql, (err,users) => {
        if(users[0]) return callback(null, userInfo);
        else {
            const sql = `INSERT INTO members(user_id, user_name, user_avatar) VALUES('${userInfo.user_id}', '${userInfo.user_name}','${userInfo.user_avatar}')`;
            connection.query(sql, (err) => {
                if(err) {
                    console.log(err);
                    return callback(false, null);
                }
                return callback(null, userInfo);
            })
        }
    });
    
}

module.exports = {
    findOrCreate
}