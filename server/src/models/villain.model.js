module.exports = (sequelize, Sequelize) => {
    const Villain = sequelize.define("villain", {
        idVillain: {
            type: Sequelize.INTEGER,
            primaryKey: true
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
        idVillain: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        }
        });
  
    return Villain;
  };