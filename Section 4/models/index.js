const Sequelize = require('sequelize');

//Setting up the config
var sequelize = new Sequelize('qanda', 'root', '12345', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

const models = {
    Question: sequelize.import('./question'),
    Answer: sequelize.import('./answer'),
    User: sequelize.import('./user')
}

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
})

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;