import TrapBase from "../../../../Common/Script/TrapBase";

/**
 * 陷进墙，中间洞
 */
export default class WallTrapSkill extends TrapBase {
	public getTrapObjNameTwo(): string {
		return null;
	}
	public getScaleObjName(): string {
		return null;
	}
	public getScaleObjNameDown(): string {

		return null;
	}
	public destroyTrap(name?: string) {

	}
	public canDestroy(): boolean {
		return false
	}

	public isCollisionDead(): boolean {
		return true
	}

	public getTrapObjName(): string {
		return "holeChild"
	}
	protected onStart(): void {
		super.onStart();
		this.initTrap();
	}
	resetPrefab() {
		this.initTrap();
	}

}
