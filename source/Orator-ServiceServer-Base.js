const libFableServiceProviderBase = require('fable-serviceproviderbase');

/**
 * OratorServiceServerBase class represents the base class for the Orator service server.
 * It provides basic functionality for handling what is usually an HTTP service's lifecycle, content parsing, and route creation.
 * Derived classes can override the base functions to implement specific handlers (e.g. restify or express).
 *
 * @class
 */
class OratorServiceServerBase extends libFableServiceProviderBase
{
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
	 * @param {Function} fCallback - The callback function to execute after listening.
	 * @returns {any} The result of the callback function.
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
	 * @param {Function} fCallback - The callback function to be executed after closing the server.
	 * @returns {any} - The result of the callback function.
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
	 * @param {Object} pOptions - The options for the body parser.
	 * @returns {Function} - The middleware function.
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
	 * @param {function} fHandlerFunction - The handler function to be registered. It should have the prototype function(Request, Response, Next).
	 * @returns {boolean} - Returns true if the handler function was successfully registered, false otherwise.
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
	 * Handles HTTP GET requests -- this is a base function that does nothing; override by the serviceserver is expected.
	 *
	 * @param {string} pRoute - The route of the request.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions for the route.
	 * @returns {boolean} - Returns true.
	 */
	doGet(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Handles GET requests for the specified route.
	 *
	 * @param {string} pRoute - The route to handle GET requests for.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to be executed for the route.
	 * @returns {boolean} - Returns false if the route parameter is not a string, otherwise returns the result of the doGet function.
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
	 * @param {...Function} fRouteProcessingFunctions - The route processing functions.
	 * @returns {Promise} - A promise that resolves when the request is processed.
	 */
	getWithBodyParser(pRoute, ...fRouteProcessingFunctions)
	{
		return this.get(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
	}

	/**
	 * Handles HTTP PUT requests -- this is a base function that does nothing; override by the serviceserver is expected.
	 *
	 * @param {string} pRoute - The route to handle.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {boolean} - Returns true.
	 */
	doPut(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Adds a PUT route mapping to the Orator Service Server.
	 *
	 * @param {string} pRoute - The route to be mapped.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to be executed for the route.
	 * @returns {boolean} - Returns true if the route mapping was successful, false otherwise.
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
	 * Maps a PUT request with body parsing.
	 *
	 * @param {string} pRoute - The route to send the PUT request to.
	 * @param {...Function} fRouteProcessingFunctions - Optional route processing functions.
	 * @returns {Promise} - A promise that resolves when the PUT request is complete.
	 */
	putWithBodyParser(pRoute, ...fRouteProcessingFunctions)
	{
		return this.put(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
	}

	/**
	 * Handles the HTTP POST request for a specific route.
	 *
	 * @param {string} pRoute - The route to handle the POST request for.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {boolean} - Returns true if the POST request was handled successfully.
	 */
	doPost(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Handles HTTP POST requests -- this is a base function that does nothing; override by the serviceserver is expected.
	 * 
	 * @param {string} pRoute - The route to send the POST request to.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to be executed for the route.
	 * @returns {boolean} Returns true if the POST request was successful, false otherwise.
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
	 * Handles a POST request with body parsing for the specified route.
	 * 
	 * @param {string} pRoute - The route to handle the POST request for.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {boolean} - Returns true if the POST request was handled successfully.
	 */
	postWithBodyParser(pRoute, ...fRouteProcessingFunctions)
	{
		return this.post(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
	}

	/**
	 * Handles HTTP DELETE requests -- this is a base function that does nothing; override by the serviceserver is expected.
	 *
	 * @param {string} pRoute - The route of the resource to delete.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to be executed to delete the resource.
	 * @returns {boolean} - Returns true if the resource is successfully deleted.
	 */
	doDel(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Adds a delete route mapping.
	 *
	 * @param {string} pRoute - The route to map the delete function to.
	 * @param {...Function} fRouteProcessingFunctions - The additional processing functions to execute
	 * @returns {boolean} - Returns true if the route mapping was successfully deleted, otherwise false.
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
	 * A helper method that combines a delete handler with the `bodyParser` middleware.
	 * 
	 * @param {string} pRoute - The route path for the DELETE request.
	 * @param {...Function} fRouteProcessingFunctions - Additional route processing functions.
	 * @returns {Promise} - A promise that resolves when the DELETE request is completed.
	 */
	delWithBodyParser(pRoute, ...fRouteProcessingFunctions)
	{
		return this.del(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
	}

	/**
	 * Handles HTTP PATCH requests -- this is a base function that does nothing; override by the serviceserver is expected.
	 *
	 * @param {string} pRoute - The route to send the PATCH request to.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to apply to the route.
	 * @returns {boolean} - Returns true if the PATCH request was successful, otherwise false.
	 */
	doPatch(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Add a PATCH route mapping.
	 * 
	 * @param {string} pRoute - The route mapping.
	 * @param {...Function} fRouteProcessingFunctions - The route processing functions.
	 * @returns {boolean} - Returns true if the route handler was run successfully, false otherwise.
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
	 * Map a PATCH route with the bodyParser middleware.
	 * 
	 * @param {string} pRoute - The route to map.
	 * @param {...Function} fRouteProcessingFunctions - Route processing functions.
	 * @returns {Promise} - A promise that resolves when the patching is complete.
	 */
	patchWithBodyParser(pRoute, ...fRouteProcessingFunctions)
	{
		return this.patch(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
	}

	/**
	 * Handles HTTP OPT requests -- this is a base function that does nothing; override by the serviceserver is expected.
	 * 
	 * @param {string} pRoute - The route.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to apply to the route.
	 * @returns {boolean} - Returns true by default.
	 */
	doOpts(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Add an OPTS route mapping.
	 *
	 * @param {string} pRoute - The route to be mapped.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions for the route.
	 * @returns {boolean} - Returns true if the route mapping is successful, false otherwise.
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
	 * Adds body parser middleware to the route and calls the opts method.
	 * @param {string} pRoute - The route path.
	 * @param {...Function} fRouteProcessingFunctions - The route processing functions.
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
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {boolean} - Returns true if the HEAD request was handled successfully.
	 */
	doHead(pRoute, ...fRouteProcessingFunctions)
	{
		return true;
	}
	/**
	 * Handles the HEAD request for a specific route.
	 *
	 * @param {string} pRoute - The route to handle the HEAD request for.
	 * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
	 * @returns {boolean} - Returns true if the HEAD route mapping is successful, false otherwise.
	 */
	head(pRoute, ...fRouteProcessingFunctions)
	{
		if (typeof(pRoute) != 'string')
		{
			this.log.error(`Orator HEAD Route mapping failed -- route parameter was ${typeof(pRoute)} instead of a string.`)
			return false;
		}

		return true;
	}
	/**
	 * A helper method that combines the HEAD method with the bodyParser middleware.
	 * 
	 * @param {string} pRoute - The route path for the HEAD request.
	 * @param {...Function} fRouteProcessingFunctions - Optional route processing functions.
	 * @returns {Promise} - A promise that resolves when the HEAD request is completed.
	 */
	headWithBodyParser(pRoute, ...fRouteProcessingFunctions)
	{
		return this.head(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
	}
	/*************************************************************************
	 * End of Service Route Creation Functions
	 */

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
		return false;
	}
}

module.exports = OratorServiceServerBase;