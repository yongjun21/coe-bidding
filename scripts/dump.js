const path = require('path');
require('dotenv').config({ override: true, path: path.resolve(__dirname, '../.env.local') });

const googleapis = require('@st-graphics/googleapis');

const { listRealtimeStatus, listBiddingResults } = require('./db');

listRealtimeStatus()
  .then(data => {
    data.forEach(d => {
      d.timestamp = new Date(d.timestamp).valueOf();
    });
    return writeToGSheet('Realtime', data);
  })
  .catch(console.error);

listBiddingResults()
  .then(data => {
    return writeToGSheet('Bidding Results', data);
  })
  .catch(console.error);

function writeToGSheet(name, data) {
  if (!data.length) return;
  googleapis.sheets.spreadsheets.values
    .upload({
      spreadsheetId: '1qs-ZQirf9PhiiO5ZAxRXXqEfAK_mxs3G9rEJP1SDZbw',
      range: `${name}!A1`,
      resource: { fields: Object.keys(data[0]), data },
      valueInputOption: 'USER_ENTERED'
    })
    .then(res => console.log(res.data))
    .catch(console.error);
}
