import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { EnvironmentModel, StaticAnalysisResult } from '../class/scene';
import { BestScenarioService } from '../service/best-scenario.service';
import { DomSanitizer } from '@angular/platform-browser';  


/********加载RecordApp需要用到的支持文件*********/
//必须引入的app核心文件，换成require也是一样的。注意：app.js会自动往window下挂载名称为RecordApp对象，全局可调用window.RecordApp，也许可自行调整相关源码清除全局污染
import RecordApp from 'recorder-core/src/app-support/app'
//可选开启Native支持，需要引入此文件
import 'recorder-core/src/app-support/app-native-support'
//可选开启IOS上微信录音支持，需要引入此文件
import 'recorder-core/src/app-support/app-ios-weixin-support'


/*********加载Recorder需要的文件***********/
//必须引入的核心，所有需要的文件都应当引入，引入后会检测到组件已自动加载
//不引入也可以，app.js会去用script动态加载，应确保app.js内BaseFolder目录的正确性(参阅RecordAppBaseFolder)，否则会导致404 js加载失败
import 'recorder-core'

//需要使用到的音频格式编码引擎的js文件统统加载进来
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/mp3-engine'

//由于大部分情况下ios-weixin的支持需要用到amr解码器，应当把amr引擎也加载进来
import 'recorder-core/src/engine/beta-amr'
import 'recorder-core/src/engine/beta-amr-engine'
import 'recorder-core/src/engine/wav' //amr依赖了wav引擎

//可选的扩展支持项
import 'recorder-core/src/extensions/waveview'


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

  mediaRecorder: MediaRecorder
  videoURL:string="";
  audioURL:string
  recordState:string="inactive"
  authorized:boolean=false;

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

  audioUploader: FileUploader=new FileUploader({
    url: this.address+'visual/upload',
    method: 'POST',
    itemAlias: 'file'
  })

  // recordApp:RecordApp


  
  constructor(private bestScenarioService:BestScenarioService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    document.getElementById("visualizationResult").style.display="none";
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

  // authorize(){
  //   const recordBtn = document.getElementById("record_btn");
  //   const playBtn = document.querySelector(".play-btn");
  //   var chunks = [];
  //   if (navigator.mediaDevices.getUserMedia) {
  //     const constraints = { audio: true };
  //     navigator.mediaDevices.getUserMedia(constraints).then(
  //       stream => {
  //         this.mediaRecorder = new MediaRecorder(stream);

  //         recordBtn.onclick = () => {
  //           if (this.mediaRecorder.state === "recording") {
  //             this.mediaRecorder.stop();
  //             recordBtn.textContent = "record";
  //             console.log("录音结束");

  //           } else {
  //             this.mediaRecorder.start();
  //             console.log("录音中...");
  //             recordBtn.textContent = "stop";

  //           }
  //           console.log("录音器状态：", this.mediaRecorder.state);
  //         };
  //         this.mediaRecorder.ondataavailable = e => {
  //           chunks.push(e.data);
  //         };
    
  //         this.mediaRecorder.onstop = e => {
            
  //           var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
  //           console.log(blob)
  //           console.log(chunks)
  //           chunks = [];
  //           var audioURL = window.URL.createObjectURL(blob);
  //           this.audioURL = audioURL;
  //         };
          


          
          
  //       },
  //       () => {
  //         console.error("授权失败！");
  //       }

       
  //     );
  //   } else {
  //     console.error("浏览器不支持 getUserMedia");
  //   }
  // }




  authorize(){
    RecordApp.RequestPermission(() => {
      //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
      this.authorized=true
      console.log(this.authorized)

  },function(msg,isUserNotAllow){//用户拒绝未授权或不支持
      //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
      
      console.log((isUserNotAllow?"UserNotAllow，":"")+"无法录音:"+msg);
  });

  

  }

  recordAudio(){
    const recordBtn = document.getElementById("record_btn");
    const playBtn = document.getElementById("play_btn");
    console.log(this.recordState)
    if(this.authorized){
      if(this.recordState=="inactive"){
        RecordApp.Start({//如果需要的组件还在延迟加载，Start调用会等待这些组件加载完成后才会调起底层平台的Start方法，可通绑定RecordApp.Current.OnLazyReady事件来确定是否已完成组件的加载，或者设置RecordApp.UseLazyLoad=false来关闭延迟加载（会阻塞Install导致RequestPermission变慢）
          type:"wav",sampleRate:16000,bitRate:16 //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把支持文件到Platforms.Default内注册
          ,onProcess:function(buffers,powerLevel,bufferDuration,bufferSampleRate,newBufferIdx,asyncEnd){
              //如果当前环境支持实时回调（RecordApp.Current.CanProcess()），收到录音数据时就会实时调用本回调方法
              //可利用extensions/waveview.js扩展实时绘制波形
              //可利用extensions/sonic.js扩展实时变速变调，此扩展计算量巨大，onProcess需要返回true开启异步模式
          }
          
      },()=>{
        this.recordState="recording"
        recordBtn.textContent = "stop";
        console.log("start")
      },function(msg){
        console.log("开始录音失败："+msg);
      }

        )
      }else if(this.recordState=="recording"){
        RecordApp.Stop((blob,duration)=>{//到达指定条件停止录音和清理资源
          console.log(blob,(window.URL||webkitURL).createObjectURL(blob),"时长:"+duration+"ms");
          this.recordState="inactive"
          recordBtn.textContent = "record";
          this.authorized=false;

          let files = new window.File([blob],"audio.wav", {type: "wav"})

          console.log(files)
          // this.audioURL=window.URL.createObjectURL(blob)
          //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传

          // var link = document.createElement('a')
          // link.href=window.URL.createObjectURL(blob)
          // link.setAttribute('download','audio.wav');
          // link.click();

          // URL.revokeObjectURL(link.href) // 释放url
          // document.body.removeChild(link) // 释放标签

          
          // this.upload(this.audioUploader,files.name)

          let formData = new FormData()
          formData.append('file',blob,'audio.wav');
          console.log(formData)

          $.ajax({
              url: '/visual/upload',
              type: 'POST',
              processData: false,
              contentType: false,
              cache: false,
              data: formData,
              success(res) {
                  console.log("上传完成!")
              }
          })



        },function(msg){
            console.log("录音失败:"+msg);
        });
      }
    }
  }



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
      alert("finished")

    })
  }

  simulate(){

  }

  visualize(){
    this.bestScenarioService.getVisualizationResult(this.initModelFileName).subscribe(videoURL=>{
      // this.videoURL=this.sanitizer.bypassSecurityTrustResourceUrl(videoURL[0]);
      this.videoURL="assets/"+videoURL[0];

      console.log(this.videoURL)
      document.getElementById("visualizationResult").style.display="block";
    })
    
  }

}
