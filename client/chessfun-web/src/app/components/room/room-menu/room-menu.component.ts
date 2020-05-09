import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.css']
})
export class RoomMenuComponent implements OnInit {

  public viewers: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
