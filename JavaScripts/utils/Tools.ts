import { SpawnManager, SpawnInfo, } from '../Modified027Editor/ModifiedSpawn';
import { GameConfig } from "../config/GameConfig";
import { consts } from "../consts/ProLoadGuid";

/**
 * 获取多语言字符
 * @param key 多语言表key值
 * @param errorStr 如果没找到的替代文本
 * @param args 多语言格式化参数列表
 * @returns 
 */
export function Lanstr(key: string, errorStr: string, ...args: any[]): string {
    let ret: string = null;
    let languages = GameConfig.LangueConfig.getAllElement();
    for (let i = 0; i < languages.length; i++) {
        if (languages[i].Name == key) {
            ret = Tools.FormatString(languages[i].Value, ...args);
            break;
        }
    }
    if (!ret) {
        ret = Tools.FormatString(errorStr, ...args);//errorStr
    }
    return ret;
}

class Tools {
    /**
    * 设置UI组件的可见性
    * @param ui UI组件
    * @param isShow 是否显示
    * @param isBlock 下层是否响应事件（默认false）
    */
    static setMWGameUIVisibility<T extends mw.Widget>(ui: T, isShow: boolean, isBlock = false) {
        let visibilityType = isShow ?
            isBlock ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Visible
            : mw.SlateVisibility.Hidden;
        ui.visibility = (visibilityType);
    }

    static initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
     * 转化数组为向量
     * @param arr 长度为2或者3的数组
     */
    static convertArrToVec(arr: number[]) {
        if (arr.length > 3 || arr.length < 2) {
            return mw.Vector.zero;
        } else {
            if (arr.length === 2) {
                return new mw.Vector2(arr[0], arr[1]);
            } else {
                return new mw.Vector(arr[0], arr[1], arr[2]);
            }
        }
    }

    /**字符串格式化 */
    static FormatString(text: string, ...args: any[]) {
        return text.replace(/\{(\d+)\}/g, (text, index, ...parms) => {
            if (args[index] === 0) return 0;
            return args[index] || "undefined";
        });
    }

    /**将总秒数转为 [时，分，秒] 的数组 */
    static Seconds2Hour(second: number) {
        let minutes = second % 3600;
        let h = Math.floor(second / 3600);
        let m = Math.floor(minutes / 60);
        let s = minutes % 60;
        return [h, m, s];
    }


    /**限定值在范围内 */
    public static RoundNumber(value: number, min: number, max: number) {
        if (value > max) return min;
        if (value < min) return max;
        return value;
    }

    /**数字插值 */
    public static NumLerp(n1: number, n2: number, lerp: number): number {
        return n1 + (n2 - n1) * lerp;
    }

    /**向量的插值计算 */
    public static LerpVector(v1: mw.Vector, v2: mw.Vector, lerp: number): mw.Vector {
        if (lerp > 1) { lerp = 1; }
        if (lerp < 0) { lerp = 0; }

        let result = new mw.Vector(0, 0, 0);//  .ZERO;

        result.x = this.NumLerp(v1.x, v2.x, lerp);
        result.y = this.NumLerp(v1.y, v2.y, lerp);
        result.z = this.NumLerp(v1.z, v2.z, lerp);

        return result;
    }



    /**向量的插值计算 */
    // public static LerpVector(from: mw.Vector, to: mw.Vector, d: number): mw.Vector {

    // 	d = Math.min(d, 1);
    // 	let out = new mw.Vector(0, 0, 0);
    // 	let x1 = from.x;
    // 	let y1 = from.y;
    // 	let z1 = from.z;

    // 	let x2 = to.x;
    // 	let y2 = to.y;
    // 	let z2 = to.z;

