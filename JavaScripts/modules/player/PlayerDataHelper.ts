

export class PlayerDataHelper extends Subdata {

	@Decorator.persistence()
	public skillDoor: boolean[] = [false, false, false, false, false, false];
	protected initDefaultData(): void {
	}
	protected onDataInit(): void {

	}
	getSkillDoor() {
		return this.skillDoor;
	}

}
