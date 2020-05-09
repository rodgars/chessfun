import { Component, OnInit } from '@angular/core';
import { MatchService } from './services/match.service';
import { MatchDto } from './models/match';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public foundMatch: boolean = false;
  public match: MatchDto;
  private isAwaitingPlayer: boolean = false;
  private connectionId: string;

  constructor(private matchService: MatchService) {
    // event subscriptions
    this.matchService.addPlayerReceived.subscribe(this.onAddPlayerReceived.bind(this));
    this.matchService.getConnectionIdReceived.subscribe(this.onGetConnectionIdReceived.bind(this));
  }

  onAddPlayerReceived(match: MatchDto){
    this.isAwaitingPlayer = !match.playerBlack;

    if (match.playerBlack){
      this.foundMatch = true;
      this.match = new MatchDto(match.playerWhite, match.playerBlack, match.viewers, match.board, match.isWhiteTurn);
    }
  }

  onGetConnectionIdReceived(connectionid: string){
    this.connectionId = connectionid
  }

  ngOnInit() { }
}
