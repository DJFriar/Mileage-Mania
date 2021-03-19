module.exports = function(sequelize, DataTypes) {
  const bonusItem = sequelize.define("bonusItem", {
    BonusCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    BonusName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    BonusDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    BonusRequirements: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxAllowed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RallyYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hasExtraMile: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    ExtraMileRequirements: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ExtraMileValue: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  return bonusItem;
};
