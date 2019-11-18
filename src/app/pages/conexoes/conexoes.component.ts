import { Component, OnInit } from '@angular/core';
import { DbpediaSparqlService } from 'src/app/dbpedia-sparql.service';
import { Network } from "vis";
import { graphOptions } from "src/app/pages/conexoes/graph-options"

@Component({
  selector: 'app-conexoes',
  templateUrl: './conexoes.component.html',
  styleUrls: ['./conexoes.component.css']
})
export class ConexoesComponent implements OnInit {

  network: Network

  type: string
  label: string
  prop: string
  res: any

  result: string
  nodes: Array<any>
  edges: Array<any>
  lastIndex: number

  buildQuery(){
    let query =
      `
        SELECT DISTINCT ?obj ?prop (SAMPLE(?value) AS ?value) WHERE {
                        ?obj a dbo:${this.type};
                        rdfs:label ?name;
                        ?prop ?value.
                        
                        FILTER (lang(?name) = 'en')
      `;

      if(this.label)
        query += ` filter(str(?name) = "${this.label}") `;

      if(this.prop)
        query += ` filter( regex( str(?prop), "${this.prop}") ) `;

      query += ` } GROUP BY ?obj ?prop`
      return query;
  }


  constructor(private dbpediaSparqlService: DbpediaSparqlService) {
    this.lastIndex = 0
  }

  initGraph(nodes, edges){
    var container = document.getElementById("mynetwork");

    var data = {
      nodes: nodes,
      edges: edges
    };

    const options = graphOptions;

    this.network = new Network(container, data, options);

    this.network.on( 'click', (properties) => {

      const index = properties.nodes.pop();
      console.log(this.res[index - 1])
    });
  }

  focus(){
    this.network.focus(0)
  }

  zoomIn(){
    const ficOp = {
      nodes: ["0"],
      animation: false
    }
    this.network.fit(ficOp)
  }

  zoomOut(){
    this.network.fit()
  }

  ngOnInit() {
  }

  search(id: number){
    this.dbpediaSparqlService.getSparQL(this.buildQuery()).subscribe((data) => {
      const result = JSON.stringify(data)
      this.res = data.results.bindings.filter( (obj) => obj.value["xml:lang"] == "en" || obj.value["xml:lang"] == undefined)
      
      const labelNode = this.res.find((obj) => obj.prop.value.split("/").pop().split("#").pop() == "label")
      this.res.splice(this.res.indexOf(labelNode), 1)


      const nodes = this.res.map((node, index) => {
          const indexx = index + this.lastIndex + 1
          const group = node.value.type.split("/").pop()
          return {
            id: indexx,
            label: node.value.value.split("/").pop().substring(0, 20),
            group: group == "typed-literal" ? "literal" : group }
        })


        const edges = this.res.map((node, index) => {
          const indexx = index + this.lastIndex + 1

          return {
            from: id,
            to: indexx,
            label: node.prop.value.split("/").pop().split("#").pop()
          }
        })

        if(id == 0)
          nodes.push({ id: 0, label: labelNode.value.value.split("/").pop().substring(0, 15), group: "MAIN NODE" })

        this.initGraph(nodes, edges)
    })

  }

}
