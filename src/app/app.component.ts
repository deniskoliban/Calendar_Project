import { Component, OnInit } from '@angular/core';
import { Days } from '../app/days';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'calendar-app';
  days:Days[][] = [];
  weeksDays:any[0]=[];
  monthDay:number = 1;
  startDay:number;
  
  openPrompt(dayNumber) {
    if (dayNumber === 0) {
      return;
    }
    const res = prompt('Enter event');
    if (res === null) {
      return;
    }
    console.log(dayNumber);
    console.log(res);
    let weekIndex = Math.floor((dayNumber + this.startDay - 1) / 7);
    let dayIndex = (dayNumber + this.startDay - 1) % 7;
    this.days[weekIndex][dayIndex].event = res;

  }


  getStartDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
  }

  daysInMonth(iMonth, iYear) {
    return 33 - new Date(iYear, iMonth, 33).getDate();
  }

  ngOnInit() {
    const x = new Date();
    const dayss = this.daysInMonth(x.getMonth(), x.getFullYear());
    this.startDay = this.getStartDay(new Date(x.getFullYear(), x.getMonth()));
    this.days[0] = [];
    
    for (let i = 0; i < 7; i++) {
      if (i < this.startDay) {
        this.days[0][i] = {day:0, event:""};
      }
      else {
        this.days[0][i] = {day:this.monthDay++, event:""};
      }
    } 
    for (; this.monthDay < dayss+1; this.monthDay++) {
      let weekIndex = Math.floor((this.monthDay + this.startDay - 1) / 7);
      let dayIndex = (this.monthDay + this.startDay - 1) % 7;
      if (!this.days[weekIndex]) {
        this.days[weekIndex] = [];
      }
      this.days[weekIndex][dayIndex] = {day:this.monthDay, event:""};
    }
    
   console.log(this.startDay);
   console.log(dayss);
   console.log(this.days);
  }

}
