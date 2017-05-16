$(document).ready(function() {

      // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDypZaqxzZK1Ve3kGt8na0rJ5Yr2DMr3P4",
    authDomain: "ma-testa3jel-app.firebaseapp.com",
    databaseURL: "https://ma-testa3jel-app.firebaseio.com",
    projectId: "ma-testa3jel-app",
    storageBucket: "ma-testa3jel-app.appspot.com",
    messagingSenderId: "528695906342"
  };
  firebase.initializeApp(config);

var cities = new Array();
var areas = new Array();
var lights = new Array();
var wareHouses = new Array();

function getCityId(name){

        for (var i = 0; i < cities.length; i++) {

           

            console.log(name);
                if(cities[i].arabicName == name){

                    return cities[i].id;
                }

        }
        return -1;
}

function getAreaId(name){

        for (var i = 0; i < areas.length; i++) {

            

            
                if(areas[i].arabicName == name){

                    return areas[i].id;
                }

        }
        return -1;
}

function getLightId(name){

        for (var i = 0; i < lights.length; i++) {

            
                if(lights[i].arabicName == name){

                    return lights[i].id;
                }

        }
        return -1;
}

function getWareHouseId(name){

        for (var i = 0; i < wareHouses.length; i++) {

            
                if(wareHouses[i].arabicName == name){

                    return wareHouses[i].id;
                }

        }
        return -1;
}


       $.ajax({
            url:'/api/wareHouse',
            contentType: 'application/json',
            method: 'get',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                  
                }),
            success: function(response){

              for (var i = 0; i < response.length; i++) {
    
                    

                     var house = {
                        arabicName: response[i].arabicName,
                        id :response[i]._id
                     };

                     wareHouses.push(house);
                 }

 
            }




         });

    $.ajax({
            url:'/api/city',
            contentType: 'application/json',
            method: 'get',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                  
                }),
            success: function(response){
                
              for (var i = 0; i < response.length; i++) {
    
                    

                     var city = {
                        arabicName: response[i].arabicName,
                        id :response[i]._id
                     };

                     cities.push(city);


                        
                     
                 }
  
            }


         });


        $.ajax({
            url:'/api/areas',
            contentType: 'application/json',
            method: 'get',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                  
                }),
            success: function(response){

              for (var i = 0; i < response.length; i++) {
    
                    

                     var area = {
                        arabicName: response[i].arabicName,
                        id :response[i]._id,
                        city: response[i].city
                     };

                     areas.push(area);
                 }
  
            }


         });

       $.ajax({
            url:'/api/lights',
            contentType: 'application/json',
            method: 'get',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                  
                }),
            success: function(response){

              for (var i = 0; i < response.length; i++) {
    
                    

                     var light = {
                        arabicName: response[i].arabicName,
                        id :response[i]._id,
                        area :response[i].area 
                     };

                     lights.push(light);

                 }
               }
             });



           $.ajax({
            url:'/api/user',
            contentType: 'application/json',
            method: 'GET',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    
                }),
            success: function(response){


                  $("#table-head").html('');
        $("#table-head").append(
            '<tr>'+
            '<th></th>'+
            '<th></th>'+
            '<th></th>'+
            '<th>ID</th>'+
        '<th>Name</th>'+
       '<th>Email</th>'+
       '<th>Phone Number</th>'+
       '<th>Gender</th>'+
        '<th>Age</th>'+
       '<th>Car</th>'+
        '<th>Supervise</th>'+
        // '<th>Type</th>'+
        '<th>City</th>'+
       '<th>Area</th>'+
       '<th>Traffic Light</th>'+
        '<th>Address</th>'+
        '<th>Experience</th>'+
        '<th>Verified</th>'+
        
        '</tr>');
$("#table-body").html('');

                for (var i = 0; i < response.length; i++) {

                    var city = "";
                    var area = "";
                    var light = "";
    
             for (var j = 0; j < cities.length; j++){
                
                if (cities[j].id == response[i].city ){

                       city = cities[j].arabicName;
                }

                }
            for (var j = 0; j < areas.length; j++){

                if (areas[j].id == response[i].area ){

                       area = areas[j].arabicName;
                }


                }

             for (var j = 0; j < lights.length; j++){

                if (lights[j].id == response[i].trafficLightId ){

                       light = lights[j].arabicName;
                }


                }


                
                         $("#table-body").append(''+
                                '<tr>'+
                          '<td><button type="button" class="btn btn-warning">Edit</button></td>'+
        '<td><button type="button" class="btn btn-success btn-save-normalUser">Verify</button></td>'+
        '<td><button type="button" class="btn btn-danger btn-delete-normalUser">Delete</button></td>'+
        '<td class="distru-id-field">'+ response[i]._id+'</td>'+
        '<td><input type="text" disabled class="distru-fullName-field" name="fullName" value="'+ response[i].fullName+'"></td>'+
        '<td><input type="text" disabled class="distru-email-field" name="fullName" value="'+ response[i].email+'"></td>'+
        '<td><input type="text" disabled class="distru-phone-field" name="fullName" value="'+response[i].phone +'"></td>'+
        '<td><input type="text" disabled class="distru-gender-field" name="fullName" size="5" value="'+ response[i].gender+'"></td>'+
        '<td><input type="text" disabled class="distru-age-field" name="fullName" size="4" value="'+ response[i].age +'"></td>'+
        '<td><input type="text" disabled class="distru-hasCar-field" name="fullName" size="4" value="'+ response[i].hasCar+'"></td>'+
        '<td><input type="text" disabled class="distri-wantsSupervisor-field" name="fullName" size="4" value="'+ response[i].wantsSupervisor+'"></td>'+
        // '<td><input type="text" disabled class="distru-type-field" name="fullName" size="9" value="'+ response[i].volunteerType+'"></td>'+
        // '<td><input type="text" disabled class="distru-city-field" size="5" name="fullName" value="'+city+'"></td>'+
       '<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-city-field" id="city-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 

        // '<td><input type="text" disabled class="distru-area-field" name="fullName" value="'+area +'"></td>'+

 '<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-area-field" id="area-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 

        // '<td><input type="text" disabled class="distru-trafficLight-field" name="fullName" value="'+light +'"></td>'+
'<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-trafficLight-field" id="light-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 

        '<td><input type="text" disabled class="distru-address-field" name="fullName" value="'+response[i].address +'"></td>'+
        '<td><input type="text" disabled class="distru-exp-field" name="fullName" value="'+ response[i].volunteerExperience+'"></td>'+
        
        '<td><input type="text" disabled name="fullName" size="4" value="'+ response[i].checkedBy+'"></td>'+
        
      '</tr>'
    );

                $('#city-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < cities.length; j++) {
                    if (cities[j].id == response[i].city){

                      $('#city-for-user-'+response[i]._id+'').append('<option selected value="'+cities[j].id+'">'+cities[j].arabicName+'</option>' );
                 }else{
                     $('#city-for-user-'+response[i]._id+'').append('<option value="'+cities[j].id+'">'+cities[j].arabicName+'</option>' );

                 }
                     
                 }

                  $('#area-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < areas.length; j++) {
                    if (areas[j].id == response[i].area){

                      $('#area-for-user-'+response[i]._id+'').append('<option selected value="'+areas[j].id+'">'+areas[j].arabicName+'</option>' );
                 }else{
                     $('#area-for-user-'+response[i]._id+'').append('<option value="'+areas[j].id+'">'+areas[j].arabicName+'</option>' );

                 }
                     
                 }

                  $('#light-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < lights.length; j++) {
                    if (lights[j].id == response[i].trafficLightId){

                      $('#light-for-user-'+response[i]._id+'').append('<option selected value="'+lights[j].id+'">'+lights[j].arabicName+'</option>' );
                 }else{
                     $('#light-for-user-'+response[i]._id+'').append('<option value="'+lights[j].id+'">'+lights[j].arabicName+'</option>' );

                 }
                 
                     
                 }
}
            }


         });





    $(document).on('click', ".btn-warning", function(){  
    

    $(this).parent().parent().find("td").find('input').removeAttr('disabled');
});




       $(document).on('click', ".btn-delete-normalUser", function(){ 

        var id = $(this).parent().parent().find('.distru-id-field').html();

        if (confirm("Delete user with id = " + id) == true) {

               
       $.ajax({
            url:'/api/deleteUser',
            contentType: 'application/json',
            method: 'DELETE',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: JSON.stringify({
                     id: id,
                
                }),
            success: function(response){

           
  
            }


         });
       
    } else {
        
    }
    

 
});






       $(document).on('click', ".btn-delete-wareHouseUser", function(){  

            var id = $(this).parent().parent().find('.packaging-id-field').html();

        if (confirm("Delete user with id = " + id) == true) {
       $.ajax({
            url:'/api/deleteWareHouseUser',
            contentType: 'application/json',
            method: 'DELETE',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: JSON.stringify({
                     id: id,
                
                }),
            success: function(response){

           console.log(response);
  
            }


         });

       }else{


       }

        });








    $(document).on('click', ".btn-save-normalUser", function(){  

    $(this).parent().parent().find("td").find('input').attr('disabled', true);
    

    var id = $(this).parent().parent().find('.distru-id-field').html();
    var name = $(this).parent().parent().find("td").find('.distru-fullName-field').val();
    var phone = $(this).parent().parent().find("td").find('.distru-phone-field').val();
    var gender = $(this).parent().parent().find("td").find('.distru-gender-field').val();
    var age = $(this).parent().parent().find("td").find('.distru-age-field').val();
    var hasCar = $(this).parent().parent().find("td").find('.distru-hasCar-field').val();
    var wantsSupervisor = $(this).parent().parent().find("td").find('.distru-wantsSupervisor-field').val();
    // var type = $(this).parent().parent().find("td").find('.distru-type-field').val();
    var city = $(this).parent().parent().find("td").find("form").find('.distru-city-field').val();
    var area = $(this).parent().parent().find("td").find("form").find('.distru-area-field').val();
    var trafficLight = $(this).parent().parent().find("td").find("form").find('.distru-trafficLight-field').val();
    var email = $(this).parent().parent().find("td").find('.distru-email-field').val();
    var address = $(this).parent().parent().find("td").find('.distru-address-field').val();
    var exp = $(this).parent().parent().find("td").find('.distru-exp-field').val();
      
   
       $.ajax({
            url:'/api/updateUser',
            contentType: 'application/json',
            method: 'PUT',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: JSON.stringify({
                     id: parseInt(id, 10),
                city: parseInt(city, 10),
                area: parseInt(area, 10),
                trafficLightId: parseInt(trafficLight, 10),
                // volunteerType: type,
                email: email,
                volunteerExperience: exp,
                fullName: name,
                phone: phone,
                address: address,
                hasCar: hasCar,
                wantsSupervisor: wantsSupervisor,
                gender:gender,
                checkedBy: "Verified"
                }),
            success: function(response){
                    alert("user has been verified !")
              
            }


         });

  
});



        $(document).on('click', ".btn-save-wareHouseUser", function(){  

    $(this).parent().parent().find("td").find('input').attr('disabled', true);


        
        
    
        
        

    var id = $(this).parent().parent().find('.packaging-id-field').html();
    var name = $(this).parent().parent().find("td").find('.packaging-fullName-field').val();
    var phone = $(this).parent().parent().find("td").find('.packaging-phone-field').val();
    var gender = $(this).parent().parent().find("td").find('.packaging-gender-field').val();
    var age = $(this).parent().parent().find("td").find('.packaging-age-field').val();
    var wareHouse = $(this).parent().parent().find("td").find("form").find('.packaging-wareHouse-field').val();
    // var type = $(this).parent().parent().find("td").find('.packaging-volunteerType-field').val();
    var email = $(this).parent().parent().find("td").find('.packaging-email-field').val();
    var address = $(this).parent().parent().find("td").find('.packaging-address-field').val();
    var exp = $(this).parent().parent().find("td").find('.packaging-volunteerExperience-field').val();
     

       $.ajax({
            url:'/api/updateWareHouseUser',
            contentType: 'application/json',
            method: 'PUT',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: JSON.stringify({
                  id: parseInt(id, 10),
                wareHouse: parseInt(wareHouse, 10),
                // volunteerType: type,
                email: email,
                volunteerExperience: exp,
                fullName: name,
                phone: phone,
                address: address,
                gender:gender,
                checkedBy: "Verified"
                }),
            success: function(response){

              alert("user has been verified !")
            }


         });
  
});


