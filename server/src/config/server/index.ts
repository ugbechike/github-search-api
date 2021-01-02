import http from 'http';

import { app as server } from './server';
import { appConfig } from '../env';
import { onListening, onError } from './server-handler';

const serverInstance: http.Server = http.createServer(server);

// Binds and listens for connections on the specified host
serverInstance.listen(appConfig.port);

// Register server events
serverInstance.on('error', (error: Error): void => onError(error, appConfig.port));
serverInstance.on('listening', onListening.bind(serverInstance));
