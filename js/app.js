// let event = [{
//   date: "3/15/17",
//   time: "6:30pm",
//   name: "Front End Lab",
//   location: "Social Tables",
//   organizer: "Women Who Code DC",
//   event_url: "https://www.meetup.com/Women-Who-Code-DC/events/237684369/"
// },
// {
//   date: "3/18/17",
//   time: "9:00am",
//   name: "Alexandria Code & Coffee 3.04",
//   location: "The Motley Fool",
//   organizer: "Alexandria Code & Coffee",
//   event_url: "https://www.meetup.com/Alexandria-Code-Coffee/events/237482148/"
// },
// {
//   date: "3/14/17",
//   time: "7:00pm",
//   name: "Monthly Drupal Meetup at Canvas",
//   location: "Canvas",
//   organizer: "DC Area Drupal Meetup Group"
//   event_url: "https://www.meetup.com/drupal-dc/events/237749493/"
// },
// {
//   date: "3/15/17",
//   time: "7:00pm",
//   name: "React DC March",
//   location: "Social Tables",
//   organizer: "React DC"
//   event_url: "https://www.meetup.com/React-DC/events/237559778/"
// },
// {
//   date: "3/15/17",
//   time: "8:30pm",
//   name: "Ruby on Rails-Open Lab",
//   location: "threespot",
//   organizer: "Women Who Code DC"
//   event_url: "https://www.meetup.com/Women-Who-Code-DC/events/237436473/"
// },
// {
//   date: "3/15/17",
//   time: "8:30pm",
//   name: "Ruby on Rails-Open Lab",
//   location: "threespot",
//   organizer: "Women Who Code DC"
//   event_url: "https://www.meetup.com/Women-Who-Code-DC/events/237436473/"
// },
// ]




"use strict";


  angular
  .module("link", [
    "ui.router",
    "ngResource"
    ])
    .config([
      "$stateProvider",
      RouterFunction
    ])
    .factory("eventFactory", [
      "$resource",
      eventFactoryFunction
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
    ]);

    function RouterFunction($stateProvider){
      $stateProvider
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
    };
    function eventFactoryFunction($resource){
      return $resource("http://localhost:3000/events/:id", {}, {
        update: {method: "PUT"}
      })
    }

    function linkEventIndexControllerFunction(eventFactory){
      this.events = eventFactory.query();
    }

    function linkNewEventControllerFunction(eventFactory){
      this.event = new eventFactory();
      this.create = function(){
        this.event.$save()
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
