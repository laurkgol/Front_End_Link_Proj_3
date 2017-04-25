angular
  .module("link", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("StudentFactory", [
    "$resource",
    StudentFactoryFunction
  ])
  .factory("EventFactory", [
    "$resource",
    EventFactoryFunction
  ])
  .factory("AttendanceFactory", [
    "$resource",
    AttendanceFactoryFunction
  ])
  .controller("AboutController", [ "$stateParams",
  AboutControllerFunction
  ])
  .controller("WelcomeController",[ "$stateParams",
    WelcomeControllerFunction
  ])
  .controller("StudentIndexController", [
    "StudentFactory",
    "$stateParams",
    StudentIndexControllerFunction
  ])
  .controller("StudentShowController", [
    "StudentFactory",
    "$stateParams",
    StudentShowControllerFunction
  ])
  .controller("attendanceIndexController", [
    "AttendanceFactory",
    "$stateParams",
    AttendanceIndexControllerFunction
  ])
  .controller("StudentNewController",[
    "StudentFactory",
    "$state",
    StudentNewControllerFunction
  ])
  .controller("StudentEditController", [
    "StudentFactory",
    "$stateParams",
    "$state",
    StudentEditControllerFunction
  ])
  .controller("EventIndexController", [
    "EventFactory",
    "$stateParams",
    EventIndexControllerFunction
  ])
  .controller("NewEventController", [
    "EventFactory",
    "$state",
    NewEventControllerFunction
  ])
  .controller("ShowEventController", [
    "EventFactory",
    "$stateParams",
    "$state",
    "AttendanceFactory",
    "StudentFactory",
    ShowEventControllerFunction
  ])
  .controller("EventEditController", [
    "EventFactory",
    "$stateParams",
    "$state",
    EventEditControllerFunction
  ])

function EventFactoryFunction($resource){
  return $resource("https://ccg-link-server.herokuapp.com/events/:id.json", {}, {
    update: {method: "PUT"}
  })
}

function StudentFactoryFunction($resource){
  return $resource("https://ccg-link-server.herokuapp.com/students/:id.json", {}, {
    update: {method: "PUT"}
  })
}

function AttendanceFactoryFunction($resource){
  return $resource("https://ccg-link-server.herokuapp.com/events/:id/attendences.json", {}, {
    update: {method:"PUT"}
  })
}

function RouterFunction($stateProvider){
  $stateProvider
    .state("welcome",{
      url: "/",
      templateUrl: "js/ng-views/welcome.html",
      controller: "WelcomeController",
      controllerAs: "vm"
    })
    .state("about",{
      url: "/about",
      templateUrl: "js/ng-views/about.html",
      controller: "AboutController",
      controllerAs: "vm"
    })
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
    .state("attendanceIndex", {
      url: "/events/:id/attendances",
      templateUrl: "js/ng-views/attendances/index.html",
      controller: "AttendanceIndexController",
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
      controller: "EventIndexController",
      controllerAs: "vm"
    })
    .state("eventNew", {
      url: "/events/new",
      templateUrl: "js/ng-views/events/new.html",
      controller: "NewEventController",
      controllerAs: "vm"
    })
    .state("eventShow", {
      url: "/events/:id",
      templateUrl: "js/ng-views/events/show.html",
      controller: "ShowEventController",
      controllerAs: "vm"
    })
    .state("eventEdit", {
      url: "/events/:id/edit",
      templateUrl: "js/ng-views/events/edit.html",
      controller: "EventEditController",
      controllerAs: "vm"
    })
}
function WelcomeControllerFunction($stateParams, $state){
}
function AboutControllerFunction($stateParams, $state){
}

function AttendanceIndexControllerFunction (AttendanceFactory, $stateParams){
  console.log("you're in the attendance index")
  this.attendances = AttendanceFactory.query();
}

function StudentIndexControllerFunction (StudentFactory){
  console.log("you're in the index")
  this.students = StudentFactory.query();
}

function StudentNewControllerFunction(StudentFactory, $state){
 this.student = new StudentFactory()
 this.create = function(){
   this.student.$save().then(function(student){
     $state.go("studentShow",{id: student.id})
   })
 }
}

function StudentShowControllerFunction (StudentFactory, $stateParams){
  this.student = StudentFactory.get({id: $stateParams.id})
}

function StudentEditControllerFunction( StudentFactory, $stateParams, $state ){
 this.student = StudentFactory.get({id: $stateParams.id});
 this.update = function(){
   this.student.$update({id: $stateParams.id}).then(function(student){
     $state.go("studentShow",{id: student.id})
   })
   console.log("student updated")

 }

 this.destroy = function(){
    this.student.$delete({id: $stateParams.id}).then(function(student){
      $state.go("studentIndex")
    })
    console.log("student deleted")
  }
}

function EventIndexControllerFunction(EventFactory){
 console.log("you're in the event index")
 this.events = EventFactory.query();
}

function NewEventControllerFunction(EventFactory, $state){
 this.event = new EventFactory()

 this.create = function(){
   this.event.$save(function(event){
     console.log(event)
     $state.go("eventShow",{id: event.id})
   })
   console.log("Hello")
 }
}

function ShowEventControllerFunction(EventFactory, $stateParams, $state, AttendanceFactory, StudentFactory){
  this.event = EventFactory.get({id: $stateParams.id});
  this.attendances = AttendanceFactory.query({id: $stateParams.id});
  console.log(this.attendances)
  this.students= StudentFactory.query();
  this.newAttendance = new AttendanceFactory()
  this.addAttendance = function() {
    // this.student= StudentFactory.get({id: this.studentGoing});
    // console.log(this.student)
    // this.event = EventFactory.get({id: $stateParams.id});
    // console.log(this.studentGoing)
    this.newAttendance.event_id = this.event.id
    console.log(this.newAttendance)
    this.newAttendance.$save({id: $stateParams.id}, function(attendance) {
      console.log(attendance)
       $state.reload()
    })

  }
}

function EventEditControllerFunction( EventFactory, $stateParams, $state){
 this.event = EventFactory.get({id: $stateParams.id});
 this.update = function(){
   this.event.$update({id: $stateParams.id}).then(function(event){
     $state.go("eventShow",{id: event.id})
   })
   console.log("event updated")
 }
 this.destroy = function(){
   this.event.$delete({id: $stateParams.id}).then(function (thing){
     $state.go("eventIndex")
   })
   console.log("Event deleted")
 }
}
