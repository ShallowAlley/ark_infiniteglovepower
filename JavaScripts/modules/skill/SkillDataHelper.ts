import { consts } from "../../consts/ProLoadGuid";
export enum SkillType {
	Power,
	Space,
	Reality,
	Time,
	Heart,
	Soul
}

export class SkillDataHelper extends Subdata {

	/**技能等级列表 力量-空间-现实-时间-心灵 */
	@Decorator.persistence()
	skillLvList: Array<number> = [];
	/**各技能当前技能点列表 */
	@Decorator.persistence()
	skillUsePointsList: Array<number> = [];
	/**技能未使用技能点列表 */
	@Decorator.persistence()
	skillHavePointsList: Array<number> = [];
	/**是否拥有灵魂宝石 */
	@Decorator.persistence()
	haveSoul: boolean = false;

	/**已获取过的技能宝石列表 */
	skillGetList: Array<boolean> = [];
	protected initDefaultData(): void {
		if (!this.skillLvList || this.skillLvList.length <= 0) {
			this.skillLvList = [1, 1, 1, 1, 1];
		}
		if (!this.skillUsePointsList || this.skillUsePointsList.length <= 0) {
			this.skillUsePointsList = [0, 0, 0, 0, 0];
		}
		if (!this.skillHavePointsList || this.skillHavePointsList.length <= 0) {
			this.skillHavePointsList = [0, 0, 0, 0, 0];
		}
		if (!this.skillGetList || this.skillGetList.length <= 0) {
			this.skillGetList = [false, false, false, false, false];
		}
		this.save(false);
	}
	protected onDataInit(): void {
		if (!this.skillGetList || this.skillGetList.length <= 0) {
			this.skillGetList = [false, false, false, false, false];
		}
		this.save(false);
	}
	/**
	 * 获得某技能的技能点
	 * @param type 技能类型
	 * @param num 获得的技术点数量
	 */
	skillHavePointGet(type: SkillType, num: number) {
		this.skillHavePointsList[type] += num;
		this.save(false);
	}
	/**
	 * 技能花费技能点
	 * @param type 技能类型
	 */
	skillUsePoint(type: SkillType) {
		this.skillHavePointsList[type] -= 1;
		this.skillUsePointsList[type] += 1;
		if (this.skillUsePointsList[type] >= 5) {
			this.skillUsePointsList[type] = 5;
		}
		this.save(false);
	}
	/**
	 * 技能升级
	 * @param type 技能类型 
	 */
	skillLvUp(type: SkillType) {
		this.skillLvList[type] += 1;
		this.skillUsePointsList[type] = 0;
		if (this.skillLvList[type] > consts.skillMaxLv) {
			this.skillLvList[type] = consts.skillMaxLv;
		}
		this.save(false);
	}
	/**
	 * 获取某技能的当前使用技能点
	 * @param type 技能类型
	 */
	getSkillUsePointByType(type: SkillType): number {
		return this.skillUsePointsList[type];
	}
	/**
	 * 获取某技能的当前等级
	 * @param type 技能类型
	 */
	getSkillLvByType(type: SkillType) {
		return this.skillLvList[type];
	}
	/**
	 * 获取某类型的技能点数量
	 * @param type 技能点类型
	 * @returns 数量
	 */
	getSkillHaveByType(type: SkillType) {
		return this.skillHavePointsList[type];
	}
	/**返回玩家等级列表 */
	getSkillLvList() {
		return this.skillLvList;
	}
	/**返回技能拥有的技能点 */
	getSkillHavePoint() {
		return this.skillHavePointsList;
	}
	/**返回技能使用的技能点 */
	getSkillUsePoint() {
		return this.skillUsePointsList;
	}
	/**设置技能宝石获取表 */
	setSkillGem(type: SkillType) {
		this.skillGetList[type] = true;
		this.save(false);
	}
	/**获得技能宝石表 */
	getSkillGem() {
		return this.skillGetList;
	}
}
