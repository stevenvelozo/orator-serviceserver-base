export = OratorServiceServerBase;
/**
 * @typedef {(pRequest: any, pResponse: any, fNext: (pError?: Error) => void) => void} RequestHandler
 */
/**
 * OratorServiceServerBase class represents the base class for the Orator service server.
 * It provides basic functionality for handling what is usually an HTTP service's lifecycle, content parsing, and route creation.
 * Derived classes can override the base functions to implement specific handlers (e.g. restify or express).
 *
 * @class
 */
declare class OratorServiceServerBase extends libFableServiceProviderBase {
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
     * @return {RequestHandler} - The middleware function.
     */
    bodyParser(pOptions?: Record<string, any>): RequestHandler;
    /*************************************************************************
     * End of Service Lifecycle Functions
     */
    /**
     * Registers a global handler function to be used by the Orator service server.
     *
     * @param {RequestHandler} fHandlerFunction - The handler function to be registered. It should have the prototype function(Request, Response, Next).
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    use(fHandlerFunction: RequestHandler): any;
    /**
     * Registers a global handler function to be used by the Orator service server that runs before routing.
     *
     * @param {function} fHandlerFunction - The handler function to be registered. It should have the prototype function(Request, Response, Next).
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    pre(fHandlerFunction: Function): any;
    /**
     * Handles HTTP GET requests -- this is a base function that does nothing; override by the serviceserver is expected.
     *
     * @param {string} pRoute - The route of the request.
     * @param {...Function} fRouteProcessingFunctions - The processing functions for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doGet(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * Maps a GET request handler for the specified route.
     *
     * @param {string} pRoute - The route to handle GET requests for.
     * @param {...Function} fRouteProcessingFunctions - The processing functions to be executed for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    get(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * A helper method that maps a GET request method with a body parser middleware.
     *
     * @param {string} pRoute - The route path.
     * @param {...Function} fRouteProcessingFunctions - The route processing functions.
     * @returns {any} - Result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    getWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * Handles HTTP PUT requests -- this is a base function that does nothing; override by the serviceserver is expected.
     *
     * @param {string} pRoute - The route to handle.
     * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doPut(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * Maps a PUT request handler for the specified route.
     *
     * @param {string} pRoute - The route to be mapped.
     * @param {...Function} fRouteProcessingFunctions - The processing functions to be executed for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    put(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * A helper method that maps a PUT request method with a body parser middleware.
     *
     * @param {string} pRoute - The route to send the PUT request to.
     * @param {...Function} fRouteProcessingFunctions - Optional route processing functions.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    putWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * Handles the HTTP POST request for a specific route.
     *
     * @param {string} pRoute - The route to handle the POST request for.
     * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doPost(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * Maps a POST request handler for the specified route.
     *
     * @param {string} pRoute - The route to send the POST request to.
     * @param {...Function} fRouteProcessingFunctions - The processing functions to be executed for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    post(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * A helper method that maps a POST request method with a body parser middleware.
     *
     * @param {string} pRoute - The route to handle the POST request for.
     * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    postWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * Handles HTTP DELETE requests -- this is a base function that does nothing; override by the serviceserver is expected.
     *
     * @param {string} pRoute - The route of the resource to delete.
     * @param {...Function} fRouteProcessingFunctions - The processing functions to be executed to delete the resource.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doDel(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * Maps a DEL request handler for the specified route.
     *
     * @param {string} pRoute - The route to map the delete function to.
     * @param {...Function} fRouteProcessingFunctions - The additional processing functions to execute
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    del(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * A helper method that maps a DEL request method with a body parser middleware.
     *
     * @param {string} pRoute - The route path for the DELETE request.
     * @param {...Function} fRouteProcessingFunctions - Additional route processing functions.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    delWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * Handles HTTP PATCH requests -- this is a base function that does nothing; override by the serviceserver is expected.
     *
     * @param {string} pRoute - The route to send the PATCH request to.
     * @param {...Function} fRouteProcessingFunctions - The processing functions to apply to the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doPatch(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * Maps a PATCH request handler for the specified route.
     *
     * @param {string} pRoute - The route mapping.
     * @param {...Function} fRouteProcessingFunctions - The route processing functions.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    patch(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * A helper method that maps a PATCH request method with a body parser middleware.
     *
     * @param {string} pRoute - The route to map.
     * @param {...Function} fRouteProcessingFunctions - Route processing functions.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    patchWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * Handles HTTP OPT requests -- this is a base function that does nothing; override by the serviceserver is expected.
     *
     * @param {string} pRoute - The route.
     * @param {...Function} fRouteProcessingFunctions - The processing functions to apply to the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doOpts(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * Maps a OPT request handler for the specified route.
     *
     * @param {string} pRoute - The route to be mapped.
     * @param {...Function} fRouteProcessingFunctions - The processing functions for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    opts(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * A helper method that maps a OPT request method with a body parser middleware.
     * @param {string} pRoute - The route path.
     * @param {...Function} fRouteProcessingFunctions - The route processing functions.
     * @returns {Object} - The result of the opts method.
     */
    optsWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * Handles HTTP HEAD requests -- this is a base function that does nothing; override by the serviceserver is expected.
     *
     * @param {string} pRoute - The route to handle the HEAD request for.
     * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    doHead(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * Maps a HEAD request handler for the specified route.
     *
     * @param {string} pRoute - The route to handle the HEAD request for.
     * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    head(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
    /**
     * A helper method that combines the HEAD method with the bodyParser middleware.
     *
     * @param {string} pRoute - The route path for the HEAD request.
     * @param {...Function} fRouteProcessingFunctions - Optional route processing functions.
     * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
     */
    headWithBodyParser(pRoute: string, ...fRouteProcessingFunctions: Function[]): any;
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
    export { RequestHandler };
}
import libFableServiceProviderBase = require("fable-serviceproviderbase");
type RequestHandler = (pRequest: any, pResponse: any, fNext: (pError?: Error) => void) => void;
//# sourceMappingURL=Orator-ServiceServer-Base.d.ts.map