export class TrapUtil {

    /**
     * 对单个物体进行缩放
     * @param obj 要缩放的物体
     * @param scaleX 缩放倍数
     * @param scaleTime 缩放时间
     * @param scaleType 缩放轴 x/y/z，不传就是所有轴都一起缩放（暂不支持只缩放其中两个轴）
     * @returns 缩放的计时器ID，可以用来自己取消（在外部业务逻辑回收的时候），一般不用管
     */
    public static scaleGameObject(obj: mw.GameObject, scaleX: number, scaleTime: number, scaleType?: string) {
        let objScale = obj.worldTransform.scale;
        let worldScale = new mw.Vector(objScale.x, objScale.y, objScale.z);

        let targetScale = scaleType ? worldScale[scaleType] * scaleX : worldScale.x * scaleX
        let sumTime = 0;
        let singleTime = 10;
        let singleAdd = scaleX / (scaleTime / singleTime);
        let intervalId = setInterval(() => {
            if (scaleType) {
                worldScale[scaleType] += singleAdd;
            } else {
                worldScale.x += singleAdd;
                worldScale.y += singleAdd;
                worldScale.z += singleAdd;
            }
            sumTime += singleTime;
            obj.worldTransform.scale = (worldScale);// = worldScale;
            // if (obj) obj.worldTransform.scale = worldScale;
            if (!obj) clearInterval(intervalId);
            if (worldScale.x > targetScale) {
                clearInterval(intervalId);
            }
        }, singleTime);
        return intervalId
    }

    /**
     * 根据传入的根节点，从该节点中遍历所有子节点并返回
     * @param parent 根节点
     * @param deep 查找的最深深度，默认为5
     * @param property 如果为空，返回的列表为子对象列表。如果该属性不为空，返回的列表将是子物体的该属性值列表
     * @returns 子对象列表或者子对象的属性值列表
     */
    public static getAllChild(parent: mw.GameObject, deep: number = 5, property: string = null): any[] {
        if (parent.getChildren().length <= 0 || deep <= 0) {
            // 没娃，就不遍历了
            return null;
        }
        let result: any[] = []
        for (let c of parent.getChildren()) {
            if (property) {
                result.push(c[property]);
            } else {
                result.push(c);
            }
            let cc = this.getAllChild(c, deep - 1, property);//拿到此子级的子级
            if (cc != null) {
                result.push(...cc)
            }
        }
        return result;
    }
}