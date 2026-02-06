/**
* Unit tests for Orator ServiceServer Base
*
* Tests the base class functionality including constructor initialization,
* service lifecycle (listen/close), middleware registration (use/pre),
* route validation for all HTTP verbs, template method defaults (do* methods),
* WithBodyParser convenience methods, serveStatic stub, and invoke stub.
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*/

const libFable = require('fable');

const libOratorServiceServer = require('../source/Orator-ServiceServer-Base.js');

const Chai = require("chai");
const Expect = Chai.expect;

suite
(
	'Orator Service Server Base',
	() =>
	{
		suite
		(
			'Object Sanity',
			() =>
			{
				test
				(
					'the base class should initialize as a proper object',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {SomeOption: true});

						Expect(tmpServer).to.be.an('object');
						Expect(tmpServer.serviceType).to.equal('OratorServiceServer');
						Expect(tmpServer.ServiceServerType).to.equal('Base');

						return fDone();
					}
				);

				test
				(
					'the base class should register via the Fable service manager',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						tmpFable.serviceManager.addServiceType('OratorServiceServer', libOratorServiceServer);
						let tmpServer = tmpFable.serviceManager.instantiateServiceProvider('OratorServiceServer', {SomeOption: true}, 'TestServiceHash');

						Expect(tmpFable.serviceManager.servicesMap['OratorServiceServer']['TestServiceHash']).to.be.an('object');
						Expect(tmpFable.serviceManager.services['OratorServiceServer'].Hash).to.equal('TestServiceHash');

						return fDone();
					}
				);

				test
				(
					'the base class should expose all expected properties and methods',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						// Properties
						Expect(tmpServer).to.have.a.property('ServiceServerType');
						Expect(tmpServer).to.have.a.property('Name');
						Expect(tmpServer).to.have.a.property('URL');
						Expect(tmpServer).to.have.a.property('Port');
						Expect(tmpServer).to.have.a.property('Active');

						// Lifecycle methods
						Expect(tmpServer.listen).to.be.a('function');
						Expect(tmpServer.close).to.be.a('function');

						// Middleware methods
						Expect(tmpServer.use).to.be.a('function');
						Expect(tmpServer.pre).to.be.a('function');
						Expect(tmpServer.bodyParser).to.be.a('function');

						// Route methods (public API)
						Expect(tmpServer.get).to.be.a('function');
						Expect(tmpServer.put).to.be.a('function');
						Expect(tmpServer.post).to.be.a('function');
						Expect(tmpServer.del).to.be.a('function');
						Expect(tmpServer.patch).to.be.a('function');
						Expect(tmpServer.opts).to.be.a('function');
						Expect(tmpServer.head).to.be.a('function');

						// Template method implementations (do* methods)
						Expect(tmpServer.doGet).to.be.a('function');
						Expect(tmpServer.doPut).to.be.a('function');
						Expect(tmpServer.doPost).to.be.a('function');
						Expect(tmpServer.doDel).to.be.a('function');
						Expect(tmpServer.doPatch).to.be.a('function');
						Expect(tmpServer.doOpts).to.be.a('function');
						Expect(tmpServer.doHead).to.be.a('function');

						// WithBodyParser convenience methods
						Expect(tmpServer.getWithBodyParser).to.be.a('function');
						Expect(tmpServer.putWithBodyParser).to.be.a('function');
						Expect(tmpServer.postWithBodyParser).to.be.a('function');
						Expect(tmpServer.delWithBodyParser).to.be.a('function');
						Expect(tmpServer.patchWithBodyParser).to.be.a('function');
						Expect(tmpServer.optsWithBodyParser).to.be.a('function');
						Expect(tmpServer.headWithBodyParser).to.be.a('function');

						// Static file serving and programmatic invoke
						Expect(tmpServer.serveStatic).to.be.a('function');
						Expect(tmpServer.invoke).to.be.a('function');

						return fDone();
					}
				);
			}
		);

		suite
		(
			'Constructor Initialization',
			() =>
			{
				test
				(
					'the constructor should set Name from fable settings Product',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'MyTestProduct', ProductVersion: '1.2.3'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						Expect(tmpServer.Name).to.equal('MyTestProduct');

						return fDone();
					}
				);

				test
				(
					'the constructor should set URL to BASE_SERVICE_SERVER',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						Expect(tmpServer.URL).to.equal('BASE_SERVICE_SERVER');

						return fDone();
					}
				);

				test
				(
					'the constructor should set Port from options ServicePort',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {ServicePort: 8080});

						Expect(tmpServer.Port).to.equal(8080);

						return fDone();
					}
				);

				test
				(
					'the constructor should default Port to undefined when ServicePort is not provided',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						Expect(tmpServer.Port).to.equal(undefined);

						return fDone();
					}
				);

				test
				(
					'the constructor should default Active to false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						Expect(tmpServer.Active).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'the constructor should accept a service hash for the service manager',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {}, 'CustomHash-99');

						Expect(tmpServer.Hash).to.equal('CustomHash-99');

						return fDone();
					}
				);
			}
		);

		suite
		(
			'Service Lifecycle',
			() =>
			{
				test
				(
					'listen should set Active to true and call the callback',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						Expect(tmpServer.Active).to.equal(false);

						tmpServer.listen(8080,
							() =>
							{
								Expect(tmpServer.Active).to.equal(true);
								return fDone();
							});
					}
				);

				test
				(
					'close should set Active to false and call the callback',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						// First make it active
						tmpServer.listen(8080,
							() =>
							{
								Expect(tmpServer.Active).to.equal(true);

								tmpServer.close(
									() =>
									{
										Expect(tmpServer.Active).to.equal(false);
										return fDone();
									});
							});
					}
				);

				test
				(
					'listen and close should be callable multiple times',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						tmpServer.listen(8080,
							() =>
							{
								Expect(tmpServer.Active).to.equal(true);

								tmpServer.close(
									() =>
									{
										Expect(tmpServer.Active).to.equal(false);

										tmpServer.listen(9090,
											() =>
											{
												Expect(tmpServer.Active).to.equal(true);

												tmpServer.close(
													() =>
													{
														Expect(tmpServer.Active).to.equal(false);
														return fDone();
													});
											});
									});
							});
					}
				);
			}
		);

		suite
		(
			'Middleware Registration',
			() =>
			{
				test
				(
					'use() should accept a function and return true',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.use(
							(pRequest, pResponse, fNext) =>
							{
								fNext();
							});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'use() should reject a string and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.use('not-a-function');
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'use() should reject a number and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.use(42);
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'use() should reject null and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.use(null);
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'use() should reject undefined and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.use(undefined);
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'use() should reject an object and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.use({handler: true});
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'pre() should accept a function and return true',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.pre(
							(pRequest, pResponse, fNext) =>
							{
								fNext();
							});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'pre() should reject a string and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.pre('not-a-function');
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'pre() should reject a number and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.pre(99);
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'pre() should reject null and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.pre(null);
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'pre() should reject an array and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.pre([1, 2, 3]);
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);
			}
		);

		suite
		(
			'Body Parser',
			() =>
			{
				test
				(
					'bodyParser() should return a function',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpParser = tmpServer.bodyParser();
						Expect(tmpParser).to.be.a('function');

						return fDone();
					}
				);

				test
				(
					'bodyParser() middleware should call next',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpParser = tmpServer.bodyParser();
						let tmpNextCalled = false;

						tmpParser({}, {},
							() =>
							{
								tmpNextCalled = true;
							});

						Expect(tmpNextCalled).to.equal(true);
						return fDone();
					}
				);

				test
				(
					'bodyParser() should accept an options parameter',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpParser = tmpServer.bodyParser({maxBodySize: 1024});
						Expect(tmpParser).to.be.a('function');

						return fDone();
					}
				);
			}
		);

		suite
		(
			'Route Validation - GET',
			() =>
			{
				test
				(
					'get() should accept a string route and return true',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.get('/api/test', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'get() should reject a number and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.get(42, () => {});
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'get() should reject null and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.get(null, () => {});
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'get() should reject undefined and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.get(undefined, () => {});
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'get() should reject an object and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.get({path: '/test'}, () => {});
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'get() should reject a boolean and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.get(true, () => {});
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);
			}
		);

		suite
		(
			'Route Validation - PUT',
			() =>
			{
				test
				(
					'put() should accept a string route and return true',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.put('/api/items/:id', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'put() should reject non-string parameters and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						Expect(tmpServer.put(null, () => {})).to.equal(false);
						Expect(tmpServer.put(42, () => {})).to.equal(false);
						Expect(tmpServer.put(undefined, () => {})).to.equal(false);
						Expect(tmpServer.put(true, () => {})).to.equal(false);
						Expect(tmpServer.put([], () => {})).to.equal(false);

						return fDone();
					}
				);
			}
		);

		suite
		(
			'Route Validation - POST',
			() =>
			{
				test
				(
					'post() should accept a string route and return true',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.post('/api/items', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'post() should reject non-string parameters and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						Expect(tmpServer.post(null, () => {})).to.equal(false);
						Expect(tmpServer.post(100, () => {})).to.equal(false);
						Expect(tmpServer.post({}, () => {})).to.equal(false);
						Expect(tmpServer.post(undefined, () => {})).to.equal(false);

						return fDone();
					}
				);
			}
		);

		suite
		(
			'Route Validation - DEL',
			() =>
			{
				test
				(
					'del() should accept a string route and return true',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.del('/api/items/:id', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'del() should reject non-string parameters and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						Expect(tmpServer.del(null, () => {})).to.equal(false);
						Expect(tmpServer.del(42, () => {})).to.equal(false);
						Expect(tmpServer.del({}, () => {})).to.equal(false);
						Expect(tmpServer.del([], () => {})).to.equal(false);

						return fDone();
					}
				);
			}
		);

		suite
		(
			'Route Validation - PATCH',
			() =>
			{
				test
				(
					'patch() should accept a string route and return true',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.patch('/api/items/:id', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'patch() should reject non-string parameters and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						Expect(tmpServer.patch(null, () => {})).to.equal(false);
						Expect(tmpServer.patch(42, () => {})).to.equal(false);
						Expect(tmpServer.patch(undefined, () => {})).to.equal(false);
						Expect(tmpServer.patch(false, () => {})).to.equal(false);

						return fDone();
					}
				);
			}
		);

		suite
		(
			'Route Validation - OPTS',
			() =>
			{
				test
				(
					'opts() should accept a string route and return true',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.opts('/api/items', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'opts() should reject non-string parameters and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						Expect(tmpServer.opts(null, () => {})).to.equal(false);
						Expect(tmpServer.opts(42, () => {})).to.equal(false);
						Expect(tmpServer.opts([], () => {})).to.equal(false);

						return fDone();
					}
				);
			}
		);

		suite
		(
			'Route Validation - HEAD',
			() =>
			{
				test
				(
					'head() should accept a string route and return true',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.head('/api/status', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'head() should reject non-string parameters and return false',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						Expect(tmpServer.head(null, () => {})).to.equal(false);
						Expect(tmpServer.head(42, () => {})).to.equal(false);
						Expect(tmpServer.head(true, () => {})).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'head() should return true but does not delegate to doHead (known issue)',
					(fDone) =>
					{
						// The base class head() method validates the route but returns true
						// directly without calling this.doHead(). This is a known issue
						// documented in the codebase.
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpDoHeadCalled = false;
						tmpServer.doHead = (pRoute) =>
						{
							tmpDoHeadCalled = true;
							return true;
						};

						let tmpResult = tmpServer.head('/api/status', () => {});
						Expect(tmpResult).to.equal(true);
						// doHead is NOT called because of the known bug
						Expect(tmpDoHeadCalled).to.equal(false);

						return fDone();
					}
				);
			}
		);

		suite
		(
			'Template Method Defaults (do* Methods)',
			() =>
			{
				test
				(
					'doGet() should return true by default',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.doGet('/api/test', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'doPut() should return true by default',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.doPut('/api/test', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'doPost() should return true by default',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.doPost('/api/test', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'doDel() should return true by default',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.doDel('/api/test', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'doPatch() should return true by default',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.doPatch('/api/test', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'doOpts() should return true by default',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.doOpts('/api/test', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'doHead() should return true by default',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.doHead('/api/test', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'do* methods should accept multiple handler functions via rest parameters',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpHandler1 = () => {};
						let tmpHandler2 = () => {};
						let tmpHandler3 = () => {};

						// All do* methods should accept multiple handlers without error
						Expect(tmpServer.doGet('/route', tmpHandler1, tmpHandler2, tmpHandler3)).to.equal(true);
						Expect(tmpServer.doPut('/route', tmpHandler1, tmpHandler2)).to.equal(true);
						Expect(tmpServer.doPost('/route', tmpHandler1, tmpHandler2, tmpHandler3)).to.equal(true);
						Expect(tmpServer.doDel('/route', tmpHandler1)).to.equal(true);
						Expect(tmpServer.doPatch('/route', tmpHandler1, tmpHandler2)).to.equal(true);
						Expect(tmpServer.doOpts('/route', tmpHandler1)).to.equal(true);
						Expect(tmpServer.doHead('/route', tmpHandler1, tmpHandler2, tmpHandler3)).to.equal(true);

						return fDone();
					}
				);
			}
		);

		suite
		(
			'Route Methods Delegate to do* Methods',
			() =>
			{
				test
				(
					'get() should call doGet() with the route and handlers',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpCapturedRoute = null;
						let tmpCapturedHandlers = [];

						tmpServer.doGet = (pRoute, ...fRouteProcessingFunctions) =>
						{
							tmpCapturedRoute = pRoute;
							tmpCapturedHandlers = fRouteProcessingFunctions;
							return true;
						};

						let tmpHandler = () => {};
						tmpServer.get('/api/test', tmpHandler);

						Expect(tmpCapturedRoute).to.equal('/api/test');
						Expect(tmpCapturedHandlers).to.have.lengthOf(1);
						Expect(tmpCapturedHandlers[0]).to.equal(tmpHandler);

						return fDone();
					}
				);

				test
				(
					'put() should call doPut() with the route and handlers',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpCapturedRoute = null;

						tmpServer.doPut = (pRoute, ...fRouteProcessingFunctions) =>
						{
							tmpCapturedRoute = pRoute;
							return true;
						};

						tmpServer.put('/api/items/:id', () => {});

						Expect(tmpCapturedRoute).to.equal('/api/items/:id');

						return fDone();
					}
				);

				test
				(
					'post() should call doPost() with the route and handlers',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpCapturedRoute = null;

						tmpServer.doPost = (pRoute, ...fRouteProcessingFunctions) =>
						{
							tmpCapturedRoute = pRoute;
							return true;
						};

						tmpServer.post('/api/items', () => {});

						Expect(tmpCapturedRoute).to.equal('/api/items');

						return fDone();
					}
				);

				test
				(
					'del() should call doDel() with the route and handlers',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpCapturedRoute = null;

						tmpServer.doDel = (pRoute, ...fRouteProcessingFunctions) =>
						{
							tmpCapturedRoute = pRoute;
							return true;
						};

						tmpServer.del('/api/items/99', () => {});

						Expect(tmpCapturedRoute).to.equal('/api/items/99');

						return fDone();
					}
				);

				test
				(
					'patch() should call doPatch() with the route and handlers',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpCapturedRoute = null;

						tmpServer.doPatch = (pRoute, ...fRouteProcessingFunctions) =>
						{
							tmpCapturedRoute = pRoute;
							return true;
						};

						tmpServer.patch('/api/items/:id', () => {});

						Expect(tmpCapturedRoute).to.equal('/api/items/:id');

						return fDone();
					}
				);

				test
				(
					'opts() should call doOpts() with the route and handlers',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpCapturedRoute = null;

						tmpServer.doOpts = (pRoute, ...fRouteProcessingFunctions) =>
						{
							tmpCapturedRoute = pRoute;
							return true;
						};

						tmpServer.opts('/api/items', () => {});

						Expect(tmpCapturedRoute).to.equal('/api/items');

						return fDone();
					}
				);
			}
		);

		suite
		(
			'WithBodyParser Convenience Methods',
			() =>
			{
				test
				(
					'getWithBodyParser() should call get() with a body parser prepended',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpCapturedHandlers = [];

						tmpServer.doGet = (pRoute, ...fRouteProcessingFunctions) =>
						{
							tmpCapturedHandlers = fRouteProcessingFunctions;
							return true;
						};

						let tmpHandler = () => {};
						tmpServer.getWithBodyParser('/api/test', tmpHandler);

						// Should have the body parser function followed by the handler
						Expect(tmpCapturedHandlers).to.have.lengthOf(2);
						Expect(tmpCapturedHandlers[0]).to.be.a('function');
						Expect(tmpCapturedHandlers[1]).to.equal(tmpHandler);

						return fDone();
					}
				);

				test
				(
					'putWithBodyParser() should delegate to put() with body parser prepended',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpCapturedHandlers = [];

						tmpServer.doPut = (pRoute, ...fRouteProcessingFunctions) =>
						{
							tmpCapturedHandlers = fRouteProcessingFunctions;
							return true;
						};

						let tmpHandler = () => {};
						tmpServer.putWithBodyParser('/api/items/:id', tmpHandler);

						Expect(tmpCapturedHandlers).to.have.lengthOf(2);
						Expect(tmpCapturedHandlers[0]).to.be.a('function');
						Expect(tmpCapturedHandlers[1]).to.equal(tmpHandler);

						return fDone();
					}
				);

				test
				(
					'postWithBodyParser() should delegate to post() with body parser prepended',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpCapturedHandlers = [];

						tmpServer.doPost = (pRoute, ...fRouteProcessingFunctions) =>
						{
							tmpCapturedHandlers = fRouteProcessingFunctions;
							return true;
						};

						let tmpHandler = () => {};
						tmpServer.postWithBodyParser('/api/items', tmpHandler);

						Expect(tmpCapturedHandlers).to.have.lengthOf(2);
						Expect(tmpCapturedHandlers[0]).to.be.a('function');
						Expect(tmpCapturedHandlers[1]).to.equal(tmpHandler);

						return fDone();
					}
				);

				test
				(
					'delWithBodyParser() should delegate to del() with body parser prepended',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpCapturedHandlers = [];

						tmpServer.doDel = (pRoute, ...fRouteProcessingFunctions) =>
						{
							tmpCapturedHandlers = fRouteProcessingFunctions;
							return true;
						};

						let tmpHandler = () => {};
						tmpServer.delWithBodyParser('/api/items/:id', tmpHandler);

						Expect(tmpCapturedHandlers).to.have.lengthOf(2);
						Expect(tmpCapturedHandlers[0]).to.be.a('function');
						Expect(tmpCapturedHandlers[1]).to.equal(tmpHandler);

						return fDone();
					}
				);

				test
				(
					'patchWithBodyParser() should delegate to patch() with body parser prepended',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpCapturedHandlers = [];

						tmpServer.doPatch = (pRoute, ...fRouteProcessingFunctions) =>
						{
							tmpCapturedHandlers = fRouteProcessingFunctions;
							return true;
						};

						let tmpHandler = () => {};
						tmpServer.patchWithBodyParser('/api/items/:id', tmpHandler);

						Expect(tmpCapturedHandlers).to.have.lengthOf(2);
						Expect(tmpCapturedHandlers[0]).to.be.a('function');
						Expect(tmpCapturedHandlers[1]).to.equal(tmpHandler);

						return fDone();
					}
				);

				test
				(
					'optsWithBodyParser() should delegate to opts() with body parser prepended',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpCapturedHandlers = [];

						tmpServer.doOpts = (pRoute, ...fRouteProcessingFunctions) =>
						{
							tmpCapturedHandlers = fRouteProcessingFunctions;
							return true;
						};

						let tmpHandler = () => {};
						tmpServer.optsWithBodyParser('/api/items', tmpHandler);

						Expect(tmpCapturedHandlers).to.have.lengthOf(2);
						Expect(tmpCapturedHandlers[0]).to.be.a('function');
						Expect(tmpCapturedHandlers[1]).to.equal(tmpHandler);

						return fDone();
					}
				);

				test
				(
					'headWithBodyParser() should delegate to head() with body parser prepended',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						// headWithBodyParser calls head(), and head() returns true (without calling doHead)
						let tmpResult = tmpServer.headWithBodyParser('/api/status', () => {});
						Expect(tmpResult).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'WithBodyParser methods should return false when route validation fails',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						Expect(tmpServer.getWithBodyParser(42, () => {})).to.equal(false);
						Expect(tmpServer.putWithBodyParser(null, () => {})).to.equal(false);
						Expect(tmpServer.postWithBodyParser(undefined, () => {})).to.equal(false);
						Expect(tmpServer.delWithBodyParser({}, () => {})).to.equal(false);
						Expect(tmpServer.patchWithBodyParser(true, () => {})).to.equal(false);
						Expect(tmpServer.optsWithBodyParser([], () => {})).to.equal(false);
						Expect(tmpServer.headWithBodyParser(99, () => {})).to.equal(false);

						return fDone();
					}
				);
			}
		);

		suite
		(
			'serveStatic Stub',
			() =>
			{
				test
				(
					'serveStatic() should return false in the base class',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.serveStatic('/static/*', {directory: '/var/www', default: 'index.html'});
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'serveStatic() should log a debug message when called on the base class',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						// This should not throw; it just logs and returns false
						let tmpResult = tmpServer.serveStatic('/content/*', {directory: '/some/path'});
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'serveStatic() should handle undefined parameters gracefully',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						// Even with undefined parameters, serveStatic should not throw
						let tmpResult = tmpServer.serveStatic(undefined, undefined);
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);
			}
		);

		suite
		(
			'invoke Stub',
			() =>
			{
				test
				(
					'invoke() should return false in the base class',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.invoke('GET', '/api/test', {Key: 'Value'}, () => {});
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'invoke() should log a debug message when called on the base class',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						// This should not throw; it just logs and returns false
						let tmpResult = tmpServer.invoke('POST', '/api/items', {Name: 'Test'}, () => {});
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);

				test
				(
					'invoke() should handle all HTTP methods gracefully',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];

						tmpMethods.forEach(
							(pMethod) =>
							{
								let tmpResult = tmpServer.invoke(pMethod, '/api/test', {}, () => {});
								Expect(tmpResult).to.equal(false);
							});

						return fDone();
					}
				);

				test
				(
					'invoke() should handle null data gracefully',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpResult = tmpServer.invoke('GET', '/api/test', null, () => {});
						Expect(tmpResult).to.equal(false);

						return fDone();
					}
				);
			}
		);

		suite
		(
			'Derived Class Pattern',
			() =>
			{
				test
				(
					'a derived class should be able to override do* methods',
					(fDone) =>
					{
						class TestServiceServer extends libOratorServiceServer
						{
							constructor(pFable, pOptions, pServiceHash)
							{
								super(pFable, pOptions, pServiceHash);
								this.ServiceServerType = 'Test';
								this.registeredRoutes = [];
							}

							doGet(pRoute, ...fRouteProcessingFunctions)
							{
								this.registeredRoutes.push({method: 'GET', route: pRoute});
								return true;
							}

							doPost(pRoute, ...fRouteProcessingFunctions)
							{
								this.registeredRoutes.push({method: 'POST', route: pRoute});
								return true;
							}
						}

						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new TestServiceServer(tmpFable, {});

						Expect(tmpServer.ServiceServerType).to.equal('Test');

						// The base class validation should still run
						Expect(tmpServer.get(42, () => {})).to.equal(false);
						Expect(tmpServer.registeredRoutes).to.have.lengthOf(0);

						// Valid routes should reach the overridden doGet
						tmpServer.get('/api/users', () => {});
						tmpServer.post('/api/users', () => {});

						Expect(tmpServer.registeredRoutes).to.have.lengthOf(2);
						Expect(tmpServer.registeredRoutes[0].method).to.equal('GET');
						Expect(tmpServer.registeredRoutes[0].route).to.equal('/api/users');
						Expect(tmpServer.registeredRoutes[1].method).to.equal('POST');
						Expect(tmpServer.registeredRoutes[1].route).to.equal('/api/users');

						return fDone();
					}
				);

				test
				(
					'a derived class should be able to call super for route validation',
					(fDone) =>
					{
						class ValidatingServiceServer extends libOratorServiceServer
						{
							constructor(pFable, pOptions, pServiceHash)
							{
								super(pFable, pOptions, pServiceHash);
								this.ServiceServerType = 'Validating';
							}

							get(pRoute, ...fRouteProcessingFunctions)
							{
								if (!super.get(pRoute, ...fRouteProcessingFunctions))
								{
									this.log.error(`Custom server failed to map route [${pRoute}]!`);
									return false;
								}
								// Custom registration logic would go here
								return 'custom-get-result';
							}
						}

						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new ValidatingServiceServer(tmpFable, {});

						// Invalid route should fail via super's validation
						Expect(tmpServer.get(null, () => {})).to.equal(false);

						// Valid route should pass through to the custom logic
						Expect(tmpServer.get('/api/test', () => {})).to.equal('custom-get-result');

						return fDone();
					}
				);

				test
				(
					'a derived class should be able to override serveStatic',
					(fDone) =>
					{
						class StaticServiceServer extends libOratorServiceServer
						{
							constructor(pFable, pOptions, pServiceHash)
							{
								super(pFable, pOptions, pServiceHash);
								this.ServiceServerType = 'Static';
								this.staticRoutes = [];
							}

							serveStatic(pRoute, pOptions)
							{
								if (typeof(pRoute) !== 'string' || typeof(pOptions) !== 'object')
								{
									return false;
								}
								this.staticRoutes.push({route: pRoute, options: pOptions});
								return true;
							}
						}

						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new StaticServiceServer(tmpFable, {});

						let tmpResult = tmpServer.serveStatic('/static/*', {directory: '/var/www'});
						Expect(tmpResult).to.equal(true);
						Expect(tmpServer.staticRoutes).to.have.lengthOf(1);
						Expect(tmpServer.staticRoutes[0].route).to.equal('/static/*');

						return fDone();
					}
				);

				test
				(
					'a derived class should be able to override invoke',
					(fDone) =>
					{
						class InvokableServiceServer extends libOratorServiceServer
						{
							constructor(pFable, pOptions, pServiceHash)
							{
								super(pFable, pOptions, pServiceHash);
								this.ServiceServerType = 'Invokable';
							}

							invoke(pMethod, pRoute, pData, fCallback)
							{
								fCallback(null, {Method: pMethod, Route: pRoute, Data: pData});
								return true;
							}
						}

						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new InvokableServiceServer(tmpFable, {});

						let tmpResult = tmpServer.invoke('GET', '/api/test', {Key: 'Value'},
							(pError, pResponse) =>
							{
								Expect(pError).to.equal(null);
								Expect(pResponse.Method).to.equal('GET');
								Expect(pResponse.Route).to.equal('/api/test');
								Expect(pResponse.Data.Key).to.equal('Value');
							});

						Expect(tmpResult).to.equal(true);
						return fDone();
					}
				);
			}
		);

		suite
		(
			'Edge Cases',
			() =>
			{
				test
				(
					'route methods should accept routes with no handler functions',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						// The base class doesn't require handler functions -- it just validates the route string
						Expect(tmpServer.get('/api/test')).to.equal(true);
						Expect(tmpServer.put('/api/test')).to.equal(true);
						Expect(tmpServer.post('/api/test')).to.equal(true);
						Expect(tmpServer.del('/api/test')).to.equal(true);
						Expect(tmpServer.patch('/api/test')).to.equal(true);
						Expect(tmpServer.opts('/api/test')).to.equal(true);
						Expect(tmpServer.head('/api/test')).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'route methods should accept empty string routes',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						// Empty strings are technically strings and pass typeof validation
						Expect(tmpServer.get('', () => {})).to.equal(true);
						Expect(tmpServer.post('', () => {})).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'route methods should accept routes with multiple handler functions',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});
						let tmpServer = new libOratorServiceServer(tmpFable, {});

						let tmpHandler1 = () => {};
						let tmpHandler2 = () => {};
						let tmpHandler3 = () => {};

						Expect(tmpServer.get('/api/test', tmpHandler1, tmpHandler2, tmpHandler3)).to.equal(true);
						Expect(tmpServer.post('/api/test', tmpHandler1, tmpHandler2)).to.equal(true);

						return fDone();
					}
				);

				test
				(
					'multiple instances should be independently configurable',
					(fDone) =>
					{
						let tmpFable = new libFable({Product: 'BaseClassTests', ProductVersion: '0.0.0'});

						let tmpServer1 = new libOratorServiceServer(tmpFable, {ServicePort: 8080});
						let tmpServer2 = new libOratorServiceServer(tmpFable, {ServicePort: 9090});

						Expect(tmpServer1.Port).to.equal(8080);
						Expect(tmpServer2.Port).to.equal(9090);

						tmpServer1.listen(8080,
							() =>
							{
								Expect(tmpServer1.Active).to.equal(true);
								Expect(tmpServer2.Active).to.equal(false);

								tmpServer1.close(
									() =>
									{
										Expect(tmpServer1.Active).to.equal(false);
										return fDone();
									});
							});
					}
				);
			}
		);
	}
);
