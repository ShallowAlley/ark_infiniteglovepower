export interface IBarrier {

	/**恢复 */
	resetPrefab: Function;
	/**毁灭 */
	destroyPrefab: Function;
	/**空间 */
	space?: Function;
	/**时间 */
	time?: Function;
	/**力量 */
	power?: Function;
	/**现实 */
	reality?: Function;
	/**冥想 */
	mind?: Function;
	/**技能门类型列表 --传数组*/
	setSkillType?: (types: Array<string>) => void
}
export default class WallDoorTrapSkill extends mw.Script implements IBarrier {
	@mw.Property({ displayName: "需要放大的倍数" })
	worldScale: number = 10;
	private skillTag = "";
	private trigger: mw.GameObject;
	private deadInterval = null;
	private moveTime = 1000;
	private moveLength = 300;
	onStart() {
		// this.setWall(true)
		this.showSkill(true);
		Event.addLocalListener("skill_doorget", (inTag) => {
			if (this.skillTag == inTag) {
				// this.trigger.enabled = (false);
				this.trigger.setCollision(mw.CollisionStatus.Off);
				this.playGetAnimation();
			}
		});

	}
	playGetAnimation() {
		if (this.deadInterval) clearInterval(this.deadInterval);
		this.showSkill(false);
	}
	resetPos(obj: mw.GameObject) {
		let rePos = obj.localTransform.position;
		obj.localTransform.position = (new mw.Vector(rePos.x, rePos.y, 0));
	}
	showSkill(show: boolean) {
		if (this.deadInterval) clearInterval(this.deadInterval);
		this.setWall(show);
		let ball = this.gameObject.getChildByName("skillBall");
		let left = this.gameObject.getChildByName("base_1");
		let right = this.gameObject.getChildByName("base_2");
		let ui = this.gameObject.getChildByName("skillTypeUI");
		let wall1 = this.gameObject.getChildByName("wall_1");
		let wall2 = this.gameObject.getChildByName("wall_2");
		if (show) {
			ui.setVisibility(mw.PropertyStatus.On);
			ball.setVisibility(mw.PropertyStatus.On);
			this.resetPos(left);
			this.resetPos(right);
			this.resetPos(wall1);
			this.resetPos(wall2);
		} else {
			ui.setVisibility(mw.PropertyStatus.Off);
			ball.setVisibility(mw.PropertyStatus.Off);
			let leftpos = left.worldTransform.position;
			let rightpos = right.worldTransform.position;
			let wall1pos = wall1.worldTransform.position;
			let wall2pos = wall2.worldTransform.position;
			let time = 0;
			let num = this.moveTime / 10;
			let single = this.moveLength / num;
			this.deadInterval = setInterval(() => {
				leftpos.z -= single;
				rightpos.z -= single;
				wall1pos.z -= single;
				wall2pos.z -= single;

				left.worldTransform.position = leftpos;
				right.worldTransform.position = rightpos;
				wall1.worldTransform.position = wall1pos;
				wall2.worldTransform.position = wall2pos;
				time++;
				if (time >= num) {
					clearInterval(this.deadInterval);
				}
			}, 10);
		}
	}
	setWall(show: boolean) {
		let wall1 = this.gameObject.getChildByName("wall_1");
		let wall2 = this.gameObject.getChildByName("wall_2");
		if (wall1) {
			show ? wall1.tag = "dead" : wall1.tag = "";
			show ? wall1.setCollision(mw.PropertyStatus.On) : wall1.setCollision(mw.PropertyStatus.Off);
		}
		if (wall2) {
			show ? wall2.tag = "dead" : wall2.tag = "";
			show ? wall2.setCollision(mw.PropertyStatus.On) : wall2.setCollision(mw.PropertyStatus.Off);
		}
	}
	setSkillType(types: Array<string>) {
		this.setSkillName(this.gameObject, types[0])
	}
	setSkillName(obj: mw.GameObject, type: string) {
		let info = type.split("_");
		let txtColor = info[0];
		let typeName = info[1];
		let ballGuid = info[2];
		let showName = info[3];
		//////////////
		let ui = obj.getChildByName("skillTypeUI") as mw.UIWidget;
		let tag = ui.getTargetUIWidget()
		let txt = tag.rootContent.getChildByName("mText_SkillName") as mw.TextBlock;
		if (txt) {
			txt.text = (showName);
			txt.setFontColorByHex(txtColor);
		}
		ui.refresh();

		let ball = obj.getChildByName("skillBall") as mw.Model;
		ball.setMaterial(ballGuid);

		let trigger = obj.getChildByName("boxTrigger");
		if (!trigger) return;
		this.trigger = trigger;
		let tagStr = typeName + "_" + obj.gameObjectId;
		trigger.tag = tagStr;
		this.skillTag = tagStr
		this.trigger.setCollision(mw.CollisionStatus.QueryOnly);
	}
	resetPrefab() {
		this.gameObject.setVisibility(mw.PropertyStatus.On);
		this.trigger.setCollision(mw.CollisionStatus.QueryOnly);
		this.showSkill(true);
	};
	destroyPrefab() {
		// this.gameObject.visibility=(mw.PropertyStatus.Off);
	};
	space() {
		// 
	};
	time?: Function;
	power?: Function;
	reality?: Function;
	mind?: Function;

}
