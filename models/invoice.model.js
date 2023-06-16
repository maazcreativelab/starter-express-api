module.exports = (sequelize, Sequelize) => {
    const Invoice = sequelize.define('Invoice', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
        payment_date: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        payment_method: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        amount_paid: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },

    });


    return Invoice
}