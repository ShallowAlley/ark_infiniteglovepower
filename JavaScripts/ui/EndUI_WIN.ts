import RewardsUI from "./RewardsUI";
import EndUI_WIN_Generate from ".././ui-generate/EndUI_WIN_generate";
import { EndData } from ".././ui/EndUILose";
import { SoundConfigID, SoundPlay } from ".././utils/SoundPlay";

export default class EndUI_WIN extends EndUI_WIN_Generate {
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	private movePos: mw.Vector2 = new mw.Vector2(0, 0);
	/** 
	* 构造UI文件成功后，在合适的时机最先初始化一次 
	*/
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		//this.initButtons();
	}

	/** 
	* 构造UI文件成功后，onStart之后 
	* 对于UI的根节点的添加操作，进行调用
	* 注意：该事件可能会多次调用
	*/
	protected onAdded() {
		const size = mw.WindowUtil.getViewportSize();
		let slot = this.canvas_Move;
		slot.position = (new mw.Vector2(-size.x, 0))
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
	playOutAni(isIn: boolean, endData: EndData) {
		SoundPlay.ins.play(SoundConfigID.UI_ENTER_END);

		const size = mw.WindowUtil.getViewportSize();
		let slot = this.canvas_Move;
		let start = isIn ? -1 : 0;
		let end = isIn ? 0 : 1;
		this.movePos.x = size.x * start;
		this.movePos.y = 0;
		slot.position = (this.movePos);
		const moveAni = new mw.Tween({ hight: start }).to({ hight: end }, 500).onUpdate((object) => {
			this.movePos.x = size.x * object.hight;
			this.movePos.y = 0;
			slot.position = (this.movePos);
		}).onComplete(() => {
			if (isIn) {
				setTimeout(() => {
					this.playOutAni(false, endData);
				}, 2000);
			} else {
				this.hide();
				// mw.instance.showPanel(EndUIRewards, endData);
				mw.UIService.show(RewardsUI, endData);
			}
		})
		moveAni.start();
	}
	hide() {
		mw.UIService.hide(EndUI_WIN);
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
		this.playOutAni(true, endData)
		SoundPlay.ins.stop(SoundConfigID.PASS_POWER);
		SoundPlay.ins.play(SoundConfigID.SUCCESS);
	}

	/**
	 * 设置不显示时触发
	 */
	protected onHide() {
		this.movePos.y = 0;
	}

}
