const db = require("../models");
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

module.exports.queryUserRights = async function queryUserRights(user) {
  try {
    var result = await db.user.findAll({
      where: {
        id: user
      }
    })
    return result;
  } catch (err) {
    throw err;
  }
}

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

module.exports.queryPendingBonusDetail = async function queryPendingBonusDetail(id) {
  try {
    var result = await db.bonusItem.findAll({
      where: {
        id: id
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

module.exports.queryHandledSubmissions = async function queryHandledSubmissions(limit) {
  try {   
    var result = await sequelize.query("SELECT bl.*, bi.BonusCode, bi.BonusName, bi.Value, u.FirstName, u.LastName, u.UserName, u.FlagNumber, u.isActive, u.isAdmin FROM bonusLogs bl LEFT JOIN bonusItems bi ON bi.id = bl.bonus_id INNER JOIN users u ON u.id = bl.user_id WHERE bl.iStatus != 0 ORDER BY bl.updatedAt DESC LIMIT ?",
    {
      replacements: [limit],
      type: QueryTypes.SELECT
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// module.exports.queryHandledSubmissions = async function queryHandledSubmissions() {
//   try {
//     var result = await db.bonusLog.findAll({
//       limit: 4,
//       where: {
//         iStatus: [1, 2]
//       },
//       order: [
//         ['updatedAt', 'DESC']
//       ]
//     })
//     return result;
//   } catch (err) {
//     throw err;
//   }
// }

module.exports.queryCompletedIDsByRider = async function queryCompletedIDsByRider(rider) {
  try {
    // const result = await db.bonusLog.findAll({
    //   attributes: ["bonus_id"],
    //   where: {
    //     user_id: rider,
    //     iStatus: 1,
    //     bonus_id: {
    //       [Op.not]: null
    //     } 
    //   }
    // }).map(i => i.get("bonus_id"));
    var result = await sequelize.query("SELECT bonus_id FROM bonusLogs WHERE bonus_id IS NOT NULL AND iStatus = 1 AND user_id = ?",
    {
      replacements: [rider],
      type: QueryTypes.SELECT
    });
    var ids = JSON.stringify(result);
    return ids;
  } catch (err) {
    throw err;
  }
}

module.exports.querySubmissionsByRider = async function querySubmissionsByRider(rider) {
  try {
    var result = await sequelize.query("SELECT bl.*, bi.BonusCode, bi.BonusName, bi.Value, u.FirstName, u.LastName, u.UserName, u.FlagNumber, u.isActive, u.isAdmin FROM bonusLogs bl LEFT JOIN bonusItems bi ON bi.id = bl.bonus_id INNER JOIN users u ON u.id = bl.user_id WHERE bl.user_id = ? ORDER BY bl.updatedAt DESC LIMIT 10",
    {
      replacements: [rider],
      type: QueryTypes.SELECT
    });
    return result;
  } catch (err) {
    throw err;
  }
}