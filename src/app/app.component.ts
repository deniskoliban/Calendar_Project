import { Component, OnInit } from '@angular/core';
import { Days } from '../app/days';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'calendar-app';
  days:Days[][] = [];
  startDay:number;
  month:number = new Date().getMonth();
  year:number = new Date().getFullYear();
  calendarMap:Map<string,Days[][]> = new Map<string,Days[][]>();
  
  
  openPrompt(dayNumber) {
    if (dayNumber === 0) {
      return;
    }
    const res = prompt('Enter event');
    if (res === null) {
      return;
    }
    let weekIndex = Math.floor((dayNumber + this.startDay - 1) / 7);
    let dayIndex = (dayNumber + this.startDay - 1) % 7;
    this.days[weekIndex][dayIndex].event = res;
  }

  selectCurrentMonth(){
    this.month = new Date().getMonth();
    this.calendarRoll()
  }

  monthNumber(monthDirection) {
    if (this.month < 11 && this.month > 0) {
      this.month = this.month + monthDirection ;
   }
   
    this.calendarRoll();

  }

  calendarRoll() {
    
    const key = this.year.toString() + ' ' + this.month.toString();
    if (!this.calendarMap.has(key)) {
      this.calendarMap.set(key, this.initCalendar(this.year, this.month));
    }
    
    this.days = this.calendarMap.get(key);
  }

  getStartDay(date) { 
    let day = date.getDay();
    if (day == 0) {
      day = 7;
    }
    return day - 1;
  }

  daysInMonth(iMonth, iYear) {
    return 33 - new Date(iYear, iMonth, 33).getDate();
  }

  initCalendar(year, month) {
    let monthDay = 1;
    const x = new Date(year, month);
    const dayss = this.daysInMonth(x.getMonth(), x.getFullYear());
    this.startDay = this.getStartDay(new Date(x));
    this.days = [];
    this.days[0] = [];
    
    for (let i = 0; i < 7; i++) {
      if (i < this.startDay) {
        this.days[0][i] = {day:0, event:""};
      }
      else {
        this.days[0][i] = {day:monthDay++, event:""};
      }
    } 
    for (; monthDay < dayss+1; monthDay++) {
      let weekIndex = Math.floor((monthDay + this.startDay - 1) / 7);
      let dayIndex = (monthDay + this.startDay - 1) % 7;
      if (!this.days[weekIndex]) {
        this.days[weekIndex] = [];
      }
      this.days[weekIndex][dayIndex] = {day:monthDay, event:""};
    }
   return this.days;
   
  }

  ngOnInit() {
    this.initCalendar(this.year, this.month);
    let str = 'fgfgfg';
    console.log(15%7)
  }
}
