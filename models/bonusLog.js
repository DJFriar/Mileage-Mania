module.exports = function(sequelize, DataTypes) {
  const bonusLog = sequelize.define("bonusLog", {
    bike_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bonus_id: {
      type: DataTypes.INTEGER
    },
    odoValue: {
      type: DataTypes.INTEGER
    },
    imageName: {
      type: DataTypes.STRING
    },
    iStatus: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return bonusLog;
};
