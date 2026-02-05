# Orator ServiceServer Base

> Abstract base class defining the interface for Orator service server implementations

OratorServiceServerBase provides the contract that all Orator service servers must implement. It handles route registration validation and defines the lifecycle methods (listen, close), HTTP verb methods (get, post, put, del, patch, opts, head), middleware registration, and body parsing. Derived classes override the `do*` methods to provide actual behavior.

## Features

- **Interface Contract** - Defines the complete API for service server implementations
- **Input Validation** - Base methods validate route parameters before delegating to implementations
- **Template Method Pattern** - `get()` validates and calls `doGet()`, which derived classes override
- **Body Parser Helpers** - Convenience methods that combine route registration with body parsing
- **Fable Service Provider** - Registers as `OratorServiceServer` in the Fable service manager

## Installation

```bash
npm install orator-serviceserver-base
```

## Usage

This module is not used directly in application code. Instead, it serves as the base class for service server implementations like `orator-serviceserver-restify` and the built-in IPC server.

### Creating a Custom Service Server

```javascript
const libOratorServiceServerBase = require('orator-serviceserver-base');

class MyCustomServiceServer extends libOratorServiceServerBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
		this.ServiceServerType = 'MyCustom';
	}

	listen(pPort, fCallback)
	{
		// Start your server listening on pPort
		this.Active = true;
		this.Port = pPort;
		return fCallback();
	}

	close(fCallback)
	{
		// Stop your server
		this.Active = false;
		return fCallback();
	}

	doGet(pRoute, ...fRouteProcessingFunctions)
	{
		// Register a GET route with your server
		return true;
	}

	doPost(pRoute, ...fRouteProcessingFunctions)
	{
		// Register a POST route with your server
		return true;
	}

	// ... implement doPut, doDel, doPatch, doOpts, doHead
}
```

## API Reference

### Lifecycle Methods

| Method | Description |
|--------|-------------|
| `listen(pPort, fCallback)` | Begin listening on the specified port |
| `close(fCallback)` | Stop listening |

### Route Methods

| Method | Description |
|--------|-------------|
| `get(pRoute, ...fHandlers)` | Register a GET route handler |
| `post(pRoute, ...fHandlers)` | Register a POST route handler |
| `put(pRoute, ...fHandlers)` | Register a PUT route handler |
| `del(pRoute, ...fHandlers)` | Register a DELETE route handler |
| `patch(pRoute, ...fHandlers)` | Register a PATCH route handler |
| `opts(pRoute, ...fHandlers)` | Register an OPTIONS route handler |
| `head(pRoute, ...fHandlers)` | Register a HEAD route handler |

### Body Parser Convenience Methods

| Method | Description |
|--------|-------------|
| `getWithBodyParser(pRoute, ...fHandlers)` | GET with automatic body parsing |
| `postWithBodyParser(pRoute, ...fHandlers)` | POST with automatic body parsing |
| `putWithBodyParser(pRoute, ...fHandlers)` | PUT with automatic body parsing |
| `delWithBodyParser(pRoute, ...fHandlers)` | DELETE with automatic body parsing |
| `patchWithBodyParser(pRoute, ...fHandlers)` | PATCH with automatic body parsing |
| `optsWithBodyParser(pRoute, ...fHandlers)` | OPTIONS with automatic body parsing |
| `headWithBodyParser(pRoute, ...fHandlers)` | HEAD with automatic body parsing |

### Middleware

| Method | Description |
|--------|-------------|
| `use(fHandlerFunction)` | Register a global middleware handler |
| `bodyParser(pOptions)` | Create a body parsing middleware function |

### Override Methods

Derived classes should override these:

| Method | Description |
|--------|-------------|
| `doGet(pRoute, ...fHandlers)` | Implementation for GET route registration |
| `doPost(pRoute, ...fHandlers)` | Implementation for POST route registration |
| `doPut(pRoute, ...fHandlers)` | Implementation for PUT route registration |
| `doDel(pRoute, ...fHandlers)` | Implementation for DELETE route registration |
| `doPatch(pRoute, ...fHandlers)` | Implementation for PATCH route registration |
| `doOpts(pRoute, ...fHandlers)` | Implementation for OPTIONS route registration |
| `doHead(pRoute, ...fHandlers)` | Implementation for HEAD route registration |
| `invoke(pMethod, pRoute, pData, fCallback)` | Programmatic route invocation |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `ServiceServerType` | string | Implementation identifier (e.g., `"Base"`, `"Restify"`, `"IPC"`) |
| `Name` | string | Server name (from `fable.settings.Product`) |
| `URL` | string | Server URL or identifier |
| `Port` | number | Listening port |
| `Active` | boolean | Whether the server is currently listening |

## Documentation

Full documentation is available in the [`docs`](./docs) folder, or served locally:

```bash
npx docsify-cli serve docs
```

## Related Packages

- [orator](https://github.com/stevenvelozo/orator) - Main Orator service abstraction
- [orator-serviceserver-restify](https://github.com/stevenvelozo/orator-serviceserver-restify) - Restify implementation
- [fable](https://github.com/stevenvelozo/fable) - Service provider framework
