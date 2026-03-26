export = OratorServiceServerBase;
/**
 * @template [TRequest=any]
 * @template [TResponse=any]
 * @typedef {(pRequest: TRequest, pResponse: TResponse, fNext: (pError?: Error) => void) => void} RequestHandler
 */
/**
 * A route handler type that accepts either a single request handler or an array of request handlers.
 * This accommodates frameworks like restify where middleware (e.g. bodyParser) returns an array of handlers.
 *
 * @template [TRequest=any]
 * @template [TResponse=any]
 * @typedef {RequestHandler<TRequest, TResponse> | RequestHandler<TRequest, TResponse>[]} RouteHandler
 */
/**
 * OratorServiceServerBase class represents the base class for the Orator service server.
 * It provides basic functionality for handling what is usually an HTTP service's lifecycle, content parsing, and route creation.
 * Derived classes can override the base functions to implement specific handlers (e.g. restify or express).
 *
 * @class
 * @template [TRequest=any] - The request type for the concrete server implementation.
 * @template [TResponse=any] - The response type for the concrete server implementation.
 * @template [TServer=any] - The server type for the concrete server implementation.
 */
declare class OratorServiceServerBase<TRequest = any, TResponse = any, TServer = any> extends libFableServiceProviderBase {
    /**
     * @param {import('fable')|Record<string, any>} [pFable] - (optional) The fable instance, or the options object if there is no fable
     * @param {Record<string, any>|string} [pOptions] - (optional) The options object, or the service hash if there is no fable
     * @param {string} [pServiceHash] - (optional) The service hash to identify this service instance
     */
    constructor(pFable?: any | Record<string, any>, pOptions?: Record<string, any> | string, pServiceHash?: string);
    ServiceServerType: string;
    Name: any;
    URL: string;
    Port: any;
    Active: boolean;
    /**
     * Listens for network calls on the specified port (or starts a virtual serviceserver for that "port").
     * @param {number} pPort - The port number to listen on.
     * @param {(pError?: Error) => void} fCallback - The callback function to execute after listening.
     * @return {any} The result of the callback function.
     */
    listen(pPort: number, fCallback: (pError?: Error) => void): any;
    /**
     * Closes the service server.
     *
     * @param {(pError?: Error) => any} fCallback - The callback function to be executed after closing the server.
     * @return {any} - The result of the callback function.
     */
    close(fCallback: (pError?: Error) => any): any;
    /*************************************************************************
     * End of Service Lifecycle Functions
     */
    /**
     * Middleware function for parsing the request body.
     *
     * @param {Record<string, any>} [pOptions] - The options for the body parser.
     * @return {RequestHandler<TRequest, TResponse> | RequestHandler<TRequest, TResponse>[]} - The middleware function.
     */
    bodyParser(pOptions?: Record<string, any>): RequestHandler<TRequest, TResponse> | RequestHandler<TRequest, TResponse>[];
    /*************************************************************************
     * End of Service Lifecycle Functions
     */
    /**
     * Registers a global handler function to be used by the Orator service server.
     *
     * @param {RequestHandler<TRequest, TResponse>} fHandlerFunction - The handler function to be registered. It should have the prototype function(Request, Response, Next).
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    use(fHandlerFunction: RequestHandler<TRequest, TResponse>): any;
    /**
     * Registers a global handler function to be used by the Orator service server that runs before routing.
     *
     * @param {RequestHandler<TRequest, TResponse>} fHandlerFunction - The handler function to be registered. It should have the prototype function(Request, Response, Next).
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    pre(fHandlerFunction: RequestHandler<TRequest, TResponse>): any;
    /**
     * Handles HTTP GET requests -- this is a base function that does nothing; override by the serviceserver is expected.
     *
     * @param {string} pRoute - The route of the request.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doGet(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * Maps a GET request handler for the specified route.
     *
     * @param {string} pRoute - The route to handle GET requests for.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to be executed for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    get(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * A helper method that maps a GET request method with a body parser middleware.
     *
     * @param {string} pRoute - The route path.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The route processing functions.
     * @returns {any} - Result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    getWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * Handles HTTP PUT requests -- this is a base function that does nothing; override by the serviceserver is expected.
     *
     * @param {string} pRoute - The route to handle.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doPut(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * Maps a PUT request handler for the specified route.
     *
     * @param {string} pRoute - The route to be mapped.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to be executed for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    put(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * A helper method that maps a PUT request method with a body parser middleware.
     *
     * @param {string} pRoute - The route to send the PUT request to.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - Optional route processing functions.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    putWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * Handles the HTTP POST request for a specific route.
     *
     * @param {string} pRoute - The route to handle the POST request for.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doPost(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * Maps a POST request handler for the specified route.
     *
     * @param {string} pRoute - The route to send the POST request to.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to be executed for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    post(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * A helper method that maps a POST request method with a body parser middleware.
     *
     * @param {string} pRoute - The route to handle the POST request for.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    postWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * Handles HTTP DELETE requests -- this is a base function that does nothing; override by the serviceserver is expected.
     *
     * @param {string} pRoute - The route of the resource to delete.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to be executed to delete the resource.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doDel(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * Maps a DEL request handler for the specified route.
     *
     * @param {string} pRoute - The route to map the delete function to.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The additional processing functions to execute
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    del(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * A helper method that maps a DEL request method with a body parser middleware.
     *
     * @param {string} pRoute - The route path for the DELETE request.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - Additional route processing functions.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    delWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * Handles HTTP PATCH requests -- this is a base function that does nothing; override by the serviceserver is expected.
     *
     * @param {string} pRoute - The route to send the PATCH request to.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to apply to the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doPatch(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * Maps a PATCH request handler for the specified route.
     *
     * @param {string} pRoute - The route mapping.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The route processing functions.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    patch(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * A helper method that maps a PATCH request method with a body parser middleware.
     *
     * @param {string} pRoute - The route to map.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - Route processing functions.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    patchWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * Handles HTTP OPT requests -- this is a base function that does nothing; override by the serviceserver is expected.
     *
     * @param {string} pRoute - The route.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to apply to the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doOpts(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * Maps a OPT request handler for the specified route.
     *
     * @param {string} pRoute - The route to be mapped.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    opts(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * A helper method that maps a OPT request method with a body parser middleware.
     * @param {string} pRoute - The route path.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The route processing functions.
     * @returns {Object} - The result of the opts method.
     */
    optsWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * Handles HTTP HEAD requests -- this is a base function that does nothing; override by the serviceserver is expected.
     *
     * @param {string} pRoute - The route to handle the HEAD request for.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doHead(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * Maps a HEAD request handler for the specified route.
     *
     * @param {string} pRoute - The route to handle the HEAD request for.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    head(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /**
     * A helper method that combines the HEAD method with the bodyParser middleware.
     *
     * @param {string} pRoute - The route path for the HEAD request.
     * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - Optional route processing functions.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    headWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: RouteHandler<TRequest, TResponse>[]): any;
    /*************************************************************************
     * End of Service Route Creation Functions
     */
    /**
     * Serve static files from a directory -- this is a base function that uses serve-static;
     * derived classes can override to use their own static file serving implementation (e.g. restify's built-in serveStatic plugin).
     *
     * @param {string} pRoute - The route to serve static files on.
     * @param {Object} pOptions - Options for the static file server.
     * @param {string} pOptions.directory - The directory to serve files from.
     * @param {string} [pOptions.default] - The default file to serve (e.g. 'index.html').
     * @returns {boolean} - Returns false in the base class; override in derived classes.
     */
    serveStatic(pRoute: string, pOptions: {
        directory: string;
        default?: string;
    }): boolean;
    /**
     * Invokes a method on the service server programmatically -- expects to be overloaded by the service provider.
     *
     * @param {string} pMethod - The method to invoke.
     * @param {string} pRoute - The route to invoke the method on.
     * @param {any} pData - The data to pass to the method.
     * @param {Function} fCallback - The callback function to execute after the method is invoked.
     * @returns {boolean} - Returns true if the method was successfully invoked, false otherwise.
     */
    invoke(pMethod: string, pRoute: string, pData: any, fCallback: Function): boolean;
}
declare namespace OratorServiceServerBase {
    export { RequestHandler, RouteHandler };
}
import libFableServiceProviderBase = require("fable-serviceproviderbase");
type RequestHandler<TRequest = any, TResponse = any> = (pRequest: TRequest, pResponse: TResponse, fNext: (pError?: Error) => void) => void;
/**
 * A route handler type that accepts either a single request handler or an array of request handlers.
 * This accommodates frameworks like restify where middleware (e.g. bodyParser) returns an array of handlers.
 */
type RouteHandler<TRequest = any, TResponse = any> = RequestHandler<TRequest, TResponse> | RequestHandler<TRequest, TResponse>[];
//# sourceMappingURL=Orator-ServiceServer-Base.d.ts.map