import { GameConfig } from "../config/GameConfig";
export enum SoundConfigID {
	BUTTON_CLICK = 100001,// 按键声
	GET_SKILL,// 技能获取
	WALK,// 行走音效
	BGM,// BGM
	BALL_AND_BARRIER,// 力量球与机关的碰撞 
	PLAYER_AND_BARRIER,// 玩家碰到机关
	SOUL_FINGER,// 打响指
	GAME_START_TALK,// 灭霸语录（游戏开始）
	PASS_GAME_TALK,// 灭霸语录（关卡通关）
	PASS_SOUL_TALK,// 灭霸语录（灵魂门）
	PASS_POWER,// 穿过力量宝石门
	PASS_TIME,// 穿过时间宝石门
	PASS_SPACE,// 穿过空间宝石门
	PASS_MIND,// 穿过心灵宝石门
	PASS_REALITY,// 穿过现实宝石门
	UI_ENTER_END,// UI划入与划出音效
	FAIL,// 失败音效
	SUCCESS,// 胜利音效
	SKILL_REWARD,// 技能奖励展示音效
	INSET_GEM,// 宝石镶嵌音效
	COLLECT_FINISH,// 宝石集齐音效
	DIE,// 死亡音效
	SKILL_UP // 技能升级音效
}

export class SoundPlay {

	private static _ins: SoundPlay;
	private constructor() {
		if (mw.SystemUtil.isClient()) {
			//GameInitializer["getService"]("NetManager").registerFun(this.play3DSound, this, "NetPlay3DSound");
		}
	}
	public static get ins() {
		if (!this._ins) {
			this._ins = new SoundPlay();
		}
		return this._ins;
	}

	private stopSound = false;

	closeSound() {
		setTimeout(() => {
			mw.SoundService.stopAllSound();
			this.stopBGM();
			this.stopSound = true;
		}, 250);
	}

	openSound() {
		this.stopSound = false;
		this.playBGM();
	}

	onEvent() {
		// UI 所有按钮接收事件
		Event.addLocalListener('PlayButtonClick', () => {
			this.stop(SoundConfigID.BUTTON_CLICK);
			this.play(SoundConfigID.BUTTON_CLICK);
		});
	}

	/**
	 * 只能在客户端调用
	 * @param id 
	 */
	play(id: number) {
		if (this.stopSound) { // 禁止播放任何音效
			return;
		}

		let sound = GameConfig.Sound.getElement(id);
		let guid = sound.SoundGuid.toString();
		const num = Number(sound.LoopPlayBack === 0);
		mw.SoundService.playSound(guid, num, sound.SoundPropportion);

	}

	play3DSound(id: number, target: string | mw.GameObject | mw.Vector) {
		let sound = GameConfig.Sound.getElement(id);
		if (!sound) {
			return;
		}
		let guid = sound.SoundGuid.toString();
		mw.SoundService.play3DSound(guid, target, 1, sound.SoundPropportion);//循环播放音效

	}

	playBGM() {
		if (this.stopSound) { // 禁止播放任何音效
			return;
		}

		let sound = GameConfig.Sound.getElement(SoundConfigID.BGM);
		mw.SoundService.playBGM(sound.SoundGuid + '', sound.SoundPropportion);
	}

	stopBGM() {
		mw.SoundService.stopBGM();
	}


	stop(id: number) {
		let sound = GameConfig.Sound.getElement(id);
		let guid = sound.SoundGuid.toString();
		mw.SoundService.stopSound(guid);
	}

}
