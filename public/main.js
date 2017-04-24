


$(document).ready(function() {




	var city = 0;
	var area = 0;
	var trafficLight = 0;
    var volunteerType = "default";
    var volunteerExperience = "none";
    var email = "default";
    var fullName = "default";
    var phone = "default";
    var address = "default";
    var hasCar = false;
    var wantsSupervisor = false;

    $(document).on('click', '#enable-collapse', function(){ 

        if(wantsSupervisor == false){

            wantsSupervisor= true;
        }else if (wantsSupervisor == true){
        
        wantsSupervisor= false;
            }

            if(wantsSupervisor == false){

            $('#collapseOne').hide();
        } else if(wantsSupervisor == true){

            $('#collapseOne').show();
        }

            



   });
	$('#register-trafficlight-form').on('hide.bs.collapse', function (e) {
  	e.preventDefault();
	});
   


	$(".btn-scroll").click(function() {
    
    // Preventing default action of the event
    event.preventDefault();
    // Getting the height of the document
    var n = $('#scoll-anchor').position();
    $('html, body').animate({ scrollTop: n.top },500);
//                                       |    |
//                                       |    --- duration (milliseconds) 
//                                       ---- distance from the top

});



	$(document).on('click', '.traffic-light-item', function(){  


    	trafficLight = $(event.target).attr( 'lightId' );
    	
        $("#register-trafficlight-form").html('');

        $("#register-trafficlight-form").append(''+
        	'<div class="container form-wrapper fade in" ng-controller= "registerController" >'+
 			'<h1> معلومات المتطوع</h1>'+
        	'<input class="form-control info-form-item" id="distribution-email-field" placeholder="البريد الالكتروني"/>'+
        	'<input class="form-control info-form-item" id="distribution-password-field" type="password" placeholder="كلمة السر"/>'+
        	'<input class="form-control info-form-item" id="distribution-full-name-field" placeholder="الاسم الكامل"/>'+
        	'<input class="form-control info-form-item" id="distribution-phone-field" placeholder="رقم الهاتف"/>'+
        	'<input class="form-control info-form-item" id="distribution-address-field" placeholder="العنوان - اقرب معلم"/>'+
            '<textarea class="form-control info-form-item" id="distribution-expereince-field" placeholder="خبرة تطوعية سابقة"/>'+
        	'<div class="panel-group driving-license-settings dropdown-dev" id="accordion">'+
    		'<div class="panel panel-default">'+
        	'<div class="panel-heading">'+
            '<h4 class="panel-title">'+
                                      '<div  class="checkbox">'+
                '<label   data-toggle="collapse" data-target="#collapseOne">'+
                    '<input id="enable-collapse" id="distribution-hasCar-field" type="checkbox"/> املك سيارة	'+
                '</label>'+
            '</div>'+
								  '</h4>'+

        	'</div>'+
       		'<div id="collapseOne" class="panel-collapse collapse">'+
            '<div class="panel-body">'+
            '<div class="super-duties">'+
'<p style="color:#79c483;"> بما إنه معك سيارة، شو رايك تكون مشرف ؟ </br></p>'+
                '<p>:وعليك مايلي</br> </br> حضور اجتماعات ماتستعجل - </br> التواصل اليومي مع المتطوعين عن طريق التطبيق -</br> تاكيد تواجدهم عن طريق  الكود الخاص بكل متطوع -</br> الالتزام بمواعيد التوزيع المحددة -</br> تبريد وحفظ كميات الماء و التمر -</br></p>'+
'</div>'+
               '<div class="driving-license-kind">'+
               		'<p>هل ترغب بان تكون مشرفا ؟</p>'+
                    '<label for="id1" class="radio-inline">'+
    'لا'+
    '</label> '+
    '<input type="radio" name="optradio" id="id1"> '+
    '<label for="id2" class="radio-inline">'+
    'نعم'+
    '</label> '+
    '<input id="distribution-wantsSupervisor-field" type="radio" name="optradio" id="id2"> '+
    '</br>'+
    '</br>'+
    '</br>'+
'<span style="color:#79c483;"> شهادة مسؤول بالعمل التطوعي مختومة من ادارة السير المركزية اذا التزمت بالتوزيع معنا على الاقل ١٠ ايام</span>'+
                '</div>'+
                '</br>'+
                  '<label  for="id2" class="radio-inline">'+
    '<span style="color:#ed2328 ;">انا متاكد اني استطيع ان اكون مشرفا على اشارتي انا باكد على التزامي مع ماتستعجل يوم اه ويوم لا على اشارتي</span>'+
    '</label> '+
                 '<input type="radio" name="optradioconfirm" id="id1"> '+
  

            '</div>'+
      		'</div>'+
   			'</div>'+
			'</div>'+
        	'<button ng-click="createUser()" class="btn btn-success btn-block"  id="sign-up-btn" >انضم الينا</button>'+
        	
        '</div>');

        
        
       

        
    });


	$(document).on('click', '.area-item', function(){  


		$('#menu3-list-item').removeClass('disabled');
    	$('#menu3Link').attr('href', '#menu3');
    	area = $(event.target).attr( 'areaId' );
    	// alert(city);
        $(".area-item").removeClass("active");
        $(event.target).addClass("active");

        $('.nav-tabs a[href="#menu3"]').tab('show');
        $("#menu3").html('');
        
            $.ajax({
            url:'/api/light',
            contentType: 'application/json',
            method: 'GET',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    area: area
                }),
            success: function(response){

                for (var i = 0; i < response.length; i++) {
    
                     console.log(response[i].englishName);
                         $("#menu3").append(''+
                             '<a class="list-group-item traffic-light-item " lightId="'+ response[i]._id+'">'+response[i].arabicName+'</a>'
    );
}
            }


         });
        
    });

		$(document).on('click', '.city-item', function(){  
    
    	$('li').removeClass('disabled');
    	$('#menu2Link').attr('href', '#menu2');

    	city = $(event.target).attr( 'cityId' );
    	// alert(city);
        $(".city-item").removeClass("active");
        $(event.target).addClass("active");

        $('.nav-tabs a[href="#menu2"]').tab('show');
        $("#menu2").html('');

          $.ajax({
            url:'/api/area',
            contentType: 'application/json',
            method: 'GET',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    city: city
                }),
            success: function(response){

                for (var i = 0; i < response.length; i++) {
    
                     console.log(response[i].englishName);
                         $("#menu2").append(''+
                             '<a class="list-group-item area-item " areaId="'+ response[i]._id+'">'+response[i].arabicName+'</a>'
    );
}
            }


         });

        

        
    });

    $("#packaging-btn").click(function() {

        volunteerType = "packaging";

         $("#register-trafficlight-form").html('');

         

        $("#register-trafficlight-form").append(''+
            '<div class="container form-wrapper">'+
            '<h1> معلومات المتطوع</h1>'+
            '<input class="form-control info-form-item" id = "packaging-email-field" placeholder="البريد الالكتروني"/>'+
            '<input class="form-control info-form-item" id = "packaging-password-field" type="password" placeholder="كلمة السر"/>'+
            '<input class="form-control info-form-item" id = "packaging-full-name-field" placeholder="الاسم الكامل"/>'+
            '<input class="form-control info-form-item" id = "packaging-phone-field" placeholder="رقم الهاتف"/>'+
            '<input class="form-control info-form-item" id = "packaging-address-field" placeholder="العنوان - اقرب معلم"/>'+

            '<button class="btn btn-success btn-block " id="add-packaging-user-btn">انضم الينا</button>'+
            
        '</div>');
        

    });

    $(".distribution-btn").click(function() { 

        $.ajax({
            url:'/api/city',
            contentType: 'application/json',
            method: 'GET',
            success: function(response){
   
  


 volunteerType = "distribution";

        $("#register-trafficlight-form").html('');

        $("#register-trafficlight-form").append(''+

        '<div class="container register-traffic-tabs">'+
  
  '<ul class="nav nav-tabs navbar-right">'+
    
    
    
    '<li id="menu3-list-item" class="disabled"><a id="menu3Link" data-toggle="tab" >الاشارة</a></li>'+
    '<li id="menu2-list-item" class="disabled" ><a id="menu2Link" data-toggle="tab" >المنطقة</a></li>'+
    '<li class="active"><a data-toggle="tab" href="#menu1">المحافظة</a></li>'+
    
  '</ul>'+

  '<div class="tab-content">'+
    
    '<div id="menu1" class="tab-pane fade in active">'+
      '<h3>الرجاء اختيار المنطقة</h3>'+

        '<div class="list-group" id="city-list">'+
        
        
        
        '</div>'+

    '</div>'+
    '<div id="menu2" class="tab-pane fade">'+
      
    '</div>'+
    '<div id="menu3" class="tab-pane fade">'+
      
    '</div>'+
  '</div>'+
'</div>')
for (var i = 0; i < response.length; i++) {
    
    console.log(response[i].englishName);
    $("#city-list").append(''+
    '<a class="list-group-item city-item " cityId="'+response[i]._id+'">'+response[i].arabicName+'</a>'
    );
}
                
            }


         });


       

    });

