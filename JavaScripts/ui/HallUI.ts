import { C2CEvent, consts } from ".././consts/ProLoadGuid";
import LevelModuleC from ".././modules/level/module/LevelModuleC";
import { SkillType } from ".././modules/skill/SkillDataHelper";
import { SkillModule_C } from ".././modules/skill/SkillModule_C";
import SkillGetUI from "./SkillGetUI";
import HallUI_Generate from ".././ui-generate/HallUI_generate";
import { SoundConfigID, SoundPlay } from ".././utils/SoundPlay";
import Tools from ".././utils/Tools";

export default class HallUI extends HallUI_Generate {

	player: mw.Player;
	private soundOpen: boolean = true;
	private skillGetUI: SkillGetUI;

	private movePos: mw.Vector;
	//图片资源 遵循技能宝石设定枚举
	private imgUIList = [116256, 116243, 116254, 116244, 116250, 116262];
	private iswalking = false;

	/** 
	* 构造UI文件成功后，在合适的时机最先初始化一次 
	*/
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		//this.initButtons();

		// mw.instance.showPanel(SkillGetUI);
		mw.UIService.show(SkillGetUI);
		this.skillGetUI = mw.UIService.getUI(SkillGetUI);
		Player.localPlayer.character.movementEnabled = false;
		this.movePos = new mw.Vector(0);
		// this.canvas_Skill.visibility=(mw.SlateVisibility.Hidden);
		let character = Player.localPlayer.character;
		if (!this.player) {
			this.player = Player.localPlayer;
		}
		this.moveControl.onInputDir.add((pos: mw.Vector2) => {
			let newpos = pos.clone().multiply(100);
			this.movePos.x = newpos.y;
			this.movePos.y = newpos.x;
			if (!this.iswalking && character.movementMode == mw.MovementMode.Walk
				&& character.isMoving) {
				this.iswalking = true;
			}

			character.addMovement(this.movePos);
			// this.moveImage2.setRenderTransformAngle((new mw.Vector(pos.x, -pos.y, 0)).toRotation().z);
		});
		this.moveControl.onJoyStickDown.add(() => {
			let moduleC = ModuleService.getModule(LevelModuleC);
			if (moduleC.getData().getDate().sendMsgStep[0] == false) {
				// 核心循环埋点移动
				ModuleService.getModule(LevelModuleC).setMsgStep(1);
			}
			if (!ModuleService.getModule(SkillModule_C).useMind) {
				SoundPlay.ins.play(SoundConfigID.WALK);
			}

		});
		Event.addLocalListener(C2CEvent.HALLUI_PLAYERSTOP, () => {
			Player.localPlayer.character.movementEnabled = false;
			this.iswalking = false;
			SoundPlay.ins.stop(SoundConfigID.WALK);
		})
		this.moveControl.onJoyStickUp.add(() => {
			this.iswalking = false;
			SoundPlay.ins.stop(SoundConfigID.WALK);
		});
		this.btn_start.onClicked.add(() => {
			this.canvas_startBtn.visibility = (mw.SlateVisibility.Hidden);

			this.playUIAni(true, false);
			SoundPlay.ins.play(SoundConfigID.GAME_START_TALK);

			const cameraMoveAni = new mw.Tween({
				trans: Camera.currentCamera.localTransform.clone(),
				leng: Camera.currentCamera.springArm.length,
				rotater: this.player.character.worldTransform.rotation
			}).
				to({
					trans: new mw.Transform(new mw.Vector(0, 30, 400),
						new mw.Rotation(0, -30, -10), mw.Vector.one),
					leng: 400, rotater: this.player.character.worldTransform.rotation.add(new mw.Rotation(0, 0, 180))
				}, 500).onUpdate(obj => {
					Camera.currentCamera.localTransform = obj.trans
					Camera.currentCamera.springArm.length = obj.leng
					this.player.character.worldTransform.rotation = obj.rotater
				}).start();
		});
		this.btn_Set.onClicked.add(() => {
			const sound = SoundPlay.ins;
			this.soundOpen = !this.soundOpen;
			if (this.soundOpen) {
				sound.openSound();
				sound.play(SoundConfigID.BUTTON_CLICK);
				this.btn_Set.setNormalImageColorByHex(consts.normalColor);
			} else {
				sound.closeSound();
				this.btn_Set.setNormalImageColorByHex(consts.forbiddenColor);
			}
		});
		Event.addLocalListener(C2CEvent.GETSKILLGEM, (val: number, func: () => void) => {
			if (!isNaN(val)) {
				SoundPlay.ins.play(SoundConfigID.GET_SKILL);
				this.getSkillAni(val, func);
			}
		});

		Event.addLocalListener(C2CEvent.HALLUI_SKILLRESET, () => {
			this.resetImgSkill();
			this.playUIAni(true, false)
		});

		Event.addLocalListener(C2CEvent.HALLUI_UIOUT, (isWin: boolean) => {
			this.playUIAni(false, isWin);
		});
		Event.addLocalListener(C2CEvent.HALLUI_LVCHANGE, (LV: number) => {
			this.txt_lv.text = (`Lv ${LV}`)
		});


