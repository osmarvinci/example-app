if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null;
     var fs = require('fs');
     var PGPASS_FILE = '../.pgpass';

  if (process.env.HEROKU_POSTGRESQL_ORANGE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var match = process.env.HEROKU_POSTGRESQL_ORANGE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    })
  } else {
    // the application is executed on the local machine ... use mysql
   // sequelize = new Sequelize('example-app-db', 'root', null)
  /* Local database
           We parse the .pgpass file for the connection string parameters.
        */
        var pgtokens = fs.readFileSync(PGPASS_FILE).toString().split(':');
        var host = pgtokens[0];
        var port = pgtokens[1];
        var dbname = pgtokens[2];
        var user = pgtokens[3];
        var password = pgtokens[4];
        var config =  {
            dialect:  'postgres',
            protocol: 'postgres',
            port:     port,
            host:     host,
        };
        sequelize  = new Sequelize(dbname, user, password, config); 


 }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User:      sequelize.import(__dirname + '/user')
  }
}

module.exports = global.db
