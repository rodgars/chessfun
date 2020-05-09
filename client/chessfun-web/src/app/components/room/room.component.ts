import { Component, OnInit, Input } from '@angular/core';
import { MatchDto, ViewDto } from 'src/app/models/match';
import { MatchService } from 'src/app/services/match.service';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @Input() match: MatchDto;
  @Input() connectionId: string;
  
  view: ViewDto

  private counter: Observable<number>;
  
  constructor(private matchService: MatchService) {
    this.counter = interval(1000);
    this.counter.subscribe(this.adjustTimers.bind(this));
    this.matchService.addMoveReceived.subscribe(this.addMoveReceived.bind(this));
   }

  ngOnInit(){

  }

  ngOnChanges(){
    this.view = this.match.getView(this.connectionId);
  }

  adjustTimers(){
    this.match.countDown();
  }

  addMoveReceived(match: MatchDto){
    this.match = new MatchDto(match.playerWhite, match.playerBlack, match.viewers, match.board, match.isWhiteTurn);
    this.view = this.match.getView(this.connectionId);
  }
}
