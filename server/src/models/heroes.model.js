
module.exports = (sequelize, Sequelize) => {
    const Heroes = sequelize.define("heroes", {
        idHeroe: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        weapon: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
              // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAT: Sequelize.DATE
        });
        
    return Heroes;
  };
