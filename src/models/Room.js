module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Room', {
        id: {
            type: DataTypes.STRING(50),
            primaryKey: true,
        },
        doctor: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        field: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        people: {
            type: DataTypes.INTEGER(),
            defaultValue: 1,
        }
    }, {
        timestamps: false,
    })
};
