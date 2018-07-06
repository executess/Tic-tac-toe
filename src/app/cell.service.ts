import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class CellService {
  turn = 1;
  lastTurn = 1;
  massage:string = "";
  canTurn:boolean = true;
  wayCells = [];
  fields = [];
  score = [];
  isTwoPlayers:boolean = false;
  constructor() { }
  
  clearScore(){
    this.score[0] = 0;
    this.score[1] = 0;
  }
  clearField(){
    this.massage = "";
    this.wayCells = [];
    this.fields = [];
    if(this.initFields(9) == true) {
      this.turn = 1;
      this.lastTurn = 1;
      this.canTurn = true;
      
  
    }
    return 0;
  }
initFields(size:number){

  
  for (var i = 0; i < size; i++) {
    this.fields[i] = [i+1, 0];
  }
  return true;
 
}
getFields(){
  return this.fields;
  }
getField(id:number){
  return this.fields[id];
  }

  checkCellForFree(cellId){
    if(cellId == NaN) return -1;
    var check = this.fields[cellId][1];
    if (check == 0){
        
      return 0;
  }else if(check == 1 ){
    
    return 1;
  }else if(check == 2 ){
    
    return 2;
  }
}
clickOnCell(cellId){
  if (this.checkCellForFree([cellId-1])==0 && this.canTurn == true){
    var l_turn = this.turn; 
    
    this.setTurn(cellId-1);
    var fn = (this.checkForWin());
    if (fn[0] == true)
    if(fn[1]==1){
      this.canTurn = false;
      this.massage = "Cross are win!";
      this.score[0]++; 

      
      
    }
     if(fn[1]==2){
      this.canTurn = false;
     this.massage="zero are win!";
     this.score[1]++; 

     
     }
    this.lastTurn++
  if(this.lastTurn > 2){
    this.lastTurn = 1;
  }
    return [true, l_turn];  
  }else return [false, l_turn];
 
}
checkForWin(){

if(this.checkCellForFree(0)==this.lastTurn && this.checkCellForFree(1)==this.lastTurn && this.checkCellForFree(2) == this.lastTurn){
  
  return [true ,this.lastTurn]
}
  if(this.checkCellForFree(3)==this.lastTurn && 
  this.checkCellForFree(4)==this.lastTurn && 
  this.checkCellForFree(5) == this.lastTurn){
  return [true ,this.lastTurn]
  }
  if(this.checkCellForFree(6)==this.lastTurn && 
  this.checkCellForFree(7)==this.lastTurn && 
  this.checkCellForFree(8) == this.lastTurn){
  return [true ,this.lastTurn]
  }
  if(this.checkCellForFree(0)==this.lastTurn && 
  this.checkCellForFree(3)==this.lastTurn && 
  this.checkCellForFree(6) == this.lastTurn){
  return [true ,this.lastTurn]
  }
  if(this.checkCellForFree(1)==this.lastTurn && 
  this.checkCellForFree(4)==this.lastTurn && 
  this.checkCellForFree(7) == this.lastTurn){
  return [true ,this.lastTurn]
  }
  if(this.checkCellForFree(2)==this.lastTurn && 
  this.checkCellForFree(5)==this.lastTurn && 
  this.checkCellForFree(8) == this.lastTurn){
  return [true ,this.lastTurn]
  }
  if(this.checkCellForFree(0)==this.lastTurn && 
  this.checkCellForFree(4)==this.lastTurn && 
  this.checkCellForFree(8) == this.lastTurn){
  return [true ,this.lastTurn]
  }
  if(this.checkCellForFree(6)==this.lastTurn && 
  this.checkCellForFree(4)==this.lastTurn && 
  this.checkCellForFree(2) == this.lastTurn){
  return [true ,this.lastTurn]
  }

else return [false ,0]

}

setTurn(cellId){

   this.fields[cellId] = [cellId+1, this.turn];

    this.nextTurn(cellId);
  
}
nextTurn(cellId){
  this.turn++
  if(this.turn > 2){
    this.turn = 1;
  }
  return this.turn;
  
}

checkAllCells(){
  var arr = this.fields;
  arr.forEach(function(item,i,arr) {
    if (item[i] !== 0 ) {
       
        if(item[i] == 1){
         //  alert(item[1]);
         console.log(item);
        }
        
       }else{
        
       }
    return arr;
  });
}
getAllFreeCells(){
 let Cells = this.getFields();
 let freeCells=[];
//  console.log(freeCels[1][1]);
 Cells.forEach(function(item,i,Cells) {
  if (item[1] == 0){
    freeCells.push(item[0]);
    
  }
  
});
  // console.log(freeCells.length);
  return freeCells;

}
checkFields(){
  let Cells = this.getFields();
  let a = [];

  a[1] = Cells[0][1] + Cells[1][1] + Cells[2][1];
  a[2] = Cells[3][1] + Cells[4][1] + Cells[5][1];
  a[3] = Cells[6][1] + Cells[7][1] + Cells[8][1];
  a[4] = Cells[0][1] + Cells[3][1] + Cells[6][1];
  a[5] = Cells[1][1] + Cells[4][1] + Cells[7][1];
  a[6] = Cells[2][1] + Cells[5][1] + Cells[8][1];
  a[7] = Cells[0][1] + Cells[4][1] + Cells[8][1];
  a[8] = Cells[6][1] + Cells[4][1] + Cells[2][1];
  for (var i = 1; i< 9; i++){

    if(a[i] == 0){ 

    var arr =  this.getWinCells(i,0);

    return arr;

    }
  }
  return 0;

}
getWinCells(combination:number,item:number){
  let Cells = this.getFields();
  if(combination == 1) return [Cells[0][item],Cells[1][item],Cells[2][item]];
  if(combination == 2) return [Cells[3][item],Cells[4][item],Cells[5][item]];
  if(combination == 3) return [Cells[6][item],Cells[7][item],Cells[8][item]];
  if(combination == 4) return [Cells[0][item],Cells[3][item],Cells[6][item]];
  if(combination == 5) return [Cells[1][item],Cells[4][item],Cells[7][item]];
  if(combination == 6) return [Cells[2][item],Cells[5][item],Cells[8][item]];
  if(combination == 7) return [Cells[0][item],Cells[4][item],Cells[8][item]];
  if(combination == 8) return [Cells[6][item],Cells[4][item],Cells[2][item]];

}
setTwoPlayers(twoPlayers:boolean){
this.isTwoPlayers = twoPlayers;
}
twoPlayers(){
  return this.isTwoPlayers
}
}

// 123  012
// 456  345
// 789  678
// 147  036
// 258  147
// 369  258
// 159  048
// 753  642

  // (Cells[0][1],Cells[1][1],Cells[2][1]);
  // (Cells[3][1],Cells[4][1],Cells[5][1]);
  // (Cells[6][1],Cells[7][1],Cells[8][1]);
  // (Cells[0][1],Cells[3][1],Cells[6][1]);
  // (Cells[1][1],Cells[4][1],Cells[7][1]);
  // (Cells[2][1],Cells[5][1],Cells[8][1]);
  // (Cells[0][1],Cells[4][1],Cells[8][1]);
  // (Cells[6][1],Cells[4][1],Cells[2][1]);