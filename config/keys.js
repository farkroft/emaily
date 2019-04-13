// keys.js - figure out what set of credentials to return
// client ID
// 162820990138-add5oicq7ie9f4uejeesc6dm0t1rjfrg.apps.googleusercontent.com
// client secret
// l3NzgUMYdOWP24Bz_od181Iy

if (process.env.NODE_ENV === 'production') {
    // we are in production - return the prod set of keys
    module.exports = require('./prod');
} else {
    // we are in development - return the dev set of keys
    module.exports = require('./dev');
}