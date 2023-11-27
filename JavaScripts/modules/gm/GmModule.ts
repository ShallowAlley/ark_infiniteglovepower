
// import { AddGMCommand, DropdownItem, DropdownList, GMBasePanel, GMData, GMService } from "module_gm";
// import GMHUD from "../../gm/GMHUD";
// import GMItem from "../../gm/GMItem";
// import SkillPanelUI from "../../ui/SkillPanelUI";
// import LevelModuleC from "../level/module/LevelModuleC";
// import { PlayerModuleC } from "../player/PlayerModuleC";
// import { SkillType } from "../skill/SkillDataHelper";
// import { SkillModule_C } from "../skill/SkillModule_C";


// export class GMBasePanelUI extends GMBasePanel<GMHUD, GMItem> {
//     constructor() {
//         super(GMHUD, GMItem)
//     }
//     // protected override onStart() {
//     //     this.dropDownList = new DropdownList({ panel: this.dropList, button: this.oKbutton, label: this.cmdButton, tag: this.argText }, UIGMItem, 5);
//     //     GMService.instance.createUI(this.dropDownList);
//     //     this.cmdButton.onClicked().add(() => {
//     //         GMService.instance.cmd(this.dropDownList.selectItem.data, this.argText.getText());
//     //     });
//     // }
// }

// AddGMCommand("打开技能面板", () => {
//     // mw.instance.showPanel(SkillPanelUI);
//     mw.UIService.show(SkillPanelUI);
// }, null);
// AddGMCommand("新增技能点", (player, value) => {
//     let values = value.split(",");
//     let type = parseInt(values[0]);
//     let num = parseInt(values[1]);
//     ModuleService.getModule(SkillModule_C).net_SkillPointGet(type, num);
// }, null);
// AddGMCommand("通关", (player, value) => {
//     if (value === '') return;
//     ModuleService.getModule(LevelModuleC).passGame();
// }, null);

// AddGMCommand("获取技能宝石", (player, value) => {
//     let type = parseInt(value);
//     if (!isNaN(type)) {
//         ModuleService.getModule(SkillModule_C).net_GetSkill(type);
//     }
// }, null);
// AddGMCommand('传送到测试关卡', () => {
//     startTestGame().forEach(s => {
//         s.moving && s.moving(true, 1);
//     });
//     ModuleService.getModule(PlayerModuleC).net_PlayerMovePosition(new mw.Vector(8060, 6300, 300));
// });

// AddGMCommand('技能测试', (player, value) => {
//     if (value === '') return;

//     const allScript = startTestGame();

//     const v = +value;
//     ModuleService.getModule(SkillModule_C).net_GetSkill(v);
//     switch (v) {
//         case SkillType.Power:
//             oTrace('power')
//             allScript.forEach(s => {
//                 s.power && s.power();
//             });
//             break;
//         case SkillType.Heart:
//             break;
//         case SkillType.Time:
//             oTrace('time')
//             allScript.forEach(s => {
//                 s.time && s.time(0.1);
//             });
//             break;
//         case SkillType.Space:
//             oTrace('space')
//             allScript.forEach(s => {
//                 s.space && s.space(2);
//             });
//             break;
//         case SkillType.Reality:
//             oTrace('reality')
//             allScript.forEach(s => {
//                 s.reality && s.reality();
//             });
//             break;
//         case SkillType.Soul:
//             oTrace('soul')
//             allScript.forEach(s => {
//                 s.destroyPrefab && s.destroyPrefab();
//             });
//             break;
//     }
// });


// AddGMCommand('重置场景', (player, value) => {
//     if (value === '') return;

//     startTestGame().forEach(s => {
//         s.resetPrefab && s.resetPrefab();
//     });

//     ModuleService.getModule(PlayerModuleC).net_PlayerMovePosition(new mw.Vector(8060, 6300, 300));
// });


// const arr = [
//     'A0457A93409D416B0B9CCDA0094DA6E6DE1ED0F84E7D8A8D1B86D3B757485924',
//     'B2460D0341217A764E171EA2B7E8791BA9696B0A410BD56F74266F99BB188EBA',
//     'D51DF9F84BAE6E11BC36DD8144AA71F20AF255524B4410EE5BD9849DD437F8B9',
//     'A0462F0741BA99348F096BA8396719D087BF608642D092CADBD8ADB217B83944',
//     '4D71DDA240689604A2AAC9A09CAB6E7544171A9348FBF792B20D1E94154C3EB8',
//     'A58DDD5A46875ED0B3E6C4BBD79358D94FB6643142D892241A6BA9BAB3067C29',
//     'AE7733EC4EB53CFEA9DAF2AD287BE6D2F61F18F1472B0A8E013E6F8176991354',
//     'F47A37D84E16EA37E88A4BA1A7B3770999062796437FA1B33AC7CEB26B1968AB',
//     '25B141BD48DCFD48B72181B36A42BB41819779F146EE87B6E5A002B83581D5CC',
//     '5396907B484E4EF6C57D6586A0881EE8E766CFAE47E431150DF7F2B0E157247E',
//     'E44706D249BF2E492DCBF9A5C2D64852DA7366BA4304C608739F4C97515B285C',
//     '68CB192F421C4080B6A570B8E11D26BA4E7D672F4A25C0A141E883A44C97E67B',
//     'BBC220B64541AA0C1DB411BA49E86AF6009E85A84E35F7D2512BC8BD2B0897C9',
//     'B91F9189499786C6A5A71AA214921EEDA0A14D634419B3F46A675C800C9294FB',
//     '57B202524EF4B9FA4DA44D86F9CBD252DF736F444F82C0A2980709B5DA2B8C81',
// ]

// export function startTestGame() {
//     const allScript = [];
//     arr.forEach(s => {
//         const scr = mw.ScriptManager.findScript(s);
//         if (scr) {
//             allScript.push(scr);
//         }
//     });

//     return allScript;
// }