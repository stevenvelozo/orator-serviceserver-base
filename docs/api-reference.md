# API Reference

## Class: OratorServiceServerBase

Extends `fable-serviceproviderbase`. Registers with Fable as service type `OratorServiceServer`.

## Constructor

```javascript
new OratorServiceServerBase(pFable, pOptions, pServiceHash)
```

Sets up the base properties:

| Property | Initial Value | Description |
|----------|--------------|-------------|
| `serviceType` | `'OratorServiceServer'` | Fable service type identifier |
| `ServiceServerType` | `'Base'` | Implementation identifier, override in derived classes |
| `Name` | `fable.settings.Product` | Server name |
| `URL` | `'BASE_SERVICE_SERVER'` | Server URL, override in derived classes |
| `Port` | `options.ServicePort` | Configured port |
| `Active` | `false` | Whether the server is listening |

## Lifecycle Methods

### listen(pPort, fCallback)

Begin listening on the specified port. The base implementation simply sets `Active = true` and calls the callback. Derived classes should override this to start their actual server.

### close(fCallback)

Stop listening. The base implementation sets `Active = false` and calls the callback. Derived classes should override this to close their actual server.

## Middleware Methods

### use(fHandlerFunction)

Register a global middleware handler. The base implementation validates that the parameter is a function. Derived classes should call `super.use()` for validation and then register with their server.

**Returns:** `true` if valid, `false` if the parameter is not a function.

### bodyParser(pOptions)

Create a body parsing middleware function. The base implementation returns a no-op middleware. Derived classes should override this to return their framework's body parser.

**Returns:** A function with signature `(pRequest, pResponse, fNext)`.

## Route Methods

All route methods follow the same pattern:

```javascript
// Public method: validates pRoute, then calls do* method
get(pRoute, ...fRouteProcessingFunctions)

// Override method: derived classes implement actual behavior
doGet(pRoute, ...fRouteProcessingFunctions)

// Convenience method: adds body parser before handlers
getWithBodyParser(pRoute, ...fRouteProcessingFunctions)
```

### HTTP Verb Methods

| Public | Override | With Body Parser |
|--------|---------|-----------------|
| `get()` | `doGet()` | `getWithBodyParser()` |
| `put()` | `doPut()` | `putWithBodyParser()` |
| `post()` | `doPost()` | `postWithBodyParser()` |
| `del()` | `doDel()` | `delWithBodyParser()` |
| `patch()` | `doPatch()` | `patchWithBodyParser()` |
| `opts()` | `doOpts()` | `optsWithBodyParser()` |
| `head()` | `doHead()` | `headWithBodyParser()` |

**Parameters:**
- `pRoute` (string) - The route pattern to match
- `...fRouteProcessingFunctions` (functions) - One or more handler functions with signature `(pRequest, pResponse, fNext)`

**Returns:** `false` if the route parameter is not a string, otherwise the result of the `do*` method.

## Invocation

### invoke(pMethod, pRoute, pData, fCallback)

Programmatically invoke a registered route. The base implementation logs a debug message and returns `false`. Override in derived classes that support programmatic invocation (like the IPC server).

**Parameters:**
- `pMethod` (string) - HTTP method (GET, POST, etc.)
- `pRoute` (string) - The route to invoke
- `pData` (any) - Data to pass with the invocation
- `fCallback` (function) - Callback with signature `(pError, pResponseData)`
