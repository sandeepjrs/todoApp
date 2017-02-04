var ownTodo = angular.module('ownTodo',[])

.controller('mainController', function($scope, $http){

  $scope.data = {};
  $scope.todos = {};

  $scope.createTodo = function(){

try{
  size = $scope.data.text.length
    console.log("the lenght of data is "+ $scope.data.text.length)
    if (size>0) {} else {return}
  }
  catch(e) {
    alert("plese enter something or something went wrong")
    return;
  }

        $http.post('/api/todo', $scope.data)
        .success(function(data) {
            $scope.data = {}; // clear the form so our user is ready to enter another
            $scope.todos = data;

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

  };

  $scope.deleteTodo = function(id){
    console.log("Controller : Trying to del the id : "+ id);
    $http.delete('/api/todo/'+ id)
      .success(function(data){
        $scope.todos = data;
      })
      .error(function(data) {
    console.log('Error: ' + data);
});
  }


    console.log("Trying to get the todos")
    $http.get('/api/todo')
    .success(function(data){
      $scope.todos = data;
    });



});