    // 	let distance = 1;
    // 	out.x = x1 + ((x2 - x1) / distance) * d;
    // 	out.y = y1 + ((y2 - y1) / distance) * d;
    // 	out.z = z1 + ((z2 - z1) / distance) * d;
    // 	return out;
    // }
    /**角度的插值计算 */
    // public static LerpRotation(from: mw.Rotation, to: mw.Rotation, percent: number): mw.Rotation {
    //     let out = new mw.Rotation();
    //     let qfrom = new UE.Quat(new UE.Rotator(from.x, from.y, from.z));
    //     let qto = new UE.Quat(new UE.Rotator(to.x, to.y, to.z));
    //     let lerpq = UE.Quat.Slerp(qfrom, qto, percent).Rotator();//球形差值
    //     out.x = lerpq.Pitch;
    //     out.y = lerpq.Yaw;
    //     out.z = lerpq.Roll;
    //     return out;
    // }
    /**
    * 计算两点距离
    * @param from 初始坐标
    * @param to 目标坐标
    * @returns 距离
    */
    public static Distance(from: mw.Vector, to: mw.Vector, isPlane: boolean = false): number {
        let x1 = from.x;
        let y1 = from.y;
        let z1 = from.z;
        let x2 = to.x;
        let y2 = to.y;
        let z2 = to.z;
        let distance: number;
        let num = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
        if (!isPlane) {
            num += (z1 - z2) * (z1 - z2);
        }
        distance = Math.sqrt(num);
        if (distance < 0) {
            distance = 0;
        }
        return distance;
    }

    /**
    * 计算两点距离的平方
    * @param from 初始坐标
    * @param to 目标坐标
    * @returns 距离的平方
    */
    public static DistancePow(from: mw.Vector, to: mw.Vector, isPlane: boolean = false): number {
        let x1 = from.x;
        let y1 = from.y;
        let z1 = from.z;
        let x2 = to.x;
        let y2 = to.y;
        let z2 = to.z;
        let distance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
        if (!isPlane) {
            distance += (z1 - z2) * (z1 - z2);
        }
        if (distance < 0) {
            distance = 0;
        }
        return distance;
    }

    /**
     * 简单两点三维是否在一定距离内
     * @param checkDis 检查距离
     * @param isPlane 是否只检查平面
     */
    public static CheckRect(p1: mw.Vector, p2: mw.Vector, checkDis: number, isPlane: boolean = false): boolean {
        if (Math.abs(p1.x - p2.x) > checkDis) { return false; }
        if (Math.abs(p1.y - p2.y) > checkDis) { return false; }
        if (!isPlane) {
            if (Math.abs(p1.z - p2.z) > checkDis) { return false; }
        }

        return true;

    }


    /**随机浮点数 [min,max) */
    public static RangeFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    /**随机整数 */
    public static RangeInt(min: number, max: number): number {
        return Math.floor(Tools.RangeFloat(min, max));
    }

    /**
     * 获取介于范围内的整数(包含边界)
     * @param min 最小值(整)
     * @param max 最大值(整)
     * @example
     * [5,10] => 8
     * [5,10] => 10
     * [5,10] => 5
     */
    public static randomBetweenMinAndMax(min: number, max: number) {
        let v = Math.floor((max - min + 1) * Math.random());
        return Math.floor(min + v);
    }

    public static CombinationString(from: string, insert: string[]): string {
        for (let i of insert) {
            from = from.replace(/@/, i);
        }
        return from;
    }


    /**开启一个循环定时器，异步查找一个游戏物体，每100毫秒找一次，一直找到为止 */
    public static async AsyncFind(guid: string): Promise<mw.GameObject> {
        const gameObject = GameObject.findGameObjectById(guid);
        if (gameObject) return gameObject;
        return new Promise((resolve) => {
            let inter = setInterval(() => {
                const gameObject = GameObject.findGameObjectById(guid);
                if (gameObject) {
                    clearInterval(inter);
                    resolve(gameObject);
                }
            }, 100);
        });
    }
    /**
     * 提取一个对象所有成员转化为字符串，用于打印显示
     * @param object 被提取的对象
     * @param showFunc 是否显示函数成员
     * @param deep 递归深度，最多5层
     */
    public static DumpObject(object: any, showFunc: boolean = false, deep: number = 5) {
        if (object == null || object == undefined) {
            if (typeof (object) == "object") {
                return "null";
            }
            return String(object);
        }
        if (typeof (object) != "object") {
            return String(object);
        }
        deep = Math.min(5, deep);//最多递归5层
        let spaceLength = Math.abs(deep - 5) * 2;//空格数量
        let space = "";
        for (let i = 0; i < spaceLength; i++) {
            space += " ";
        }
        let result = "\n" + space + "{";
        if (object instanceof Map)//本身是Map对象
        {
            result += "\n" + space;
            if (deep <= 0) {
                result += `(Map):${object}`;
            }
            else {
                result += "(Map):";
                for (let key of object.keys()) {
                    result += "\n" + space + ` [${key}]:${Tools.DumpObject(object.get(key), showFunc, deep - 1)}`;
                }
            }
        }
        else {
            for (let k in object) {

                if (object[k] instanceof Map)//是一个map对象
                {
                    result += "\n" + space;
                    //递归深度到底
                    if (deep <= 0) {
                        result += `${k}(Map):${object[k]}`;
                    }
                    else {
                        result += k + "(Map):";
                        // result += "\n{";
                        for (let key of object[k].keys()) {
                            result += "\n" + space + ` [${key}]:${Tools.DumpObject(object[k].get(key), showFunc, deep - 1)}`;
                        }
                        // result += "\n}"
                    }
                }
                //是一个对象成员，再次递归
                else if (typeof (object[k]) == "object") {
                    result += "\n" + space;
                    //递归深度到底
                    if (deep <= 0) {
                        result += `${k}:${object[k]}`;
                    }
                    else {
                        result += `${k}:${Tools.DumpObject(object[k], showFunc, deep - 1)}`;
                    }
                }
                else if (typeof (object[k]) == "function") {
                    if (showFunc) {
                        result += "\n" + space;
                        result += `${k}:function`;
                    }
                    else {
                        continue;
                    }
                }
                else {
                    result += "\n" + space;
                    result += `${k}:${object[k]}`;
                }
                // result += "\n" + space;
            }
        }

        result += "\n" + space + "}";
        return result;
    }