$(document).on('click', '#distribution-tab', function(){ 

     $.ajax({
            url:'/api/user',
            contentType: 'application/json',
            method: 'GET',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    
                }),
            success: function(response){
                $("#data-title").html('');
                 $("#data-title").append(
            '<h2>Traffic Light Volunteers</h2>'+
  '<p>List of people who volunteered for Ma Testa3jel intiative:</p>'

                    );
       
        $("#table-body").html('');
        
                  $("#table-head").html('');
        $("#table-head").append(
            '<tr>'+
            '<th></th>'+
            '<th></th>'+
            '<th></th>'+
            '<th>ID</th>'+
        '<th>Name</th>'+
       '<th>Email</th>'+
       '<th>Phone Number</th>'+
       '<th>Gender</th>'+
        '<th>Age</th>'+
       '<th>Car</th>'+
        '<th>Supervise</th>'+
        // '<th>Type</th>'+
        '<th>City</th>'+
       '<th>Area</th>'+
       '<th>Traffic Light</th>'+
        '<th>Address</th>'+
        '<th>Experience</th>'+
        '<th>Verified</th>'+
        
        '</tr>');
$("#table-body").html('');

                for (var i = 0; i < response.length; i++) {

                    var city = "";
                    var area = "";
                    var light = "";
    
             for (var j = 0; j < cities.length; j++){
                
                if (cities[j].id == response[i].city ){

                       city = cities[j].arabicName;
                }

                }
            for (var j = 0; j < areas.length; j++){

                if (areas[j].id == response[i].area ){

                       area = areas[j].arabicName;
                }


                }

             for (var j = 0; j < lights.length; j++){

                if (lights[j].id == response[i].trafficLightId ){

                       light = lights[j].arabicName;
                }


                }


                
                         $("#table-body").append(''+
                                '<tr>'+
                          '<td><button type="button" class="btn btn-warning">Edit</button></td>'+
        '<td><button type="button" class="btn btn-success btn-save-normalUser">Verify</button></td>'+
        '<td><button type="button" class="btn btn-danger btn-delete-normalUser">Delete</button></td>'+
        '<td class="distru-id-field">'+ response[i]._id+'</td>'+
        '<td><input type="text" disabled class="distru-fullName-field" name="fullName" value="'+ response[i].fullName+'"></td>'+
        '<td><input type="text" disabled class="distru-email-field" name="fullName" value="'+ response[i].email+'"></td>'+
        '<td><input type="text" disabled class="distru-phone-field" name="fullName" value="'+response[i].phone +'"></td>'+
        '<td><input type="text" disabled class="distru-gender-field" name="fullName"  size="5" value="'+ response[i].gender+'"></td>'+
        '<td><input type="text" disabled class="distru-age-field" name="fullName" size="4" value="'+ response[i].age +'"></td>'+
        '<td><input type="text" disabled class="distru-hasCar-field" name="fullName" size="4" value="'+ response[i].hasCar+'"></td>'+
        '<td><input type="text" disabled class="distri-wantsSupervisor-field" name="fullName" size="4" value="'+ response[i].wantsSupervisor+'"></td>'+
        // '<td><input type="text" disabled class="distru-type-field" name="fullName" size="9" value="'+ response[i].volunteerType+'"></td>'+
           // '<td><input type="text" disabled class="distru-type-field" name="fullName" size="9" value="'+ response[i].volunteerType+'"></td>'+
        // '<td><input type="text" disabled class="distru-city-field" size="5" name="fullName" value="'+city+'"></td>'+
'<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-city-field" id="city-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 

        // '<td><input type="text" disabled class="distru-area-field" name="fullName" value="'+area +'"></td>'+

 '<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-area-field" id="area-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 

        // '<td><input type="text" disabled class="distru-trafficLight-field" name="fullName" value="'+light +'"></td>'+
'<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-trafficLight-field" id="light-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 
        '<td><input type="text" disabled class="distru-address-field" name="fullName" value="'+response[i].address +'"></td>'+
        '<td><input type="text" disabled class="distru-exp-field" name="fullName" value="'+ response[i].volunteerExperience+'"></td>'+
        
        '<td><input type="text" disabled name="fullName" size="4" value="'+ response[i].checkedBy+'"></td>'+
        
      '</tr>'
    );

                 
                $('#city-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < cities.length; j++) {
                    if (cities[j].id == response[i].city){

                      $('#city-for-user-'+response[i]._id+'').append('<option selected value="'+cities[j].id+'">'+cities[j].arabicName+'</option>' );
                 }else{
                     $('#city-for-user-'+response[i]._id+'').append('<option value="'+cities[j].id+'">'+cities[j].arabicName+'</option>' );

                 }
                     
                 }

                  $('#area-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < areas.length; j++) {
                    if (areas[j].id == response[i].area){

                      $('#area-for-user-'+response[i]._id+'').append('<option selected value="'+areas[j].id+'">'+areas[j].arabicName+'</option>' );
                 }else{
                     $('#area-for-user-'+response[i]._id+'').append('<option value="'+areas[j].id+'">'+areas[j].arabicName+'</option>' );

                 }
                     
                 }

                  $('#light-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < lights.length; j++) {
                    if (lights[j].id == response[i].trafficLightId){

                      $('#light-for-user-'+response[i]._id+'').append('<option selected value="'+lights[j].id+'">'+lights[j].arabicName+'</option>' );
                 }else{
                     $('#light-for-user-'+response[i]._id+'').append('<option value="'+lights[j].id+'">'+lights[j].arabicName+'</option>' );

                 }
                 
                     
                 }
}
            }


         });
});



