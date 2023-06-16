

module.exports = (sequelize, Sequelize) => {
    const Digitizer = sequelize.define('Digitizer', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        salary: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        commissionType: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        commission: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        contractDetails: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        smsNumber: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        dateOfJoining: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        }


    });


    return Digitizer
}
