/**与预制件的接口对应 */
export interface IBarrier {
    /**毁灭 */
    destroyPrefab: () => void;
    /**恢复 */
    resetPrefab: () => void;
    /**空间 */
    space?: (ratio:number) => void;
    /**时间 */
    time?: (ratio:number) => void;
    /**力量 */
    power?: () => void;
    /**现实 */
    reality?: () => void;
    /**冥想( */
    mind?: () => void;
    /**技能门类型列表*/
    setSkillType?(types: string[]): void;
    /**是否开启移动 */
    moving?: (isMoving: boolean, ratio: number) => void;
}