    public static Vec3Dot(vec1: mw.Vector, vec2: mw.Vector) {
        return vec1.x * vec2.x + vec1.y * vec1.y;
    }

    /**
     * 根据不用概率取值
     * @param arr 对象列表,rate:概率
     * @returns 随机结果
     */
    public static RandomObjByRate<T>(arr: { obj: any, rate: number; }[]) {
        let totalRate = 0;
        arr.forEach(element => {
            totalRate += element.rate;
        });

        let randomValue = Math.floor(Math.random() * totalRate);

        let left = 0, right = 0, index = -1;
        for (let i = 0; i < arr.length; ++i) {
            left = right;
            right = left + arr[i].rate;

            if (left <= randomValue && randomValue < right) {
                index = i;
                break;
            }
        }
        return arr[index].obj as T;
    }

    /**
     * 旋转一个二维向量
     * @param vec2 向量
     * @param angle 角度
     * @returns 旋转后的向量
     */
    public static RotationVecter2(vec2: mw.Vector2, angle: number) {
        let rad = angle / 180 * Math.PI;
        let x = vec2.x * Math.cos(rad) - vec2.y * Math.sin(rad);
        let y = vec2.x * Math.sin(rad) + vec2.y * Math.cos(rad);
        return new mw.Vector2(x, y);
    }

    /**
     * 创建游戏物体身上的触发器
     * @param gameObject 触发器游戏物体
     * @param useSelf 如果自身为触发器，是否直接使用自身
     * @param sync 如果在服务器上使用此函数，是否同步
     * @returns
     */
    public static createTriggerToGameObject(gameObject: mw.GameObject, useSelf: boolean = true, sync: boolean = false): mw.Trigger {
        let trigger: mw.Trigger = null;
        if (gameObject instanceof mw.Trigger && useSelf) //如果本身是一个触发器,且允许使用自身作为返回
        {
            trigger = gameObject as mw.Trigger;
        }
        else {
            trigger = SpawnManager.wornSpawn("113", sync) as mw.Trigger;
            trigger.name = gameObject.name + "_Trigger";
            trigger.localTransform.scale = (gameObject.localTransform.scale.multiply(1.2));//触发器比本体稍微大一点
            trigger.parent = (gameObject);
            trigger.localTransform.position = (new mw.Vector(0, 0, 50));
            trigger.localTransform.rotation = (mw.Rotation.zero);
        }
        trigger.enabled = (true);
        return trigger;
    }

    /**根据条件，移除数组内的一些元素，其余元素依次补全索引位 */
    public static ArrayRemoveBy<T>(array: Array<T>, callbackfn: (arg: T) => boolean): void {
        for (let i = array.length - 1; i >= 0; i--) {
            if (callbackfn(array[i])) {
                array.splice(i, 1);
            }
        }
    }

    /**数组去重，以及特定元素，返回新数组 */
    public static ArrayUnLink<T>(array: Array<T>, ...args: T[]) {
        let result: Array<T> = []
        for (let i = 0; i < array.length; i++) {
            if (!result.includes(array[i]) && !args.includes(array[i])) {
                result.push(array[i]);
            }
        }
    }

