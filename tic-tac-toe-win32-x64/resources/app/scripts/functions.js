window.$ = window.jQuery = require('jquery');
const swal = require('sweetalert2');

var boxArray = [];
var marked = [];
var xo = [];

function selectBox(box){
  var e = $("#"+box);
  var value = boxArray.indexOf(box);
  if(!e.hasClass("marked-com")){
    e.addClass("marked-user");
    marked.splice(marked.indexOf(value),1);
    xo.mark(value,'user');
    if(checkVictory('user',value)){
      showMessage(true);
    }
    else{
      if(marked.length!=0){
        compSelectBox();
      }
      else{
        showMessage(null);
      }
    }
  }
}

function compSelectBox(){
  var toMark = Math.floor(Math.random() * marked.length);
  var e = $("#"+boxArray[marked[toMark]]);
  if(!e.hasClass("marked-user")){
    $("#main").html("Thinking...");
    setTimeout(function(){
      $("#main").html("Tic Tac Toe");
    },250);
    e.addClass("marked-com");
    xo.mark(marked[toMark],'com');
    if(checkVictory('com',marked[toMark]))
    {
      showMessage(false);
    }
    marked.splice(toMark,1);
  }
  else {
    compSelectBox();
  }
}

function showMessage(val){
  if(val === true){
    swal.fire({
      type: 'success',
      title: 'You Won!',
      text: 'Congratulations',
      showConfirmButton: false,
      timer: 2000
    });
  }
  else if(val === false){
    swal.fire({
      type: 'error',
      title: 'You Lost :(',
      text: "It's Okay. Try Again.",
      showConfirmButton: false,
      timer: 2000
    });
  }
  else{
    swal.fire({
      type: 'warning',
      title: "It's a draw",
      text: "Almost There. Try Again.",
      showConfirmButton: false,
      timer: 2000
    });
  }
  setTimeout(function(){
    setUp()
  },2100);
}

function setUp(){
  boxArray = ["a1","b1","c1","a2","b2","c2","a3","b3","c3"];
  marked = [];
  for(i=0;i<9;i++){
    marked.push(i);
  }

  xo = [];
  for(i=0;i<3;i++){
    var row = [];
    for(j=0;j<3;j++){
      row.push(0);
    }
    xo.push(row);
  }

  xo.mark = function(val, player){
    var i = Math.floor(val/3);
    var j = val - i*3;
    if(player === 'user'){
      this[i][j] = 1;
    }
    else{
      this[i][j] = -1;
    }
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

function checkVictory(player, curr_box){
  var val = (player === 'user')?1:-1;
  if(curr_box === 4){
    return checkMiddle(val);
  }
  else if(curr_box%2 === 0){
    return checkCorner(val,curr_box);
  }
  else{
    return checkSide(val,curr_box);
  }
}

function checkMiddle(val){
  //*-#-*
  if(xo[1][0] === val){
    if(xo[1][2] === val){
      return true;
    }
  }
  //* - -
  //- # -
  //- - *
  if(xo[0][0] === val){
    if(xo[2][2] === val){
      return true;
    }
  }
  //- - *
  //- # -
  //* - -
  if(xo[0][2] === val){
    if(xo[2][0] === val){
      return true;
    }
  }
  //- * -
  //- # -
  //- * -
  if(xo[0][1] === val){
    if(xo[2][1] === val){
      return true;
    }
  }
  return false;
}

function checkCorner(val, curr_box){
  var r = Math.floor(curr_box/3);
  var c = curr_box - r*3;
  //- - -
  //- - -
  //- - #
  if(r == 2 && c == 2){
    for(i=0;i<r;i++){
      for(j=0;j<=c;j=j+2+i){
        if(xo[j][2*i] === val){
          if(xo[j/2+1][i+1] === val){
            return true;
          }
        }
      }
    }
  }
  //# - -
  //- - -
  //- - -
  if(r == 0 && c == 0){
    for(i=0;i<2;i++){
      for(j=1-i;j<2;j++){
        if(xo[i][(j+i)%2] === val){
          if(xo[2*i][2*((j+i)%2)] === val){
            return true;
          }
        }
      }
    }
  }
  //- - -
  //- - -
  //# - -
  if(r == 2 && c == 0){
    for(i=0;i<2;i++){
      for(j=i;j<2;j++){
        if(xo[2*i][2*j-i] === val){
          if(xo[i+1][j+i] === val){
            return true;
          }
        }
      }
    }
  }
  //- - #
  //- - -
  //- - -
  if(r == 0 && c == 2){
    for(i=0;i<2;i++){
      for(j=i;j<2;j++){
        if(xo[i+(j-i)%2][j+i] === val){
          if(xo[2*j][(j+1)%2+2*i] === val){
            return true;
          }
        }
      }
    }
  }
  return false;
}

function checkSide(val, curr_box){
  var r = Math.floor(curr_box/3);
  var c = curr_box - r*3;

  //- # -
  //- - -
  //- - -
  if(r == 0 && c == 1){
    for(i=0;i<2;i++){
      for(j=1;j<2;j++){
        if(xo[i][i] === val){
          if(xo[2*i][2*j-i] === val){
            return true;
          }
        }
      }
    }
  }
  //- - -
  //- - -
  //- # -
  if(r == 2 && c == 1){
    for(i=0;i<2;i++){
      for(j=1;j<2;j++){
        if(xo[2*i][j-i] === val){
          if(xo[i+j][i+j] === val){
            return true;
          }
        }
      }
    }
  }
  //- - -
  //# - -
  //- - -
  if(r == 1 && c == 0){
    for(i=0;i<2;i++){
      for(j=1;j<2;j++){
        if(xo[i][i] === val){
          if(xo[2*j-i][2*i] === val){
            return true;
          }
        }
      }
    }
  }
  //- - -
  //- - #
  //- - -
  if(r == 1 && c == 2){
    for(i=0;i<2;i++){
      for(j=1;j<2;j++){
        if(xo[j-i][2*i] === val){
          if(xo[i+j][i+j] === val){
            return true;
          }
        }
      }
    }
  }
  return false;
}

$(document).ready(function(){
  setUp();
})
