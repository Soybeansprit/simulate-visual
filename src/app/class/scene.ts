import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { ITS_JUST_ANGULAR } from "@angular/core/src/r3_symbols";


// export interface Scene{
//     sceneName:string;
//     datasTimeValue:Array<DataTimeValue>;
//     nameDataFunctions:Array<NameDataFunction>;
//     devicesAnalysResults:Array<DeviceAnalysResult>;
//     triggeredRulesName:Array<DataTimeValue>;
//     cannotTriggeredRulesName:Array<string>;

// }

export interface DataTimeValue{
    name:string;
    timeValues:Array<number[]>;

}

export interface NameDataFunction{
    name:string;
    dataFunctions:Array<DataFunction>;
}

export interface DataFunction{
    downTime:number;
    upTime:number;
    downValue:number;
    upValue:number;
    function:Function;
}
export interface Function{
    a:number;
    b:number;
}

export interface DeviceAnalysResult{
    deviceName:string;
    statesConflict:DeviceConflict;
    statesChange:StatesChange;
    deviceStateLastTime:DeviceStateTime;
    deviceCannotOff:DeviceCannotOff;
    deviceStateName:DeviceStateName;

}

export interface DeviceConflict{
    name:string;
    hasConflict:boolean;
    conflictTimes:Array<ConflictTime>;
}

export interface ConflictTime{
    conflictStates:Array<string[]>;
    conflictTime:string;
}

export interface StatesChange{
    statesChangeCount:number;
    statesChangeFrequence:number;
    stateChangeFasts:Array<StateChangeFast>;
}

export interface StateChangeFast{
    startTimeValue:number[];
    middleTimeValue:number[];
    endTimeValue:number[];
}

export interface DeviceStateTime{
    name:string;
    statesTime:Array<StateLastTime>;
}

export interface StateLastTime{
    state:string;
    stateName:string;
    lastTime:number;
}

export interface DeviceCannotOff{
    cannotOff:boolean;
    cannotOffReason:CannotOffReason;
}

export interface CannotOffReason{
    reason:string;
    cannotTriggeredRules:Array<Rule>;
} 


export interface DeviceStateName{
    deviceName:string;
    stateNames:Array<StateNameRelativeRule>;

}

export interface StateNameRelativeRule{
    stateValue:string;
    stateName:string;
    relativeRules:Array<Rule>;
}

export interface Rule{
    ruleName:string;
    ruleContent:string;
    trigger:Array<string>;
    action:Array<string>;
}

export interface Action{
    action:string;
    device:string;
    toState:string;
    value:string;
    attrVal:Array<string>;
    rules:Array<Rule>
}

export interface RuleText{
    rules:Array<string>
}


export interface RulesSceneSimulationTime{
    rules:Array<Rule>;
    scene:Scene;
    simulationTime:string
}

export interface RulesAllScenesSimulationTime{
    rules:Array<Rule>;
    scenes:Array<Scene>;
    simulationTime:string
}


/////////////////////////////states conflict//////////////
export interface StateAndRuleAndCauseRule{
    stateValue:string;
    stateName:string;
    rulesAndCauseRules:Array<RuleAndCause>;
}

export interface RuleAndCause{
    selfRule:Rule;
    causeRules:Array<RuleAndCause>;
}

export interface CauseRuleInput{
    conflictStateTime:ConflictTime;
    triggeredRulesName:Array<DataTimeValue>;
    deviceStateName:DeviceStateName;
    rules:Array<Rule>;
}

export interface AllCauseRuleInput{
    conflictStateTimes:Array<ConflictTime>;
    triggeredRulesName:Array<DataTimeValue>;
    deviceStateName:DeviceStateName;
    rules:Array<Rule>; 
}

///////////////conflict 总的分析/////////////////
export interface ConflictStateAndRules{
    conflictStateCauseRules:Array<StateAndRuleAndCauseRule>;
    count:number;
}

export interface DeviceConflictCauseRule{
    deviceName:string;
    conflictStatisticCauseRuleList:Array<ConflictStateAndRules>;
}


/////////////////////////state changes////////////////////////
export interface WholeAndCurrentChangeCauseRule{
    wholeStateChangesCauseRules:Array<StateChangeCauseRules>;
    currentStateChangeCauseRules:StateChangeCauseRules;
}

export interface StateChangeCauseRules{
    start: TimeStateRelativeRules;
    middle: TimeStateRelativeRules;
    end: TimeStateRelativeRules;
}

export interface TimeStateRelativeRules{
    time:number;
    stateName:string;
    relativeRules:Array<Rule>;
}

