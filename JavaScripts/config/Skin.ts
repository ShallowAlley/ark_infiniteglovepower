import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Guid","Quality","Experience1","Speed1","Gold1","Experience2","Speed2","Gold2","Experience","Icon"],["","Language","","","","","","","","","",""],[10009,"Skin_Name_10009",["1C4C390748495E5E819021947D0A3FC4","5DFB174C4EF9A629227048AEF01CCB3A","EA84C0274C32C479AEF2DCAFA333ED44","023BD9904B3A08C662E19C8B04A164E8","ADE7442045E2B25DA5D6949D3A48EF12","01963F2543DC0E8C6ADE828F4B36A3BA"],1,0,0,0.01,0,0,0.05,500,"91193"]];
export interface ISkinElement extends IElementBase{
 	/**ID*/
	ID:number
	/**皮肤名称*/
	Name:string
	/**挂载Guid*/
	Guid:Array<string>
	/**皮肤品质
1=普通
2=稀有
3=史诗
4=传说*/
	Quality:number
	/**经验加成1*/
	Experience1:number
	/**速度加成1*/
	Speed1:number
	/**金币加成1*/
	Gold1:number
	/**经验加成2*/
	Experience2:number
	/**速度加成2*/
	Speed2:number
	/**金币加成2*/
	Gold2:number
	/**被合成基础经验*/
	Experience:number
	/**图标*/
	Icon:string
 } 
export class SkinConfig extends ConfigBase<ISkinElement>{
	constructor(){
		super(EXCELDATA);
	}

}