import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

import fakeDatabase from './data/fakeDatabase.js';

const packageDefinition = protoLoader.loadSync('./tasks.proto');

const taskProto = grpc.loadPackageDefinition(packageDefinition);

const grpcServer = new grpc.Server();

grpcServer.addService(taskProto.TaskService.service, {
    listAll: (_, callback) => {
        callback(null, { tasks: fakeDatabase });
    },
    insert: (data, callback) => {
        const length = fakeDatabase.length;
        const { title, description } = data.request;

        if (!title || !description) {
            return callback(new Error('Validation Fails'));
        }

        const task = {
            id: length + 1,
            title, 
            description,
        }

        fakeDatabase.push(task);

        callback(null, task);
    },
    findOne: (data, callback) => {
        const { id } = data.request;

        if (!id) {
            return callback(new Error('Validation Fails'))
        }

        const task = fakeDatabase.find(value => value.id === id);

        if (!task) {
            return callback(new Error('Task not found'))
        }

        callback(null, task);
    }
});

grpcServer.bindAsync('127.0.0.1:9001', grpc.ServerCredentials.createInsecure(), () => grpcServer.start());
