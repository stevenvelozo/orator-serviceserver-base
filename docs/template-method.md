# Template Method Pattern

The service server base class uses the template method pattern to separate input validation from implementation logic. This is a key design decision that keeps derived classes focused on their framework-specific code while ensuring consistent error handling across all implementations.

## How It Works

For each HTTP verb, there are two methods:

1. **Public method** (`get`, `post`, `put`, etc.) - Validates input, then delegates
2. **Override method** (`doGet`, `doPost`, `doPut`, etc.) - Implements actual behavior

```javascript
// In the base class:
get(pRoute, ...fRouteProcessingFunctions)
{
	if (typeof(pRoute) != 'string')
	{
		this.log.error(`Orator GET Route mapping failed -- route parameter was ${typeof(pRoute)} instead of a string.`);
		return false;
	}
	return this.doGet(pRoute, ...fRouteProcessingFunctions);
}

doGet(pRoute, ...fRouteProcessingFunctions)
{
	// Base implementation: does nothing, returns true
	return true;
}
```

## In Derived Classes

A derived class only needs to override the `do*` methods:

```javascript
// In Restify service server:
doGet(pRoute, ...fRouteProcessingFunctions)
{
	return this.server.get(pRoute, ...fRouteProcessingFunctions);
}
```

The validation in `get()` has already run by the time `doGet()` is called, so `pRoute` is guaranteed to be a string.

## Optional Super Calls

Derived classes can optionally call `super.get()` instead of `super.doGet()` if they want to add their own validation layer before the base validation runs. However, the standard pattern is to override `do*` methods and let the base class handle validation:

```javascript
// Standard pattern (recommended):
doGet(pRoute, ...fRouteProcessingFunctions)
{
	return this.server.get(pRoute, ...fRouteProcessingFunctions);
}

// Alternative pattern (adds extra validation):
get(pRoute, ...fRouteProcessingFunctions)
{
	if (!super.get(pRoute, ...fRouteProcessingFunctions))
	{
		this.log.error(`My server failed to map route [${pRoute}]!`);
		return false;
	}
	// Additional custom logic here
}
```

## Body Parser Convenience Methods

The `*WithBodyParser` methods combine body parsing with route registration:

```javascript
postWithBodyParser(pRoute, ...fRouteProcessingFunctions)
{
	return this.post(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
}
```

This inserts the body parser middleware before the route handlers, so `pRequest.body` is populated by the time your handler runs. The body parser itself is provided by the derived class's `bodyParser()` override.
