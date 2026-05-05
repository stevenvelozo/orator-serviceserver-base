const libFableServiceProviderBase = require('fable-serviceproviderbase');

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
class OratorServiceServerBase extends libFableServiceProviderBase
{
	/**
	 * @param {import('fable')|Record<string, any>} [pFable] - (optional) The fable instance, or the options object if there is no fable
	 * @param {Record<string, any>|string} [pOptions] - (optional) The options object, or the service hash if there is no fable
	 * @param {string} [pServiceHash] - (optional) The service hash to identify this service instance
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
        super(pFable, pOptions, pServiceHash);

        this.serviceType = 'OratorServiceServer';

		this.ServiceServerType = 'Base';

		this.Name = this.fable.settings.Product;
		this.URL = 'BASE_SERVICE_SERVER';
		this.Port = this.options.ServicePort;

		this.Active = false;
	}

	/*
	 * Service Lifecycle Functions
	 *************************************************************************/

	/**
	 * Listens for network calls on the specified port (or starts a virtual serviceserver for that "port").
	 * @param {number} pPort - The port number to listen on.
	 * @param {(pError?: Error) => void} fCallback - The callback function to execute after listening.
	 * @return {any} The result of the callback function.
	 */
	listen(pPort, fCallback)
	{
		// Sometimes, listen does not listen on network calls.
		this.Active = true;

		return fCallback();
	}

	/**
	 * Closes the service server.
	 *
	 * @param {(pError?: Error) => any} fCallback - The callback function to be executed after closing the server.
	 * @return {any} - The result of the callback function.
	 */
	close(fCallback)
	{
		this.Active = false;

		return fCallback();
	}
	/*************************************************************************
	 * End of Service Lifecycle Functions
	 */

	/*
	 * Content parsing functions
	 *************************************************************************/
	/**
	 * Middleware function for parsing the request body.
	 *
	 * @param {Record<string, any>} [pOptions] - The options for the body parser.
	 * @return {RequestHandler<TRequest, TResponse> | RequestHandler<TRequest, TResponse>[]} - The middleware function.
	 */
	bodyParser(pOptions)
	{
		return (pRequest, pResponse, fNext) =>
			{
				fNext();
			};
	}
	/*************************************************************************
	 * End of Service Lifecycle Functions
	 */

