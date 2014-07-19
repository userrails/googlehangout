getParameters = function(){
 var ret = {};
 
 var queryString = window.location.search.substring(1);
 var params = queryString.split('&');
 for(var co=0; co<params.length; co++){
   var keyValue = params[co].split('=');
   ret[keyValue[0]] = unescape(keyValue[1]);
 }
 return ret;
};

onClientReady = function() {
 gapi.hangout.onApiReady.add(function(e){
  if(e.isApiReady){
    onApiReady();
  }
 });
};

onApiReady = function() {
  // we can use the params which are used to start hangout.
  // and we will pass some of these to the server.
  var param = getParameters();
  var now = new Date();
  
  //At this point, we can access the Hangout, API functions.
  var hangoutUrl = gapi.getHangoutUrl();
  
  //get the URL of this javascript, so we can call a nearby page with this URL info
  var callbackUrl = 'register_hangout.json';
  
  //make a call by ajax
  //the datas all are passed as parameters in the call.
  
  $.ajax({
    url: callbackUrl,
    dataType: 'json',
    data: {
      "hangoutUrl": hangoutUrl,
      "topic": param["gd"]  
    }
  }).done( function( data, status, xhr ){
    //call was made, process results
    $('#msg').html(data.msg);    
  }).fails( function( xhr, status, error ){
    ('#msg').html("there was a problem connecting the help desk. Please try again. ("+textStatus+")");
  });
};