$(document).on('click', '#packaging-tab', function(){ 

     $.ajax({
            url:'/api/wareHouseUser',
            contentType: 'application/json',
            method: 'GET',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    
                }),
            success: function(response){

$("#table-head").html('');
  $("#table-head").append(
            '<tr>'+
            '<th></th>'+
            '<th></th>'+
            '<th></th>'+
            '<th>ID</th>'+
'<th>Name</th>'+
       '<th>Email</th>'+
       '<th>Phone Number</th>'+
       '<th>Gender</th>'+
        '<th>Age</th>'+
       
        // '<th>Type</th>'+
        '<th>Ware House</th>'+
       
        '<th>Address</th>'+
        '<th>Experience</th>'+
        '<th>Verified</th>'+
        '</tr>'
            );


 $("#data-title").html('');
                 $("#data-title").append(
            '<h2>Packaging Volunteers</h2>'+
  '<p>List of people who volunteered for Ma Testa3jel intiative:</p>'

                    );

$("#table-body").html('');

   
                for (var i = 0; i < response.length; i++) {

                    var wareHouse = ""
                    
                    for (var j = 0; j < wareHouses.length; j++){

                if (wareHouses[j].id == response[i].wareHouse ){

                       wareHouse = wareHouses[j].arabicName;
                }


                }
    
                     
                     
                         $("#table-body").append(''+
                          '<tr>'+
                          '<td><button type="button" class="btn btn-warning">Edit</button></td>'+
        '<td><button type="button" class="btn btn-success btn-save-wareHouseUser">Verify</button></td>'+
        '<td><button type="button" class="btn btn-danger btn-delete-wareHouseUser">Delete</button></td>'+
        '<td class="packaging-id-field">'+ response[i]._id+'</td>'+
        '<td><input type="text" disabled class="packaging-fullName-field" name="fullName" value="'+ response[i].fullName+'"></td>'+
        '<td><input type="text" disabled class="packaging-email-field" name="fullName" value="'+ response[i].email+'"></td>'+
    '<td><input type="text" disabled class="packaging-phone-field" name="fullName" value="'+response[i].phone +'"></td>'+
        '<td><input type="text" disabled class="packaging-gender-field" size="5" name="fullName" value="'+ response[i].gender+'"></td>'+
        '<td><input type="text" disabled class="packaging-age-field" size="3" name="fullName" value="'+ response[i].age +'"></td>'+
        
        // '<td><input type="text" disabled class="packaging-volunteerType-field" name="fullName" value="'+ response[i].volunteerType+'"></td>'+
        
        // '<td><input type="text" disabled class="packaging-wareHouse-field" name="fullName" value="'+wareHouse +'"></td>'+

'<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="packaging-wareHouse-field" id="warehouse-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 
        '<td><input type="text" disabled class="packaging-address-field" name="fullName" value="'+response[i].address +'"></td>'+
        '<td><input type="text" disabled class="packaging-volunteerExperience-field" name="fullName" value="'+ response[i].volunteerExperience+'"></td>'+
        
        '<td><input type="text" disabled class="packaging-checkedBy-field" size="3" name="fullName" value="'+ response[i].checkedBy+'"></td>'+
        
      '</tr>'
    );

             $('#warehouse-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < wareHouses.length; j++) {
                    if (wareHouses[j].id == response[i].wareHouse){

                      $('#warehouse-for-user-'+response[i]._id+'').append('<option selected value="'+wareHouses[j].id+'">'+wareHouses[j].arabicName+'</option>' );
                 }else{
                     $('#warehouse-for-user-'+response[i]._id+'').append('<option value="'+wareHouses[j].id+'">'+wareHouses[j].arabicName+'</option>' );

                 }
                 
                     
                 }
                         
}
            }


         });
});



