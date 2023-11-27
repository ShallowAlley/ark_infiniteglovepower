import { TimeUtilTool } from "../../utils/Tools";
import { HallDataHelper } from "./HallDataHelper";
import { HallModule_C } from "./HallModule_C";

export class HallModule_S extends ModuleS<HallModule_C, HallDataHelper> {

	onPlayerJoined(player: mw.Player): void {

	}
	onPlayerLeft(player: mw.Player): void {

	}

	onStart(): void {
	}
	net_RequestSeverTime() {
		let severTime = TimeUtilTool.getServerMillSecond();
		return severTime;
	}
	onUpdate(dt: number): void {

	}
}
