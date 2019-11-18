import { Component, OnInit } from '@angular/core';
import { DbpediaSparqlService } from 'src/app/dbpedia-sparql.service';
import { Network } from "vis";
import { graphOptions } from "src/app/pages/conexoes/graph-options"
import { findLast } from '@angular/compiler/src/directive_resolver';
import { uniq } from "lodash"

@Component({
  selector: 'app-conexoes',
  templateUrl: './conexoes.component.html',
  styleUrls: ['./conexoes.component.css']
})
export class ConexoesComponent implements OnInit {

  status: string
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
        SELECT DISTINCT ?obj ?prop ?value WHERE {
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


  constructor(private dbpediaSparqlService: DbpediaSparqlService) {
    this.lastIndex = 0
    this.status = "Sem processamento"
    this.res = []
    this.edges = []
    this.nodes = []
  }

  initGraph(nodes, edges){
    var container = document.getElementById("mynetwork");

    var data = {
      nodes: nodes,
      edges: edges
    };

    const options = graphOptions;

    this.network = new Network(container, data, options);

    this.network.on('doubleClick', (properties) => {
      console.log(properties)
      const index = properties.nodes.pop();
      const node = this.res[index - 1]
      console.log(node)

      if(!node)
        return
      if(node.value.type.includes("literal"))
        return;

      // TODO this.searchNode()

    });

    this.network.on('click', (properties) => {
      const index = properties.nodes.pop();
      console.log(index)

      if(!index)
        return

        this.zoomIn(index)
    });
  }

  focus(){
    this.network.focus(0)
  }

  zoomIn(index: number){
    const ficOp = {
      nodes: [index.toString()],
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
    this.status = "Buscando resposta"
    if(id == 0){
      this.lastIndex = 0;
      this.res = []
      this.edges = []
      this.nodes = []
    }

    this.dbpediaSparqlService.getSparQL(this.buildQuery()).subscribe(async (data) => {

      this.status = "Processando resposta"

      let res = data.results.bindings.filter( (obj) => obj.value["xml:lang"] == "en" || obj.value["xml:lang"] == undefined)
      
      const labelNode = res.find((obj) => obj.prop.value.split("/").pop().split("#").pop() == "label")
      res.splice(res.indexOf(labelNode), 1)

      let nodes = res.map((node, index) => {
          const idx = index + this.lastIndex + 1
          const group = node.value.type.split("/").pop()
          const label = node.value.value.split("/").pop().substring(0, 20)
          return {
            id: idx,
            label: label == "" ? node.value.value.substring(0, 20) : label,
            group: group == "typed-literal" ? "literal" : group }
      })

      this.res = this.res.concat(res)
      const oldLength = this.lastIndex;
      this.lastIndex = this.res.length;

      let labelNodes = []
      
      labelNodes = uniq(res.map((node) => node.prop.value.split("/").pop().split("#").pop()))

      labelNodes = labelNodes.map((label, index) => {
        const idx = index + this.lastIndex + 1
        return { id: idx, label: label, group: "lableNodes" }
      })


      this.res = this.res.concat(labelNodes)
      res = res.concat(labelNodes)
      nodes = nodes.concat(labelNodes)

      this.lastIndex = this.res.length;

      const edges = res.map((node, index) => {
        const to = node.group == "lableNodes" ? id : labelNodes.find((no) => no.label == node.prop.value.split("/").pop().split("#").pop()).id;
        const from = index + oldLength + 1
        const resp  = {
          from: from,
          to: to,
        }
        return resp
      })

      this.edges = this.edges.concat(edges)

      if(id == 0)
        nodes.push({ id: 0, label: labelNode.value.value.split("/").pop().substring(0, 15), group: "MAIN NODE" })

      this.nodes = this.nodes.concat(nodes)
      this.status = "Desenhando grafo"
      this.initGraph(nodes, edges)
    })

  }

}