$(document).on('click', '#wareHouses-dashboard-tab', function(){ 

     $.ajax({
            url:'/api/wareHouse',
            contentType: 'application/json',
            method: 'GET',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    
                }),
            success: function(response){

$("#table-head").html('');
  $("#table-head").append(
            '<tr>'+
            
            '<th></th>'+
            '<th>ID</th>'+
'<th>Name</th>'+
       '<th># of Volunteers</th>'+
      
       
        '</tr>'
            );


 $("#data-title").html('');
                 $("#data-title").append(
            '<h2>Packaging Volunteers</h2>'+
  '<p>List of people who volunteered for Ma Testa3jel intiative:</p>'

                    );

$("#table-body").html('');

   console.log(wareHouses);
                for (var i = 0; i < response.length; i++) {

              
    ajaxWareHouseCall2(response[i]._id,response[i].arabicName);
                     
                     
     
}
            }


         });

                     function ajaxWareHouseCall2(id,name){
                        $.ajax({
            url:'/api/usersInWareHouse',
            contentType: 'application/json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    wareHouse : id
                }),
            success: function(response){

                var usersCount = response;

                    $("#table-body").append(''+
                          '<tr>'+
                          
        '<td><button type="button" class="btn btn-danger btn-delete-wareHouseUser">Delete</button></td>'+
        '<td class="packaging-id-field">'+ id+'</td>'+
        '<td>'+ name+'</td>'+
        '<td><span class="btn btn-primary display-users-inWareHouses" city="'+id+'">'+ usersCount+'</span></td>'+
    
        
      '</tr>'
    );

                           }
          });
                      }
});




