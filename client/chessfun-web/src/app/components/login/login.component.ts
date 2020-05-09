import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlayerDto } from 'src/app/models/player';
import { MatchDto } from 'src/app/models/match';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public matchList: MatchDto[];
  private connectionId: string;

  constructor(private fb: FormBuilder, private matchService: MatchService) { 
    this.matchService.getConnectionIdReceived.subscribe(this.onGetConnectionIdReceived.bind(this));
  }

  ngOnInit() {
    this.form = this.fb.group({
      userName: [''],
    });
  }

  playGame(){
    this.matchService.addPlayer(this.form.get('userName').value, this.connectionId);
  }

  onGetConnectionIdReceived(connectionid: string){
    this.connectionId = connectionid
  }

}