$(".call-us-btn").click(function() { 


$("#register-trafficlight-form").html('');

$('.collapse').collapse();

        

});



$(document).on('click', '#sign-up-btn', function(){  

    var email = $('#distribution-email-field').val();
    var password = $('#distribution-password-field').val();
    
    volunteerExperience = $('#distribution-expereince-field').val();
    fullName = $('#distribution-full-name-field').val();
    phone = $('#distribution-phone-field').val();
    address = $('#distribution-address-field').val();
    hasCar = $('#distribution-hasCar-field').is(":checked");
    wantsSupervisor = $('#distribution-wantsSupervisor-field').is(":checked");

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      })
        .then(function(firebaseUser) {

            if (firebaseUser) {
         $.ajax({
            url:'/api/user',
            contentType: 'application/json',
            method: 'POST',
             data: JSON.stringify({
                    firebaseId: firebaseUser.uid,
                    city: city,
                    area: area,
                    trafficLight: trafficLight,
                    volunteerType: volunteerType,
                    email: email,
                    volunteerExperience:volunteerExperience,
                    fullName: fullName,
                    phone: phone,
                    address: address,
                    hasCar: hasCar,
                    wantsSupervisor: wantsSupervisor

                }),
            success: function(response){
               
                console.log(response);
            }


         });


     }
     });



    });



