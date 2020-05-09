import { Component, OnInit, Input } from '@angular/core';
import { PlayerDto } from 'src/app/models/player';

@Component({
  selector: 'app-player-status',
  templateUrl: './player-status.component.html',
  styleUrls: ['./player-status.component.css']
})
export class PlayerStatusComponent implements OnInit {
  @Input() player: PlayerDto;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    
  }

}
