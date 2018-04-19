const models = require('./models');

models.sequelize
  .sync()
  .then(() => {
    // console.log('Connection has been established successfully.');
    return models.sequelize.transaction(function (t) {
        // chain all your queries here. make sure you return them.
       return models.Question.create({
           text: 'What is a managed transaction?'
       }, {transaction: t}).then((question) => {
            return models.Answer.create({
                text: 'Execute multiple queries, and when one fails we do a rollback.',
                questionId: question.get('id')
            }, {transaction: t});
       });
      }).then(function (result) {
          // Transaction has been committed
          // result is whatever the result of the promise chain returned to the transaction callback
      }).catch(function (err) {
          console.log(err);
          // Transaction has been rolled back
          // err is whatever rejected the promise chain returned to the transaction callback
      });
    
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });