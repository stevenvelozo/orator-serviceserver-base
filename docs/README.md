# Orator ServiceServer Base

> Abstract base class defining the interface for Orator service server implementations

OratorServiceServerBase is the foundation that all Orator service servers build upon. It doesn't do anything on its own -- the base implementations of route methods simply validate inputs and return true. The real work happens in derived classes like `orator-serviceserver-restify` and the built-in IPC server, which override the `do*` methods with actual HTTP or IPC handling logic.

This separation of concerns means that route validation happens in one place, and every service server implementation benefits from it without duplicating the checks.

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

## The Interface

The base class defines three categories of methods:

### Lifecycle

```javascript
listen(pPort, fCallback)   // Start accepting connections
close(fCallback)           // Stop accepting connections
```

### Route Registration

For each HTTP verb, there is a public method and an override method:

```javascript
get(pRoute, ...fHandlers)    // Public: validates, then calls doGet()
doGet(pRoute, ...fHandlers)  // Override: implement actual route registration
```

### Middleware

```javascript
use(fHandlerFunction)    // Register global middleware
bodyParser(pOptions)     // Create a body parsing middleware
```

## Creating a Custom Service Server

See the [custom server guide](custom-server.md) for a complete walkthrough.

## API Reference

See the [API reference](api-reference.md) for complete method documentation.

## Related Packages

- [orator](https://github.com/stevenvelozo/orator) - Main Orator service abstraction
- [orator-serviceserver-restify](https://github.com/stevenvelozo/orator-serviceserver-restify) - Restify implementation
- [fable](https://github.com/stevenvelozo/fable) - Service provider framework
