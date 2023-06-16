

module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('Customer', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        customer_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        order_handling_email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        vector_only_email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        payment_contact_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        billing_email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        company_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        fax: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        country_code: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        machine_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        pricing_preference: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        files_required: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        currencyType: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        time_zone: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        }


    });


    return Customer
}
