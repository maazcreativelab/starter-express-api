module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('Order', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        design_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            defaultValue:'N/A'
        },
        order_type: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        design_placement: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        orderFiles: {
            type: Sequelize.DataTypes.TEXT, // Use TEXT type to store the file details as a JSON string
            allowNull: false,
            get() {
              const files = this.getDataValue('orderFiles');
              return files ? JSON.parse(files) : [];
            },
            set(files) {
              this.setDataValue('orderFiles', JSON.stringify(files));
            },
        
        },
        color_preference: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        garment_material: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        dimension: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        instruction: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        email_send_copy: {

            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        order_priority: {

            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        order_status: {

            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            defaultValue:'pending'

        },
        payment_status: {

            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            defaultValue:'unpaid'

        },
        price: {

            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            defaultValue:'$ 0.00 (USD)'

        },

    });


    return Order
}