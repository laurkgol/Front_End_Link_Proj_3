angular
  .module("link", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller(
    "StudentIndexController", [
      "StudentFactory",
      "$stateParams", StudentIndexControllerFunction
    ])
  .controller(
    "StudentShowController", [
      "StudentFactory",
      "$stateParams", StudentShowControllerFunction
    ])
  .controller(
    "StudentNewController",
    [ "StudentFactory", "$state", StudentNewControllerFunction
  ])
  .controller( "StudentEditController", [
      "StudentFactory",
      "$stateParams",
      StudentEditControllerFunction
    ])
    .controller("linkEventIndexController", [
      "eventFactory",
      "$stateParams",
      linkEventIndexControllerFunction
    ])
    .controller("linkNewEventController", [
      "eventFactory",
      linkNewEventControllerFunction
    ])
    .controller("linkShowEventController", [
      "eventFactory",
      "$stateParams",
      linkShowEventControllerFunction
    ])
    .controller("linkEventEditController", [
      "eventFactory",
      "$stateParams",
      linkEventEditControllerFunction
    ])
  .factory( "StudentFactory", [ "$resource", StudentFactoryFunction ])
  .factory("eventFactory", [
    "$resource",
    eventFactoryFunction
  ])

  function StudentFactoryFunction( $resource ){
      return $resource( "http://localhost:3000/students/:id.json", {}, {
          update: { method: "PUT" }
      })
    }

    function eventFactoryFunction($resource){
      return $resource("http://localhost:3000/events/:id.json", {}, {
        update: {method: "PUT"}
      })
    }

    function RouterFunction($stateProvider){
      $stateProvider
      .state ("studentIndex", {
          url: "/students",
          templateUrl: "js/ng-views/students/index.html",
          controller: "StudentIndexController",
          controllerAs: "vm"
        })
      .state("studentNew", {
           url: "/students/new",
           templateUrl: "js/ng-views/students/new.html",
           controller: "StudentNewController",
           controllerAs: "vm"
     })
     .state("studentShow", {
          url: "/students/:id",
          templateUrl: "js/ng-views/students/show.html",
          controller: "StudentShowController",
          controllerAs: "vm"
        })
      .state("studentEdit", {
          url: "/students/:id/edit",
          templateUrl: "js/ng-views/students/edit.html",
          controller: "StudentEditController",
          controllerAs: "vm"
        })
        .state("eventIndex", {
          url:"/events",
          templateUrl: "js/ng-views/events/index.html",
          controller: "linkEventIndexController",
          controllerAs: "vm"
        })
        .state("eventNew", {
          url: "/events/new",
          templateUrl: "js/ng-views/events/new.html",
          controller: "linkNewEventController",
          controllerAs: "vm"
        })
        .state("eventShow", {
          url: "/events/:id",
          templateUrl: "js/ng-views/events/show.html",
          controller: "linkShowEventController",
          controllerAs: "vm"
        })
        .state("eventEdit", {
          url: "/events/:id/edit",
          templateUrl: "js/ng-views/events/edit.html",
          controller: "linkEventEditController",
          controllerAs: "vm"
        })
    }

    function StudentIndexControllerFunction (StudentFactory){
      console.log("you're in the index")
      this.students = StudentFactory.query();
    }
    function StudentNewControllerFunction(StudentFactory, $state){
     this.student = new StudentFactory()
     this.create = function(){
       this.student.$save().then(function(student){)
         $state.go("studentShow",{id: student.id})
       })
     }
   }
    function StudentShowControllerFunction (StudentFactory, $stateParams){
      this.student = StudentFactory.get({id: $stateParams.id})
    }

    function StudentEditControllerFunction( StudentFactory, $stateParams ){
     this.student = StudentFactory.get({id: $stateParams.id});
     this.update = function(){
       this.student.$update({id: $stateParams.id});
     }
     this.destroy = function(){
        this.student.$delete({id: $stateParams.id});
        })
      }
   }
   function linkEventIndexControllerFunction(eventFactory){
     console.log("you're in the event index")
     this.events = eventFactory.query();
   }

   function linkNewEventControllerFunction(eventFactory){
     this.event = new eventFactory();
     this.create = function(){
       this.event.$save().then(function(event){)
         $state.go("eventShow",{id: event.id})
       })
     }
   }

   function linkShowEventControllerFunction(eventFactory, $stateParams){
     this.event = eventFactory.get({id: $stateParams.id});
   }

   function linkEventEditControllerFunction(eventFactory, $stateParams){
     this.event = eventFactory.get({id: $stateParams.id});
     this.update = function(){
       this.event.$update({id: $stateParams.id});
     }
     this.destroy = function(){
       this.link.$delete({id: $stateParams.id});
     }
   }
