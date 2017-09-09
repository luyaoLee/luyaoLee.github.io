let Sequelize = require('sequelize');

const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: '../database/database.sqlite'
});
// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
// }).catch(err => {
//     console.error('Unable to connect to the database:', err);
// });

const Note = sequelize.define('note', {
    text: {
        type: Sequelize.STRING
    }
});

Note.sync().then(function() {
    Note.create({text: 'hello'});
}).then(function() {
    Note.findAll({raw: true}).then(notes => {
        console.log(notes)
    })
});