export interface StateChangeCauseRuleInput{
    triggeredRulesName:Array<DataTimeValue>;
    deviceStateName:DeviceStateName;
    stateChangeFasts:Array<StateChangeFast>;
    stateChangeFast:StateChangeFast;
}


export interface StateRules{
    stateName:string;
    causeRules:Array<Rule>;
    count:number;
}

export interface DeviceFastChangeCause{
    deviceName:string;
    fastChangeCauseRuleList:Array<Array<StateRules>>;
}


export interface DeviceStateReachable{
    deviceName:string;
    stateReachable:Array<StateReachable>;

}
export interface StateReachable{
    stateName:string;
    stateValue:string;
    reachable:boolean;
    rules:Array<Rule>;
}

export interface DeviceNotOff{
    deviceName:string;
    rules:Array<Rule>;
}



export interface AllScenesAnalysisInput{
    scenes:Array<Scene>;
    rules:Array<Rule>;
    properties:Array<string>;
}


export interface RuleAnalysis{
    rule:Rule;
    canTriggered:boolean;
    canCauseStateConflict:CanCauseStateConflict;
    canCauseFastChange:CanCauseFastChange;
}

export interface CanCauseStateConflict{
    canCauseStateConflict:boolean;
    devicesStateCounterRules:Array<DeviceStateCounterRules>
}

export interface CanCauseFastChange{
    canCause:boolean;
    devicesStateCouterRules:Array<DeviceStateCounterRules>
}

export interface DeviceStateCounterRules{
    deviceName:string;
    deviceState:string;
    counterRules:Array<CounterRule>;
}

export interface CounterRule{
    rule:Rule;
    deviceState:string;
    occurScenes:Array<Scene>
}




export interface DeviceSceneConflictCauseRule{
    deviceName:string;
    scenesConflcitStateCasueRule:Array<SceneConflictStateCauseRule>;
}

export interface SceneConflictStateCauseRule{
    sceneName:String;
    conflictCauseRuleStatistic:Array<CountStatesCauseRule>;
}

export interface CountStatesCauseRule{
    count:number;
    statesCauseRule:Array<StateCauseRule>;
}

export interface StateCauseRule{
    stateValue:string;
    stateName:string;
    causeRules:Array<RuleAndCause>;
}

export interface DeviceSceneFastChangeCauseRule{
    deviceName:string;
    scenesFastChangeCauseRule:Array<SceneFastChangeCauseRule>;//每个场景frequent change的情况
}

export interface SceneFastChangeCauseRule{
    sceneName:string;
    fastChangeStateCauseRuleCountList:Array<StateCauseRuleCount>;
}

export interface DeviceScenesFastChangeCauseRule{
    deviceName:string;
    scenesFastChangeCauseRules:Array<ScenesFastChangeCauseRule>;
}

export interface ScenesFastChangeCauseRule{
    sceneNames:Array<string>;
    fastChangeStateCauseRuleCountList:Array<StateCauseRuleCount>;//////////某段frenquent change 的states及相应rules
}

export interface StateCauseRuleCount{
    stateName:string;
    rulesCount:Array<RuleCount>; ////////////在这一段引起frequent change中的某一状态发生的规则及其发生次数
}

export interface RuleCount{
    causeRule:RuleAndCause;
    count:number;
}

export interface DeviceAllSceneConflictRule{
    deviceName:string;
    allCountStateCauseRuleSceneName:Array<CountStatesCauseRuleSceneName>;
}

export interface CountStatesCauseRuleSceneName{
    sceneNames:Array<string>;
    countStatesCauseRule:CountStatesCauseRule;
}

export interface DeviceAllSceneFastChangeRule{
    deviceName:string;
    allFastChangeStateCauseRuleCountSceneName:Array<StateCauseRuleCountSceneName>;
}

export interface StateCauseRuleCountSceneName{
    stateName:string;
    rulesCountSceneName:Array<RuleCountSceneName>;
}

export interface RuleCountSceneName{
    sceneNames:Array<string>;
    ruleCount:RuleCount;
}

export interface AllRuleAnalysisResult{
    scenes:Array<Scene>;
    rulesNeverTriggered:Array<RuleAndCause>;
    devicesAllSceneConflictRule:Array<DeviceAllSceneConflictRule>;
    devicesAllSceneFastChangeRule:Array<DeviceAllSceneFastChangeRule>;
    devicesSceneConflictCauseRule:Array<DeviceSceneConflictCauseRule>;
    devicesSceneFastChangeCauseRule:Array<DeviceSceneFastChangeCauseRule>;
    propertyAnalysis:Array<PropertyAnalysis>;
}

