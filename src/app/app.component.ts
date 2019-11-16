import { Component, OnInit } from '@angular/core';
import { DbpediaSparqlService } from './dbpedia-sparql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dbpediaSparqlService: DbpediaSparqlService) {

  }
  title = 'dbpedia-sparql-interface';

  ngOnInit() {
    this.dbpediaSparqlService.getSparQL(
      `select distinct ?prop ?value where { 
        ?class a owl:Class;
               rdfs:label "movie"@en;
               ?prop ?value.
       }`
    ).subscribe((data) => console.log(data))

  }
}
