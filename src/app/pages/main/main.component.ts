import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = 'Bem vindo à interface para DBPedia com consultas SparQL';

  constructor() { }

  ngOnInit() {
  }

}
