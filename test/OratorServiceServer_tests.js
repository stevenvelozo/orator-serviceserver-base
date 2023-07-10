/**
* Unit tests for Fable Servi
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
	'Orator Service Server',
	function()
	{
		var testFable = false;

		setup
		(
			function()
			{
			}
		);

		suite
		(
			'Service Manager',
			function()
			{
				test
				(
					'Manually initialize a Service',
					function()
					{
						testFable = new libFable();
                        let tmpSimpleService = new libOratorServiceServer(testFable, {SomeOption: true});
                        Expect(tmpSimpleService.serviceType).to.equal('OratorServiceServer');
					}
				);
				test
				(
					'Use the Default Service',
					function()
					{
						testFable = new libFable();
                        testFable.serviceManager.addServiceType('OratorServiceServer', libOratorServiceServer);
                        let tmpSimpleService = testFable.serviceManager.instantiateServiceProvider('OratorServiceServer', {SomeOption: true}, 'SimpleService-123');
                        Expect(testFable.serviceManager.servicesMap['OratorServiceServer']['SimpleService-123']).to.be.an('object');
                        Expect(testFable.serviceManager.services['OratorServiceServer'].Hash).to.equal('SimpleService-123');
					}
				);
			}
		);
	}
);