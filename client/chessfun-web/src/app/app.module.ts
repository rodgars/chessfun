import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RoomMenuComponent } from './components/room/room-menu/room-menu.component';
import { PlayerStatusComponent } from './components/room/player-status/player-status.component';
import { BoardComponent } from './components/room/board/board.component';
import { RoomComponent } from './components/room/room.component';
import { SpinnerComponent } from './components/utils/spinner/spinner.component';
import { TimerPipe } from './shared/timer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomMenuComponent,
    PlayerStatusComponent,
    BoardComponent,
    RoomComponent,
    SpinnerComponent,
    TimerPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
