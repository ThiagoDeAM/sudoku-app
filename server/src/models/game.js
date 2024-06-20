const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Game extends Model {
        static associate(models) {
            Game.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
        }
    }

    Game.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        completionTime: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Game',
        tableName: 'Games'
    });

    return Game;
};