import { PlayerDataHelper } from "./PlayerDataHelper";
import { PlayerModuleC } from "./PlayerModuleC";

export class PlayerModuleS extends ModuleS<PlayerModuleC, PlayerDataHelper> {

	onStart(): void {

	}

	/**
	 * 玩家位置移动
	 * @param pos 移动的目标点位置
	 */
	net_PlayerMovePosition(pos: mw.Vector, isGoStart = false, player: mw.Player) {
		player.character.worldTransform.position = (pos);// = pos;
		// this.client.net_moveEnd();
		if (isGoStart) {
			this.getClient(player).net_moveEnd()
		}
	}
	net_setSkilldoor(i: number, player: mw.Player) {
		let data = this.getPlayerData(player);
		data.getSkillDoor()[i] = true;
	}
	net_resrtSkilldoor(player: mw.Player) {
		player = this.currentPlayer
		let data = this.getPlayerData(player);
		let skillDoor = data.getSkillDoor();
		skillDoor = [false, false, false, false, false, false];
	}
}
