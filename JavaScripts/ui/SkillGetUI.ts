
import { SkillType } from ".././modules/skill/SkillDataHelper";
import SkillGetUI_Generate from ".././ui-generate/SkillGetUI_generate";

export default class SkillGetUI extends SkillGetUI_Generate {

	/** 
	* 构造UI文件成功后，在合适的时机最先初始化一次 
	*/
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		//this.initButtons();
	}
	private nowAction: mw.Tween<any> = null;
	showSkillGetAni(type: SkillType, back) {
		if (this.nowAction) {
			this.nowAction.stop();
			this.closeAllUI();
		}
		switch (type) {
			case SkillType.Power: {//旋转1圈、放缩、渐隐
				let startShow = new mw.Tween({ op: 0, rotation: 0 }).to({ op: 10, rotation: -360 }, 1700).easing(mw.TweenUtil.Easing.Cubic.InOut).onUpdate((op) => {
					this.powerCanvas.renderOpacity = (op.op);
					this.powerCanvas.renderTransformAngle = (op.rotation);
					this.mImg_Skill_Power1.renderTransformAngle = (op.rotation * -1)
					this.mImg_Skill_Power2.renderTransformAngle = (op.rotation * -1)
				}).onStart(() => {
					this.powerCanvas.visibility = (mw.SlateVisibility.Visible);
				});
				let scale1 = new mw.Tween({ pi: 0 }).to({ pi: Math.PI }, 800).easing(
					mw.TweenUtil.Easing.Cubic.InOut).onUpdate((sc) => {
						this.powerCanvas.renderScale = (mw.Vector2.one.multiply(Math.sin(sc.pi) * 0.2 + 1));
						this.powerCanvas.renderOpacity = (Math.sin(Math.PI / 2 + sc.pi / 2) * 4);
					}).onComplete(() => {
						this.nowAction = null;
					});

				startShow.chain(scale1).start();
				this.nowAction = startShow;
			} break;
			case SkillType.Space: {
				let pos1 = this.mImg_Skill_Space1.position.clone();
				let pos2 = this.mImg_Skill_Space2.position.clone();
				let moveOne = new mw.Tween({ leftx: 135, rightx: 225, op: 10 }).to({ leftx: -85, rightx: 445, op: 0 }, 2500).onUpdate((xpos) => {
					this.spaceAni(pos1, pos2, xpos);
					this.spaceCanvas.renderOpacity = (xpos.op);
				}).easing(mw.TweenUtil.Easing.Cubic.Out).onStart(() => {
					this.spaceCanvas.renderOpacity = (1);
					this.spaceCanvas.visibility = (mw.SlateVisibility.Visible);
				}).onComplete(() => {
					this.nowAction = null;
				});
				moveOne.start();
				this.nowAction = moveOne;
			} break;
			case SkillType.Reality: {
				let ro2 = new mw.Tween({ op1: 1, op2: 0.5 }).to({ op1: 0, op2: 0 }, 400).delay(100).onUpdate((obj) => {
					this.mImg_Skill_Reality1.renderOpacity = (obj.op1);
					this.mImg_Skill_Reality2.renderOpacity = (obj.op2);
				}).onComplete(() => {
					this.realityCanvas.renderOpacity = (0);
					this.mImg_Skill_Reality1.renderOpacity = (1);
					this.mImg_Skill_Reality2.renderOpacity = (1);
					this.nowAction = null;
				})
				let ro1 = new mw.Tween({ rotation: 0, op: 5 }).to({ rotation: -360, op: 0.5 }, 2000).onUpdate((ro) => {
					this.realityCanvas.renderTransformAngle = (ro.rotation);
					this.mImg_Skill_Reality1.renderTransformAngle = (ro.rotation * -1)
					this.mImg_Skill_Reality2.renderTransformAngle = (ro.rotation * -1)
					this.mImg_Skill_Reality2.renderOpacity = (ro.op);
				}).easing(mw.TweenUtil.Easing.Cubic.InOut).chain(ro2).onStart(() => {
					this.realityCanvas.renderOpacity = (1);
					this.realityCanvas.visibility = (mw.SlateVisibility.Visible);
				});
				ro1.start();
				this.nowAction = ro1;
			} break;
			case SkillType.Time: {
				let op = new mw.Tween({ PI: 0 }).to({ PI: Math.PI }, 2500).onUpdate((obj) => {
					this.mImg_Skill_Time.renderOpacity = (Math.sin(obj.PI) * 5);
					this.mImg_Skill_Time.renderTransformAngle = (this.mImg_Skill_Time.renderTransformAngle + (Math.sin(obj.PI + Math.PI / 2) + 1) / 2 * 20);
				}).onStart(() => {
					this.timeCanvas.visibility = (mw.SlateVisibility.Visible);
				}).onComplete(() => {
					this.nowAction = null;
				});
				op.start();
				this.nowAction = op;
			} break;
			case SkillType.Heart: {
				let slot = this.mImg_Skill_Mind;
				let pos = slot.position.clone();
				let op1 = new mw.Tween({ y: 220, pi: 0 }).to({ y: 135, pi: Math.PI }, 2500).onUpdate((obj) => {
					pos.y = obj.y;
					slot.position = (pos);
					this.mImg_Skill_Mind.renderOpacity = (Math.sin(obj.pi) * 5);
				}).easing(mw.TweenUtil.Easing.Cubic.InOut).onStart(() => {
					this.mindCanvas.visibility = (mw.SlateVisibility.Visible);
				}).onComplete(() => {
					this.nowAction = null;
				});
				op1.start();
				this.nowAction = op1;
			} break;
			case SkillType.Soul: {
				if (back) back();
			} break
		}
	}
	closeAllUI() {
		this.powerCanvas.visibility = (mw.SlateVisibility.Hidden);
		this.spaceCanvas.visibility = (mw.SlateVisibility.Hidden);
		this.realityCanvas.visibility = (mw.SlateVisibility.Hidden);
		this.timeCanvas.visibility = (mw.SlateVisibility.Hidden);
		this.mindCanvas.visibility = (mw.SlateVisibility.Hidden);
	}
	/**
	 * 空间宝石获取-UI显示动效
	 * @param leftx 左侧位移
	 * @param rightx 右侧位移
	 */
	spaceAni(pos1: mw.Vector2, pos2: mw.Vector2, xpos: { leftx: number, rightx: number }) {
		pos1.x = xpos.leftx;
		pos2.x = xpos.rightx;
		this.mImg_Skill_Space1.position = (pos1);
		this.mImg_Skill_Space2.position = (pos2);
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
	//protected onShow(...params:any[]) {
	//}

	/**
	 * 设置不显示时触发
	 */
	//protected onHide() {
	//}

}
