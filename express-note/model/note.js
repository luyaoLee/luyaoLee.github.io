let Sequelize = require('sequelize');
let path = require('path');

const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database/database.sqlite')
});

const Note = sequelize.define('note', {
    text: {
        type: Sequelize.STRING
    }
});

Note.findAll({raw: true, where: {id: 1}}).then(notes => {
    console.log(notes)
});

module.exports = Note;
