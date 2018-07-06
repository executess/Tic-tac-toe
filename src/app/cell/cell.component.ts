import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CellService } from '../cell.service';
import { AiService } from '../ai.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() id: number;
  @Input() cell: number;
  @Output() onChanged = new EventEmitter();
  
  isItem: number;
  isCross:boolean = false;
  isZero:boolean = false;
  isEmpty:boolean;
  constructor(private cellService: CellService, private aiService: AiService) {

  }

  ngOnInit() {
    
  }

 onClick(){
  this.onChanged.emit(this.id);
 
  let turn = this.cellService.clickOnCell(this.id);
  if(turn[0] == true && this.cellService.twoPlayers()==false){
  
  this.aiService.aiTurn();
  }
 }
 initCell(){
 if(this.isItem == 1){
  this.isEmpty = false;
  this.isCross = true;
}
if(this.isItem == 2){
  this.isEmpty = false;
  this.isZero = true;
  
}if(this.isItem == 0){
  this.isZero = false;
  this.isCross = false;
  this.isEmpty = true;
}else{}

 }
 ngDoCheck(){
  this.isItem = this.cell;

  this.initCell();
 }
}
