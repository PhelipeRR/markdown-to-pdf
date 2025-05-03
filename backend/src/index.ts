leOperations';
import { LinkedEditingRangeMiddleware } from './linkedEditingRange';
import * as c2p from './codeConverter';
import * as p2c from './protocolConverter';
interface ConnectionOptions {
    cancellationStrategy: CancellationStrategy;
    maxRestartCount?: number;
}
/**
 * An action to be performed when the connection is producing errors.
 */
export declare enum ErrorAction {
    /**
     * Continue running the server.
     */
    Continue = 1,
    /**
     * Shutdown the server.
     */
    Shutdown = 2
}
/**
 * An action to be performed when the connection to a server got closed.
 */
export declare enum CloseAction {
    /**
     * Don't restart the server. The connection stays closed.
     */
    DoNotRestart = 1,
    /**
     * Restart the server.
     */
    Restart = 2
}
/**
 * A plugable error handler that is invoked when the connection is either
 * producing errors or got closed.
 */
export interface ErrorHandler {
    /**
     * An error has occurred while writing or reading from the connection.
     *
     * @param error - the error received
     * @param message - the message to be delivered to the server if know.
     * @param