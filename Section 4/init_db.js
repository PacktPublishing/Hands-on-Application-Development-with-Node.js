const models = require('./models');

models.sequelize
  .sync()
  .then(() => {
    // console.log('Connection has been established successfully.');

    models.User.create({firstName: 'Joris', lastName: 'Hermans', userName: 'Admin', password: 'admin'}).then((user) => {
        user.save();
        let userId = user.get('id');
        models.Question.bulkCreate([
            {text: 'how to do an update with sequelize?', userId: userId},
            {text: 'how to insert data with sequelize?', userId: userId},
            {text: 'how to work with data in sequelize?', userId: userId},
            {text: 'alternatives other then sequelize?', userId: userId},
          ]);
        user.update({userName: 'admin'});
        console.log('userId : ' + userId );
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });