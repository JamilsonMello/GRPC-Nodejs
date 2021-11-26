import clientGRPC from './clientGRPC.js';

function callback(err, result) {
    if (err) {
        console.log(err); ;
    }

    console.log(result)
}

const task = {
    title: 'Test4',
    description: 'descrição4'
}

clientGRPC.insert(task, callback)