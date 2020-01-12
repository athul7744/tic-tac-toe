window.$ = window.jQuery = require('jquery');
const swal = require('sweetalert2');

function TicTacToe(){

  var self = this;
  self.boxArray = [];
  self.marked = [];
  self.xo = [];

  self.selectBox = function(box){
    var e = $("#"+box);
    var value = self.boxArray.indexOf(box);
    if(!e.hasClass("marked-com") && !e.hasClass("marked-user")){
      e.addClass("marked-user");
      self.marked.splice(self.marked.indexOf(value),1);
      self.xo.mark(value,'user');
      if(self.checkVictory('user',value)){
        self.showMessage(true);
      }
      else{
        if(self.marked.length!=0){
          self.compSelectBox();
        }
        else{
          self.showMessage(null);
        }
      }
    }
  }

  self.compSelectBox = function(){
    var toMark = Math.floor(Math.random() * self.marked.length);
    var e = $("#"+self.boxArray[self.marked[toMark]]);
    if(!e.hasClass("marked-com") && !e.hasClass("marked-user")){
      $("#main").html("Thinking...");
      setTimeout(function(){
        $("#main").html("Tic Tac Toe");
      },100);
      e.addClass("marked-com");
      self.xo.mark(self.marked[toMark],'com');
      if(self.checkVictory('com',self.marked[toMark]))
      {
        self.showMessage(false);
      }
      self.marked.splice(toMark,1);
    }
    else {
      self.compSelectBox();
    }
  }

  self.showMessage = function(val){
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
      self.setUp()
    },2100);
  }

  this.setUp = function(){
    self.boxArray = ["a1","b1","c1","a2","b2","c2","a3","b3","c3"];
    self.marked = [];
    for(i=0;i<9;i++){
      self.marked.push(i);
    }

    self.xo = [];
    for(i=0;i<3;i++){
      var row = [];
      for(j=0;j<3;j++){
        var rowObj = jQuery("#"+self.boxArray[3*i+j]);
        rowObj.off();
        rowObj.on('click',function(){
          self.selectBox(this.id);
        });
        row.push(0);
      }
      self.xo.push(row);
    }

    self.xo.mark = function(val, player){
      var i = Math.floor(val/3);
      var j = val - i*3;
      if(player === 'user'){
        this[i][j] = 1;
      }
      else{
        this[i][j] = -1;
      }
    }

    for(i=0;i<self.boxArray.length;i++){
      var e = $("#"+self.boxArray[i]);
      if(e.hasClass("marked-com")){
        e.removeClass("marked-com");
      }
      if(e.hasClass("marked-user")){
        e.removeClass("marked-user");
      }
    }
  }

  self.checkVictory = function(player, curr_box){
    var val = (player === 'user')?1:-1;
    if(curr_box === 4){
      return self.checkMiddle(val);
    }
    else if(curr_box%2 === 0){
      return self.checkCorner(val,curr_box);
    }
    else{
      return self.checkSide(val,curr_box);
    }
  }

  self.checkMiddle = function(val){
    //*-#-*
    if(self.xo[1][0] === val){
      if(self.xo[1][2] === val){
        return true;
      }
    }
    //* - -
    //- # -
    //- - *
    if(self.xo[0][0] === val){
      if(self.xo[2][2] === val){
        return true;
      }
    }
    //- - *
    //- # -
    //* - -
    if(self.xo[0][2] === val){
      if(self.xo[2][0] === val){
        return true;
      }
    }
    //- * -
    //- # -
    //- * -
    if(self.xo[0][1] === val){
      if(self.xo[2][1] === val){
        return true;
      }
    }
    return false;
  }

  self.checkCorner = function(val, curr_box){
    var r = Math.floor(curr_box/3);
    var c = curr_box - r*3;
    //- - -
    //- - -
    //- - #
    if(r == 2 && c == 2){
      for(i=0;i<r;i++){
        for(j=0;j<=c;j=j+2+i){
          if(self.xo[j][2*i] === val){
            if(self.xo[j/2+1][i+1] === val){
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
          if(self.xo[i][(j+i)%2] === val){
            if(self.xo[2*i][2*((j+i)%2)] === val){
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
          if(self.xo[2*i][2*j-i] === val){
            if(self.xo[i+1][j+i] === val){
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
          if(self.xo[i+(j-i)%2][j+i] === val){
            if(self.xo[2*j][(j+1)%2+2*i] === val){
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  self.checkSide = function(val, curr_box){
    var r = Math.floor(curr_box/3);
    var c = curr_box - r*3;

    //- # -
    //- - -
    //- - -
    if(r == 0 && c == 1){
      for(i=0;i<2;i++){
        for(j=1;j<2;j++){
          if(self.xo[i][i] === val){
            if(self.xo[2*i][2*j-i] === val){
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
          if(self.xo[2*i][j-i] === val){
            if(self.xo[i+j][i+j] === val){
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
          if(self.xo[i][i] === val){
            if(self.xo[2*j-i][2*i] === val){
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
          if(self.xo[j-i][2*i] === val){
            if(self.xo[i+j][i+j] === val){
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}

$(document).ready(function(){
  var initObj = new TicTacToe();
  initObj.setUp();
})
