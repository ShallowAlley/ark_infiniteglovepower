
/** 
 * AUTHOR: 幸好时光与你同在
 * TIME: 2022.10.25-10.27.19
 */

import { oTraceError, oTrace, oTraceWarning, LogManager, AnalyticsUtil, IFightRole, AIMachine, AIState } from "odin";
import { GameConfig } from ".././config/GameConfig";
import { SkillType } from ".././modules/skill/SkillDataHelper";
import { SkillModule_C } from ".././modules/skill/SkillModule_C";
import RewardsUI_Generate from ".././ui-generate/RewardsUI_generate";
import { EndData } from ".././ui/EndUILose";
import { MsgReport } from ".././utils/MsgReporter";
import { SoundConfigID, SoundPlay } from ".././utils/SoundPlay";
import SkillPanelUI from "./SkillPanelUI";

export default class RewardsUI extends RewardsUI_Generate {

	private nowChoseIndex = 0;
	private nowSendRewards = [];
	private imgGuidList = [116241, 116251, 116259, 116260, 116261];
	private showContinue = false;
	/** 
	* 构造UI文件成功后，在合适的时机最先初始化一次 
	*/
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		//this.initButtons();

		this.btn_start.onClicked.add(() => {
			if (!this.showContinue) {
				if (this.nowSendRewards.length > 0) {
					if (this.nowChoseIndex == 0) {
						this.nowChoseIndex = 1;
					}
					ModuleService.getModule(SkillModule_C).net_SkillPointGet(this.nowSendRewards[this.nowChoseIndex - 1], 1);
					// to do 埋点
					let skillType = this.nowSendRewards[this.nowChoseIndex - 1] as SkillType;
					this.sendMsg(skillType);
				}
				this.showContinue = true;
				this.playAni(false, null);
			}
		});

		////奖励按钮点击
		this.mbtn_skill1.onClicked.add(() => {
			this.changeChoseSkill(1);
			this.sendMsgSkillClick();
		});
		this.mbtn_skill2.onClicked.add(() => {
			this.changeChoseSkill(2);
			this.sendMsgSkillClick();
		});
		this.mbtn_skill3.onClicked.add(() => {
			this.changeChoseSkill(3);
			this.sendMsgSkillClick();
		});
	}
	changeChoseSkill(skillIndex: number) {
		this.nowChoseIndex = skillIndex;
		for (let i = 1; i <= 3; i++) {
			if (i != skillIndex) {
				this[`img_check${i}`].visibility = (mw.SlateVisibility.Hidden);
			} else {
				this[`img_check${skillIndex}`].visibility = (mw.SlateVisibility.Visible);
			}
		}
	}
	hideAllRewards() {
		for (let i = 1; i <= 3; i++) {
			this[`canvas_skill${i}`].visibility = (mw.SlateVisibility.Hidden);
			this[`img_check${i}`].visibility = (mw.SlateVisibility.Hidden);
			this[`mbtn_skill${i}`].visibility = (mw.SlateVisibility.Hidden);
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
	 * 设置显示时触发
	 */
	protected onShow(endData: EndData) {
		this.canvas_btnPanel.visibility = (mw.SlateVisibility.Hidden);
		this.playAni(true, endData);
		let havePoint = ModuleService.getModule(SkillModule_C).net_GetSkillHavePoints();
		for (let i = 0; i < havePoint.length; i++) {
			if (this[`txt_skillNum${i + 1}`]) {
				this[`txt_skillNum${i + 1}`].text = (`X${havePoint[i]}`);
			}
		}
	}
	showRewards(endData: EndData) {
		let rewards = endData.rewards;
		this.hideAllRewards();
		this.nowSendRewards = [];
		let strList = GameConfig.DoorColor.getAllElement();
		for (let i = 0; i < rewards.length; i++) {
			this.nowSendRewards.push(rewards[i]);
			setTimeout(() => {
				this[`canvas_skill${i + 1}`].visibility = (mw.SlateVisibility.Visible);
				this[`mbtn_skill${i + 1}`].normalImageGuid = (this.imgGuidList[rewards[i]]);
				this[`mbtn_skill${i + 1}`].visibility = (mw.SlateVisibility.Visible);
				this[`mTxt_Skill${i + 1}`].text = (strList[rewards[i]].name);
				if (i == 0) {
					this.img_check1.visibility = (mw.SlateVisibility.Visible);
				}
				SoundPlay.ins.stop(SoundConfigID.SKILL_REWARD);
				SoundPlay.ins.play(SoundConfigID.SKILL_REWARD);
			}, 350 * (i + 1));
		}
		setTimeout(() => {
			this.canvas_btnPanel.visibility = (mw.SlateVisibility.Visible);
		}, 350 * (rewards.length + 1));
	}
	playAni(isIn: boolean, endData: EndData) {
		SoundPlay.ins.play(SoundConfigID.UI_ENTER_END);
		const size = mw.WindowUtil.getViewportSize();
		let slot = this.canvas_CenterMove;
		let start = isIn ? -1 : 0;
		let end = isIn ? 0 : 1;
		let pos = new mw.Vector2(0, 0);
		if (isIn) this.canvas_CenterMove.visibility = (mw.SlateVisibility.Hidden);
		pos.x = size.x * start;
		pos.y = 0;
		slot.position = (pos);
		const moveAni = new mw.Tween({ hight: start }).to({ hight: end }, 500).onUpdate((object) => {
			pos.x = size.x * object.hight;
			pos.y = 0;
			slot.position = (pos);
		}).onComplete(() => {
			if (isIn) {
				setTimeout(() => {
					this.showRewards(endData);
				}, 250);
			} else {
				this.showContinue = false;
				mw.UIService.show(SkillPanelUI, true)
				// mw.instance.showPanel(SkillPanelUI, true);
				this.hide();
			}
		}).onStart(() => {
			this.canvas_CenterMove.visibility = (mw.SlateVisibility.Visible);
		});
		moveAni.start();
	}
	hide() {
		mw.UIService.hide(RewardsUI);
	}

	/**
	 * 埋点
	 */
	sendMsg(type: SkillType) {
		let msg = AnalyticsUtil.get(MsgReport.ts_action_click);
		switch (type) {
			case SkillType.Power:
				msg.data.button = "gem_1";
				break;
			case SkillType.Space:
				msg.data.button = "gem_2";
				break;
			case SkillType.Reality:
				msg.data.button = "gem_3";
				break;
			case SkillType.Time:
				msg.data.button = "gem_4";
				break;
			case SkillType.Heart:
				msg.data.button = "gem_5";
				break;
			default:
				return;
		}
		msg.send();
	}
	sendMsgSkillClick() {
		let msg = AnalyticsUtil.get(MsgReport.ts_action_click);
		msg.data.button = "skill";
		msg.send();
	}
	/**
	 * 设置不显示时触发
	 */
	protected onHide() {
		this.nowChoseIndex = 0;
		this.nowSendRewards = [];
		this.hideAllRewards();
	}

}
