import TrapBase from "../../../../Common/Script/TrapBase";
import { TrapUtil } from "../../../../Common/Script/TrapUtil";

/**
 * 大石门机关，人物碰到就要死亡
 * 不能被力量宝石摧毁
 */
export default class WallTrapSkill extends TrapBase {
	public getTrapObjNameTwo(): string {
		return null;

	}
	public getTrapObjName(): string {
		return "arched"
	}
	public getScaleObjName(): string {
		return "arched";
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
	protected onStart(): void {
		super.onStart();
		this.initTrap();
	}

	space(worldScale: number) {
		// 空间宝石，根据缩放值缩放
		if (this.gameObject && this.scaleObj) {
			this.clock = TrapUtil.scaleGameObject(this.scaleObj, worldScale, 1000);
		}
	};

	resetPrefab() {
		// 恢复机关状态，再展示机关，恢复缩放状态
		clearInterval(this.clock);
		if (this.scaleObj) {
			this.scaleObj.worldTransform.scale = new mw.Vector(1.6, 1.6, 1.3);
		}
		this.initTrap();
	};


}
