module.exports = function(sequelize, DataTypes) {
    
    const User = sequelize.define('user', {
        userName: {
            type: DataTypes.STRING,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    })

    return User;
}