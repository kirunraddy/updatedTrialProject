var app = angular.module("myapp", []);
app.controller("contactController", function ($scope, $http) {
  $scope.contactlist = [];

  var refresh = function () {
    $http.get("/contact/get").success(function (res) {
      //console.log(res);
      $scope.contactlist = res;
      //console.log(res);
    });
  };
  refresh();

  $scope.clear = function () {
    $scope.contact = "";
    refresh();
  };

  $scope.addContact = function () {
    if (!$scope.contact) {
      $("#alert").modal({ show: true });
    } else {
      $http
        .post("/contact/contsave", $scope.contact)
        .success(function (res) {
          refresh();
          $scope.clear();
          console.log($scope.contact);
        })
        .error(function (err) {
          refresh();
          console.log(err);
        });
    }
  };

  $scope.update = function (contact) {
    $http
      .put("/contact/contup/" + $scope.contact._id, $scope.contact)
      .success(function (res) {
        console.log(res);
        refresh();
      })
      .error(function (err) {
        console.log(err);
      });

    $scope.clear();
  };

  $scope.edit = function (r) {
    $("#myModal").modal({ show: true });
    $scope.contact = r;
  };

  $scope.delete = function (cont) {
    $http
      .delete("/contact/del/" + cont._id)
      .success(function (res) {
        $scope.clear();
        refresh();
        console.log(res);
      })

      .error(function (err) {
        console.log(err);
      });

    //To remove fade in after delete
    $("#basicModal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  };
});
