

import SoulUI_Generate from "../ui-generate/SoulUI_generate";
import { SoundConfigID, SoundPlay } from "../utils/SoundPlay";

const ENTER_TIME = 500;// 划入时间
const END_TIME = 600;// 划出时间
const PARSE_TIME = 1350;// 停顿时间
export default class SoulUI extends SoulUI_Generate {

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
		const x = -mw.WindowUtil.getViewportSize().x;
		this.canvas_Ani.position = (new mw.Vector2(x, 0));
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
	protected onShow(callBack: () => void) {
		let fun = () => {
			SoundPlay.ins.play(SoundConfigID.PASS_SOUL_TALK);
			setTimeout(() => {
				SoundPlay.ins.play(SoundConfigID.SOUL_FINGER);
				this.anim(true, () => {
					callBack && callBack();
				});
			}, PARSE_TIME);
		}

		this.anim(false, fun);
	}
	private anim(isBack: boolean, cb: null | (() => void)) {
		const pos = this.canvas_Ani.position;
		let moveNum = isBack ? -mw.getViewportSize().x : 0;
		let time = isBack ? END_TIME : ENTER_TIME;
		new mw.Tween({ v: pos })
			.to({ v: new mw.Vector2(moveNum, pos.y) }, time)
			.onUpdate((obj) => {
				this.canvas_Ani.position = (obj.v);
			})
			.onStart(() => {
				SoundPlay.ins.play(SoundConfigID.UI_ENTER_END);
			})
			.onComplete(() => {
				cb && cb();
			})
			.start();
	}
	/**
	 * 设置不显示时触发
	 */
	//protected onHide() {
	//}

}
