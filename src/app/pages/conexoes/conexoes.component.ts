import { Component, OnInit } from '@angular/core';
import { DbpediaSparqlService } from 'src/app/dbpedia-sparql.service';

@Component({
  selector: 'app-conexoes',
  templateUrl: './conexoes.component.html',
  styleUrls: ['./conexoes.component.css']
})
export class ConexoesComponent implements OnInit {

  sparqlQuery: string
  result: string

  constructor(private dbpediaSparqlService: DbpediaSparqlService) { }

  ngOnInit() {
  }

  // SELECT DISTINCT ?movie ?prop ?value WHERE {
  //   ?movie a dbo:Film;
  //          rdfs:label ?name;
  //          ?prop ?value.
  //   filter(regex(str(?name), "La La Land"))
  //  }
   

  search(){
    this.dbpediaSparqlService.getSparQL(this.sparqlQuery).subscribe((data) => {
      this.result = JSON.stringify(data)
       console.log(data)
    })

  }

}