    /**异步函数内使用，等待一段时间(毫秒) */
    public static sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    /**
    * 获取物体的所有子级(包含子级的子级，不包含自身)
    * @param parent 父节点
    * @param deep 查找深度
    * @param property 特定查找成员名，没有则返回游戏物体本身
    * @returns 
    */
    public static getAllChild(parent: mw.GameObject, deep: number = 5, property: string = null): any[] {
        if (parent.getChildren().length <= 0 || deep <= 0) {
            return null;
        }
        else {
            let result: any[] = []
            for (let c of parent.getChildren()) {
                if (property) {
                    result.push(c[property as keyof typeof c]);
                }
                else {
                    result.push(c);
                }
                // result.push(c);//加上本身
                let cc = this.getAllChild(c, deep - 1, property);//拿到此子级的子级
                if (cc != null) {
                    result = result.concat(cc);
                }
            }
            return result;
        }
    }
    /**
     * 修改某节点及其所有子节点tag-默认查找深度为5
     * @param parent 节点
     * @param tag 目标tag
     */
    public static changeObjTag(parent: mw.GameObject, tag: string) {
        let allChild = this.getAllChild(parent);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) obj.setCollision(mw.PropertyStatus.On);
            obj.tag = tag;
        })

    }
    /**
     * 贝塞尔曲线
     * 给出一组点，算出的这个曲线在某个阶段的值
     * @param points 曲线点参数组
     * @param lerp 0-1的插值
     */
    public static Bezier(points: mw.Vector[], lerp: number): mw.Vector {
        lerp = this.RoundNumber(lerp, 0, 1);
        if (points.length == 2)//只有2个点时，直接返回插值点
        {
            return this.LerpVector(points[0], points[1], lerp);
        }
        let nextArray: mw.Vector[] = [];
        for (let i = 0; i < points.length - 1; i++) {
            let pointA = points[i];
            let pointB = points[i + 1];
            let lerpPoint = this.LerpVector(pointA, pointB, lerp);
            nextArray.push(lerpPoint);
        }
        return this.Bezier(nextArray, lerp);
    }

    /**根据圆心和半径，单位角度，获取圆上的坐标点集合 */
    public static getCirclePoints(center: mw.Vector, radius: number, step: number) {
        let result: mw.Vector[] = [];
        let [x0, y0] = [center.x, center.y];
        for (let angle: number = 0; angle < 360; angle += step) {
            let radian = angle * (Math.PI / 180);
            let x = radius * Math.cos(radian);
            let y = radius * Math.sin(radian);
            result.push(new mw.Vector(x, y, consts.powerBallHight));
        }
        return result;
    }
    /**
     * 根据权重配表获取刷新道具
     * @param arr 
     * @returns 
     */
    public static getRamdomIndexByWeight(arr: number[][]): number {
        let allWet: number = 0;
        for (let i = 0; i < arr.length; i++) {
            allWet += arr[i][1]; //权值总和
        }
        let random = Math.floor(Math.random() * allWet);
        let weight: number = 0;
        for (let i = 0; i < arr.length; i++) {
            weight += arr[i][1];
            if (weight >= random) {
                return i + 1;
            }
        }
        return 0;
    }
    /**
     * 返回触发器角色
     * @param gameObject 
     * @returns 
     */
    static triggerCharacter(gameObject: mw.GameObject) {
        if ((gameObject) instanceof mw.Character) {
            return (gameObject as mw.Character).player;
        }
        return null;
    }
    /**
 * 异步寻找一个物体
 * @param guid 
 * @param timeout 
 * @returns 
 */
    public static async asyncFindGo<T extends mw.GameObject>(guid: string, timeout: number = 10): Promise<T> {
        const gameObject = GameObject.findGameObjectById(guid);
        if (gameObject) return gameObject as T;
        return new Promise((resolve, reject) => {
            let inter = setInterval(() => {
                const gameObject = Tools.findGo<T>(guid);
                if (gameObject) {
                    resolve(gameObject);
                    clearInterval(inter);
                } else {
                    timeout--;
                    if (timeout == 0) {
                        reject();
                        clearInterval(inter);
                    }
                }
            }, 100)
        });
    }
    /**
 * 寻找一个物体
 */
    static findGo<T extends mw.GameObject>(guid: string) {
        return GameObject.findGameObjectById(guid) as T;
    }
    /**设置角色的移动为给定轴移动 */
    static setCharacterMoveInput(dir: mw.Vector, character: mw.Character | mw.Character) {
        character.movementAxisDirection = dir;
        character.movementDirection = mw.MovementDirection.AxisDirection;
    }
    /**
     * 扩宽物体 ：暂定X轴
     * @param obj 扩宽的物体
     * @param addwWidScale 扩增的倍数
     */
    static timeBroadenObj(obj: mw.GameObject, addWidScale: number) {
        let worldScale = new mw.Vector(obj.worldTransform.scale.x, obj.worldTransform.scale.y, obj.worldTransform.scale.z);
        let sumTime = 0;
        let singleTime = 10;
        let singleAdd = addWidScale / (consts.spaceNeedTime / singleTime);
        let k = setInterval(() => {
            worldScale.x += singleAdd;
            sumTime += singleTime;
            obj.worldTransform.scale = (worldScale);// = worldScale;
            if (obj) obj.worldTransform.scale = (worldScale)
            if (!obj) clearInterval(k);
            if (sumTime >= consts.spaceNeedTime) {
                clearInterval(k);
            }
        }, singleTime);
    }
    /**
 * 放大物体 
 * @param obj 放大的物体
 * @param addwWidScale 扩增的倍数
 */
    static timeBigObj(obj: mw.GameObject, addWidScale: number) {
        let worldScale = new mw.Vector(obj.worldTransform.scale.x, obj.worldTransform.scale.y, obj.worldTransform.scale.z);
        let sumTime = 0;
        let singleTime = 10;
        let singleAdd = addWidScale / (consts.spaceNeedTime / singleTime);
        let k = setInterval(() => {
            worldScale.x += singleAdd;
            worldScale.y += singleAdd;
            worldScale.z += singleAdd;
            sumTime += singleTime;
            if (obj) obj.worldTransform.scale = (worldScale);// = worldScale;
            if (!obj) clearInterval(k);
            if (sumTime >= consts.spaceNeedTime) {
                clearInterval(k);
            }
        }, singleTime);
    }
    /**
     * 获取目标uI位置（在自己坐标系的位置转化）
     * @param ui 目标ui
     * @param moveUI 移动UI
     * @returns 
     */
    static getUIWorldPos(ui: mw.Widget, moveUI: mw.Widget): mw.Vector2 {
        let pos = ui.position.clone();
        while (ui.parent && ui.parent) {
            ui = ui.parent;
            let tapos = ui.position.clone();
            pos.x += tapos.x;
            pos.y += tapos.y;
        }
        let subPos = new mw.Vector2(0, 0);
        if (moveUI.parent) {
            while (moveUI.parent && moveUI.parent) {
                moveUI = moveUI.parent;
                subPos.x += moveUI.position.x;
                subPos.y += moveUI.position.y;
            }
        }
        pos.x -= subPos.x;
        pos.y -= subPos.y;
        return pos;
    }
    /**开启震动 */
    static playDynamic(dur: number) {
        mw.vibrate(true);
        setTimeout(() => {
            mw.vibrate(false);
        }, dur);
    }
}
export default Tools;

export namespace TimeUtilTool {

    export function startUp() {
        startTime = new Date().getTime();
        elapsedTime = mw.TimeUtil.elapsedTime() * 1000;
    }
    let startTime: number = 0;
    let timeDiff: number = 0;
    let elapsedTime: number = 0;
    export function getServerMillSecond() {
        let pas = mw.TimeUtil.elapsedTime() * 1000;
        let ret = startTime + (pas - elapsedTime);
        if (mw.SystemUtil.isClient()) {
            ret += timeDiff;
        }
        return ret;
    }
    /**
     * 设置服务器时间
     * @param time 毫秒
     */
    export function setServerTime(time: number) {
        if (mw.SystemUtil.isClient()) {
            timeDiff = time - getServerMillSecond();
        }
    }
    export function seconds2Hour(second: number) {
        let minutes = second % 3600;
        let h = Math.floor(second / 3600);
        let m = Math.floor(minutes / 60);
        let s = minutes % 60;
        return [h < 10 ? ("0" + h) : h, m < 10 ? ("0" + m) : m, s < 10 ? ("0" + s) : s];
    }
}