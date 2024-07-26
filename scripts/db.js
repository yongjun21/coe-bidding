const { Pool } = require('pg');
const pool = new Pool();

exports.listRealtimeStatus = function () {
  return pool
    .query(
      `SELECT * FROM realtime_status ORDER BY month desc, exercise desc, vehicle_category, timestamp desc`
    )
    .then(res => res.rows);
};

exports.listBiddingResults = function () {
  return pool
    .query(
      `SELECT * FROM bidding_results ORDER BY month desc, exercise desc, vehicle_category`
    )
    .then(res => res.rows);
}
