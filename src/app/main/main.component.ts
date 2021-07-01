import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { EnvironmentModel, StaticAnalysisResult } from '../class/scene';
import { BestScenarioService } from '../service/best-scenario.service';
import { DynamicAnalysisService } from '../service/dynamic-analysis.service';
import { StaticAnalysisService } from '../service/static-analysis.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  initModelFileName:string=""
  propertyFileName:string=""
  ruleText: string = "";
  ruleTextFinal: string = "";
  fileUploaded: boolean = false;
  simulationTime: string = "300";
  simulationTimeFinal: string = "";

  environmentModel:EnvironmentModel|null=null;
  staticAnalysisResult:StaticAnalysisResult|null=null;

  address:string='http://localhost:8085/';
  modelUploader: FileUploader = new FileUploader({
    url: this.address+'visual/upload',
    method: 'POST',
    itemAlias: 'file'
  });
  propertyUploader: FileUploader = new FileUploader({
    url: this.address+'visual/upload',
    method: 'POST',
    itemAlias: 'file'
  });
  constructor(private staticAnalysisService:StaticAnalysisService,private dynamicAnalysisService:DynamicAnalysisService,private bestScenarioService:BestScenarioService) { }

  ngOnInit(): void {
  }

  //////////////////////////////上传文件/////////////////////////////////
  ////上传环境本体文件
  uploadModelFile(event:any){
    this.initModelFileName=event.target.files[0].name;
    console.log(event);
    ////上传
    this.upload(this.modelUploader,this.initModelFileName);
  }
  /////上传设备位置信息表文件
  uploadPropertyFile(event:any){
    this.propertyFileName=event.target.files[0].name;
    console.log(event);
    //////上传
    this.upload(this.propertyUploader,this.propertyFileName);
  }

  upload(fileUploader:FileUploader,fileName:string){
    console.log(fileName + '执行上传文件');
    fileUploader.queue[0].onSuccess= function (response, status, headers){
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        const tempRes = response;
        console.log(response);
      } else {
        // 上传文件后获取服务器返回的数据错误
        alert(fileName + '上传失败');
      }
    }
    fileUploader.queue[0].upload();//开始上传
    console.log(fileName + '上传之后');

  }
  ////////////////////////////////////////////////////////////////////////


    // //////静态分析
    // getStaticAnalysisResult(){
    //   document.getElementById("static")!.style.display="block";
    //   document.getElementById("simulation")!.style.display="none";
    //   this.ruleText=this.ruleText.trim();
    //   this.staticAnalysisService.getStaticAnalysisResult(this.ruleText,this.initModelFileName,this.propertyFileName).subscribe(environmentStatic=>{
    //     console.log(environmentStatic)
    //     this.staticAnalysisResult=environmentStatic.staticAnalysisResult
    //     this.environmentModel=environmentStatic.environmentModel;
    //   })
    // }

      /////获得最佳场景分析结果
  getBestScenarioAnalysis(){
    
    // console.log(this.environmentModel)
    // console.log(this.staticAnalysisResult)
    // if(this.staticAnalysisResult!=null&&this.environmentModel!=null){
    //   console.log("???")
    //   this.bestScenarioService.generateBestScenarioModelAndSimulate(this.ruleText,this.initModelFileName,this.propertyFileName,"300").subscribe(scene=>{
        
    //     console.log(scene)

    //   })
    // }

    this.bestScenarioService.generateBestScenarioModelAndSimulate(this.ruleText,this.initModelFileName,this.propertyFileName,"300").subscribe(scene=>{
        
      console.log(scene)

    })
  }

  simulate(){

  }

  visualize(){

  }

}
