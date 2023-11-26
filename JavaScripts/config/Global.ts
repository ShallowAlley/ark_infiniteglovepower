import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","des","parameter1","parameter2","parameter3"],["","tag","tag","tag","tag"],[101,"关卡终点坐标",0,[8600,0,70],null],[102,"最后一个机关到关卡终点的距离",400,null,null],[103,"出生点到第一个机关距离",400,null,null],[104,"局内摄像参数",0,null,null],[105,"不同机关类型之间的距离",300,null,null],[106,"技能门之前的距离",400,null,null],[107,"技能门之后的距离",400,null,null]];
export interface IGlobalElement extends IElementBase{
 	/**变量ID*/
	id:number
	/**描述*/
	des:string
	/**参数1*/
	parameter1:number
	/**参数2*/
	parameter2:Array<number>
	/**参数3*/
	parameter3:Array<Array<number>>
 } 
export class GlobalConfig extends ConfigBase<IGlobalElement>{
	constructor(){
		super(EXCELDATA);
	}

}