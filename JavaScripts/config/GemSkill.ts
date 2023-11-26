import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","skillValue","upgradeCost","pointID","des","effect"],["","","","","",""],[1,[2,3,4,5,6],[0,2,3,4,5],0,"力量：数值代表当前等级的球的数目","197462"],[2,[1.3,1.4,1.6,1.8,2],[0,2,3,4,5],0,"空间：数值代表路面扩宽和部分机关放大的倍数","197467"],[3,[0.45,0.55,0.65,0.75,0.9],[0,2,3,4,5],0,"现实：数值代表单个机关无效化的概率","197464"],[4,[0.45,0.35,0.25,0.15,0.05],[0,2,3,4,5],0,"时间：数值×基础速度为新速度","197469"],[5,[0],[0],0,"心灵","197470"],[6,[0],[0],0,"灵魂","197460"]];
export interface IGemSkillElement extends IElementBase{
 	/**ID*/
	ID:number
	/**技能数值（等级|对应技能数值）*/
	skillValue:Array<number>
	/**升级技能点消耗（等级|消耗技能点）*/
	upgradeCost:Array<number>
	/**技能升级匹配技能点编号*/
	pointID:number
	/**技能效果描述*/
	des:string
	/**特效*/
	effect:string
 } 
export class GemSkillConfig extends ConfigBase<IGemSkillElement>{
	constructor(){
		super(EXCELDATA);
	}

}