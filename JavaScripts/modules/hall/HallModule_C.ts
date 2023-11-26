
import { TimeUtilTool } from "../../utils/Tools";
import { HallDataHelper } from "./HallDataHelper";
import { HallModule_S } from "./HallModule_S";

export class HallModule_C extends ModuleC<HallModule_S, HallDataHelper>{



    onAwake(): void {

    }
    onStart(): void {

    }
    onRreloadAsset(sceneType: number): Promise<void> {
        return new Promise<void>((resolve) => {
            resolve();
        })
    }
    onEnterScene(sceneType: number): void {
        Player.localPlayer.character.displayName = "";

    }
    onUpdate(dt: number): void {

    }
    /////
    async setClientTime() {
        let serverTime = await this.server.net_RequestSeverTime();
        TimeUtilTool.setServerTime(serverTime);
    }
}