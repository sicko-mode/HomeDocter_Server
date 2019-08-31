module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Patient', {
        id: {
            type: DataTypes.STRING(20),
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
};
