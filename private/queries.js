const db = require("../models")

module.exports.queryAllBonusItems = async function queryAllBonusItems(id = false) {
  try {
    if (id) {
      var result = await db.bonusItem.findAll({
        raw: true,
        where: {
          id: id
        }
      })
    } else {
      var result = await db.bonusItem.findAll({
        raw: true,
      })
    }

    return result;
  } catch (err) {
    throw err;
  }
}

module.exports.queryAllRiders = async function queryAllRiders(rider = false) {
  try {
    if (rider) {
      var result = await db.User.findAll({
        raw: true,
        where: {
          id: rider
        }
      })
    } else {
      var result = await db.User.findAll({
        raw: true,
      })
    }
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports.queryAllBikes = async function queryAllBikes(rider = false) {
  try {
    if (rider) {
      var result = await db.Bike.findAll({
        raw: true,
        where: {
          user_id: rider
        }
      })
    } else {
      var result = await db.Bike.findAll({
        raw: true
      })
    }
    return result;
  } catch (err) {
    throw err;
  }
}