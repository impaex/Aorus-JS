const steamServerQuery = require("steam-server-query");

steamServerQuery.queryGameServerInfo('62.45.80.169:13002', 3, 2000).then(infoResponse => {
    console.log(infoResponse);
}).catch(err => {
    console.log(err);
});

steamServerQuery.queryGameServerRules('62.45.80.169:13002', 3, 2000).then(infoResponse => {
    console.log(infoResponse);
}).catch(err => {
    console.log(err);
});