import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { C2CEvent, ProLoadGuid } from "../../consts/ProLoadGuid";
import { SoundConfigID, SoundPlay } from "../../utils/SoundPlay";
import { PlayerDataHelper } from "../player/PlayerDataHelper";
import { PlayerModuleC } from "../player/PlayerModuleC";
import LevelModuleC from "./module/LevelModuleC";

@Component
export default class EndTrigger extends mw.Script {

	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		const trigger = this.gameObject as mw.Trigger;

		if (mw.SystemUtil.isClient()) {
			trigger.onEnter.add(async (go: mw.GameObject) => {
				if ((go) instanceof mw.Character) {
					let isEnd = ModuleService.getModule(PlayerModuleC).getIsEnd();
					if (isEnd) return;
					let ModuleC = ModuleService.getModule(LevelModuleC)
					ModuleService.getModule(PlayerModuleC).endGame();
					const char = go as mw.Character;
					char.switchToWalking();
					let successDanceGuid = ProLoadGuid.playerSuccess.split(",");
					PlayerManagerExtesion.rpcPlayAnimation(char, successDanceGuid[Math.floor(Math.random() * (successDanceGuid.length - 0.01))], 0, 1)

					const cameraMoveAni = new mw.Tween({ trans: Camera.currentCamera.localTransform.clone(), leng: Camera.currentCamera.springArm.length }).to({ trans: new mw.Transform(new mw.Vector(600, 0, 0), new mw.Rotation(0, 0, 180), mw.Vector.one), leng: 200 }, 500).onUpdate(obj => {
						Camera.currentCamera.localTransform = obj.trans
						Camera.currentCamera.springArm.length = obj.leng
					}).start();

					let ModuleData = DataCenterC.getData(PlayerDataHelper);
					let skillData = ModuleData.getSkillDoor();
					skillData = [false, false, false, false, false, false];
					ModuleService.getModule(PlayerModuleC).resrtSkilldoor();
					ModuleC.resetDefaultTime();
					// ModuleService.getModule(LevelModuleC).showEndUI(true);
					Event.dispatchToLocal(C2CEvent.HALLUI_UIOUT, true);
					// mw.instance.showPanel()
					// ModuleService.getModule(LevelModuleC).passGame();
					SoundPlay.ins.play(SoundConfigID.PASS_GAME_TALK);
				}
			});
		}
	}

}
