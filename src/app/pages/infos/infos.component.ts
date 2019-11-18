import { Component, OnInit } from '@angular/core';
import { imagestr } from "src/app/pages/imagestr"
import { DbpediaSparqlService } from 'src/app/dbpedia-sparql.service';
import { isEqual, uniqWith } from 'lodash';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {

  imagestr = imagestr

  status: string
  type: string
  label: string
  prop: string
  res: any

  constructor(private dbpediaSparqlService: DbpediaSparqlService) {
    this.status = "Sem processamento"
  }

  ngOnInit() {
  }

  buildQuery(){
    let query =
      `
        SELECT DISTINCT ?prop ?value WHERE {
                        ?obj a dbo:${this.type};
                        rdfs:label ?name;
                        ?prop ?value.
                        
                        FILTER (lang(?name) = 'en')
      `;

      if(this.label)
        query += ` filter(str(?name) = "${this.label}") `;

      if(this.prop)
        query += ` filter( regex( str(?prop), "${this.prop}") ) `;

      query += ` } `
      return query;
  }

  search(){
    this.status = "Buscando resposta"
    this.dbpediaSparqlService.getSparQL(this.buildQuery()).subscribe((data) => {

      let res = data.results.bindings.filter( (obj) => obj.value["xml:lang"] == "en" || obj.value["xml:lang"] == undefined)

      console.log(res)

      let labelNodes = res.map((node) => {
        return { label: node.prop.value.split("/").pop().split("#").pop(), uri: node.prop.value }
      })

      labelNodes = uniqWith(labelNodes, isEqual)
      console.log(labelNodes)

      this.res = labelNodes.map((lab: any) => {
        return { label: lab.label, uri: lab.uri, nodes: res.filter((node) => node.prop.value == lab.uri).map((node) => {
          const label = node.value.value.split("/").pop()
          return { prop: node.prop, label: label == "" ? node.value.value : label, value: node.value }
        } ) }
      })
      console.log(this.res)

      this.status = "Sem processamento"
    })
  }

}
