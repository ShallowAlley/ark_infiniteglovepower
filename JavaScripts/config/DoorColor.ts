import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","textColor","skillName","skillTexture","name"],["","","","","Language"],[101,"5401C2FF","Power","94242","DoorColor_1"],[102,"003CAEFF","Space","94243","DoorColor_2"],[103,"C2010FFF","Reality","94245","DoorColor_3"],[104,"005701FF","Time","94247","DoorColor_4"],[105,"CF8700FF","Mind","94257","DoorColor_5"],[106,"CF1D00FF","Soul","94251","DoorColor_6"]];
export interface IDoorColorElement extends IElementBase{
 	/**ID*/
	ID:number
	/**技能门文字颜色*/
	textColor:string
	/**技能英文名*/
	skillName:string
	/**技能门材质*/
	skillTexture:string
	/**技能名称*/
	name:string
 } 
export class DoorColorConfig extends ConfigBase<IDoorColorElement>{
	constructor(){
		super(EXCELDATA);
	}

}