		this.net_LvUp(ModuleService.getModule(LevelModuleC).getCurrentSceneLv());
	}


	resetImgSkill() {
		for (let i = 1; i <= 6; i++) {
			let img = this[`img_skill${i}`] as mw.Image;
			if (img) {
				img.visibility = (mw.SlateVisibility.Hidden);
			}
		}
	}
	/**展示主Ui的入场显示动画
	 * @param isIn 是否是进场动画
	 * @param isWin 是否胜利
	 */
	playUIAni(isIn: boolean, isWin: boolean) {
		SoundPlay.ins.play(SoundConfigID.UI_ENTER_END);

		//set 左飞
		let setSlot = this.btn_Set;
		let setPos = setSlot.position.clone();
		if (isIn) this.btn_Set.visibility = (mw.SlateVisibility.Hidden);
		let setStart = isIn ? -100 : 361;
		let setEnd = isIn ? 361 : -100;
		const setAni = new mw.Tween({ pos: setStart }).to({ pos: setEnd }, 500).onUpdate(obj => {
			setPos.x = obj.pos;
			setSlot.position = (setPos);
		}).onStart(() => {
			this.btn_Set.visibility = (mw.SlateVisibility.Visible);
		});
		setAni.start();
		//canvas——Skill右飞
		const skillSlot = this.canvas_Skill;
		let skillPos = skillSlot.position.clone();
		let skillStart = isIn ? 100 : -450;
		let skillEnd = isIn ? -450 : 100;
		// if (isIn) this.canvas_Skill.visibility=(mw.SlateVisibility.Hidden);
		skillPos.x = skillStart;
		skillSlot.position = (skillPos);
		const skillAni = new mw.Tween({ pos: skillStart }).to({ pos: skillEnd }).onUpdate(obj => {
			skillPos.x = obj.pos;
			skillSlot.position = (skillPos);
		})
		skillAni.start();
		//canvas_moveCtrl
		this.moveControl.enable = (false);
		const moveSlot = this.canvas_moveCtrl;
		let movePos = moveSlot.position.clone();
		let moveStart = isIn ? -500 : 90;
		let moveEnd = isIn ? 90 : -500;
		// this.canvas_moveCtrl.visibility=(mw.SlateVisibility.Visible);
		const moveAni = new mw.Tween({ pos: moveStart }).to({ pos: moveEnd }).onUpdate(obj => {
			movePos.x = obj.pos;
			moveSlot.position = (movePos);
		}).onComplete(() => {
			Player.localPlayer.character.movementEnabled = true;
			this.moveControl.enable = (true);
			if (!isIn) {
				ModuleService.getModule(LevelModuleC).showEndUI(isWin);
			}
		});
		moveAni.start();
	}
	/**获取宝石的动画 */
	getSkillAni(type: SkillType, func: () => void) {
		let guid = this.imgUIList[type];
		let slot = this.img_Move;
		let startPos = slot.position.clone();
		let pos = slot.position.clone();
		let startSize = new mw.Vector2(72, 92);
		slot.size = (startSize);
		let size = slot.size.clone();
		this.img_Move.imageGuid = (guid.toString());
		this.img_Move.visibility = (mw.SlateVisibility.Visible);
		let moveToPos = Tools.getUIWorldPos(this[`img_skill${type + 1}`], this.img_Move);
		let moveAni = new mw.Tween({ posx: 0, posy: 0, worldScale: 1, scale2: 0 }).to({ posx: moveToPos.x, posy: moveToPos.y, worldScale: 0.5, scale2: Math.PI }, 1250).onUpdate(obj => {
			pos.x = obj.posx;
			pos.y = obj.posy;
			size.x = (obj.worldScale + Math.pow(Math.sin(obj.scale2), 2) * 2) * startSize.x;
			size.y = (obj.worldScale + Math.pow(Math.sin(obj.scale2), 2) * 2) * startSize.y;
			slot.size = (size);
			slot.position = (pos);
		}).onComplete(() => {
			this.img_Move.visibility = (mw.SlateVisibility.Hidden);
			slot.position = (startPos);
			Player.localPlayer.character.movementEnabled = true;
			if (this.iswalking) {
				SoundPlay.ins.play(SoundConfigID.WALK);
			}
			let img = this[`img_skill${type + 1}`] as mw.Image;
			if (img) {
				img.visibility = (mw.SlateVisibility.Visible);
			}
			SoundPlay.ins.play(SoundConfigID.INSET_GEM);
			this.skillGetUI.showSkillGetAni(type, func);
			if (this.isPlayCollectFinish()) {
				SoundPlay.ins.play(SoundConfigID.COLLECT_FINISH);
			}
			if (type != SkillType.Soul) func();
		});
		moveAni.start();
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
	 * 关卡数据更新
	 * @param num 当前关卡号
	 */
	net_LvUp(num: number) {
		this.txt_lv.text = (`Lv ${num}`);
	}
	/**是否全部收集完成 */
	private isPlayCollectFinish() {
		let res = true;
		for (let i = 1; i <= 6; i++) {
			let img = this[`img_skill${i}`] as mw.Image;
			if (!img.visible) {
				res = false;
				break;
			}
		}

		return res;
	}
	/**
	* 每一帧调用
	* 通过canUpdate可以开启关闭调用
	* dt 两帧调用的时间差，毫秒
	*/
	//protected onUpdate(dt :number) {
	//}

	/**
	 * 设置显示时触发
	 */
	//protected onShow(...params:any[]) {
	//}

	/**
	 * 设置不显示时触发
	 */
	//protected onHide() {
	//}

}
