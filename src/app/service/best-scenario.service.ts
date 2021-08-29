import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { Scene } from '../class/scene';

@Injectable({
  providedIn: 'root'
})
export class BestScenarioService {

  constructor(private http:HttpClient) { }

  httpOptions = {
  	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  address:string="http://localhost:8085/";

  
  generateBestScenarioModelAndSimulate(ruleText:string,initModelFileName:string,propertyFileName:string,simulationTime:String):Observable<Scene>{

    console.log(ruleText)
    console.log(initModelFileName)
    console.log(propertyFileName)
    console.log(simulationTime)
    var ruleTextLines:Array<string>;
    if(ruleText.indexOf("\r\n")>0){
      
      ruleTextLines=ruleText.split("\r\n");
    }else if(ruleText.indexOf("\n")>0){
      
      ruleTextLines=ruleText.split("\n");
    }else {
      
      ruleTextLines=ruleText.split("\n");
    }
    
    var url=this.address+`visual/generateBestScenarioModelAndSimulate?`;
    return this.http.post<Scene>(url,ruleTextLines,this.httpOptions);
  }

  getVisualizationResult(initModelFileName:string):Observable<string[]>{
    var url=this.address+`visual/getVisualizationResult?initModelFileName=${initModelFileName}`;
    return this.http.get<string[]>(url);
  }
}
