import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BlockDto } from 'src/app/models/block';
import { BLOCK_SIZE, COL_NUM, ROW_NUM, SPRITE_MAP, LIGHT_BLOCK, DARK_BLOCK, LIGHT_BLOCK_SEL, DARK_BLOCK_SEL } from 'src/app/shared/CONSTANTS';
import { MatchService } from 'src/app/services/match.service';
import { MatchDto } from 'src/app/models/match';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() match: MatchDto;
  @Input() connectionId: string;
  @ViewChild('canvas') 
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private pieces: HTMLImageElement;
  private blockSelected: BlockDto;
  
  constructor(private matchService: MatchService) { 
    this.pieces = new Image();
    this.pieces.src = "assets/chess_pieces.svg";
    this.blockSelected = null;
  }

  ngOnInit() {

  }

  ngOnChanges(){
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.pieces.onload = () => {
      this.drawBoard(this.match.board.state);
    };

    if(this.pieces){
      this.drawBoard(this.match.board.state);
    }
  }

  onBoardClick(ev){

    if(this.match.isWhiteTurn && this.match.playerBlack.connectionId == this.connectionId) return;
    if(!this.match.isWhiteTurn && this.match.playerWhite.connectionId == this.connectionId) return;

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;

    const col = Math.floor(x / BLOCK_SIZE);
    const row = Math.floor(y / BLOCK_SIZE);

    if(this.blockSelected){
      let coord = this.blockSelected.coord;
      this.blockSelected = null;
      this.matchService.addMove(this.match.getKey(), coord, this.match.board.state[row][col].coord);
    }else{
      this.blockSelected = this.match.board.selectPiece(row, col);
      this.drawBoard(this.match.board.state);
    }
    //console.log("Selected:", this.match.board.state[row][col]);
  }

  drawBoard(gameState: BlockDto[][]) {
    for(var row = 0; row < ROW_NUM; row++){
      for(var col = 0; col < COL_NUM; col++){
        let light = gameState[row][col].isSelected ? LIGHT_BLOCK_SEL : LIGHT_BLOCK;
        let dark = gameState[row][col].isSelected ? DARK_BLOCK_SEL : DARK_BLOCK;

        this.ctx.fillStyle = [light, dark][(row + col) % 2];
        this.ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

        this.drawPiece(gameState, row, col, this.pieces);
      }
    }
  }

  drawPiece(gameState: BlockDto[][], row: number, col: number, pieces){
    if(gameState[row][col].piece){
      let spriteY = !gameState[row][col].piece.isWhite ? BLOCK_SIZE : 0;
      let spriteX = SPRITE_MAP[gameState[row][col].piece.type] * BLOCK_SIZE;
      this.ctx.drawImage(pieces, spriteX, spriteY, BLOCK_SIZE, BLOCK_SIZE, col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
  }
}
