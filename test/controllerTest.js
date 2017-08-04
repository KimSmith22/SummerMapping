define([
  'angular',
  'angularMocks',
  '/public/controllers/controller.js'
], function(angular, mocks, Controller){
  'use strict';

  describe('Controller', function (){
    var createController, rootScope, window, $q, deffered;
    var stateparams = {stateUrl: ''};
    var UserSpy = jasmine.createSpyObj('userService', []);
    var mock_event_data =
    {
      data:{
        name: 'GM River Days',
        startDate: '06/23/2017',
        endDate: '06/25/2017',
        price: '5.00',
        location: 'Detroit, MI'
      }
    };

    beforeEach(mocks.inject(function($injector){
      $q = injector.get('$q');
      rootScope = $injector.get('rootScope');
      window = $injector.get('$window');

      eventService = {
        getEvent: function(){
            deffered = $q.defer();
            return defered.promise;
        }
      };

      spyOn(eventService, 'getEvent').andCallFake(function(){
        var deferred = $q.defer();
        deferred.resolve(mock_event_data);
        return deferred.promise;
      });

      var $controller = injector.get('$controller');
      createController = function(){
        return $controller(Controller, {
          '$scope': rootScope,
          '$stateParams': stateparams, 'userService': UserSpy, 'window': window
        });
      };
    }));

    it('should display a list of events from the database', function(){
      createController();
    });

  })
});
