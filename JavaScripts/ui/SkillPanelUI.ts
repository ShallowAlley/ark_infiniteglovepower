import { consts } from ".././consts/ProLoadGuid";
import LevelModuleC from ".././modules/level/module/LevelModuleC";
import { SkillType } from ".././modules/skill/SkillDataHelper";
import { SkillModule_C } from ".././modules/skill/SkillModule_C";
import SkillPanelUI_Generate from ".././ui-generate/SkillPanelUI_generate";
import { SoundConfigID, SoundPlay } from ".././utils/SoundPlay";

export default class SkillPanelUI extends SkillPanelUI_Generate {
	player: mw.Player;
	private isWin: boolean = true;
	/** 
	* 构造UI文件成功后，在合适的时机最先初始化一次 
	*/
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		this.btn_add1.onClicked.add(() => {
			this.skillPointUse(SkillType.Power);
			this.sendMsg();
		});
		this.btn_add2.onClicked.add(() => {
			this.skillPointUse(SkillType.Space);
			this.sendMsg();
		});
		this.btn_add3.onClicked.add(() => {
			this.skillPointUse(SkillType.Reality);
			this.sendMsg();
		});
		this.btn_add4.onClicked.add(() => {
			this.skillPointUse(SkillType.Time);
			this.sendMsg();
		});
		this.btn_add5.onClicked.add(() => {
			this.skillPointUse(SkillType.Heart);
			this.sendMsg();
		});

		this.btn_start.onClicked.add(() => {
			this.playAni(false)

		});

