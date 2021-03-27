const db = require("../models");
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

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

module.exports.queryAllBonusesWithStatus = async function queryAllBonusesWithStatus(rider) {
  try {
    var result = await sequelize.query("SELECT * FROM bonusItems bi INNER JOIN bonusLogs bl ON bi.id = bl.bonus_id WHERE iStatus != 0 AND bl.user_id = ?",
      {
        replacements: [rider],
        type: QueryTypes.SELECT
      });
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports.queryAllRiders = async function queryAllRiders(rider = false) {
  try {
    if (rider) {
      var result = await db.user.findAll({
        raw: true,
        where: {
          id: rider
        }
      })
    } else {
      var result = await db.user.findAll({
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
      var result = await db.bike.findAll({
        raw: true,
        where: {
          user_id: rider
        }
      })
    } else {
      var result = await db.bike.findAll({
        raw: true
      })
    }
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports.queryPendingSubmissionCount = async function queryPendingSubmissionCount() {
  try {
    var pendingBonuses = await db.bonusLog.count({
      where: {
        iStatus: 0
      }
    })
    return pendingBonuses;
  } catch (err) {
    throw err;
  }
}

module.exports.queryPendingSubmissions = async function queryPendingSubmissions() {
  try {
    var result = await db.bonusLog.findAll({
      where: {
        iStatus: 0
      }
    })
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports.queryPendingRiderInfo = async function queryPendingRiderInfo(rider) {
  try {
    var result = await db.user.findAll({
      where: {
        id: rider
      }
    })
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports.queryPendingBikeInfo = async function queryPendingBikeInfo(rider) {
  try {
    var result = await db.bike.findAll({
      where: {
        user_id: rider
      }
    })
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports.queryCompletedByRider = async function queryCompletedByRider(rider) {
  try {
    var result = await db.bonusLog.findAll({
      where: {
        user_id: rider,
        [Op.not]: { iStatus: [0, 2] }
      }
    })
    return result;
  } catch (err) {
    throw err;
  }
}