$(document).on('click', '#add-packaging-user-btn', function(){  

    var email = $('#packaging-email-field').val();
    var password = $('#packaging-password-field').val();
    
    
    fullName = $('#packaging-full-name-field').val();
    phone = $('#packaging-phone-field').val();
    address = $('#packaging-address-field').val();
    

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      })
        .then(function(firebaseUser) {

        if (firebaseUser) {
         $.ajax({
            url:'/api/user',
            contentType: 'application/json',
            method: 'POST',
             data: JSON.stringify({
                    firebaseId: firebaseUser.uid,
                    city: city,
                    area: area,
                    trafficLight: trafficLight,
                    volunteerType: volunteerType,
                    email: email,
                    volunteerExperience:volunteerExperience,
                    fullName: fullName,
                    phone: phone,
                    address: address,
                    hasCar: hasCar,
                    wantsSupervisor: wantsSupervisor

                }),
            success: function(response){
               
                console.log(response);
            }


         });

        }
     });



    });


$(document).on('click', '#login-btn', function(){  

    var email = $('#login-email').val();
    var password = $('#login-password').val();

 firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      })
        .then(function(firebaseUser) {

        if (firebaseUser) {
         $.ajax({
            url:'/api/admin',
            contentType: 'application/json',
            method: 'POST',
             data: JSON.stringify({
                    firebaseId: firebaseUser.uid
                }),
            success: function(response){
                $("#admin-body").html('');
                 $("#admin-body").append(response);
                console.log(response);
            }


         });

        }
     });
 });


});



