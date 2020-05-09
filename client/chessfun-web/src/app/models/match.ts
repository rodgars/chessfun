import { PlayerDto } from './player';
import { BoardDto } from './board';

export interface ViewDto {
    playerBottom: PlayerDto;
    playerTop: PlayerDto;
}

export class MatchDto {
    playerWhite: PlayerDto;
    playerBlack: PlayerDto;
    viewers: PlayerDto[];
    board: BoardDto;
    isWhiteTurn: boolean;

    constructor(playerWhite: PlayerDto, playerBlack: PlayerDto, viewers: PlayerDto[], board: BoardDto, isWhiteTurn: boolean) {
        this.playerWhite = playerWhite;
        this.playerBlack = playerBlack;
        this.viewers = viewers;
        this.board = new BoardDto(board.state, board.notation);
        this.isWhiteTurn = isWhiteTurn;
    }

    getView(connectionId: string): ViewDto {
        let isWhite = this.playerWhite.connectionId == connectionId;

        if(!isWhite) this.rotateBoard();

        return {
            playerBottom: isWhite ? this.playerWhite : this.playerBlack,
            playerTop: isWhite ? this.playerBlack : this.playerWhite
         };
    }

    countDown(){
        if(this.isWhiteTurn) this.playerWhite.secondsRemaining--;
        else this.playerBlack.secondsRemaining--;
    }

    rotateBoard(){
        this.board.state.reverse().forEach(item => item.reverse());
    }

    getPlayersName():string {
        return `${this.playerWhite.userName} ${this.playerBlack.userName}`;
    }

    getViewersTotal():number{
        return this.viewers.length;
    }

    getKey(): string{
        return this.playerWhite.connectionId + '_' + this.playerBlack.connectionId;
    }
}