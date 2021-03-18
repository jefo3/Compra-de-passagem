const pg = require('pg');

const config = 'postgres://eaisfsau:1hcEEBEiRwzxp99-QSEyMAwp7bnrD3uG@queenie.db.elephantsql.com:5432/eaisfsau';

const client = new pg.Client(config);

client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].theTime);
      // >> output: 2018-08-23T14:02:57.117Z
      //client.end();
    });
  });

module.exports = client

