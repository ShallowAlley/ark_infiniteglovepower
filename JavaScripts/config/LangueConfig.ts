import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_E"],["","Key|ReadByName","MainLanguage","ChildLanguage"],[1,"UI_Loading_mMsg_txt","Loading...","正在进入游戏……"],[2,"UI_EndUI_LOSE_Txt_Lose","FAILED","失败"],[3,"UI_EndUI_LOSE_Text_Start","Retry","重来"],[4,"UI_EndUI_LOSE_Text_lvup","Upgrade","升级技能"],[5,"UI_EndUI_WIN_Txt_Win","VICTORY","胜利"],[6,"UI_EnterLoading_MWTextBlock_1","Loading...","加载关卡中......"],[7,"UI_EnterLoading_mTxtTips","Reach the end to obtain fragments of Infinity Stones!","到达终点，会有宝石碎片奖励哦"],[8,"UI_HallUI_txt_Start","Start","开始"],[9,"UI_RewardsUI_Text_Start","Continue","继续"],[10,"UI_RewardsUI_Txt_Tip_Reward","Select a skill point","选择一个技能点作为奖励吧"],[11,"DoorColor_1","Power","力量"],[12,"DoorColor_2","Space","空间"],[13,"DoorColor_3","Reality","现实"],[14,"DoorColor_4","Time","时间"],[15,"DoorColor_5","Mind","心灵"],[16,"DoorColor_6","Soul","灵魂"],[17,"Tips_1","Power Stone can destroy all red traps","力量宝石能摧毁所有的小型红色机关哦"],[18,"Tips_2","Collect 5 other stones in one level to unlock Soul Stone","在一关内集齐五颗宝石可以解锁灵魂宝石"],[19,"Tips_3","Time Stone can slow traps","机关动的太快，试试时间宝石吧"],[20,"Tips_4","Mind Stone enables flying, evading most traps","用心灵宝石飞起来能轻松躲避一些低矮机关"],[21,"Tips_5","Space Stone can widen the path","空间宝石能扩宽路面哦"],[22,"Tips_6","Reality Stone has chances to disable traps","现实宝石有几率让机关变为安全的蓝色"],[23,"Tips_7","Upgrade infinity stones with fragments to help Thanos!","用宝石碎片升级宝石让灭霸变得更强大吧"],[24,"Tips_8","Wanna take a Snap? Collect all six Stones in one level!","想打响指吗，在一关里集齐六颗宝石吧"],[25,"Tips_9","Effects of same Stones cannot stack","在一关内获得相同的宝石效果不会叠加哦"],[26,"Tips_10","Pass Gate of Stones to obtain Stones","穿过宝石门可以获得宝石能力"],[27,"Tips_11","Watch out for traps","注意躲避机关"]];
export interface ILangueConfigElement extends IElementBase{
 	/**id*/
	ID:number
	/**名字索引*/
	Name:string
	/**英文*/
	Value:string
 } 
export class LangueConfigConfig extends ConfigBase<ILangueConfigElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**正在进入游戏……*/
	get UI_Loading_mMsg_txt():ILangueConfigElement{return this.getElement(1)};
	/**失败*/
	get UI_EndUI_LOSE_Txt_Lose():ILangueConfigElement{return this.getElement(2)};
	/**重来*/
	get UI_EndUI_LOSE_Text_Start():ILangueConfigElement{return this.getElement(3)};
	/**升级技能*/
	get UI_EndUI_LOSE_Text_lvup():ILangueConfigElement{return this.getElement(4)};
	/**胜利*/
	get UI_EndUI_WIN_Txt_Win():ILangueConfigElement{return this.getElement(5)};
	/**加载关卡中......*/
	get UI_EnterLoading_MWTextBlock_1():ILangueConfigElement{return this.getElement(6)};
	/**到达终点，会有宝石碎片奖励哦*/
	get UI_EnterLoading_mTxtTips():ILangueConfigElement{return this.getElement(7)};
	/**开始*/
	get UI_HallUI_txt_Start():ILangueConfigElement{return this.getElement(8)};
	/**继续*/
	get UI_RewardsUI_Text_Start():ILangueConfigElement{return this.getElement(9)};
	/**选择一个技能点作为奖励吧*/
	get UI_RewardsUI_Txt_Tip_Reward():ILangueConfigElement{return this.getElement(10)};
	/**力量*/
	get DoorColor_1():ILangueConfigElement{return this.getElement(11)};
	/**空间*/
	get DoorColor_2():ILangueConfigElement{return this.getElement(12)};
	/**现实*/
	get DoorColor_3():ILangueConfigElement{return this.getElement(13)};
	/**时间*/
	get DoorColor_4():ILangueConfigElement{return this.getElement(14)};
	/**心灵*/
	get DoorColor_5():ILangueConfigElement{return this.getElement(15)};
	/**灵魂*/
	get DoorColor_6():ILangueConfigElement{return this.getElement(16)};
	/**力量宝石能摧毁所有的小型红色机关哦*/
	get Tips_1():ILangueConfigElement{return this.getElement(17)};
	/**在一关内集齐五颗宝石可以解锁灵魂宝石*/
	get Tips_2():ILangueConfigElement{return this.getElement(18)};
	/**机关动的太快，试试时间宝石吧*/
	get Tips_3():ILangueConfigElement{return this.getElement(19)};
	/**用心灵宝石飞起来能轻松躲避一些低矮机关*/
	get Tips_4():ILangueConfigElement{return this.getElement(20)};
	/**空间宝石能扩宽路面哦*/
	get Tips_5():ILangueConfigElement{return this.getElement(21)};
	/**现实宝石有几率让机关变为安全的蓝色*/
	get Tips_6():ILangueConfigElement{return this.getElement(22)};
	/**用宝石碎片升级宝石让灭霸变得更强大吧*/
	get Tips_7():ILangueConfigElement{return this.getElement(23)};
	/**想打响指吗，在一关里集齐六颗宝石吧*/
	get Tips_8():ILangueConfigElement{return this.getElement(24)};
	/**在一关内获得相同的宝石效果不会叠加哦*/
	get Tips_9():ILangueConfigElement{return this.getElement(25)};
	/**穿过宝石门可以获得宝石能力*/
	get Tips_10():ILangueConfigElement{return this.getElement(26)};
	/**注意躲避机关*/
	get Tips_11():ILangueConfigElement{return this.getElement(27)};

}