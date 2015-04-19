angular.module('tmAPP', [])
  .controller('tmCtrl', function($scope, $http) {
    $scope.hi = "helloworld"
    $scope.data = 1
    $scope.qos = 'hi'
    $scope.firewall = 'hi'
    $scope.monitor = 'hi'
    $scope.state = "?"
    // $scope.funcs = ["qos", "firewall", "monitor"]
    $scope.funcs = [
      {name:"qos", model:"triggerQos" ,method:"triggerQos()"},
      {name:"firewall", model:"triggerFirewall", method:"triggerFirewall()"},
      {name:"monitor", model:"triggerMonitor",method:"triggerMonitor()"}
    ]
    
    setInterval(function() {
      $scope.data += 1
      $http.get('http://140.118.20.166:90/get_data').success(function(somedata) {
        // console.log(somedata)
        $scope.somedata = somedata
        // console.log("hi")
      })

      $scope.$apply()
    }, 100000)

    $scope.triggerQos = function() {
      $scope.qos = "i click it"
      console.log("clickQ")
    }

    $scope.triggerFirewall = function() {
      $scope.firewall = "i click it"
      console.log("clickF")
    }

    $scope.triggerMonitor = function() {
      $scope.monitor = "i click it"
      console.log("clickM")
    }

    $scope.triggerMethod = function(method) {
      if (method === "triggerQos()") {
        $scope.triggerQos()
      } else if (method === "triggerFirewall()") {
        $scope.triggerFirewall()
      } else if (method === "triggerMonitor()") {
        $scope.triggerMonitor()
      }
    }

    $scope.echo = function() {
      $http.get("http://140.118.20.166:90/echo").success(function(data){
        console.log("echo ok")
        console.log(data.state)
        if (data.state === "ok") {
          $scope.state = "\u2713"
        } else {
          $scope.state = "\u2717"
        }

      }).error(function() {
        console.log("wrong")
      })
    }
  })