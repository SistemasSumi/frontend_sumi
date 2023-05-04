import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { 
  
  }


  ngOnInit() {
    this.loadScript('../assets/libs/fullcalendar/main.min.js'); 
    this.loadScript('../assets/js/pages/calendar.init.js"'); 
  }


    public loadScript(url: string) {
    const body = document.getElementById("cajascriptPage");
    const script = document.createElement('script');
    script.src = url;
    script.async = false;
    script.defer = true;
    body.append(script);
  }
  
}
