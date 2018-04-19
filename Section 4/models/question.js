module.exports = function(sequelize, DataTypes) {

    const Question = sequelize.define('question', {
        text: {
            type: DataTypes.STRING,
            unique: true
        },
        count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })

    Question.associate = function(models) {
        Question.belongsTo(models.User);
        Question.hasMany(models.Answer);
    }

    return Question;
}