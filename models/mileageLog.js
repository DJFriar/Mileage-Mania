module.exports = function(sequelize, DataTypes) {
  const mileageLog = sequelize.define("mileageLog", {
    bike_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    RallyYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ReportedMileage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imagePath: {
      type: DataTypes.STRING
    }
  });

  return mileageLog;
};
