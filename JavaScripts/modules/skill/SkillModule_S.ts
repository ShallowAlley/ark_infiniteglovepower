import { SkillDataHelper, SkillType } from "./SkillDataHelper";
import { SkillModule_C } from "./SkillModule_C";

export class SkillModule_S extends ModuleS<SkillModule_C, SkillDataHelper> {

    onAwake(): void {

    }
    onPlayerLeft(player: mw.Player): void {

    }
    /**
    * 获取某技能的技能点
    * @param type 技能类型
    * @param num 获得的技能点数量
    */
    net_SkillPointGet(type: SkillType, num: number, player?: mw.Player) {
        let data = this.getPlayerData(player);
        if (data) data.skillHavePointGet(type, num);
    }
    /**
 * 技能使用技能点添加
 * @param type 
 */
    net_SkillLvUpPoint(type: SkillType, player?: mw.Player) {
        let data = this.getPlayerData(player);
        if (data) data.skillUsePoint(type);
    }
    /**
     * 技能升级
     * @param type 技能类型 
     * @param player 
     */
    net_SkillLvUp(type: SkillType, player?: mw.Player) {
        let data = this.getPlayerData(player);
        if (data) data.skillLvUp(type);
    }
    /**技能宝石设置 */
    net_SetGatherSkills(type: SkillType, player?: mw.Player) {
        let data = this.getPlayerData(player);
        if (data) {
            data.setSkillGem(type);
        }
    }

}
