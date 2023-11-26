import { RotationTemp } from "../../../../../Common/Script/RotationTemp";

export default class SpileRotation extends RotationTemp {
    protected onStart(): void {
        this.type = 1;
        this.max = 180;
        this.min = 90;
        this.ros = "x";
        // to do 这个14太小了就不能运行了
        this.vt = 1;
        this.stayTime = 1000;
        this.trapName = "board";
        super.onStart();
        this.useUpdate = true;
    }

}