export interface RuleCauseRuleInput{
    causeRules:Array<Rule>,
    rules:Array<Rule>
}

export interface DeviceStatesCauseRules{
    deviceName:string;
    statesRules:Array<StateCauseRules>
}

export interface StateCauseRules{
    stateName:string;
    causeRules:Array<RuleAndCause>
}

export interface PropertyAnalysis{
    property:string;
    reachable:boolean;
    reachableScenes:Array<string>
}


/////静态分析结构
export interface StaticAnalysisResult{
    incorrectRules:Array<ErrorReason>;
    unusedRules:Array<ErrorReason>;
    redundantRules:Array<Array<Rule>>;
    incompleteness:Array<string>;
    usableRules:Array<Rule>;
    totalRules:Array<Rule>
}

export interface ErrorReason{
    rule:Rule;
    reason:string;
}

/////环境模型
export interface EnvironmentModel{
    devices:Array<DeviceDetail>;
    sensors:Array<SensorType>;
    biddables:Array<BiddableType>;
    deviceTypes:Array<DeviceType>;
    attributes:Array<Attribute>
}

export interface DeviceDetail{
    deviceName:string;
    location:string;
    deviceType:DeviceType;
    constructionNum:Number;
}

export interface Entity{
    name:string;
}

export interface DeviceType extends Entity{
    stateActionValues:Array<string[]>;
    stateEffects:Array<StateEffect>;
    deviceNumber:Number;
}

export interface StateEffect{
    state:string;
    effects:Array<string[]>
}

export interface BiddableType extends Entity{
    stateAttributeValues:Array<string[]>;
}

export interface SensorType extends Entity{
    attribute:string;
    style:string
}
/////静态分析结果输出结构
export interface EnvironmentStatic{
    environmentModel:EnvironmentModel;
    staticAnalysisResult:StaticAnalysisResult
}

/////生成仿真模型输入结构
export interface EnvironmentRule{
    environmentModel:EnvironmentModel;
    rules:Array<Rule>
}


export interface Scene{
    scenarioName:string;
    dataTimeValues:Array<DataTimeValue>;
    triggeredRulesName:Array<DataTimeValue>;
    cannotTriggeredRulesName:Array<string>;    
    deviceAnalysisResults:Array<DeviceAnalysisResult>
}



export interface SceneEnvironmentProperty{
    scenes:Array<Scene>;
    properties:Array<string>;
    rules:Array<Rule>;
    environmentModel:EnvironmentModel;
}

export interface DeviceAnalysisResult{
    deviceStateName: any;
    deviceName:string;
    conflictReasons:Array<ConflictReason>;
    jitterReasons:Array<JitterReason>
}

export interface ConflictReason{
    conflict:Conflict;
    causingRules:Array<CauseRule>
}

export interface JitterReason{
    jitter:Array<Number[]>;
    causingRules:Array<CauseRule>
}
export interface Conflict{
    time:Number;
    conflictValues:Array<Number>
}

export interface CauseRule{
    state:string;
    value:Number;
    stateCausingRules:Array<RuleNode>
}

export interface RuleNode{
    rule:Rule;
    preRules:Array<RuleNode>
}


export interface SceneEnvironmentRule{
    scene:Scene;
    environmentModel:EnvironmentModel;
    rules:Array<Rule>
}

/////综合原因，并计数
export interface CauseRulesCount{
    count:number;
    causingRules:Array<CauseRule>
    ////表示有哪些场景有这种情况
    exsitScenes:Array<string>
}
export interface DeviceAnalysisSyntheticResult{
    deviceName:string;
    jitterCauseRulesCounts:Array<CauseRulesCount>;
    conflictCauseRulesCounts:Array<CauseRulesCount>;
}

export interface DeviceCauseRuleConclusion{
    deviceName:string;
    causingRules:Array<CauseRule>
}


export interface ScenePropertyResult{
    scenes:Array<Scene>;
    propertyVerifyResults:Array<PropertyVerifyResult>;
}

export interface PropertyVerifyResult{
    property:string;
    reachable:boolean;
    reachableReasons:Array<ReachableReason>;
    hasCorrespondRule:boolean;
    correspondingRules:Array<Rule>
}

export interface ReachableReason{
    satisfyIntervalTime:Number[];
    scenarioName:string;
    causingRules:Array<CauseRule>;
}

export interface PropertyReachableSyntheticResult{
    property:string
    reachableCauseRulesCounts:Array<CauseRulesCount>
    reachable:boolean
    hasCorrespondRule:boolean;
    correspondingRules:Array<Rule>
}

export interface Attribute{
    content:string;
    attribute:string;
    delta:string
}

