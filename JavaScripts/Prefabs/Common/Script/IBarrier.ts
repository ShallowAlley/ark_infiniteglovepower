/*
 * @Author       : Shuai.Wang
 * @Date         : 2022-10-12 15:38:21
 * @LastEditors  : Shuai.Wang
 * @LastEditTime : 2022-10-12 16:33:46
 * @FilePath     : \infiniteglovepower\Prefabs\Common\Script\IBarrier.ts
 * @Description  : 机关的基础行为接口
 */
export interface IBarrier {
    /**恢复 */
    resetPrefab: () => void;
    /**毁灭 */
    destroyPrefab: () => void;
    /**空间 */
    space?: (worldScale: number) => void;
    /**时间 */
    time?: (ratio: number) => void;
    /**力量 */
    power?: () => void;
    /**现实 */
    reality?: () => void;
    /**冥想 */
    mind?: () => void;
    /**
     * 控制机关移动
     * 关卡重置时、关卡初始化时调用
     * 第一个参数为boolean：true是可以开始移动(关卡开始)，false为停止移动(关卡回收)
     * 第二个参数为number：为关卡难度系数(小于等于1)。控制移动速度和旋转速度。难度越高，值越低。
     */
    moving?: (...param: any[]) => void;
}