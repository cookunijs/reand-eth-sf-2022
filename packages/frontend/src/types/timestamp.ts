export interface ServerTimestampForClient {
  seconds: number;
  nanoseconds: number;
}

export interface ServerTimestampForServer {
  _seconds: number;
  _nanoseconds: number;
}
