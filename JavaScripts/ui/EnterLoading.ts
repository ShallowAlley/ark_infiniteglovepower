
/** 
 * AUTHOR: 幸好时光与你同在
 * TIME: 2022.10.25-10.27.19
 */

import { GameConfig } from ".././config/GameConfig";
import { C2CEvent } from ".././consts/ProLoadGuid";
import EnterLoading_Generate from ".././ui-generate/EnterLoading_generate";
import { SoundPlay } from ".././utils/SoundPlay";
import Tools from ".././utils/Tools";

export default class EnterLoading extends EnterLoading_Generate {
	time = 0;
	pause = false;
	isSceneLoadFinish = false;
	readonly fixedTime = 3;
	/** 
	* 构造UI文件成功后，在合适的时机最先初始化一次 
	*/
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = true;
		this.layer = mw.UILayerMiddle;
		//this.initButtons();
		Event.addLocalListener(C2CEvent.SCENE_FINISH, () => {
			this.isSceneLoadFinish = true;
		});
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
	protected onUpdate(dt: number) {
		if (!this.pause) {
			this.time += dt;
			this.rotateImg();

			if (this.time >= this.fixedTime && this.isSceneLoadFinish) {
				this.pause = true;
				this.hideAnim();
			}
		}
	}
	hide(): void {
		this.time = 0;
		this.isSceneLoadFinish = false;
		this.rootCanvas.renderScale = (mw.Vector2.one);
		mw.UIService.hide(EnterLoading);
	}
	private hideAnim() {
		new mw.Tween({ worldScale: mw.Vector2.one })
			.to({ worldScale: new mw.Vector2(0, 5) }, 200)
			.onUpdate(o => {
				this.rootCanvas.renderScale = (o.worldScale);
			})
			.onComplete(() => {
				SoundPlay.ins.playBGM();
				this.hide();
			})
			.start();
	}
	/**
	 * 设置显示时触发
	 */
	public onShow(...params: any[]) {
		SoundPlay.ins.stopBGM();
		this.randomText();
		this.pause = false;
	}

	/**旋转图片 */
	private rotateImg() {
		let angle = this.mImgRing.renderTransformAngle;
		if (angle < 180) {
			angle += 5;
		} else {
			angle = -180;
		}

		this.mImgRing.renderTransformAngle = (angle);
	}

	/**随机tips */
	private randomText() {
		const tips = GameConfig.Tips.getAllElement();
		const len = tips.length;

		const index = Tools.randomBetweenMinAndMax(0, len - 1);
		const cfg = tips[index];
		this.mTxtTips.text = (`tips:${cfg.tips}`);
	}
	/**
	 * 设置不显示时触发
	 */
	//protected onHide() {
	//}

}
