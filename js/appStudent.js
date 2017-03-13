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
  .factory( "StudentFactory", [ "$resource", StudentFactoryFunction ])
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
    [ "StudentFactory","$state", StudentNewControllerFunction
  ])
  .controller("StudentEditController", [
      "StudentFactory",
      "$stateParams",
      StudentEditControllerFunction
    ])


function StudentFactoryFunction( $resource ){

    return $resource( "http://localhost:3000/students/:id.json", {}, {
        update: { method: "PUT" }
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
  }

  function StudentIndexControllerFunction (StudentFactory){
    console.log("you're in the index")
    this.students = StudentFactory.query()
  }
  function StudentShowControllerFunction (StudentFactory, $stateParams){
    this.student = StudentFactory.get({id: $stateParams.id})
  }
  function StudentNewControllerFunction(StudentFactory, $state){
    this.student = new StudentFactory()
    this.create = function(){
      this.student.$save(function(student){
        console.log ("hello")
        $state.go("studentShow",{id: student.id})
      })
    }
  }

  function StudentEditControllerFunction( StudentFactory, $stateParams ){
   this.student = StudentFactory.get({id: $stateParams.id})
   this.update = function(){
     this.student.$update({id: $stateParams.id})
   }
   this.destroy = function(){
      this.student.$delete({id: $stateParams.id})
    }
 }
