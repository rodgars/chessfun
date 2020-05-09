import { ROW_NUM, COL_NUM } from '../shared/CONSTANTS';
import { BlockDto } from './block';
import { NotationDto } from './notation';

export class BoardDto 
{
    state: BlockDto[][];
    notation: NotationDto[];
    
    constructor(state: BlockDto[][], notation: NotationDto[]) {
        this.state = state;
        this.notation = notation;
     }

    private unselectedAllBoard(){
        for(let row=0; row < ROW_NUM; row++){
            for(let col=0; col < COL_NUM; col++){
                this.state[row][col].isSelected = false;        
            }
        }
    }

    public selectPiece(row: number, col: number): BlockDto{
        this.unselectedAllBoard();

        if(this.state[row][col].piece){
            this.state[row][col].isSelected = true;
            return this.state[row][col];
        }

        return;
    }

    public checkMoveValid(source: BlockDto, target: BlockDto): boolean{
        let isDifferentPiece = source.coord != target.coord;
        let isDifferentColor = source.piece.isWhite && !target.piece.isWhite; 

        return isDifferentPiece && isDifferentColor;
    }

    public move(source: BlockDto, target: BlockDto){
        if(this.checkMoveValid(source, target)){
            target.piece = source.piece;
            source.piece = null;
        }

        this.unselectedAllBoard();
    }

    private ConvertToNotation(pieceToMove: number, valueTarget: number): string {
        return "";
    }
}