		if (!this.player) {
			this.player = Player.localPlayer;
		}
	}

	/** 
	* 构造UI文件成功后，onStart之后 
	* 对于UI的根节点的添加操作，进行调用
	* 注意：该事件可能会多次调用
	*/
	protected onAdded() {
	}

	/** 
	 * 构造UI文件成功后，onAdded之后
	 * 对于UI的根节点的移除操作，进行调用
	 * 注意：该事件可能会多次调用
	 */
	protected onRemoved() {
	}

	/** 
	* 构造UI文件成功后，UI对象再被销毁时调用 
	* 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
	*/
	protected onDestroy() {
	}

	/**
	* 每一帧调用
	* 通过canUpdate可以开启关闭调用
	* dt 两帧调用的时间差，毫秒
	*/
	//protected onUpdate(dt :number) {
	//}
	/**
		 * 埋点
		 */
	sendMsg() {
		let mdLevelC = ModuleService.getModule(LevelModuleC);
		mdLevelC.addSkilNum();
	}

	/**技能加点 */
	skillPointUse(type: SkillType) {
		ModuleService.getModule(SkillModule_C).net_SkillLvUpPoint(type);
	}
	/**
	 * 技能加点结果
	 * @param type 技能类型
	 * @param haveNum 技能点剩余
	 * @param useNum 已加点数量
	 */
	skillAddPoint(type: SkillType, haveNum: number, useNum: number, lv: number) {
		let index = type + 1;
		this[`txt_skillNum${index}`].text = (`X${haveNum}`);
		this[`pro_skill${index}`].currentValue = (useNum);
		if (haveNum == 0 || lv == consts.skillMaxLv) {
			this[`btn_add${index}`].visibility = (mw.SlateVisibility.Hidden);
		}
	}
	/**
	 * 技能升级
	 * @param type 技能类型 
	 * @param num 升级后的等级
	 */
	skillLvUp(type: SkillType, num: number) {
		let index = type + 1;
		this[`pro_skill${index}`].sliderMaxValue = (num + 1);
		if (num >= consts.skillMaxLv) {
			this[`txt_skillLv${index}`].text = (`Max`);
			this[`pro_skill${index}`].currentValue = (num + 1);
		} else {
			this[`txt_skillLv${index}`].text = (`Lv${num}`);
			this[`pro_skill${index}`].currentValue = (0);
		}
		if (num == consts.skillMaxLv) {
			this[`btn_add${index}`].visibility = (mw.SlateVisibility.Hidden);
		}
	}
	onShow(isWin: boolean): void {
		this.isWin = isWin;
		let skillModule = ModuleService.getModule(SkillModule_C);
		let havePoint = skillModule.net_GetSkillHavePoints();
		let lvList = skillModule.net_GetSKillLvList();
		let usePoint = skillModule.net_GetSkillUsePoints();
		this.initSkillLvUI(lvList);
		this.initSkillProUI(usePoint);
		this.initHavePoints(havePoint);
		this.judgeAddBtn(havePoint, lvList);
		this.judgeProMax(lvList);
		this.playAni(true);
	}
	judgeAddBtn(havePoints: number[], lvList: number[]) {
		for (let i = 0; i < havePoints.length; i++) {
			let haveNum = havePoints[i];
			let lv = lvList[i];
			if (this[`btn_add${i + 1}`]) {
				if (haveNum == 0 || lv >= consts.skillMaxLv) {
					this[`btn_add${i + 1}`].visibility = (mw.SlateVisibility.Hidden);
				} else {
					this[`btn_add${i + 1}`].visibility = (mw.SlateVisibility.Visible);
				}
			}
		}
	}
	judgeProMax(lvList: number[]) {
		for (let i = 0; i < lvList.length; i++) {
			if (this[`pro_skill${i + 1}`]) {
				this[`pro_skill${i + 1}`].sliderMaxValue = (lvList[i] + 1);
				if (lvList[i] >= consts.skillMaxLv) {
					this[`pro_skill${i + 1}`].currentValue = (lvList[i] + 1);
				}
			}
		}
	}
	playAni(isIn: boolean) {
		SoundPlay.ins.play(SoundConfigID.UI_ENTER_END);
		if (!isIn) {
			let btn = this.canvas_BtnContinue;
			let btnStart = -335;
			let btnEnd = 0;
			let btnMovePos = new mw.Vector2(0, -175);
			const btnMoveAni = new mw.Tween({ hight: btnStart }).to({ hight: btnEnd }, 500).onUpdate((object) => {
				btnMovePos.x = size.x * object.hight;
				btn.position = (leftMovePos);
			}).onComplete(() => {
			});
			btnMoveAni.start();
		} else {
			let btn = this.canvas_BtnContinue;
			btn.position = (new mw.Vector2(-335, -175));
		}
		const size = mw.WindowUtil.getViewportSize();
		let slot = this.canvas_center;
		let start = isIn ? -1 : 0;
		let end = isIn ? 0 : 1;
		let movePos = new mw.Vector2(0, 0);
		if (isIn) this.canvas_center.visibility = (mw.SlateVisibility.Hidden);
		movePos.x = size.x * start;
		movePos.y = 0;
		slot.position = (movePos);
		const moveAni = new mw.Tween({ hight: start }).to({ hight: end }, 500).onUpdate((object) => {
			movePos.x = size.x * object.hight;
			movePos.y = 0;
			slot.position = (movePos);
		}).onComplete(() => {
			if (isIn) {
			} else {
				this.hide();
				Camera.currentCamera.localTransform = new mw.Transform(new mw.Vector(0, 30, 400), new mw.Rotation(0, -30, -10), mw.Vector.one)
				Camera.currentCamera.springArm.length = 400
				if (this.isWin) {
					ModuleService.getModule(LevelModuleC).passGame();
				} else {
					ModuleService.getModule(LevelModuleC).resetGame();
				}
			}
		}).onStart(() => {
			this.canvas_center.visibility = (mw.SlateVisibility.Visible);
		});
		moveAni.start();
		let leftSlot = this.canvas_left;
		let leftStart = isIn ? -200 : 0;
		let leftEnd = isIn ? 0 : -200;
		let leftMovePos = new mw.Vector2(0, 0);
		const leftMoveAni = new mw.Tween({ hight: leftStart }).to({ hight: leftEnd }, 500).onUpdate((object) => {
			leftMovePos.x = size.x * object.hight;
			leftMovePos.y = 0;
			leftSlot.position = (leftMovePos);
		}).onComplete(() => {

		});
		leftMoveAni.start();
	}
	hide() {
		mw.UIService.hide(SkillPanelUI);
	}
	/**设置拥有技能点UI 
	 * @param havePoints 拥有的技能点数组
	 */
	initHavePoints(havePoints: Array<number>) {
		for (let i = 0; i < havePoints.length; i++) {
			if (this[`txt_skillNum${i + 1}`]) {
				this[`txt_skillNum${i + 1}`].text = (`X${havePoints[i]}`);
			}
		}
	}
	/**
	 * 设置技能等级UI
	 * @param lvList 等级列表
	 */
	initSkillLvUI(lvList: Array<number>) {
		for (let i = 0; i < lvList.length; i++) {
			if (this[`txt_skillLv${i + 1}`]) {
				if (lvList[i] >= consts.skillMaxLv) {
					this[`txt_skillLv${i + 1}`].text = (`Max`);
				} else {
					this[`txt_skillLv${i + 1}`].text = (`Lv${lvList[i]}`);
				}
			}
			if (this[`pro_skill${i + 1}`]) {
				this[`pro_skill${i + 1}`].sliderMaxValue = (lvList[i] + 1);
			}
		}
	}
	/**
	 * 设置技能加点进度
	 * @param usePoint 技能加点列表
	 */
	initSkillProUI(usePoint: Array<number>) {
		// 设置按钮显示
		for (let i = 0; i < usePoint.length; i++) {
			if (this[`pro_skill${i + 1}`]) {
				this[`pro_skill${i + 1}`].currentValue = (usePoint[i]);
				this[`pro_skill${i + 1}`].visibility = (mw.SlateVisibility.SelfHitTestInvisible);
			}
		}
	}

	/**
	 * 设置不显示时触发
	 */
	//protected onHide() {
	//}

}
