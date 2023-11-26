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
export default class DoubleDoorTrapSkill extends mw.Script implements IBarrier {
	@mw.Property({ displayName: "需要放大的倍数" })
	worldScale: number = 10;
	private scaleObj: mw.GameObject;

	private skillTag: string[] = [];
	private trigger: mw.GameObject[] = [];

	private moveTime = 1000;
	private moveLength = 300;
	private deadInterval = [];
	onStart() {
		this.scaleObj = this.gameObject.getChildByName("skillDoorDouble");
		Event.addLocalListener("skill_doorget", (inTag: string) => {
			if (this.skillTag.includes(inTag)) {
				this.trigger.forEach((t) => {
					// t.enabled = (false);
					t.setCollision(mw.CollisionStatus.Off);
				});
				this.playGetAnimation();
			}
		});

	}
	playGetAnimation() {
		this.clearAllIntervall();
		this.setDoor(false);
	}
	setDoor(show: boolean) {
		let skillDoorDouble = this.gameObject.getChildByName("skillDoorDouble");
		let left = skillDoorDouble.getChildByName("skillDoor_Left");
		let right = skillDoorDouble.getChildByName("skillDoor_Right");
		this.showSkill(left, show);
		this.showSkill(right, show);
	}
	clearAllIntervall() {
		if (this.deadInterval && this.deadInterval.length > 0) {
			for (let i = 0; i < this.deadInterval.length; i++) {
				clearInterval(this.deadInterval[i]);
			}
			this.deadInterval = [];
		}
	}
	resetPos(obj: mw.GameObject) {
		let rePos = obj.localTransform.position;
		obj.localTransform.position = (new mw.Vector(rePos.x, rePos.y, 0));
	}
	showSkill(parObj: mw.GameObject, show: boolean) {
		let ball = parObj.getChildByName("skillBall");
		let left = parObj.getChildByName("base_1");
		let right = parObj.getChildByName("base_2");
		let ui = parObj.getChildByName("skillTypeUI");
		if (show) {
			ui.setVisibility(mw.PropertyStatus.On);
			ball.setVisibility(mw.PropertyStatus.On);
			this.resetPos(left);
			this.resetPos(right);
		} else {
			ui.setVisibility(mw.PropertyStatus.Off);
			ball.setVisibility(mw.PropertyStatus.Off);
			let leftpos = left.worldTransform.position;
			let rightpos = right.worldTransform.position;
			let time = 0;
			let num = this.moveTime / 10;
			let single = this.moveLength / num;
			let k = setInterval(() => {
				leftpos.z -= single;
				rightpos.z -= single;
				left.worldTransform.position = leftpos;
				right.worldTransform.position = rightpos;
				time++;
				if (time >= num) {
					clearInterval(k);
				}
			}, 10);
			this.deadInterval.push(k);
		}
	}
	setSkillType(types: Array<string>) {
		if (types.length < 2) {
			console.log("双重门设置异常");
		} else {
			if (!this.scaleObj) this.scaleObj = this.gameObject.getChildByName("skillDoorDouble");
			let left = types[0];
			let right = types[1];
			let leftObj = this.scaleObj.getChildByName("skillDoor_Left");
			let rightObj = this.scaleObj.getChildByName("skillDoor_Right");
			if (left && leftObj) {
				this.setSkillName(leftObj, left);
			}
			if (right && rightObj) {
				this.setSkillName(rightObj, right);
			}
		}
	}
	setSkillName(obj: mw.GameObject, type: string) {
		let info = type.split("_");
		let txtColor = info[0];
		let typeName = info[1];
		let ballGuid = info[2];
		let showname = info[3];
		//////////////
		let ui = obj.getChildByName("skillTypeUI") as mw.UIWidget;
		let tag = ui.getTargetUIWidget()
		let txt = tag.rootContent.getChildByName("mText_SkillName") as mw.TextBlock;
		if (txt) {
			txt.text = (showname);
			txt.setFontColorByHex(txtColor);
		}
		ui.refresh();

		let ball = obj.getChildByName("skillBall") as mw.Model;
		ball.setMaterial(ballGuid);

		let trigger = obj.getChildByName("boxTrigger");
		if (!trigger) return;
		this.trigger.push(trigger);

		let tagStr = typeName + "_" + obj.gameObjectId;
		trigger.tag = tagStr;
		this.skillTag.push(tagStr);
		trigger.setCollision(mw.CollisionStatus.QueryOnly);
		// trigger.enabled = (true);
	}
	resetPrefab() {
		this.clearAllIntervall();
		this.gameObject.setVisibility(mw.PropertyStatus.On);
		this.trigger.forEach((t) => {
			// t.enabled = (true);
			t.setCollision(mw.CollisionStatus.QueryOnly);
		})
		this.setDoor(true);
	};
	destroyPrefab() {
		// this.gameObject.visibility=(mw.PropertyStatus.Off);
	};
	space() {
		// if (this.gameObject && this.scaleObj) {
		// 	this.timeBroadenObj(this.scaleObj, this.worldTransform.scale);
		// }
	};
	time?: Function;
	power?: Function;
	reality?: Function;
	mind?: Function;

}
