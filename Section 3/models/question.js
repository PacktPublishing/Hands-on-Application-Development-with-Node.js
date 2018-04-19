module.exports = function(sequelize, DataTypes) {

    const Question = sequelize.define('question', {
        text: {
            type: DataTypes.STRING,
            unique: true
        }
    })

    Question.associate = function(models) {
        Question.belongsTo(models.User);
        Question.hasMany(models.Answer);
    }

    return Question;
}