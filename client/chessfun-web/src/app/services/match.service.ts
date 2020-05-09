import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { MatchDto } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  addPlayerReceived = new EventEmitter<MatchDto>();  
  addMoveReceived = new EventEmitter<MatchDto>();
  getConnectionIdReceived =  new EventEmitter<MatchDto>();  

  private hub: HubConnection;

  constructor() {
    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection();  
   }

   private createConnection() {  
    this.hub = new HubConnectionBuilder()  
      .withUrl('http://localhost:5000/match')  
      .build();  
  }

  private startConnection(): void {  
    this.hub  
      .start()  
      .then(() => {  
        console.log('Hub connection started');  
        this.hub.invoke('GetConnectionId').then(connectionId => {
          this.getConnectionIdReceived.emit(connectionId);
        });
      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...', err);  
        setTimeout(function () { this.startConnection(); }, 5000);  
      });  
  }
  
  private registerOnServerEvents(): void {  
    this.hub.on('addPlayerReceived', (data: MatchDto) => {  
      this.addPlayerReceived.emit(data);  
    });  

    this.hub.on('addMoveReceived', (data: MatchDto) => {  
      this.addMoveReceived.emit(data);  
    }); 
  }

  public addPlayer(userName: string, connectionId: string){
    this.hub.invoke('AddPlayer', userName, connectionId);
  }

  public addMove(key: string, sourceMove: string, targetMove: string){
    this.hub.invoke('addMove', key, sourceMove, targetMove);
  }
}
