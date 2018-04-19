module.exports = function(sequelize, DataTypes) {
    
    const Answer = sequelize.define('answer', {
        text: {
            type: DataTypes.STRING,
            unique: true
        }
    });

    Answer.associate = function(models) {
        Answer.belongsTo(models.Question);
        Answer.belongsTo(models.User);
    }

    return Answer;
}