import { Injectable } from '@angular/core';
import { EnvironmentModel, Rule ,EnvironmentRule, DeviceDetail, Scene, SceneEnvironmentProperty, SceneEnvironmentRule, ScenePropertyResult} from '../class/scene';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicAnalysisService {

  constructor(private http:HttpClient) { }
  httpOptions = {
  	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  address:string="http://localhost:8083/";







  generateBestScenarioModelAndSimulate(environmentModel:EnvironmentModel,rules:Array<Rule>,initModelFileName:string,simulationTime:string):Observable<Scene>{
    var environmentRule:EnvironmentRule={
      environmentModel:environmentModel,
      rules:rules
    }
    var url=this.address+`analysis/generateBestScenarioModelAndSimulate?initModelFileName=${initModelFileName}&simulationTime=${simulationTime}`;
    return this.http.post<Scene>(url,environmentRule,this.httpOptions);
  }
}
