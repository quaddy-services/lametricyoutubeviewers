// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express');

// http://stackoverflow.com/questions/18814221/adding-timestamps-to-all-console-messages
// add timestamps in front of log messages
// require('console-stamp')(console, '[HH:MM:ss.l]');
// https://www.npmjs.com/package/log-timestamp
require('log-timestamp');

// https://blog.risingstack.com/node-hero-node-js-request-module-tutorial/
const requestpromise = require('request-promise');

const app = express();

app.get('/info', (req, res) => {
  for(var item in req.headers) {
    console.log('info:'+item + ": " + req.headers[item]);
  };
   console.log('info:'+'req.url='+req.url);
  console.log('info:'+'req.query='+req.query);
   console.log('info:'+'req.path='+req.path);
   console.log('info:'+'req.query.id='+req.query.id);
   
  for(var item in req.params) {
    console.log('info:'+item + ": " + req.params[item]);
  };
});

// [START hello_world]
// Say hello
app.get('/', (req, res) => {
  for(var item in req.headers) {
    console.log(item + ": " + req.headers[item]);
  };
  console.log(' req.headers.accept='+ req.headers["accept"]);
  console.log(' req.header.accept='+ req.header("accept"));
   console.log(' req.headers.Authentication='+ req.headers["Authentication"]);
   console.log(' req.header.Authentication='+ req.header.Authentication);
   console.log('req.path='+req.path);
   console.log('req.query.id='+req.query.id);

 // https://blog.risingstack.com/node-hero-node-js-request-module-tutorial/
 requestpromise({
    uri: 'https://content.googleapis.com/youtube/v3/channels',
    // uri: 'http://localhost:8080/info',
    headers: {
      'User-Agent': req.headers['user-agent'],
      'accept' : req.headers["accept"],
       'Authentication':req.headers["Authentication"],
       'auth':req.headers["auth"]
    },
    qs: {
      part: 'statistics',
      id: req.query.id //,
     // apiKey: 'api-key'
         // Use your accuweather API key here
    },
     resolveWithFullResponse: true
    // json: true
  })
    .then((response) => {
      console.log("Response.statusCode=%d", response.acceptstatusCode);
       console.log("response="+ response);
      console.log("response.data="+ response.data);
      var info = JSON.parse(body);
      console.log("JSON="+info);
      // https://developers.google.com/youtube/v3/docs/channels#resource
      console.log("info.statistics.viewCount"+info.statistics.viewCount);
      // TODO res.render('index', data)
      var tempText = info.statistics.viewCount+" Views";
      res.status(200).send(JSON.stringify({frames:[{text:tempText,icon:"i3221",index:0}]}));
    })
    .catch((err) => {
      console.log(err);
      // res.status(err.statusCode).send(err.data);
      // TODO res.render('error')
      var tempText = "41 Views";
      res.status(200).send(JSON.stringify({frames:[{text:tempText,icon:"i3221",index:0}]})); 
   });


//   var result="";
//   result += "{";
// result += '    "frames": [';
// result += '        {';
// result += '            "text": "'+'43 Views'+'",';
// result += '            "icon": "i3221",';
// result += '            "index": 0';
// result += '        }';
// result += '    ]';
// result += '}';

//   res.status(200).send(result);

// TODO 
// https://content.googleapis.com/youtube/v3/channels?part=statistics
//  
// OAuth2
// Client ID: 714112737572-45bs6edijgf21s8it0pil6q0b4fkmil9.apps.googleusercontent.com
// Client Secret: lM_uxkZarR7iWK6F2DVi6kX3
// Scope: https://www.googleapis.com/auth/youtube
// Authentication URL: https://accounts.google.com/o/oauth2/auth
// Redirect URI: http://lametric.com/redirect
// Token URL: https://accounts.google.com/o/oauth2/token

});
// [END hello_world]

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