$(document).on('click', '#cities-dashboard-tab', function(){ 

     $.ajax({
            url:'/api/city',
            contentType: 'application/json',
            method: 'GET',
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    
                }),
            success: function(response){

$("#table-head").html('');
  $("#table-head").append(
            '<tr>'+
            '<th></th>'+
           
            '<th>ID</th>'+

       '<th>Name</th>'+
       '<th># of Volunteers</th>'+
       '<th># of areas</th>'+
        // '<th># of Traffic Lights</th>'+
       
       
        '</tr>'
            );


 $("#data-title").html('');
                 $("#data-title").append(
            '<h2>Cities</h2>'+
  '<p>List of available cities:</p>'

                    );

$("#table-body").html('');
                for (var i = 0; i < response.length; i++) {
                  var name = response[i].arabicName;
                  var id = response[i]._id;
                 ajaxCall2(id,name);
}
            }


         });

          function ajaxCall2(id,name){
                        $.ajax({
            url:'/api/usersInCity',
            contentType: 'application/json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    city : id
                }),
            success: function(response){

                var userCount = response;

            ajaxCall3(id,name,userCount)

                           }
          });
                      }


                         function ajaxCall3(id,name,userCount){
                        $.ajax({
            url:'/api/areasInCity',
            contentType: 'application/json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    city : id
                }),
            success: function(response){

                var areasCount = response;

           ajaxCall4(id,name,userCount,areasCount);

                           }
          });
                      }


                         function ajaxCall4(id,name,userCount,areasCount){
                        $.ajax({
            url:'/api/lightsInCity',
            contentType: 'application/json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    city : id
                }),
            success: function(response){

                var lightsCount = response;

                         $("#table-body").append(''+
                          '<tr>'+
                          
        '<td><button type="button" class="btn btn-danger">Delete</button></td>'+
        '<td class="">'+ id+'</td>'+
        '<td>'+name +'</td>'+
        '<td  > <span class="btn btn-primary display-city-volunteers" city="'+id+'">'+ userCount+'</span></td>'+
        '<td  ><span class="btn btn-primary display-city-areas" city="'+id+'">'+ areasCount+'</td>'+
        // '<td  ><span class="btn btn-primary display-city-lights" city="'+id+'">'+ lightsCount+'</td>'+
        
      '</tr>'
    );

                           }
          });
                      }



});





      $(document).on('click', ".display-users-inWareHouses", function(){  

   

        var city = $(this).attr("city");
        

              $.ajax({
            url:'/api/usersOfWareHouse',
            contentType: 'application/json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                   wareHouse:city 
                }),
            success: function(response){

$("#table-head").html('');
  $("#table-head").append(
            '<tr>'+
            '<th></th>'+
            '<th></th>'+
            '<th></th>'+
            '<th>ID</th>'+
'<th>Name</th>'+
       '<th>Email</th>'+
       '<th>Phone Number</th>'+
       '<th>Gender</th>'+
        '<th>Age</th>'+
       
        // '<th>Type</th>'+
        '<th>Ware House</th>'+
       
        '<th>Address</th>'+
        '<th>Experience</th>'+
        '<th>Verified</th>'+
        '</tr>'
            );


 $("#data-title").html('');
                 $("#data-title").append(
            '<h2>Packaging Volunteers</h2>'+
  '<p>List of people who volunteered for Ma Testa3jel intiative:</p>'

                    );

$("#table-body").html('');

   console.log(wareHouses);
                for (var i = 0; i < response.length; i++) {

                    var wareHouse = ""
                    
                    for (var j = 0; j < wareHouses.length; j++){

                if (wareHouses[j].id == response[i].wareHouse ){

                       wareHouse = wareHouses[j].arabicName;
                }


                }
    
                     
                     
                         $("#table-body").append(''+
                          '<tr>'+
                          '<td><button type="button" class="btn btn-warning">Edit</button></td>'+
        '<td><button type="button" class="btn btn-success btn-save-wareHouseUser">Save</button></td>'+
        '<td><button type="button" class="btn btn-danger btn-delete-wareHouseUser">Delete</button></td>'+
        '<td class="packaging-id-field">'+ response[i]._id+'</td>'+
        '<td><input type="text" disabled class="packaging-fullName-field" name="fullName" value="'+ response[i].fullName+'"></td>'+
        '<td><input type="text" disabled class="packaging-email-field" name="fullName" value="'+ response[i].email+'"></td>'+
    '<td><input type="text" disabled class="packaging-phone-field" name="fullName" value="'+response[i].phone +'"></td>'+
        '<td><input type="text" disabled class="packaging-gender-field" size="5" name="fullName" value="'+ response[i].gender+'"></td>'+
        '<td><input type="text" disabled class="packaging-age-field" size="3" name="fullName" value="'+ response[i].age +'"></td>'+
        
        // '<td><input type="text" disabled class="packaging-volunteerType-field" name="fullName" value="'+ response[i].volunteerType+'"></td>'+
        
                // '<td><input type="text" disabled class="packaging-wareHouse-field" name="fullName" value="'+wareHouse +'"></td>'+

'<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="packaging-wareHouse-field" id="warehouse-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 
        '<td><input type="text" disabled class="packaging-address-field" name="fullName" value="'+response[i].address +'"></td>'+
        '<td><input type="text" disabled class="packaging-volunteerExperience-field" name="fullName" value="'+ response[i].volunteerExperience+'"></td>'+
        
        '<td><input type="text" disabled class="packaging-checkedBy-field" size="3" name="fullName" value="'+ response[i].checkedBy+'"></td>'+
        
      '</tr>'
    );

                            $('#warehouse-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < wareHouses.length; j++) {
                    if (wareHouses[j].id == response[i].wareHouse){

                      $('#warehouse-for-user-'+response[i]._id+'').append('<option selected value="'+wareHouses[j].id+'">'+wareHouses[j].arabicName+'</option>' );
                 }else{
                     $('#warehouse-for-user-'+response[i]._id+'').append('<option value="'+wareHouses[j].id+'">'+wareHouses[j].arabicName+'</option>' );

                 }
                 
                     
                 }
}
            }


         });


});


      $(document).on('click', ".display-city-volunteers", function(){  

   

        var city = $(this).attr("city");
        

              $.ajax({
            url:'/api/usersOfCity',
            contentType: 'application/json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                   city:city 
                }),
            success: function(response){


                  $("#table-head").html('');
        $("#table-head").append(
            '<tr>'+
            '<th></th>'+
            '<th></th>'+
            '<th></th>'+
            '<th>ID</th>'+
        '<th>Name</th>'+
       '<th>Email</th>'+
       '<th>Phone Number</th>'+
       '<th>Gender</th>'+
        '<th>Age</th>'+
       '<th>Car</th>'+
        '<th>Supervise</th>'+
        // '<th>Type</th>'+
        '<th>City</th>'+
       '<th>Area</th>'+
       '<th>Traffic Light</th>'+
        '<th>Address</th>'+
        '<th>Experience</th>'+
        '<th>Verified</th>'+
        
        '</tr>');
$("#table-body").html('');

                for (var i = 0; i < response.length; i++) {

                    var city = "";
                    var area = "";
                    var light = "";
    
             for (var j = 0; j < cities.length; j++){
                
                if (cities[j].id == response[i].city ){

                       city = cities[j].arabicName;
                }

                }
            for (var j = 0; j < areas.length; j++){

                if (areas[j].id == response[i].area ){

                       area = areas[j].arabicName;
                }


                }

             for (var j = 0; j < lights.length; j++){

                if (lights[j].id == response[i].trafficLightId ){

                       light = lights[j].arabicName;
                }


                }


                
                         $("#table-body").append(''+
                                '<tr>'+
                          '<td><button type="button" class="btn btn-warning">Edit</button></td>'+
        '<td><button type="button" class="btn btn-success btn-save-normalUser">Verify</button></td>'+
        '<td><button type="button" class="btn btn-danger btn-delete-normalUser">Delete</button></td>'+
        '<td class="distru-id-field">'+ response[i]._id+'</td>'+
        '<td><input type="text" disabled class="distru-fullName-field" name="fullName" value="'+ response[i].fullName+'"></td>'+
        '<td><input type="text" disabled class="distru-email-field" name="fullName" value="'+ response[i].email+'"></td>'+
        '<td><input type="text" disabled class="distru-phone-field" name="fullName" value="'+response[i].phone +'"></td>'+
        '<td><input type="text" disabled class="distru-gender-field" name="fullName" size="5" value="'+ response[i].gender+'"></td>'+
        '<td><input type="text" disabled class="distru-age-field" name="fullName" size="4" value="'+ response[i].age +'"></td>'+
        '<td><input type="text" disabled class="distru-hasCar-field" name="fullName" size="4" value="'+ response[i].hasCar+'"></td>'+
        '<td><input type="text" disabled class="distri-wantsSupervisor-field" name="fullName" size="4" value="'+ response[i].wantsSupervisor+'"></td>'+
        // '<td><input type="text" disabled class="distru-type-field" name="fullName" size="9" value="'+ response[i].volunteerType+'"></td>'+
                // '<td><input type="text" disabled class="distru-type-field" name="fullName" size="9" value="'+ response[i].volunteerType+'"></td>'+
        // '<td><input type="text" disabled class="distru-city-field" size="5" name="fullName" value="'+city+'"></td>'+
  '<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-city-field" id="city-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 

        // '<td><input type="text" disabled class="distru-area-field" name="fullName" value="'+area +'"></td>'+

 '<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-area-field" id="area-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 

        // '<td><input type="text" disabled class="distru-trafficLight-field" name="fullName" value="'+light +'"></td>'+
'<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-trafficLight-field" id="light-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 
        '<td><input type="text" disabled class="distru-address-field" name="fullName" value="'+response[i].address +'"></td>'+
        '<td><input type="text" disabled class="distru-exp-field" name="fullName" value="'+ response[i].volunteerExperience+'"></td>'+
        
        '<td><input type="text" disabled name="fullName" size="4" value="'+ response[i].checkedBy+'"></td>'+
        
      '</tr>'
    );


                $('#city-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < cities.length; j++) {
                    if (cities[j].id == response[i].city){

                      $('#city-for-user-'+response[i]._id+'').append('<option selected value="'+cities[j].id+'">'+cities[j].arabicName+'</option>' );
                 }else{
                     $('#city-for-user-'+response[i]._id+'').append('<option value="'+cities[j].id+'">'+cities[j].arabicName+'</option>' );

                 }
                     
                 }

                  $('#area-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < areas.length; j++) {
                    if (areas[j].id == response[i].area){

                      $('#area-for-user-'+response[i]._id+'').append('<option selected value="'+areas[j].id+'">'+areas[j].arabicName+'</option>' );
                 }else{
                     $('#area-for-user-'+response[i]._id+'').append('<option value="'+areas[j].id+'">'+areas[j].arabicName+'</option>' );

                 }
                     
                 }

                  $('#light-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < lights.length; j++) {
                    if (lights[j].id == response[i].trafficLightId){

                      $('#light-for-user-'+response[i]._id+'').append('<option selected value="'+lights[j].id+'">'+lights[j].arabicName+'</option>' );
                 }else{
                     $('#light-for-user-'+response[i]._id+'').append('<option value="'+lights[j].id+'">'+lights[j].arabicName+'</option>' );

                 }
                 
                     
                 }
}
            }


         });


});




      $(document).on('click', ".display-area-volunteers", function(){  

   

        var city = $(this).attr("city");
        

              $.ajax({
            url:'/api/usersOfArea',
            contentType: 'application/json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                   area:city 
                }),
            success: function(response){


                  $("#table-head").html('');
        $("#table-head").append(
            '<tr>'+
            '<th></th>'+
            '<th></th>'+
            '<th></th>'+
            '<th>ID</th>'+
        '<th>Name</th>'+
       '<th>Email</th>'+
       '<th>Phone Number</th>'+
       '<th>Gender</th>'+
        '<th>Age</th>'+
       '<th>Car</th>'+
        '<th>Supervise</th>'+
        // '<th>Type</th>'+
        '<th>City</th>'+
       '<th>Area</th>'+
       '<th>Traffic Light</th>'+
        '<th>Address</th>'+
        '<th>Experience</th>'+
        '<th>Verified</th>'+
        
        '</tr>');
$("#table-body").html('');

                for (var i = 0; i < response.length; i++) {

                    var city = "";
                    var area = "";
                    var light = "";
    
             for (var j = 0; j < cities.length; j++){
                
                if (cities[j].id == response[i].city ){

                       city = cities[j].arabicName;
                }

                }
            for (var j = 0; j < areas.length; j++){

                if (areas[j].id == response[i].area ){

                       area = areas[j].arabicName;
                }


                }

             for (var j = 0; j < lights.length; j++){

                if (lights[j].id == response[i].trafficLightId ){

                       light = lights[j].arabicName;
                }


                }


                
                         $("#table-body").append(''+
                                '<tr>'+
                          '<td><button type="button" class="btn btn-warning">Edit</button></td>'+
        '<td><button type="button" class="btn btn-success btn-save-normalUser">Verify</button></td>'+
        '<td><button type="button" class="btn btn-danger btn-delete-normalUser">Delete</button></td>'+
        '<td class="distru-id-field">'+ response[i]._id+'</td>'+
        '<td><input type="text" disabled class="distru-fullName-field" name="fullName" value="'+ response[i].fullName+'"></td>'+
        '<td><input type="text" disabled class="distru-email-field" name="fullName" value="'+ response[i].email+'"></td>'+
        '<td><input type="text" disabled class="distru-phone-field" name="fullName" value="'+response[i].phone +'"></td>'+
        '<td><input type="text" disabled class="distru-gender-field" name="fullName" size="5" value="'+ response[i].gender+'"></td>'+
        '<td><input type="text" disabled class="distru-age-field" name="fullName" size="4" value="'+ response[i].age +'"></td>'+
        '<td><input type="text" disabled class="distru-hasCar-field" name="fullName" size="4" value="'+ response[i].hasCar+'"></td>'+
        '<td><input type="text" disabled class="distri-wantsSupervisor-field" name="fullName" size="4" value="'+ response[i].wantsSupervisor+'"></td>'+
        // '<td><input type="text" disabled class="distru-type-field" name="fullName" size="9" value="'+ response[i].volunteerType+'"></td>'+
                // '<td><input type="text" disabled class="distru-type-field" name="fullName" size="9" value="'+ response[i].volunteerType+'"></td>'+
        // '<td><input type="text" disabled class="distru-city-field" size="5" name="fullName" value="'+city+'"></td>'+
      '<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-city-field" id="city-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 

        // '<td><input type="text" disabled class="distru-area-field" name="fullName" value="'+area +'"></td>'+

 '<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-area-field" id="area-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 

        // '<td><input type="text" disabled class="distru-trafficLight-field" name="fullName" value="'+light +'"></td>'+
'<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-trafficLight-field" id="light-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 
        '<td><input type="text" disabled class="distru-address-field" name="fullName" value="'+response[i].address +'"></td>'+
        '<td><input type="text" disabled class="distru-exp-field" name="fullName" value="'+ response[i].volunteerExperience+'"></td>'+
        
        '<td><input type="text" disabled name="fullName" size="4" value="'+ response[i].checkedBy+'"></td>'+
        
      '</tr>'
    );


         

                $('#city-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < cities.length; j++) {
                    if (cities[j].id == response[i].city){

                      $('#city-for-user-'+response[i]._id+'').append('<option selected value="'+cities[j].id+'">'+cities[j].arabicName+'</option>' );
                 }else{
                     $('#city-for-user-'+response[i]._id+'').append('<option value="'+cities[j].id+'">'+cities[j].arabicName+'</option>' );

                 }
                     
                 }

                  $('#area-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < areas.length; j++) {
                    if (areas[j].id == response[i].area){

                      $('#area-for-user-'+response[i]._id+'').append('<option selected value="'+areas[j].id+'">'+areas[j].arabicName+'</option>' );
                 }else{
                     $('#area-for-user-'+response[i]._id+'').append('<option value="'+areas[j].id+'">'+areas[j].arabicName+'</option>' );

                 }
                     
                 }

                  $('#light-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < lights.length; j++) {
                    if (lights[j].id == response[i].trafficLightId){

                      $('#light-for-user-'+response[i]._id+'').append('<option selected value="'+lights[j].id+'">'+lights[j].arabicName+'</option>' );
                 }else{
                     $('#light-for-user-'+response[i]._id+'').append('<option value="'+lights[j].id+'">'+lights[j].arabicName+'</option>' );

                 }
                 
                     
                 }
}
            }


         });


});



 $(document).on('click', ".display-light-volunteers", function(){  

   

        var city = $(this).attr("city");
        

              $.ajax({
            url:'/api/usersOfLight',
            contentType: 'application/json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                   light:city 
                }),
            success: function(response){


                  $("#table-head").html('');
        $("#table-head").append(
            '<tr>'+
            '<th></th>'+
            '<th></th>'+
            '<th></th>'+
            '<th>ID</th>'+
        '<th>Name</th>'+
       '<th>Email</th>'+
       '<th>Phone Number</th>'+
       '<th>Gender</th>'+
        '<th>Age</th>'+
       '<th>Car</th>'+
        '<th>Supervise</th>'+
        // '<th>Type</th>'+
        '<th>City</th>'+
       '<th>Area</th>'+
       '<th>Traffic Light</th>'+
        '<th>Address</th>'+
        '<th>Experience</th>'+
        '<th>Verified</th>'+
        
        '</tr>');
$("#table-body").html('');

                for (var i = 0; i < response.length; i++) {

                    var city = "";
                    var area = "";
                    var light = "";
    
             for (var j = 0; j < cities.length; j++){
                
                if (cities[j].id == response[i].city ){

                       city = cities[j].arabicName;
                }

                }
            for (var j = 0; j < areas.length; j++){

                if (areas[j].id == response[i].area ){

                       area = areas[j].arabicName;
                }


                }

             for (var j = 0; j < lights.length; j++){

                if (lights[j].id == response[i].trafficLightId ){

                       light = lights[j].arabicName;
                }


                }


                
                         $("#table-body").append(''+
                                '<tr>'+
                          '<td><button type="button" class="btn btn-warning">Edit</button></td>'+
        '<td><button type="button" class="btn btn-success btn-save-normalUser">Verify</button></td>'+
        '<td><button type="button" class="btn btn-danger btn-delete-normalUser">Delete</button></td>'+
        '<td class="distru-id-field">'+ response[i]._id+'</td>'+
        '<td><input type="text" disabled class="distru-fullName-field" name="fullName" value="'+ response[i].fullName+'"></td>'+
        '<td><input type="text" disabled class="distru-email-field" name="fullName" value="'+ response[i].email+'"></td>'+
        '<td><input type="text" disabled class="distru-phone-field" name="fullName" value="'+response[i].phone +'"></td>'+
        '<td><input type="text" disabled class="distru-gender-field" name="fullName" size="5" value="'+ response[i].gender+'"></td>'+
        '<td><input type="text" disabled class="distru-age-field" name="fullName" size="4" value="'+ response[i].age +'"></td>'+
        '<td><input type="text" disabled class="distru-hasCar-field" name="fullName" size="4" value="'+ response[i].hasCar+'"></td>'+
        '<td><input type="text" disabled class="distri-wantsSupervisor-field" name="fullName" size="4" value="'+ response[i].wantsSupervisor+'"></td>'+
        // '<td><input type="text" disabled class="distru-type-field" name="fullName" size="9" value="'+ response[i].volunteerType+'"></td>'+
                // '<td><input type="text" disabled class="distru-type-field" name="fullName" size="9" value="'+ response[i].volunteerType+'"></td>'+
        // '<td><input type="text" disabled class="distru-city-field" size="5" name="fullName" value="'+city+'"></td>'+
  '<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-city-field" id="city-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 

        // '<td><input type="text" disabled class="distru-area-field" name="fullName" value="'+area +'"></td>'+

 '<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-area-field" id="area-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 

        // '<td><input type="text" disabled class="distru-trafficLight-field" name="fullName" value="'+light +'"></td>'+
'<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" class="distru-trafficLight-field" id="light-for-user-'+response[i]._id+'">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 
        '<td><input type="text" disabled class="distru-address-field" name="fullName" value="'+response[i].address +'"></td>'+
        '<td><input type="text" disabled class="distru-exp-field" name="fullName" value="'+ response[i].volunteerExperience+'"></td>'+
        
        '<td><input type="text" disabled name="fullName" size="4" value="'+ response[i].checkedBy+'"></td>'+
        
      '</tr>'
    );



                $('#city-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < cities.length; j++) {
                    if (cities[j].id == response[i].city){

                      $('#city-for-user-'+response[i]._id+'').append('<option selected value="'+cities[j].id+'">'+cities[j].arabicName+'</option>' );
                 }else{
                     $('#city-for-user-'+response[i]._id+'').append('<option value="'+cities[j].id+'">'+cities[j].arabicName+'</option>' );

                 }
                     
                 }

                  $('#area-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < areas.length; j++) {
                    if (areas[j].id == response[i].area){

                      $('#area-for-user-'+response[i]._id+'').append('<option selected value="'+areas[j].id+'">'+areas[j].arabicName+'</option>' );
                 }else{
                     $('#area-for-user-'+response[i]._id+'').append('<option value="'+areas[j].id+'">'+areas[j].arabicName+'</option>' );

                 }
                     
                 }

                  $('#light-for-user-'+response[i]._id+'').html(''); 
           for (var j = 0; j < lights.length; j++) {
                    if (lights[j].id == response[i].trafficLightId){

                      $('#light-for-user-'+response[i]._id+'').append('<option selected value="'+lights[j].id+'">'+lights[j].arabicName+'</option>' );
                 }else{
                     $('#light-for-user-'+response[i]._id+'').append('<option value="'+lights[j].id+'">'+lights[j].arabicName+'</option>' );

                 }
                 
                     
                 }
}
            }


         });


});




      $(document).on('click', ".display-area-lights", function(){  

   

        var city = $(this).attr("city");
        

              $.ajax({
            url:'/api/lightsOfArea',
            contentType: 'application/json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                   area:city 
                }),
            success: function(response){


                  $("#table-head").html('');
        $("#table-head").append(
            '<tr>'+
           
            '<th></th>'+
            '<th>ID</th>'+
            '<th>Name</th>'+
        '<th># of Volunteers</th>'+
       
        
        '</tr>');
$("#table-body").html('');
for (var i = 0; i < response.length; i++) {
        ajaxUsersInLightCall(response[i]._id,response[i].arabicName);
}


         }

});


         function ajaxUsersInLightCall(id,name){
                        $.ajax({
            url:'/api/usersInLight',
            contentType: 'application/json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    light : id
                }),
            success: function(response){

                var usersCount = response;

           
                         $("#table-body").append(''+
                                '<tr>'+
                          
        '<td><button type="button" class="btn btn-danger btn-delete-normalUser">Delete</button></td>'+
        '<td class="distru-id-field">'+ id+'</td>'+
        '<td>'+ name+'</td>'+
        '<td><span class="btn btn-primary display-light-volunteers" city="'+id+'">'+ usersCount +'</span></td>'+
    
        
      '</tr>'
    );

                           }
          });
                      }
});


      $(document).on('click', ".display-city-areas", function(){  

   

        var city = $(this).attr("city");
        

              $.ajax({
            url:'/api/area',
            contentType: 'application/json',
            method: 'GET',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                   city:city 
                }),
            success: function(response){

$("#table-head").html('');
  $("#table-head").append(
            '<tr>'+
            '<th></th>'+
           
            '<th>ID</th>'+

       '<th>Name</th>'+
       '<th># of Volunteers</th>'+
        '<th># of Traffic Lights</th>'+
       
       
        '</tr>'
            );


 $("#data-title").html('');
                 $("#data-title").append(
            '<h2>Cities</h2>'+
  '<p>List of available cities:</p>'

                    );

$("#table-body").html('');
                for (var i = 0; i < response.length; i++) {
                  var name = response[i].arabicName;
                  var id = response[i]._id;
                ajaxAreaCall2(id,name)
}
            }


           


         });

                     function ajaxAreaCall2(id,name){
                        $.ajax({
            url:'/api/usersInArea',
            contentType: 'application/json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    area : id
                }),
            success: function(response){

                var userCount = response;
                ajaxLightCall3(id,name,userCount)

                           }
          });
                      }

                                     function ajaxLightCall3(id,name,userCount){
                        $.ajax({
            url:'/api/lightsInArea',
            contentType: 'application/json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             dataType: 'json',
             data: ({
                    area : id
                }),
            success: function(response){

                var lightsCount = response;

           
                                               $("#table-body").append(''+
                          '<tr>'+
                          
        '<td><button type="button" class="btn btn-danger">Delete</button></td>'+
        '<td class="">'+ id+'</td>'+
        '<td>'+name +'</td>'+
        '<td  > <span class="btn btn-primary display-area-volunteers" city="'+id+'">'+ userCount+'</span></td>'+
        '<td  ><span class="btn btn-primary display-area-lights" city="'+id+'">'+ lightsCount+'</td>'+
        
      '</tr>'
    );

                           }
          });
                      }


});



