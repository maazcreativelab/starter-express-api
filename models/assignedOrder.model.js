module.exports = (sequelize, Sequelize) => {
    const AssignedOrder = sequelize.define('AssignedOrder', {
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
    
        design_placement: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        customerFiles: {
            type: Sequelize.DataTypes.TEXT, // Use TEXT type to store the file details as a JSON string
            allowNull: true,
            // get() {
            //   const files = this.getDataValue('orderFiles');
            //   return files ? JSON.parse(files) : [];
            // },
            // set(files) {
            //   this.setDataValue('orderFiles', JSON.stringify(files));
            // },
        
        },
        orderFiles: {
            type: Sequelize.DataTypes.TEXT, // Use TEXT type to store the file details as a JSON string
            allowNull: true,
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
        order_priority: {

            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
      
    });


    return AssignedOrder
}