	/*
	 * Service Route Creation Functions
	 *
	 * These base functions provide basic validation for the routes, but don't actually
	 * do anything with them.  The design intent here is to allow derived classes to call
	 * these functions to validate that they conform to expected standards.
	 *
	 * Something like:

		get (pRoute, ...fRouteProcessingFunctions)
		{
			if (!super.get(pRoute, ...fRouteProcessingFunctions))
			{
				this.log.error(`Restify provider failed to map route [${pRoute}]!`);
				return false;
			}

			//...now we can do our actual get mapping function!....
		}

	 * This pattern and calling super is totally optional, obviously.
	 *************************************************************************/
	/**
	 * Registers a global handler function to be used by the Orator service server.
	 *
	 * @param {RequestHandler<TRequest, TResponse>} fHandlerFunction - The handler function to be registered. It should have the prototype function(Request, Response, Next).
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	use(fHandlerFunction)
	{
		if (typeof(fHandlerFunction) != 'function')
		{
			this.log.error(`Orator USE global handler mapping failed -- parameter was expected to be a function with prototype function(Request, Response, Next) but type was ${typeof(fHandlerFunction)} instead of a string.`)
			return false;
		}

		return true;
	}

	/**
	 * Registers a global handler function to be used by the Orator service server that runs before routing.
	 *
	 * @param {RequestHandler<TRequest, TResponse>} fHandlerFunction - The handler function to be registered. It should have the prototype function(Request, Response, Next).
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	pre(fHandlerFunction)
	{
		if (typeof(fHandlerFunction) != 'function')
		{
			this.log.error(`Orator PRE global handler mapping failed -- parameter was expected to be a function with prototype function(Request, Response, Next) but type was ${typeof(fHandlerFunction)} instead.`)
			return false;
		}

		return true;
	}

	/**
	 * Handles HTTP GET requests -- this is a base function that does nothing; override by the serviceserver is expected.
	 *
	 * @param {string} pRoute - The route of the request.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions for the route.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	doGet(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Maps a GET request handler for the specified route.
	 *
	 * @param {string} pRoute - The route to handle GET requests for.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to be executed for the route.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	get(pRoute, ...fRouteProcessingFunctions)
	{
		if (typeof(pRoute) != 'string')
		{
			this.log.error(`Orator GET Route mapping failed -- route parameter was ${typeof(pRoute)} instead of a string.`)
			return false;
		}
		return this.doGet(pRoute, ...fRouteProcessingFunctions);
	}
	/**
	 * A helper method that maps a GET request method with a body parser middleware.
	 *
	 * @param {string} pRoute - The route path.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The route processing functions.
	 * @returns {any} - Result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	getWithBodyParser(pRoute, ...fRouteProcessingFunctions)
	{
		return this.get(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
	}

	/**
	 * Handles HTTP PUT requests -- this is a base function that does nothing; override by the serviceserver is expected.
	 *
	 * @param {string} pRoute - The route to handle.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	doPut(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Maps a PUT request handler for the specified route.
	 *
	 * @param {string} pRoute - The route to be mapped.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to be executed for the route.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	put(pRoute, ...fRouteProcessingFunctions)
	{
		if (typeof(pRoute) != 'string')
		{
			this.log.error(`Orator PUT Route mapping failed -- route parameter was ${typeof(pRoute)} instead of a string.`)
			return false;
		}
		return this.doPut(pRoute, ...fRouteProcessingFunctions);
	}
	/**
	 * A helper method that maps a PUT request method with a body parser middleware.
	 *
	 * @param {string} pRoute - The route to send the PUT request to.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - Optional route processing functions.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	putWithBodyParser(pRoute, ...fRouteProcessingFunctions)
	{
		return this.put(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
	}

	/**
	 * Handles the HTTP POST request for a specific route.
	 *
	 * @param {string} pRoute - The route to handle the POST request for.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	doPost(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Maps a POST request handler for the specified route.
	 *
	 * @param {string} pRoute - The route to send the POST request to.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to be executed for the route.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	post(pRoute, ...fRouteProcessingFunctions)
	{
		if (typeof(pRoute) != 'string')
		{
			this.log.error(`Orator POST Route mapping failed -- route parameter was ${typeof(pRoute)} instead of a string.`)
			return false;
		}
		return this.doPost(pRoute, ...fRouteProcessingFunctions);
	}
	/**
	 * A helper method that maps a POST request method with a body parser middleware.
	 *
	 * @param {string} pRoute - The route to handle the POST request for.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	postWithBodyParser(pRoute, ...fRouteProcessingFunctions)
	{
		return this.post(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
	}

	/**
	 * Handles HTTP DELETE requests -- this is a base function that does nothing; override by the serviceserver is expected.
	 *
	 * @param {string} pRoute - The route of the resource to delete.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to be executed to delete the resource.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	doDel(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Maps a DEL request handler for the specified route.
	 *
	 * @param {string} pRoute - The route to map the delete function to.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The additional processing functions to execute
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	del(pRoute, ...fRouteProcessingFunctions)
	{
		if (typeof(pRoute) != 'string')
		{
			this.log.error(`Orator DEL Route mapping failed -- route parameter was ${typeof(pRoute)} instead of a string.`)
			return false;
		}
		return this.doDel(pRoute, ...fRouteProcessingFunctions);
	}
	/**
	 * A helper method that maps a DEL request method with a body parser middleware.
	 *
	 * @param {string} pRoute - The route path for the DELETE request.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - Additional route processing functions.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	delWithBodyParser(pRoute, ...fRouteProcessingFunctions)
	{
		return this.del(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
	}

	/**
	 * Handles HTTP PATCH requests -- this is a base function that does nothing; override by the serviceserver is expected.
	 *
	 * @param {string} pRoute - The route to send the PATCH request to.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to apply to the route.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	doPatch(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Maps a PATCH request handler for the specified route.
	 *
	 * @param {string} pRoute - The route mapping.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The route processing functions.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	patch(pRoute, ...fRouteProcessingFunctions)
	{
		if (typeof(pRoute) != 'string')
		{
			this.log.error(`Orator PATCH Route mapping failed -- route parameter was ${typeof(pRoute)} instead of a string.`)
			return false;
		}
		return this.doPatch(pRoute, ...fRouteProcessingFunctions);
	}
	/**
	 * A helper method that maps a PATCH request method with a body parser middleware.
	 *
	 * @param {string} pRoute - The route to map.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - Route processing functions.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	patchWithBodyParser(pRoute, ...fRouteProcessingFunctions)
	{
		return this.patch(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
	}

	/**
	 * Handles HTTP OPT requests -- this is a base function that does nothing; override by the serviceserver is expected.
	 *
	 * @param {string} pRoute - The route.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to apply to the route.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	doOpts(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Maps a OPT request handler for the specified route.
	 *
	 * @param {string} pRoute - The route to be mapped.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions for the route.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	opts(pRoute, ...fRouteProcessingFunctions)
	{
		if (typeof(pRoute) != 'string')
		{
			this.log.error(`Orator OPTS Route mapping failed -- route parameter was ${typeof(pRoute)} instead of a string.`)
			return false;
		}
		return this.doOpts(pRoute, ...fRouteProcessingFunctions);
	}
	/**
	 * A helper method that maps a OPT request method with a body parser middleware.
	 * @param {string} pRoute - The route path.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The route processing functions.
	 * @returns {Object} - The result of the opts method.
	 */
	optsWithBodyParser(pRoute, ...fRouteProcessingFunctions)
	{
		return this.opts(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
	}

	/**
	 * Handles HTTP HEAD requests -- this is a base function that does nothing; override by the serviceserver is expected.
	 *
	 * @param {string} pRoute - The route to handle the HEAD request for.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	doHead(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Maps a HEAD request handler for the specified route.
	 *
	 * @param {string} pRoute - The route to handle the HEAD request for.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	head(pRoute, ...fRouteProcessingFunctions)
	{
		if (typeof(pRoute) != 'string')
		{
			this.log.error(`Orator HEAD Route mapping failed -- route parameter was ${typeof(pRoute)} instead of a string.`)
			return false;
		}
		return this.doHead(pRoute, ...fRouteProcessingFunctions);
	}
	/**
	 * A helper method that combines the HEAD method with the bodyParser middleware.
	 *
	 * @param {string} pRoute - The route path for the HEAD request.
	 * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - Optional route processing functions.
	 * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
	 */
	headWithBodyParser(pRoute, ...fRouteProcessingFunctions)
	{
		return this.head(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
	}
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
	serveStatic(pRoute, pOptions)
	{
		// The base class version of this does nothing -- override in derived classes
		this.log.debug(`Orator serveStatic called for route [${pRoute}] and landed on the base class; the service provider likely does not implement static file serving.`);
		return false;
	}

	/**
	 * Invokes a method on the service server programmatically -- expects to be overloaded by the service provider.
	 *
	 * @param {string} pMethod - The method to invoke.
	 * @param {string} pRoute - The route to invoke the method on.
	 * @param {any} pData - The data to pass to the method.
	 * @param {Function} fCallback - The callback function to execute after the method is invoked.
	 * @returns {boolean} - Returns true if the method was successfully invoked, false otherwise.
	 */
	invoke(pMethod, pRoute, pData, fCallback)
	{
		// The base class version of this does nothing
		this.log.debug(`Orator invoke called for route [${pRoute}] and landed on the base class; the service provider likely does not implement programmatic invoke capabilities.`, pData);
		fCallback();
		return false;
	}
}

module.exports = OratorServiceServerBase;
