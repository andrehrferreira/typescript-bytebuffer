
export interface IConn {
    listen(host: string, port: number): void;
    disconnect(): void;
    onConnect(cb: Function): void;
    onError(cb: Function): void;
    onConnection(cb: Function): void;
}