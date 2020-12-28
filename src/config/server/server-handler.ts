import {Address} from "cluster";
import {appLogger} from "../../utils/api-logger";

export async function onListening(this: unknown | any): Promise<void> {
  const addr: Address = this.address();
  const bind: string = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  appLogger.info(`Listening on ${bind}`);
}


export function onError(error: NodeJS.ErrnoException, port: number | string | boolean): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind: string = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      appLogger.error(`${bind} requires elevated privileges`);
      process.exit(1);

      break;
    case 'EADDRINUSE':
      appLogger.error(`${bind} is already in use`);
      process.exit(1);

      break;
    default:
      throw error;
  }
}
