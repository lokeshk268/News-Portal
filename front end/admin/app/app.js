var app=angular.module("MyApp",['ngRoute','ngCookies','ngFileUpload']);
app.config(function($routeProvider)
{
  $routeProvider
  .when("/",
  {
      templateUrl:'login.html',
      controller:'loginCtrl'
  })
  .when("/dashboard",
  {
      templateUrl:'dash.html',
      
  })
  .when("/cpass",
  {
      templateUrl:'cpass.html',
      controller:'cpass'
      
  })
  .when("/addnews",
  {
      templateUrl:'addnews.html',
      controller:'addnews'
      
  })
})
app.controller("MyCtrl",function($cookieStore,$scope,$location)
{
  cr=$cookieStore.get('idd');
   $scope.cok=cr;
   $scope.logout=function()
   {
      $cookieStore.remove('idd');
     $location.url('/');
   }
})
app.controller("loginCtrl",function($scope,$http,$cookieStore,$location)
{
  $scope.login=function()
  {
      $http.post("http://localhost:8045/login",$scope.myData).then(function(res)
      {
        //console.log(res.data.msg);
        if(res.data.error==0)
         {
           //console.log("Cookie created");
           id=res.data.msg;
           $cookieStore.put('idd',id); 
           $location.url('dashboard');
         }
         else
         {
            $scope.msg=false;
         }
      })
  }
})
app.controller("cpass",function($scope,$http,$cookieStore)
{
  
  $scope.chpass=function()
  {
    if($scope.myData.cp===$scope.myData.np)
    {
      var op=$scope.myData.op;
      var np=$scope.myData.np;
       var id=$cookieStore.get('idd');
       var data={uid:id,opp:op,npp:np};
       $http.post("http://localhost:8045/chpass",data).then(function(res)
       {
         console.log(res.data)
         $scope.data=res.data;
       })
    }
    else
    {
      alert("Np and cp are not match");
    }
  }
})
app.controller('addnews',function($scope,$http,Upload)
{
  $scope.addnews=function()
  {
   // console.log($scope.file)
     Upload.upload({
            url: 'http://localhost:8045/addnews',
            data: {file: $scope.file}
        }).then(function (resp)
         {
           console.log("data");
 $http.post("http://localhost:8045/addnews",$scope.myData).then(function(res)
     {
        console.log(res.data)
     })
        }, function (resp) 
        {
            console.log('Error status: ' + resp.status);
        })
   
  }
  })











