import clientGRPC from './clientGRPC.js';

function callback(err, result) {
    if (err) {
        throw err;
    }

    console.log(result)
}

clientGRPC.listAll({}, callback)