import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'timer'})
export class TimerPipe implements PipeTransform {

    transform(value: number): string {
        if(value){
            let minutes = Math.floor(value / 60);
            let seconds = Math.floor(value % 60);
            return `0${minutes}:${(seconds > 10 ? seconds : '0' + seconds)}`;
        }
        return "00:00";
    }
}