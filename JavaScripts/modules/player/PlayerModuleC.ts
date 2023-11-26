import { SpawnManager, SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { C2CEvent, consts, ProLoadGuid } from "../../consts/ProLoadGuid";
import { MsgReport } from "../../utils/MsgReporter";
import { SoundConfigID, SoundPlay } from "../../utils/SoundPlay";
import LevelModuleC from "../level/module/LevelModuleC";
import { SkillModule_C } from "../skill/SkillModule_C";
import { PlayerDataHelper } from "./PlayerDataHelper";
import { PlayerModuleS } from "./PlayerModudleS";

export class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerDataHelper> {

	onAwake(): void {

	}
	private deadTrigger: mw.Trigger;
	private isDead = false;

	onStart(): void {
		this.initPlayerTrigger();
	}
	private movePos: mw.Vector = new mw.Vector(0, 0, 1);
	private nowPos: mw.Vector = new mw.Vector(0, 0, 0);
	private isEnding: boolean = false;
	onUpdate(dt: number): void {
		if (this.deadTrigger) {
			this.deadTrigger.localTransform.position = (this.nowPos.add(this.movePos));
			this.movePos.z = -this.movePos.z;
		}
	}
	/**玩家位置移动
	 * @param pos 目标点位置
	 */
	net_PlayerMovePosition(pos: mw.Vector) {
		this.server.net_PlayerMovePosition(pos, false, Player.localPlayer);
	}
	/**初始化玩家身上的触发器 */
	initPlayerTrigger() {
		let player = Player.localPlayer;
		Camera.currentCamera.springArm.collisionEnabled = false;
		player.character.asyncReady().then(() => {
			SpawnManager.wornAsyncSpawn(ProLoadGuid.Trigger).then((obj: mw.Trigger) => {
				obj.parent = (player.character);
				this.deadTrigger = obj;
				obj.worldTransform.scale = (new mw.Vector(0.5, 0.5, 1));
				obj.localTransform.position = (new mw.Vector(0, 0, 0));
				this.nowPos = new mw.Vector(0, 0, 0);
				obj.onEnter.add((other) => {
					if (other && other.tag && !this.isDead) {
						let gameobj = other as mw.GameObject;
						let parentObj = gameobj.parent;
						while (parentObj.parent) {
							if (parentObj.parent) {
								parentObj = parentObj.parent;
							}
						}
						let scrpit = parentObj.getScripts()[0];
						let trapId = 0;
						if (scrpit) {
							trapId = scrpit["type"];
						}
						this.judgeTag(other.tag, trapId);
					}
				});
			});
		});
	}
	judgeTag(tag: string, trapId: number) {
		if (tag.includes(consts.deadTag)) {
			if (!this.isDead) {
				SoundPlay.ins.play(SoundConfigID.PLAYER_AND_BARRIER);
				this.deadToReStart();
			}

		}
		for (let i = 0; i < consts.testSkillTypeName.length; i++) {
			let skilltag = consts.testSkillTypeName[i];
			if (tag.includes(skilltag)) {
				Event.dispatchToLocal(C2CEvent.SKILL_DOORGET, tag);
				ModuleService.getModule(SkillModule_C).net_SetGatherSkills(i);
				// 玩家每触发技能门都发送一次
				ModuleService.getModule(LevelModuleC).setMsgStep(2);

				// 玩家选择的技能 埋点
				let curDoor = this.data.getSkillDoor()[i];
				if (curDoor == false) {
					curDoor = true;
					this.server.net_setSkilldoor(i, Player.localPlayer);
				}

				break;
			}
		}
		// if(tag.includes())
	}
	/**玩家死亡重新开始 */
	deadToReStart() {
		SoundPlay.ins.play(SoundConfigID.DIE);
		let player = Player.localPlayer;
		this.isDead = true;
		player.character.switchToWalking();
		PlayerManagerExtesion.rpcPlayAnimationLocally(player.character, ProLoadGuid.playerDead)
		//player.character.loadAnimation(ProLoadGuid.playerDead).play;
		player.character.movementEnabled = false;
		if (this.deadTrigger) {
			this.deadTrigger.enabled = (false);
		}
		Event.dispatchToLocal(C2CEvent.HALLUI_UIOUT, false);
		//todo：显示结算、通知关卡玩家死亡
		let moduleLevel = ModuleService.getModule(LevelModuleC)
		// to do 
		ModuleService.getModule(LevelModuleC).setMsgStep(3);
		moduleLevel.setDefaultTime();
	}
	/**心灵宝石，玩家飞行 */
	heartSetPlayerFly() {
		let player = Player.localPlayer;
		player.character.switchToFlying();
		if (this.deadTrigger) {
			this.deadTrigger.worldTransform.scale = (new mw.Vector(0.5, 0.5, 0.5));
			this.deadTrigger.localTransform.position = (new mw.Vector(0, 0, 40));
			this.nowPos = new mw.Vector(0, 0, 40);
		}
		let pos = player.character.worldTransform.position;
		player.character.worldTransform.position = pos.add(new mw.Vector(0, 0, 100));
		// this.server.net_PlayerMovePosition(pos.add(new mw.Vector(0, 0, 100)), false);
	}
	/**重新开始游戏- 心灵宝石取消 */
	mindSkillReset() {
		let player = Player.localPlayer;
		PlayerManagerExtesion.rpcPlayAnimationLocally(player.character, ProLoadGuid.playerStand)
		player.character.movementEnabled = true;
		let pos = player.character.worldTransform.position;
		// this.server.net_PlayerMovePosition(pos.add(new mw.Vector(0, 0, 100)), true);
		player.character.worldTransform.position = pos.add(new mw.Vector(0, 0, 100));
		setTimeout(() => {
			this.isDead = false;
			this.isEnding = false;
		}, 1000)
		player.character.switchToWalking();
		if (this.deadTrigger) {
			this.deadTrigger.worldTransform.scale = (new mw.Vector(0.5, 0.5, 1));
			this.deadTrigger.localTransform.position = (new mw.Vector(0, 0, 0));
			this.nowPos = new mw.Vector(0, 0, 0);
			this.deadTrigger.enabled = (true);
		}
	}
	/**终局 */
	endGame() {
		this.isEnding = true;
	}
	getIsEnd() {
		return this.isEnding;
	}
	net_moveEnd() {
		this.isDead = false;
	}
	resrtSkilldoor() {
		this.server.net_resrtSkilldoor(Player.localPlayer);
	}
}
