window.$ = window.jQuery = require('jquery');
const swal = require('sweetalert2');

var boxArray = ["a1","b1","c1","a2","b2","c2","a3","b3","c3"]
var marked = [];

for(i=0;i<9;i++){
  marked.push(i);
}

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
  text: "Congratulations",
  showConfirmButton: false,
  timer: 2000
})
}
