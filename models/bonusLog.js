module.exports = function(sequelize, DataTypes) {
  const bonusLog = sequelize.define("bonusLog", {
    rider_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bike_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    incExtraMile: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return bonusLog;
};