$(document).on('click', '#addVolunteer-dashboard-tab', function(){ 

     
            // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            
           
                $("#data-title").html('');
                 $("#data-title").append(
            '<h2>Add new volunteer</h2>');
       
        $("#table-body").html('');
        
                  $("#table-head").html('');
        $("#table-head").append(
            '<tr>'+
            '<th></th>'+
            
            
        '<th>Name</th>'+
       '<th>Email</th>'+
       '<th>Password</th>'+
       '<th>Phone Number</th>'+
       '<th>Gender</th>'+
        '<th>Age</th>'+
       '<th>Car</th>'+
        '<th>Supervise</th>'+
        // '<th>Type</th>'+
        '<th>City</th>'+
       '<th>Area</th>'+
       '<th>Traffic Light</th>'+
        '<th>Address</th>'+
        '<th>Experience</th>'+
        '<th>Verified</th>'+
        
        '</tr>');
$("#table-body").html('');

                

    

                
                         $("#table-body").append(''+
                                '<tr>'+
                          
        '<td><button type="button" class="btn btn-success" id="btn-add-normalUser">Add</button></td>'+
        
        
        '<td><input type="text"  id="distru-added-user-fullName-field" name="fullName" value=""></td>'+
        '<td><input type="text"  id="distru-added-user-email-field" name="fullName" value=""></td>'+
        '<td><input type="text"  id="distru-added-user-password-field" name="fullName" value=""></td>'+
        '<td><input type="text"  id="distru-added-user-phone-field" name="fullName" value=""></td>'+
        '<td><input type="text"  id="distru-added-user-gender-field" name="fullName"  size="5" value=""></td>'+
        '<td><input type="text"  id="distru-added-user-age-field" name="fullName" size="4" value=""></td>'+
        '<td><input type="text"  id="distru-added-user-hasCar-field" name="fullName" size="4" value=""></td>'+
        '<td><input type="text"  id="distri-added-user-wantsSupervisor-field" name="fullName" size="4" value=""></td>'+
        // '<td><input type="text" disabled class="distru-type-field" name="fullName" size="9" value="'+ response[i].volunteerType+'"></td>'+
           // '<td><input type="text" disabled class="distru-type-field" name="fullName" size="9" value="'+ response[i].volunteerType+'"></td>'+
        // '<td><input type="text" disabled class="distru-city-field" size="5" name="fullName" value="'+city+'"></td>'+
   '<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" id="city-for-added-user">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 

        // '<td><input type="text" disabled class="distru-area-field" name="fullName" value="'+area +'"></td>'+

 '<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" id="area-for-added-user">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 

        // '<td><input type="text" disabled class="distru-trafficLight-field" name="fullName" value="'+light +'"></td>'+
'<td class="dropdown">'+ 
               ' <form action="" name="FILTER" >'+ 
                     '<select name="filter_for" id="light-for-added-user">'+ 
                        
                         
                     '</select>'+ 
                '</form>'+ 
            '</td>'+ 
        '<td><input type="text"  id="distru-added-user-address-field" name="fullName" value=""></td>'+
        '<td><input type="text"  id="distru-added-user-exp-field" name="fullName" value=""></td>'+
        
        '<td><input type="text"  name="fullName" size="4" value=""></td>'+
        
      '</tr>'
    );

                 

            
                $('#city-for-user').html(''); 
           for (var j = 0; j < cities.length; j++) {
                    
                     $('#city-for-added-user').append('<option value="'+cities[j].id+'">'+cities[j].arabicName+'</option>' );

                 
                     
                 }

                  $('#area-for-added-user').html(''); 
           for (var j = 0; j < areas.length; j++) {
                 
                     $('#area-for-added-user').append('<option value="'+areas[j].id+'">'+areas[j].arabicName+'</option>' );

                 
                     
                 }

                  $('#light-for-user').html(''); 
           for (var j = 0; j < lights.length; j++) {
                
                     $('#light-for-added-user').append('<option value="'+lights[j].id+'">'+lights[j].arabicName+'</option>' );

                 
                 
                     
                 }


         });




