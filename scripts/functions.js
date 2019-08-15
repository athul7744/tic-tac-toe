window.$ = window.jQuery = require('jquery');
const swal = require('sweetalert2');

var boxArray = [];
var marked = [];

function selectBox(box){
  var e = $("#"+box);
  if(!e.hasClass("marked-com")){
    e.addClass("marked-user");
    marked.splice(marked.indexOf(boxArray.indexOf(box)),1);
    if(marked.length!=0){
      comMark();
    }
    else{
      successMessage();
    }
  }
}

function comMark(){
  var toMark = Math.floor(Math.random() * marked.length);
  var e = $("#"+boxArray[marked[toMark]]);
  if(!e.hasClass("marked-user")){
    $("#main").html("Thinking...");
    setTimeout(function(){
      e.addClass("marked-com");
      marked.splice(toMark,1);
      $("#main").html("Tic Tac Toe");
    },500);
  }
}

function successMessage(){
  swal.fire({
  type: 'success',
  title: 'You Won!',
  text: 'Congratulations',
  showConfirmButton: false,
  timer: 2000
  });

  setTimeout(function(){
    setUp()
  },2000);
}

function setUp(){
  boxArray = ["a1","b1","c1","a2","b2","c2","a3","b3","c3"]
  for(i=0;i<9;i++){
    marked.push(i);
  }

  for(i=0;i<boxArray.length;i++){
    var e = $("#"+boxArray[i]);
    if(e.hasClass("marked-com")){
      e.removeClass("marked-com");
    }
    if(e.hasClass("marked-user")){
      e.removeClass("marked-user");
    }
  }
}

$(document).ready(function(){
  setUp();
})
