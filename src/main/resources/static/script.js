var app = angular.module('Kursverteilung', []);

app.controller('Ctrl', function($scope, $http) {
			 $scope.students = [];
			 $scope.courses = [];
			 $scope.sameCourses = [];
			 $scope.fixedCourses = [];
			 $scope.actionUpload = {};
			 $scope.actionUpload.course = {};
			 $scope.actionUpload.student = {};
			 $scope.actionUpload.sameCourse = {};
			 $scope.actionUpload.fixedCourse = {};
			 $scope.actionOptimize = {};
			 			 			 
			 $scope.actionUploadStatus = function(data) {
			 	var result = {}
			 	if (data != null) {
				if (data.success === true) 
					result.success = true;
				else
					result.success = false;
				if (data.success === false) 
					result.error = true;
				else
					result.error = false;
				result.date = new Date(data.timestamp).toLocaleDateString(); 
				result.time = new Date(data.timestamp).toLocaleTimeString();
			 	};
				return result;
			 }
			 
			 $scope.readActionUploadStudent = function() {
			 	$http.get('api/action/UploadStudent' )
			 		 .then(  function(response) {
			 			console.log("Reading Action UploadStudent");
			 			$scope.actionUpload.student = $scope.actionUploadStatus(response.data);
			 			console.log("response: " + new Date(response.data.timestamp) + " / " + response.data.success);
				     });
			 };
			 $scope.readActionUploadCourse = function() {
			     $http.get('api/action/UploadCourse' )
				      .then(  function(response) {
					     console.log("Reading Action UploadCourse");
					     $scope.actionUpload.course = $scope.actionUploadStatus(response.data);
					     console.log("response: " + new Date(response.data.timestamp) + " / " + response.data.success);
				      });
			 };
			 $scope.readActionUploadFixedCourse = function() {
			     $http.get('api/action/UploadFixedCourse' )
				      .then(  function(response) {
					     console.log("Reading Action UploadFixedCourse");
					     $scope.actionUpload.fixedCourse = $scope.actionUploadStatus(response.data);
                         console.log("response: " + new Date(response.data.timestamp) + " / " + response.data.success);
				      });
			 };
			 $scope.readActionUploadSameCourse = function() {
			     $http.get('api/action/UploadSameCourse' )
				      .then(  function(response) {
					     console.log("Reading Action UploadSameCourse");
					     $scope.actionUpload.sameCourse = $scope.actionUploadStatus(response.data);
                         console.log("response: " + new Date(response.data.timestamp) + " / " + response.data.success);
				      });
			 };
			 $scope.readActionOptimize = function() {
			     $http.get('api/action/Optimize' )
				  .then(  function(response) {
					console.log("Reading Action Optimize");
				    $scope.actionOptimize = response.data;
					console.log("response: " + response.data);
				  });
			 };
			 
			 $scope.readStudents = function() {
		     $http.get('api/students' )
			  .then(  function(response) {
				console.log("Reading Students");
			    $scope.students = response.data;
				console.log("response: ");
				$scope.students.forEach(function(el){
					console.log(el);
				});
			  });
			 };
	     		
			 $scope.readCourses = function() {
		     $http.get('api/courses' )
			  .then(  function(response) {
				console.log("Reading Courses");
			    $scope.courses = response.data;
				console.log("response: ");
				$scope.courses.forEach(function(el){
					console.log(el);
				});
			  });
			 };
	     		
			 $scope.readFixedCourses = function() {
		     $http.get('api/fixedCourses' )
			  .then(  function(response) {
				console.log("Reading FixedCourses");
			    $scope.fixedCourses = response.data;
				console.log("response: ");
				$scope.fixedCourses.forEach(function(el){
					console.log(el);
				});
			  });
			 };
	     		
			 $scope.readSameCourses = function() {
		     $http.get('api/sameCourses' )
			  .then(  function(response) {
				console.log("Reading sameCourses");
			    $scope.sameCourses = response.data;
				console.log("response: ");
				$scope.sameCourses.forEach(function(el){
					console.log(el);
				});
			  });
			 };
			 $scope.read = function() {
				 $scope.readStudents();
				 $scope.readCourses();
				 $scope.readFixedCourses();
				 $scope.readSameCourses();
				 
				 $scope.readActionUploadStudent();
				 $scope.readActionUploadCourse();
				 $scope.readActionUploadFixedCourse();
				 $scope.readActionUploadSameCourse();
				 $scope.readActionOptimize();
			 }
	     		   
		     $scope.read();

		     $scope.optimize = function() {
		    	 console.log("optimize");
		    	 $http.put('api/optimize')
		    	   .then( function success(response) {
		    		  console.log("optimized");
		    		   $scope.read();
		    		   }, function error(response) {
		    	      console.log("error");
		    	      response.data.errors.forEach(function(e) {
		    	    	  console.log(e);
		    	      })

		    	   });
		     }
		     
		     $scope.delete = function() {
		    	 console.log("delete");
		    	 $http.delete('api/upload/delete')
		    	   .then( 
		    		   function success(response) {
		    		       console.log("deleted");
		    		       $scope.read();
		    		   }, 
					   function error(response) {
		    	           console.log("error");
		    	           response.data.errors.forEach(function(e) {
		    	    	   console.log(e);
		    	       })

		    	   });
		     }
		     
		     $scope.upload = function(api,filename) {
		    	 console.log("Upload to " + api + ": " + filename);
		    	 var fd = new FormData();
		         fd.append('file', filename);
		         $http.post(api, fd, {
		             transformRequest: angular.identity,
		             headers: {'Content-Type': undefined}
		         })
		         .success(function(){
		        	 console.log('success');
		        	 $scope.errors = [];
		        	 $scope.read();
		         })
		         .error(function(error){
		        	 console.log("Error:");
		        	 error.errors.forEach( function(element) {
		        		 console.log('error ' + element); 
		        	 });
		        	 $scope.errors = error.errors;
		        	 $scope.read();
		         });	    	 
		     }
		     
		     $scope.uploadCourse = function() {
		    	 $scope.upload('api/upload/courses', $scope.param.file.course);
		     }
		     $scope.uploadStudent = function() {
		    	 $scope.upload('api/upload/students', $scope.param.file.student);
		     }
		     $scope.uploadFixedCourse = function() {
		    	 $scope.upload('api/upload/fixedCourses', $scope.param.file.fixedCourse);
		     }
		     $scope.uploadSameCourse = function() {
		    	 $scope.upload('api/upload/sameCourses', $scope.param.file.sameCourse);
		     }
		     
		     $scope.uploadButton = function(obj) {
		    	 if (obj.success === true) {
		    	 	return "btn btn-success btn-sm btn-block";
		    	 };
		    	 if (obj.error == true) {
		    		return "btn btn-danger btn-sm btn-block";
		    	 }
		    	 return "btn btn-default btn-sm btn-block";
		     }
		     $scope.deleteButton = function() {
		    	 if ( $scope.actionUpload.course.success === true ||
		    	      $scope.actionUpload.student.success === true ||
		    	      $scope.actionUpload.sameCourse.success === true ||
		    	      $scope.actionUpload.fixedCourse.success === true 
			        ) {
		    	 	return true;
		    	 } else {
		    		 return false;
		    	 };
		     }
		     $scope.navOptimization = function() {
		    	 result = 
		    		 $scope.actionUpload.course.success === true &&
                     $scope.actionUpload.student.success === true &&
                     $scope.actionUpload.sameCourse.error != true &&
                     $scope.actionUpload.fixedCourse.error != true 
                     ;
                 if (result) 
                 	return "nav-link";
                 else
                 	return "nav-link disabled"
		     }
		     $scope.optimizeButton = function() {
		    	 if ( $scope.actionOptimize.success === true )
		    		 return "btn btn-success btn-sm btn-block";
		    	 if ( $scope.actionOptimize.error === true )
		    		 return "btn btn-danger btn-sm btn-block";
		    	 
		    	 return "btn btn-default btn-sm btn-block";
		     }
		     
});		

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
