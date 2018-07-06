import { Component, OnInit, Input } from '@angular/core';
import {CellService} from '../cell.service';
import { AiService } from '../ai.service';




@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  @Input() massage:string;
  score;
  clicks:number = 0;
  cells;
  timer;
  isNewRound:boolean = false
  msgAnim:boolean = false;
  needTimer:boolean = true;
  constructor(private cellService: CellService, private auService: AiService) { }

  onChanged(cell){
      // console.log(this.massage);
    // increased==true?this.clicks++:this.clicks--;
    
  }


  ngOnInit() {
    this.cellService.initFields(9);
    this.cells = this.cellService.getFields();
    this.cellService.clearScore();
  }
  fnMassage(){
    
    if(this.massage !=="" || this.cellService.getAllFreeCells().length <= 0 || this.isNewRound == true){
      // alert(this.massage)
      // this.timer = setTimeout(()=>this.cellService.clearField(), 2000);

      this.cellService.clearField()
      this.auService.newRound();
      // alert("this.massage");
      this.massage="";
      
      clearTimeout(this.timer);
      this.needTimer = true;
      this.msgAnim = false;
      this.isNewRound = false;
    } 
    
    
  }
  newRound(timer:number){
    
    if(this.needTimer == false){ alert("false"); return 0;} 
    this.isNewRound = true;
    this.msgAnim = true;
    this.needTimer = false;
    this.timer = setTimeout(()=>this.fnMassage(), timer);
  }
  ngDoCheck(){
    
    if(this.massage != "Draw") this.massage = this.cellService.massage;
    if(this.massage !=="" && this.needTimer == true || this.cellService.getAllFreeCells().length <= 0 && this.needTimer == true){
       this.newRound(2000);
     
      if(this.cellService.getAllFreeCells().length <= 0 ){this.massage="Draw";return 0;}
    } 

    
    this.cells = this.cellService.getFields();
    this.score = this.cellService.score;
  return 0;
  }
  changePlayers(twoPlayers:boolean){
    this.cellService.setTwoPlayers(twoPlayers);
    // console.log(this.cellService.checkFields());
    // if(this.massage == "" && this.cellService.getAllFreeCells().length <= 0 ){
    //   // console.log(this.cellService.getAllFreeCells().length);
    //   alert("Draw")
    //   this.massage = "Draw";
    // }
    
    
    // alert("click");
  }

}
