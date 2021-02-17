module.exports = function(sequelize, DataTypes) {
  const comboBonus = sequelize.define("comboBonus", {
    ComboCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ComboName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    req_bonus_ids: {
      type: DataTypes.STRING,
      allowNull: false
    },
    RallyYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return comboBonus;
};
