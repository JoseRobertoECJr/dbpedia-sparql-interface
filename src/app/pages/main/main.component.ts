import { Component, OnInit } from '@angular/core';
import { imagestr } from "src/app/pages/imagestr"

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  imagestr = imagestr
  title = 'Bem vindo à interface para DBPedia com consultas SparQL';

  constructor() { }

  ngOnInit() {
  }

}
