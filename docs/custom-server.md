# Creating a Custom Service Server

If Restify isn't your thing, or you need to wrap a different HTTP framework, you can create your own service server implementation by extending `OratorServiceServerBase`.

## Step 1: Extend the Base Class

```javascript
const libOratorServiceServerBase = require('orator-serviceserver-base');

class OratorServiceServerExpress extends libOratorServiceServerBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.ServiceServerType = 'Express';

		// Create your underlying server
		const express = require('express');
		this.app = express();
		this.server = null;
	}
}
```

## Step 2: Implement Lifecycle Methods

The `listen` and `close` methods control when your server starts and stops accepting connections:

```javascript
listen(pPort, fCallback)
{
	this.server = this.app.listen(pPort, (pError) =>
	{
		this.Active = true;
		this.Port = pPort;
		this.log.info(`Express server listening on port ${pPort}`);
		return fCallback(pError);
	});
}

close(fCallback)
{
	this.server.close((pError) =>
	{
		this.Active = false;
		this.log.info('Express server closed');
		return fCallback(pError);
	});
}
```

## Step 3: Implement Route Methods

Override the `do*` methods to register routes with your framework. The base class has already validated that `pRoute` is a string by the time these are called:

```javascript
doGet(pRoute, ...fRouteProcessingFunctions)
{
	this.app.get(pRoute, ...fRouteProcessingFunctions);
	return true;
}

doPost(pRoute, ...fRouteProcessingFunctions)
{
	this.app.post(pRoute, ...fRouteProcessingFunctions);
	return true;
}

doPut(pRoute, ...fRouteProcessingFunctions)
{
	this.app.put(pRoute, ...fRouteProcessingFunctions);
	return true;
}

doDel(pRoute, ...fRouteProcessingFunctions)
{
	this.app.delete(pRoute, ...fRouteProcessingFunctions);
	return true;
}

doPatch(pRoute, ...fRouteProcessingFunctions)
{
	this.app.patch(pRoute, ...fRouteProcessingFunctions);
	return true;
}

doOpts(pRoute, ...fRouteProcessingFunctions)
{
	this.app.options(pRoute, ...fRouteProcessingFunctions);
	return true;
}

doHead(pRoute, ...fRouteProcessingFunctions)
{
	this.app.head(pRoute, ...fRouteProcessingFunctions);
	return true;
}
```

## Step 4: Implement Middleware and Body Parsing

```javascript
use(fHandlerFunction)
{
	if (!super.use(fHandlerFunction))
	{
		return false;
	}

	this.app.use(fHandlerFunction);
	return true;
}

bodyParser()
{
	const express = require('express');
	return express.json();
}
```

## Step 5: Register with Fable

```javascript
_Fable.serviceManager.addServiceType('OratorServiceServer', OratorServiceServerExpress);
_Fable.serviceManager.instantiateServiceProvider('OratorServiceServer');
```

That's it. Orator will use your implementation for all route registration and service lifecycle management, and every module in the Orator ecosystem that registers routes through the service server interface will work with your custom server.

## Optional: Programmatic Invocation

If you want to support programmatic route invocation (like the IPC server does), override the `invoke` method:

```javascript
invoke(pMethod, pRoute, pData, fCallback)
{
	// Implement in-process route invocation
	// This is optional -- the base class logs a debug message and returns false
}
```
