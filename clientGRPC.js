import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync('tasks.proto');

const taskProto = grpc.loadPackageDefinition(packageDefinition);

const client = new taskProto.TaskService('127.0.0.1:9001', grpc.credentials.createInsecure());

export default client;