$(document).on('click', '#btn-add-normalUser', function(){  


  

if( ( $('#distru-added-user-exp-field').val() == "")){
        alert('عذرا، يرجى ادخال جميع البيانات');
}else if ( $('#distru-added-user-fullName-field').val() == "") {

alert('عذرا، يرجى ادخال جميع البيانات');
} else if  ($('#distru-added-user-phone-field').val() == "" ){
        alert('عذرا، يرجى ادخال جميع البيانات');

} else if ($('#distru-added-user-address-field').val() == "" ){
alert('عذرا، يرجى ادخال جميع البيانات');
} else{

    
    var email = $('#distru-added-user-email-field').val();
    var password = $('#distru-added-user-password-field').val();
    
    volunteerExperience = $('#distru-added-user-exp-field').val();
    fullName = $('#distru-added-user-fullName-field').val();
    phone = $('#distru-added-user-phone-field').val();
    age = $('#distru-added-user-age-field').val();
    gender = $('#distru-added-user-gender-field').val();
    address = $('#distru-added-user-address-field').val();
    hasCar = $('#distru-added-user-hasCar-field').val();
    wantsSupervisor = $('#distri-added-user-wantsSupervisor-field').val();
    city =  $('#city-for-added-user').find(":selected").val();
    area =  $('#area-for-added-user').find(":selected").val();
    trafficLight =  $('#light-for-added-user').find(":selected").val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('عذرا، كلمة السر المدخلة ضعيفة');
        } else if(errorCode == 'auth/email-already-in-use') {
          alert('عذرا، البريد الالكتروني المدخل مستعمل مسبقا');
        } else if(errorCode == 'invalid-email') {
          alert('عذرا، صيغة الايميل المدخلة غير صحيحة');
        
        }else {
                alert(errorMessage);

        }
        
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
                    trafficLightId: trafficLight,
                    volunteerType: "Distribution",
                    email: email,
                    volunteerExperience:volunteerExperience,
                    fullName: fullName,
                    phone: phone,
                    address: address,
                    hasCar: hasCar,
                    wantsSupervisor: wantsSupervisor,
                    age:age,
                    gender:gender

                }),
            success: function(response){
               
                console.log(response);

                if (response == "200"){

                    alert("user added successfuly !")
                }else {
                    alert("failed to add new user")

                }

              
            }


         });


     }
     });

}
    });



   });






