import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlParamEncodingService } from './url-param-encoding.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbpediaSparqlService {

  constructor(private http: HttpClient, private urlParamEncodingService: UrlParamEncodingService) { }

  /**
   * get SparQL DBPedia Results
   * */
  public getSparQL(query: string): Observable<any> {
    return this.http.get<any>(
      'https://dbpedia.org/sparql',
      {
        params: new HttpParams({
          fromObject: {
          "default-graph-uri": "http://dbpedia.org",
          "query": query,
          "format": "application/sparql-results+json",
          "CXML_redir_for_subjs": "121",
          "CXML_redir_for_hrefs": "",
          "timeout": "30000",
          "debug": "on",
          "run": "Run Query",
          },
          encoder: this.urlParamEncodingService
      })
    })
  }
}