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
  .controller("welcomeController",[
    WelcomeControllerFunction
  ])
  .controller("StudentIndexController", [
    "StudentFactory",
    "$stateParams",
    StudentIndexControllerFunction
  ])
  .controller("studentShowController", [
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
    StudentEditControllerFunction
  ])
  .controller("EventIndexController", [
    "EventFactory",
    "$stateParams",
    EventIndexControllerFunction
  ])
  .controller("NewEventController", [
    "EventFactory",
    NewEventControllerFunction
  ])
  .controller("ShowEventController", [
    "EventFactory",
    "$stateParams",
    "AttendanceFactory",
    "StudentFactory",
    ShowEventControllerFunction
  ])
  .controller("EventEditController", [
    "EventFactory",
    "$stateParams",
    EventEditControllerFunction
  ])

function EventFactoryFunction($resource){
  return $resource("http://localhost:3000/events/:id.json", {}, {
    update: {method: "PUT"}
  })
}

function StudentFactoryFunction($resource){
  return $resource("http://localhost:3000/students/:id.json", {}, {
    update: {method: "PUT"}
  })
}

function AttendanceFactoryFunction($resource){
  return $resource("http://localhost:3000/events/:id/attendances.json", {}, {
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
      controller: "studentShowController",
      controllerAs: "vm"
    })
    .state("attendanceIndex", {
      url: "/events/:id/attendances",
      templateUrl: "js/ng-views/attendances/index.html",
      controller: "attendanceIndexController",
      controllerAs: "vm"
    })
    .state("studentEdit", {
      url: "/students/:id/edit",
      templateUrl: "js/ng-views/students/edit.html",
      controller: "studentEditController",
      controllerAs: "vm"
    })
    .state("eventIndex", {
      url:"/events",
      templateUrl: "js/ng-views/events/index.html",
      controller: "eventIndexController",
      controllerAs: "vm"
    })
    .state("eventNew", {
      url: "/events/new",
      templateUrl: "js/ng-views/events/new.html",
      controller: "newEventController",
      controllerAs: "vm"
    })
    .state("eventShow", {
      url: "/events/:id",
      templateUrl: "js/ng-views/events/show.html",
      controller: "showEventController",
      controllerAs: "vm"
    })
    .state("eventEdit", {
      url: "/events/:id/edit",
      templateUrl: "js/ng-views/events/edit.html",
      controller: "eventEditController",
      controllerAs: "vm"
    })
}

function StudentIndexControllerFunction (StudentFactory){
  console.log("you're in the index")
  this.students = StudentFactory.query();
}

function AttendanceIndexControllerFunction (AttendanceFactory, $stateParams){
  console.log("you're in the attendance index")
  this.attendances = AttendanceFactory.query();
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

function StudentEditControllerFunction( StudentFactory, $stateParams ){
 this.student = StudentFactory.get({id: $stateParams.id});
 this.update = function(){
   this.student.$update({id: $stateParams.id})
 }

 this.destroy = function(){
    this.student.$delete({id: $stateParams.id}).then(function(student){
      $state.go("studentIndex")
    })
  }
}

function EventIndexControllerFunction(EventFactory){
 console.log("you're in the event index")
 this.events = EventFactory.query();
}

function NewEventControllerFunction(EventFactory){
 this.event = new EventFactory();
 this.create = function(){
   this.event.$save().then(function(event){
     $state.go("eventShow",{id: event.id})
   })
 }
}

function ShowEventControllerFunction(EventFactory, $stateParams, AttendanceFactory, StudentFactory){
  this.event = EventFactory.get({id: $stateParams.id});
  this.attendances = AttendanceFactory.query({id: $stateParams.id});
  this.students= StudentFactory.query();
  this.addAttendance = function() {
    this.student= studentFactory.get({id: this.studentGoing});
    let attendance = {
      student_id: this.student.id,
      event_id: this.event.id
    }
    //here you will use AttendanceFactory to post new Attendance to API
    function addAttendance(AttendanceFactory, attendance) {
      let url = `http://localhost:3000/events/${event.id}/attendances.json`
      $http({
        method: "POST",
        url: url,
        dataType: "json",
        data: attendance
      }).done((response) => {
        console.log('sucess')
      }).fail(() => {
        console.log('error')
      }).always(() => {
        console.log('request made')
      })
    }
  }
}

function EventEditControllerFunction(EventFactory, $stateParams){
 this.event = EventFactory.get({id: $stateParams.id});
 this.update = function(){
   this.event.$update({id: $stateParams.id});
 }
 this.destroy = function(){
   this.event.$delete({id: $stateParams.id});
 }
}
function WelcomeControllerFunction(){
}
    function StudentEditControllerFunction(StudentFactory, $stateParams){
     this.student = StudentFactory.get({id: $stateParams.id})
     this.update = function(){
       this.student.$update({id: $stateParams.id})
     }
     this.destroy = function(){
        this.student.$delete({id: $stateParams.id})
      }
   }
   function linkEventIndexControllerFunction(eventFactory){
     console.log("you're in the event index")
     this.events = eventFactory.query();
   }

   function linkNewEventControllerFunction(eventFactory){
     this.event = new eventFactory();
     this.create = function(){
       this.event.$save().then(function(event){
         $state.go("eventShow",{id: event.id})
       })
     }
   }

   function linkShowEventControllerFunction(eventFactory, $stateParams, AttendanceFactory, StudentFactory){
     this.event = eventFactory.get({id: $stateParams.id});
     this.attendances = AttendanceFactory.query({id: $stateParams.id});
     this.students= StudentFactory.query();
     this.student= StudentFactory.query({id: $stateParams.id});
    //  let studentString =   JSON.stringify(this.students);
     console.log(this.students)
    //  console.log(studentString)

      this.addAttendance = function() {
        let attendance = {
          student_id: this.student.id
        }
      }
   }

   function linkEventEditControllerFunction(eventFactory, $stateParams){
     this.event = eventFactory.get({id: $stateParams.id});
     this.update = function(){
       this.event.$update({id: $stateParams.id});
     }
     this.destroy = function(){
       this.event.$delete({id: $stateParams.id});
     }
   }
