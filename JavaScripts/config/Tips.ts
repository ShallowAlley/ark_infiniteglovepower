import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","tips"],["","Language"],[1001,"Tips_1"],[1002,"Tips_2"],[1003,"Tips_3"],[1004,"Tips_4"],[1005,"Tips_5"],[1006,"Tips_6"],[1007,"Tips_7"],[1008,"Tips_8"],[1009,"Tips_9"],[1010,"Tips_10"],[1011,"Tips_11"]];
export interface ITipsElement extends IElementBase{
 	/**ID*/
	id:number
	/**提示*/
	tips:string
 } 
export class TipsConfig extends ConfigBase<ITipsElement>{
	constructor(){
		super(EXCELDATA);
	}

}