import { Injectable } from '@angular/core';
import { CellService } from './cell.service';


@Injectable({
  providedIn: 'root'
})
export class AiService {

  winCells;
  aiPlayer = 2;
   

  constructor(private cellService: CellService) { }

  
  
  randomTurn(){
    
    let freeCells = this.cellService.getAllFreeCells();

    let rnd = Math.floor(Math.random() * freeCells.length);
    let iteration:number = 0;
    // console.log(freeCells[rnd]);
    while (freeCells[rnd] == undefined){
      iteration++;
      freeCells = this.cellService.getAllFreeCells();
      rnd = Math.floor(Math.random() * freeCells.length);
      if (iteration > 15 || this.cellService.canTurn == false) break;
    } if(freeCells[rnd] !== undefined)  {
      this.cellService.clickOnCell(freeCells[rnd]);
    }
  }
  
  aiTurn(){
    if(this.cellService.canTurn == false) return false;
    let checkPlayer = this.findTwoCells(1);
    let checkAi = this.findTwoCells(this.aiPlayer);
    if(checkPlayer !== 0) {
      if(checkAi !== 0 ){ this.cellService.clickOnCell(checkAi); return true; }
      //  console.log(checkPlayer);
      this.cellService.clickOnCell(checkPlayer);
      return true;
    }
   if(this.winCells == null) this.winCells = this.cellService.checkFields();
    // if (this.winCells == NaN) alert("nan");
    
    let check1 = this.cellService.checkCellForFree(this.winCells[0]-1);
    let check2 = this.cellService.checkCellForFree(this.winCells[1]-1);
    let check3 = this.cellService.checkCellForFree(this.winCells[2]-1);
    //  console.log(this.winCells);
    if ((check1 == 0 || check1 == this.aiPlayer) && (check2 == 0 || check2 == this.aiPlayer)&& (check3 == 0 || check3 == this.aiPlayer)){
      // console.log(this.cellService.checkCellForFree(this.winCells[0]));
      // var l_rnd = Math.floor(Math.random() * 3);
      var rnd = Math.floor(Math.random() * 3);
      if(this.cellService.checkCellForFree(this.winCells[rnd]-1) == 0){this.cellService.clickOnCell(this.winCells[rnd]); return true;}
  
      if(this.cellService.checkCellForFree(this.winCells[0]-1) == 0){this.cellService.clickOnCell(this.winCells[0]); return true;} 
      if(this.cellService.checkCellForFree(this.winCells[1]-1) == 0){this.cellService.clickOnCell(this.winCells[1]); return true;}
      if(this.cellService.checkCellForFree(this.winCells[2]-1) == 0){this.cellService.clickOnCell(this.winCells[2]); return true;}
      // console.log(this.winCells[rnd]);
      // this.cellService.clickOnCell(this.winCells[0]);
    }else{
      this.winCells = this.cellService.checkFields();
     

    
      
      this.randomTurn();
    }
 

   if (this.winCells !== 0 ){

   }
   return true;
  }
findTwoCells(player:number){
  for (var i = 1; i< 9; i++){
    
    var arr =  this.cellService.getWinCells(i,1);
   
    if(arr[0] == player || arr[1] == player|| arr[2] == player){
      if((arr[0] == player && arr[1] == player)||(arr[1] == player && arr[2] == player)||(arr[0] == player && arr[2] == player)){
       var needCell = this.cellService.getWinCells(i,0);
      //  console.log(needCell[0],"need cell");
      var rnd = Math.floor(Math.random() * 3);
      if(this.cellService.checkCellForFree(needCell[rnd]-1) == 0){  return needCell[rnd];} 

       if(this.cellService.checkCellForFree(needCell[0]-1) == 0){  return needCell[0];} 
       if(this.cellService.checkCellForFree(needCell[1]-1) == 0){  return needCell[1];} 
       if(this.cellService.checkCellForFree(needCell[2]-1) == 0){  return needCell[2];} 
        
      }
    }
    
    

    
  }
  return 0;
}

newRound(){
  this.winCells = null;
console.clear;
}

}
