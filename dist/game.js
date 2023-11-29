'use strict';

var foreign0 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

//配置的基类
class ConfigBase {
    constructor(excelData) {
        this.ELEMENTARR = [];
        this.ELEMENTMAP = new Map();
        this.KEYMAP = new Map();
        let headerLine = 2; //表头的行数
        this.ELEMENTARR = new Array(excelData.length - headerLine);
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
            this.ELEMENTARR[i] = {};
        }
        let column = excelData[0].length; //列数
        for (let j = 0; j < column; j++) { //遍历各列
            let name = excelData[0][j];
            let tags = excelData[1][j].split('|');
            if (tags.includes(ConfigBase.TAG_CHILDLANGUAGE))
                continue;
            let jOffect = 0; //列偏移量
            if (tags.includes(ConfigBase.TAG_MAINLANGUAGE)) {
                let index = j + ConfigBase.languageIndex;
                let targetTags = excelData[1][index].split('|');
                if (index < column && targetTags.includes(ConfigBase.TAG_CHILDLANGUAGE)) {
                    jOffect = ConfigBase.languageIndex;
                }
            }
            let hasTag_Key = tags.includes(ConfigBase.TAG_KEY);
            let hasTag_Language = tags.includes(ConfigBase.TAG_LANGUAGE);
            for (let i = 0; i < this.ELEMENTARR.length; i++) {
                let ele = this.ELEMENTARR[i];
                let value = excelData[i + headerLine][j + jOffect];
                if (j == 0) { //ID
                    this.ELEMENTMAP.set(value, ele);
                }
                else {
                    if (hasTag_Key) {
                        this.KEYMAP.set(value, excelData[i + headerLine][0]);
                    }
                    if (hasTag_Language) {
                        if (ConfigBase.getLanguage != null) {
                            value = ConfigBase.getLanguage(value);
                        }
                        else {
                            value = "unknow";
                        }
                    }
                }
                ele[name] = value;
            }
        }
    }
    //设置获取语言的方法
    static initLanguage(languageIndex, getLanguageFun) {
        ConfigBase.languageIndex = languageIndex;
        ConfigBase.getLanguage = getLanguageFun;
        if (ConfigBase.languageIndex < 0) {
            ConfigBase.languageIndex = ConfigBase.getSystemLanguageIndex();
        }
    }
    //获取系统语言索引
    static getSystemLanguageIndex() {
        let language = LocaleUtil.getDefaultLocale().toString().toLowerCase();
        if (!!language.match("en")) {
            return 0;
        }
        if (!!language.match("zh")) {
            return 1;
        }
        if (!!language.match("ja")) {
            return 2;
        }
        if (!!language.match("de")) {
            return 3;
        }
        return 0;
    }
    /**
    * 根据id获取一个元素
    * @param id id|key
    * @returns Element
    */
    getElement(id) {
        let ele = this.ELEMENTMAP.get(Number(id)) || this.ELEMENTMAP.get(this.KEYMAP.get(id));
        if (ele == null) {
            console.warn(this.constructor.name + "配置表中找不到元素 id:" + id);
        }
        return ele;
    }
    /**
    * 根据字段名和字段值查找一个元素
    * @param fieldName 字段名
    * @param fieldValue 字段值
    * @returns 第一个找到的Element
    */
    findElement(fieldName, fieldValue) {
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
            if (this.ELEMENTARR[i][fieldName] == fieldValue) {
                return this.ELEMENTARR[i];
            }
        }
    }
    /**
    * 根据字段名和字段值查找一组元素
    * @param fieldName 字段名
    * @param fieldValue 字段值
    * @returns 所有符合要求的Element
    */
    findElements(fieldName, fieldValue) {
        let arr = [];
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
            if (this.ELEMENTARR[i][fieldName] == fieldValue) {
                arr.push(this.ELEMENTARR[i]);
            }
        }
        return arr;
    }
    /**获取所有元素*/
    getAllElement() {
        return this.ELEMENTARR;
    }
}
ConfigBase.TAG_KEY = 'Key'; //读取键(除了ID之外的别名，带key的字段必须是string类型)
ConfigBase.TAG_LANGUAGE = 'Language'; //关联语言表的id或key(如果有这个tag，导表工具要把数据生成为string类型，因为会自动进行值的转换)
ConfigBase.TAG_MAINLANGUAGE = 'MainLanguage'; //主语言tag
ConfigBase.TAG_CHILDLANGUAGE = 'ChildLanguage'; //子语言tag
ConfigBase.languageIndex = 0;

var foreign1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ConfigBase: ConfigBase
});

const EXCELDATA$9 = [["ID", "textColor", "skillName", "skillTexture", "name"], ["", "", "", "", "Language"], [101, "5401C2FF", "Power", "94242", "DoorColor_1"], [102, "003CAEFF", "Space", "94243", "DoorColor_2"], [103, "C2010FFF", "Reality", "94245", "DoorColor_3"], [104, "005701FF", "Time", "94247", "DoorColor_4"], [105, "CF8700FF", "Mind", "94257", "DoorColor_5"], [106, "CF1D00FF", "Soul", "94251", "DoorColor_6"]];
class DoorColorConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$9);
    }
}

var foreign2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DoorColorConfig: DoorColorConfig
});

const EXCELDATA$8 = [["ID", "skillValue", "upgradeCost", "pointID", "des", "effect"], ["", "", "", "", "", ""], [1, [2, 3, 4, 5, 6], [0, 2, 3, 4, 5], 0, "力量：数值代表当前等级的球的数目", "197462"], [2, [1.3, 1.4, 1.6, 1.8, 2], [0, 2, 3, 4, 5], 0, "空间：数值代表路面扩宽和部分机关放大的倍数", "197467"], [3, [0.45, 0.55, 0.65, 0.75, 0.9], [0, 2, 3, 4, 5], 0, "现实：数值代表单个机关无效化的概率", "197464"], [4, [0.45, 0.35, 0.25, 0.15, 0.05], [0, 2, 3, 4, 5], 0, "时间：数值×基础速度为新速度", "197469"], [5, [0], [0], 0, "心灵", "197470"], [6, [0], [0], 0, "灵魂", "197460"]];
class GemSkillConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$8);
    }
}

var foreign4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GemSkillConfig: GemSkillConfig
});

const EXCELDATA$7 = [["id", "des", "parameter1", "parameter2", "parameter3"], ["", "tag", "tag", "tag", "tag"], [101, "关卡终点坐标", 0, [8600, 0, 70], null], [102, "最后一个机关到关卡终点的距离", 400, null, null], [103, "出生点到第一个机关距离", 400, null, null], [104, "局内摄像参数", 0, null, null], [105, "不同机关类型之间的距离", 300, null, null], [106, "技能门之前的距离", 400, null, null], [107, "技能门之后的距离", 400, null, null]];
class GlobalConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$7);
    }
}

var foreign5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GlobalConfig: GlobalConfig
});

const EXCELDATA$6 = [["id", "level", "born", "prefabID", "prefabPos"], ["", "", "", "", ""], [1001, 1, [4400, 0, 230], [1015, 1015, 1015, 1015, 1015, 1015, 1015, 1015, 1015, 1015, 112, 1001, 1001, 1001, 1001, 1001, 1001, 114], [[8000, -175, 70], [8000, 175, 70], [7800, -175, 70], [7800, 175, 70], [7600, -175, 70], [7600, 175, 70], [7400, -175, 70], [7400, 175, 70], [7200, -175, 70], [7200, 175, 70], [6800, 0, 70], [6500, 0, 70], [6250, 0, 70], [6000, 0, 70], [5750, 0, 70], [5500, 0, 70], [5250, 0, 70], [4800, 0, 70]]], [1002, 2, [4000, 0, 230], [1013, 1013, 1013, 1013, 1013, 113, 1015, 1015, 1001, 1015, 1015, 1001, 1015, 1015, 1020, 1019, 115], [[8200, 0, 70], [7900, 0, 70], [7600, 0, 70], [7300, 0, 70], [7000, 0, 70], [6500, 0, 70], [6200, 175, 70], [6200, -175, 70], [6000, 0, 70], [5850, -175, 70], [5700, 175, 70], [5500, 0, 70], [5300, -175, 70], [5300, 175, 70], [5000, 0, 70], [4750, -145, 70], [4400, 0, 70]]], [1003, 3, [1400, 0, 230], [1001, 1001, 1001, 1001, 1013, 1013, 1013, 1013, 111, 1008, 1008, 1008, 1016, 1016, 112], [[8200, 0, 70], [8000, 0, 70], [7800, 0, 70], [7600, 0, 70], [7350, 0, 70], [7100, 0, 70], [6850, 0, 70], [6600, 0, 70], [6200, 0, 70], [5500, 0, 70], [5000, 0, 70], [4500, 0, 70], [3200, 0, 70], [2200, 0, 70], [1800, 0, 70]]], [1004, 4, [2400, 0, 230], [1022, 1022, 1023, 1023, 1021, 1021, 113, 1001, 1001, 1001, 1001, 1001, 1015, 1015, 1015, 1015, 1015, 1015, 121], [[8000, 0, 70], [7400, 0, 70], [6700, -245, 70], [6300, 245, 70], [6000, -245, 70], [5600, 245, 70], [5000, 0, 70], [4600, 0, 70], [4400, 0, 70], [4200, 0, 70], [4000, 0, 70], [3800, 0, 70], [3600, 175, 70], [3600, -175, 70], [3400, 175, 70], [3400, -175, 70], [3200, 175, 70], [3200, -175, 70], [2800, 0, 70]]], [1005, 5, [4400, 0, 230], [1013, 1013, 1011, 1011, 1015, 1015, 1015, 111, 113, 1017, 1017, 115], [[8200, 0, 70], [7900, 0, 70], [7650, 0, 70], [7450, 0, 70], [7250, 0, 70], [7050, -175, 70], [7050, 175, 70], [6700, 0, 70], [6400, 0, 70], [6000, 0, 70], [5400, 0, 70], [4800, 0, 70]]], [1006, 6, [1500, 0, 230], [1015, 1015, 1015, 1015, 1015, 1001, 1001, 1001, 1011, 1011, 1011, 1018, 1018, 116, 115, 114, 113, 1001, 1001, 1001, 1010, 112, 111], [[8400, 175, 70], [8400, -175, 70], [8250, 0, 70], [8100, 175, 70], [8100, -175, 70], [8000, 0, 70], [7850, 0, 70], [7700, 0, 70], [7600, 0, 70], [7500, 0, 70], [7400, 0, 70], [7250, -165, 70], [7050, 165, 70], [6450, 0, 70], [5800, -165, 70], [5250, 165, 70], [4750, 0, 70], [4200, 0, 70], [3800, 0, 70], [3400, 0, 70], [2800, 0, 70], [2400, 0, 70], [1900, 0, 70]]], [1007, 10, [250, 0, 230], [1010, 1015, 1015, 1001, 1015, 1015, 1018, 1018, 1018, 1021, 1008, 116, 111, 1022, 1008, 123, 123, 1017, 132, 1004, 1004, 1004, 114], [[8200, 0, 70], [7850, 170, 70], [7850, -170, 70], [7650, 0, 70], [7450, 170, 70], [7450, -170, 70], [7200, 0, 70], [6900, -175, 70], [6900, 175, 70], [6450, 0, 70], [6100, 0, 70], [5300, 0, 70], [4850, 0, 70], [4400, 0, 70], [4050, 0, 70], [3450, 0, 70], [2900, 0, 70], [2400, 0, 70], [1800, 0, 70], [1450, 0, 70], [1250, 0, 70], [1050, 0, 70], [650, 0, 70]]], [1008, 13, [1100, 0, 230], [1013, 1013, 1013, 1014, 1014, 1014, 1014, 1020, 1020, 1020, 1024, 1024, 116, 121, 122, 115, 121, 122], [[8000, 0, 70], [7600, 0, 70], [7200, 0, 70], [6800, -145, 70], [6800, 145, 70], [6700, 145, 70], [6700, -145, 70], [6400, 0, 70], [6100, 0, 70], [5800, 0, 70], [5500, 0, 70], [5300, 0, 70], [4500, 0, 70], [3700, 0, 70], [3100, 0, 70], [2500, 0, 70], [2000, 0, 70], [1500, 0, 70]]], [1009, 17, [-500, 0, 230], [1001, 1001, 1001, 1014, 1014, 1014, 1014, 1004, 1004, 1004, 1024, 1024, 116, 115, 114, 113, 112, 1025, 1025, 1025, 1025, 111], [[8000, 0, 70], [7600, 0, 70], [7200, 0, 70], [6800, -145, 70], [6800, 145, 70], [6700, 145, 70], [6700, -145, 70], [6400, 0, 70], [6100, 0, 70], [5800, 0, 70], [5500, 0, 70], [5300, 0, 70], [4500, 0, 70], [3700, 0, 70], [3100, 0, 70], [2500, 0, 70], [2000, 165, 70], [1500, -165, 70], [1100, -180, 70], [700, 180, 70], [300, -180, 70], [-100, 180, 70]]], [1010, 24, [-2000, 0, 230], [1001, 1001, 1001, 1001, 1014, 1014, 1014, 1014, 1004, 1004, 1004, 1022, 1022, 116, 115, 1002, 112, 1002, 113, 1002, 114, 1002, 111], [[8000, 0, 70], [7800, 0, 70], [7600, 0, 70], [7200, 0, 70], [6800, -145, 70], [6800, 145, 70], [6700, 145, 70], [6700, -145, 70], [6400, 0, 70], [6100, 0, 70], [5800, 0, 70], [5500, 0, 70], [5300, 0, 70], [4500, 0, 70], [4000, -165, 70], [3300, 0, 70], [2600, 0, 70], [1900, 0, 70], [1200, 0, 70], [500, 0, 70], [-200, 0, 70], [-900, 0, 70], [-1600, 0, 70]]], [1011, 33, [0, 0, 230], [1013, 1013, 1013, 1014, 1014, 1014, 1014, 1020, 1020, 1020, 1024, 1024, 116, 121, 122, 115, 122, 1009, 1009, 1009, 121], [[8000, 0, 70], [7600, 0, 70], [7200, 0, 70], [6800, -145, 70], [6800, 145, 70], [6700, 145, 70], [6700, -145, 70], [6400, 0, 70], [6100, 0, 70], [5800, 0, 70], [5500, 0, 70], [5300, 0, 70], [4500, 0, 70], [3700, 0, 70], [3100, 0, 70], [2500, 0, 70], [2000, 0, 70], [1450, 225, 70], [1150, 0, 70], [850, -125, 70], [450, 0, 70]]], [1012, 40, [2000, 0, 230], [1015, 1015, 1015, 1015, 1015, 1001, 1001, 1001, 1011, 1011, 1011, 1025, 1025, 116, 113, 112, 1024, 1024, 115, 1024, 1024, 111, 114], [[8400, 175, 70], [8400, -175, 70], [8250, 0, 70], [8100, 175, 70], [8100, -175, 70], [8000, 0, 70], [7850, 0, 70], [7700, 0, 70], [7600, 0, 70], [7500, 0, 70], [7400, 0, 70], [7250, -165, 70], [7050, 165, 70], [6200, 0, 70], [5700, -175, 70], [5200, 175, 70], [4900, 0, 70], [4600, 0, 70], [4100, 0, 70], [3600, -225, 70], [3300, 225, 70], [2800, -165, 70], [2400, 165, 70]]], [1013, 46, [1100, 0, 230], [1001, 1001, 1001, 1001, 1014, 1014, 1014, 1014, 1004, 1004, 1004, 1022, 1022, 116, 114, 123, 123, 124, 124], [[8000, 0, 70], [7800, 0, 70], [7600, 0, 70], [7200, 0, 70], [6800, -145, 70], [6800, 145, 70], [6700, 145, 70], [6700, -145, 70], [6400, 0, 70], [6100, 0, 70], [5800, 0, 70], [5500, 0, 70], [5300, 0, 70], [4500, 0, 70], [3700, 0, 70], [3100, 0, 70], [2500, 0, 70], [2000, 0, 70], [1500, 0, 70]]], [1014, 52, [-1100, 0, 230], [1020, 1004, 1021, 1013, 1024, 1024, 1015, 1015, 1015, 116, 125, 125, 1010, 1019, 1019, 112, 1024, 1011, 1001, 1001, 111, 1018, 1018, 1018, 1018, 113, 1009, 112], [[8400, 0, 70], [8200, 0, 70], [7750, 0, 70], [7350, 0, 70], [7050, 0, 70], [6850, 0, 70], [6650, -175, 70], [6650, 175, 70], [6500, 0, 70], [5700, 0, 70], [5200, 0, 70], [4800, 0, 70], [4350, 0, 70], [3900, 150, 70], [3700, -150, 70], [3200, 0, 70], [2800, 0, 70], [2550, 0, 70], [2350, 0, 70], [2150, 0, 70], [1700, 0, 70], [1300, -175, 70], [1300, 175, 70], [650, 175, 70], [650, -175, 70], [150, 0, 70], [-250, 0, 70], [-700, 0, 70]]], [1015, 60, [250, 0, 230], [1013, 1015, 1015, 1001, 1015, 1015, 1018, 1018, 1018, 1021, 1008, 116, 114, 1022, 1008, 123, 123, 1017, 132, 1004, 1020, 1020, 111], [[8200, 0, 70], [7850, 170, 70], [7850, -170, 70], [7650, 0, 70], [7450, 170, 70], [7450, -170, 70], [7200, 0, 70], [6900, -175, 70], [6900, 175, 70], [6450, 0, 70], [6100, 0, 70], [5300, 0, 70], [4850, 0, 70], [4400, 0, 70], [4050, 0, 70], [3450, 0, 70], [2900, 0, 70], [2400, 0, 70], [1800, 0, 70], [1450, 0, 70], [1250, 0, 70], [1050, 0, 70], [650, 0, 70]]], [1016, 64, [1100, 0, 230], [1013, 1013, 1013, 1014, 1014, 1014, 1014, 1020, 1020, 1020, 1024, 1024, 116, 121, 122, 115, 121, 122], [[8000, 0, 70], [7600, 0, 70], [7200, 0, 70], [6800, -145, 70], [6800, 145, 70], [6700, 145, 70], [6700, -145, 70], [6400, 0, 70], [6100, 0, 70], [5800, 0, 70], [5500, 0, 70], [5300, 0, 70], [4500, 0, 70], [3700, 0, 70], [3100, 0, 70], [2500, 0, 70], [2000, 0, 70], [1500, 0, 70]]], [1017, 70, [0, 0, 230], [1015, 1015, 1001, 1015, 1015, 1020, 1004, 1020, 1018, 1018, 1018, 1018, 1019, 1019, 1011, 1011, 1011, 116, 115, 113, 1023, 1023, 121, 1001, 1001, 1001, 1011, 1011, 111, 1010, 1004, 1020, 1004, 121], [[8400, 175, 70], [8400, -175, 70], [8250, 0, 70], [8100, 175, 70], [8100, -175, 70], [7900, 0, 70], [7750, 0, 70], [7600, 0, 70], [7350, 180, 70], [7200, -180, 70], [7000, 180, 70], [6850, -180, 70], [6650, 150, 70], [6450, -150, 70], [6200, 0, 70], [6100, 0, 70], [6000, 0, 70], [5200, 0, 70], [4750, -130, 70], [4500, 130, 70], [4000, 0, 70], [3650, 0, 70], [3200, 0, 70], [2900, 0, 70], [2750, 0, 70], [2600, 0, 70], [2350, 0, 70], [2250, 0, 70], [2000, 0, 70], [1500, 0, 70], [1200, 0, 70], [1000, 0, 70], [900, 0, 70], [400, 0, 70]]]];
class GuidePrefabsConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$6);
    }
}

var foreign6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GuidePrefabsConfig: GuidePrefabsConfig
});

const EXCELDATA$5 = [["ID", "Name", "Value", "Value_E"], ["", "Key|ReadByName", "MainLanguage", "ChildLanguage"], [1, "UI_Loading_mMsg_txt", "Loading...", "正在进入游戏……"], [2, "UI_EndUI_LOSE_Txt_Lose", "FAILED", "失败"], [3, "UI_EndUI_LOSE_Text_Start", "Retry", "重来"], [4, "UI_EndUI_LOSE_Text_lvup", "Upgrade", "升级技能"], [5, "UI_EndUI_WIN_Txt_Win", "VICTORY", "胜利"], [6, "UI_EnterLoading_MWTextBlock_1", "Loading...", "加载关卡中......"], [7, "UI_EnterLoading_mTxtTips", "Reach the end to obtain fragments of Infinity Stones!", "到达终点，会有宝石碎片奖励哦"], [8, "UI_HallUI_txt_Start", "Start", "开始"], [9, "UI_RewardsUI_Text_Start", "Continue", "继续"], [10, "UI_RewardsUI_Txt_Tip_Reward", "Select a skill point", "选择一个技能点作为奖励吧"], [11, "DoorColor_1", "Power", "力量"], [12, "DoorColor_2", "Space", "空间"], [13, "DoorColor_3", "Reality", "现实"], [14, "DoorColor_4", "Time", "时间"], [15, "DoorColor_5", "Mind", "心灵"], [16, "DoorColor_6", "Soul", "灵魂"], [17, "Tips_1", "Power Stone can destroy all red traps", "力量宝石能摧毁所有的小型红色机关哦"], [18, "Tips_2", "Collect 5 other stones in one level to unlock Soul Stone", "在一关内集齐五颗宝石可以解锁灵魂宝石"], [19, "Tips_3", "Time Stone can slow traps", "机关动的太快，试试时间宝石吧"], [20, "Tips_4", "Mind Stone enables flying, evading most traps", "用心灵宝石飞起来能轻松躲避一些低矮机关"], [21, "Tips_5", "Space Stone can widen the path", "空间宝石能扩宽路面哦"], [22, "Tips_6", "Reality Stone has chances to disable traps", "现实宝石有几率让机关变为安全的蓝色"], [23, "Tips_7", "Upgrade infinity stones with fragments to help Thanos!", "用宝石碎片升级宝石让灭霸变得更强大吧"], [24, "Tips_8", "Wanna take a Snap? Collect all six Stones in one level!", "想打响指吗，在一关里集齐六颗宝石吧"], [25, "Tips_9", "Effects of same Stones cannot stack", "在一关内获得相同的宝石效果不会叠加哦"], [26, "Tips_10", "Pass Gate of Stones to obtain Stones", "穿过宝石门可以获得宝石能力"], [27, "Tips_11", "Watch out for traps", "注意躲避机关"], [28, "Lv1", "Lv1", "Lv1"], [29, "×0", "×0", "×0"], [30, "MetaWorld", "MetaWorld", "MetaWorld"]];
class LangueConfigConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$5);
    }
    /**正在进入游戏……*/
    get UI_Loading_mMsg_txt() { return this.getElement(1); }
    ;
    /**失败*/
    get UI_EndUI_LOSE_Txt_Lose() { return this.getElement(2); }
    ;
    /**重来*/
    get UI_EndUI_LOSE_Text_Start() { return this.getElement(3); }
    ;
    /**升级技能*/
    get UI_EndUI_LOSE_Text_lvup() { return this.getElement(4); }
    ;
    /**胜利*/
    get UI_EndUI_WIN_Txt_Win() { return this.getElement(5); }
    ;
    /**加载关卡中......*/
    get UI_EnterLoading_MWTextBlock_1() { return this.getElement(6); }
    ;
    /**到达终点，会有宝石碎片奖励哦*/
    get UI_EnterLoading_mTxtTips() { return this.getElement(7); }
    ;
    /**开始*/
    get UI_HallUI_txt_Start() { return this.getElement(8); }
    ;
    /**继续*/
    get UI_RewardsUI_Text_Start() { return this.getElement(9); }
    ;
    /**选择一个技能点作为奖励吧*/
    get UI_RewardsUI_Txt_Tip_Reward() { return this.getElement(10); }
    ;
    /**力量*/
    get DoorColor_1() { return this.getElement(11); }
    ;
    /**空间*/
    get DoorColor_2() { return this.getElement(12); }
    ;
    /**现实*/
    get DoorColor_3() { return this.getElement(13); }
    ;
    /**时间*/
    get DoorColor_4() { return this.getElement(14); }
    ;
    /**心灵*/
    get DoorColor_5() { return this.getElement(15); }
    ;
    /**灵魂*/
    get DoorColor_6() { return this.getElement(16); }
    ;
    /**力量宝石能摧毁所有的小型红色机关哦*/
    get Tips_1() { return this.getElement(17); }
    ;
    /**在一关内集齐五颗宝石可以解锁灵魂宝石*/
    get Tips_2() { return this.getElement(18); }
    ;
    /**机关动的太快，试试时间宝石吧*/
    get Tips_3() { return this.getElement(19); }
    ;
    /**用心灵宝石飞起来能轻松躲避一些低矮机关*/
    get Tips_4() { return this.getElement(20); }
    ;
    /**空间宝石能扩宽路面哦*/
    get Tips_5() { return this.getElement(21); }
    ;
    /**现实宝石有几率让机关变为安全的蓝色*/
    get Tips_6() { return this.getElement(22); }
    ;
    /**用宝石碎片升级宝石让灭霸变得更强大吧*/
    get Tips_7() { return this.getElement(23); }
    ;
    /**想打响指吗，在一关里集齐六颗宝石吧*/
    get Tips_8() { return this.getElement(24); }
    ;
    /**在一关内获得相同的宝石效果不会叠加哦*/
    get Tips_9() { return this.getElement(25); }
    ;
    /**穿过宝石门可以获得宝石能力*/
    get Tips_10() { return this.getElement(26); }
    ;
    /**注意躲避机关*/
    get Tips_11() { return this.getElement(27); }
    ;
    /**Lv1*/
    get Lv1() { return this.getElement(28); }
    ;
    /**MetaWorld*/
    get MetaWorld() { return this.getElement(30); }
    ;
}

var foreign7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LangueConfigConfig: LangueConfigConfig
});

const EXCELDATA$4 = [["ID", "rangeID", "segment", "obstacleID", "count", "row", "speed"], ["", "", "", "", "", "", ""], [1, [1, 12], [2, 3], [1001, 1004, 1008, 1011, 1013, 1015, 1019, 1022, 1017, 1010, 1025], [2, 3], [1, 1], [1, 1]], [2, [13, 16], [2, 3], [1001, 1004, 1011, 1013, 1014, 1017, 1016, 1020, 1021, 1024], [2, 3], [1, 1], [1, 1]], [3, [17, 23], [2, 3], [1001, 1008, 1023, 1017, 1020, 1019, 1013, 1011, 1025, 1014, 1018], [2, 3], [1, 1], [1, 1]], [4, [24, 33], [2, 4], [1004, 1023, 1025, 1010, 1011, 1015, 1016, 1013, 1002, 1001, 1021, 1016, 1009], [2, 3], [1, 1], [1.2, 1.2]], [5, [34, 40], [2, 4], [1001, 1019, 1020, 1013, 1018, 1014, 1011, 1023, 1009, 1002, 1025, 1014], [2, 3], [1, 1], [1.5, 1.5]], [6, [41, 46], [2, 4], [1008, 1022, 1023, 1010, 1025, 1002, 1020, 1019, 1024, 1001, 1016, 1017], [2, 3], [1, 1], [1.5, 1.5]], [7, [47, 52], [3, 4], [1021, 1023, 1001, 1002, 1009, 1013, 1017, 1019, 1001, 1008, 1025, 1022, 1010], [2, 3], [1, 1], [2, 2]], [8, [53, 64], [3, 4], [1021, 1023, 1001, 1002, 1009, 1013, 1017, 1019, 1001, 1008, 1025, 1022, 1010, 1014, 1024, 1016, 1018, 1015, 1002, 1011], [2, 4], [1, 1], [2, 2]], [9, [65, 70], [3, 4], [1021, 1023, 1001, 1002, 1009, 1013, 1017, 1019, 1001, 1008, 1025, 1022, 1010, 1014, 1024, 1016, 1018, 1015, 1002, 1011], [2, 4], [1, 1], [2, 2]], [10, [71, 99], [3, 4], [1021, 1023, 1001, 1002, 1009, 1013, 1017, 1019, 1001, 1008, 1025, 1022, 1010, 1014, 1024, 1016, 1018, 1015, 1002, 1011], [2, 4], [1, 1], [2, 2]]];
class LevelSettingsConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$4);
    }
}

var foreign8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LevelSettingsConfig: LevelSettingsConfig
});

const EXCELDATA$3 = [["ID", "isSkillDoor", "skillType", "isRow", "count", "distance", "guid", "doorColorID", "des", "offset", "locationX"], ["", "", "", "", "", "", "", "", "", "", ""], [1001, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], true, [3, 5], [250, 250], "7B5B87A24E098ECEA3B0068CD2CAE80E", null, "PF_CircularSaw", [0], 0], [1002, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], false, [1, 2], [1000, 1000], "C523D0B64492E0A7FB531D995F963BE7", null, "PF_Spike_Rotated", [0], 300], [1004, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], true, [3, 4], [250, 250], "C26B20F3488465CC4C9FE5A2D9AB2646", null, "PF_Spikes_Syn", [0], 0], [1008, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], false, [3, 4], [650, 650], "6F2F4F52409D5AA6674133B8DE03F28F", null, "PF_Stick_SingleTwo", [-200, 0, 200], 300], [1009, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], true, [3, 3], [300, 300], "1215DA2644FE256A24829485A7345CA4", null, "PF_Spikes_Side", [-225, 0, 225], 0], [1010, false, [112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], true, [1, 1], [700, 700], "DA0F3AF1421227FB80F08E98597C1010", null, "PF_NeedleBoard", [0], 100], [1011, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], true, [3, 5], [150, 150], "2C875B474C2BFE93EB54BEAFABFA02CD", null, "PF_Fan_Rotate", [0], 0], [1013, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], true, [3, 5], [250, 250], "ED68D14B49446B2417E3CD88D6C0F94C", null, "PF_WolfTooth_L2R", [0], 0], [1014, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], false, [3, 4], [300, 300], "8373B03A45911FCCD65365B62C6986AF", null, "PF_CircularSawStand", [-200, 0, 200], 0], [1015, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], true, [3, 5], [250, 250], "760C4F3F40898C3F6909CC91064A8E8A", null, "PF_CircularSaw_Still", [-185, 0, 185], 0], [1016, false, [112, 131, 116], false, [1, 2], [1000, 1000], "35E7B3394B9C7C3AF4B5FA868E850E66", null, "PF_Arched", [0], 200], [1017, false, [115, 132, 116], false, [1, 2], [500, 500], "0D66F0964C4676A949542B8EFCC7919D", null, "PF_CircularHole", [0], 200], [1018, false, [112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], true, [3, 5], [350, 350], "18D03C844C0CE268C79FF98426807115", null, "PF_NeedleCube", [-195, 0, 195], 0], [1019, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], true, [3, 5], [200, 200], "E77B92024535CFB74CA8A3AAA6F9DB9A", null, "PF_Spikes_Triple", [-155, 0, 155], 0], [1020, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], true, [3, 5], [200, 200], "43B94A6E431DA3B19A4817BDC4AB22AB", null, "PF_Spikes_Asyn", [0], 0], [1021, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], false, [3, 4], [500, 500], "8A186731472920AF7AEE798AC8E5B332", null, "PF_Stick_Single", [-200, 0, 200], 250], [1022, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], false, [3, 4], [650, 650], "C26E26974568C728B447ABAEF8F4FACD", null, "PF_Stick_Double", [-200, 0, 200], 300], [1023, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], false, [3, 4], [650, 650], "30F3468A4EAAA897A643B8939700E876", null, "PF_Stick_Double2", [-200, 0, 200], 300], [1024, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], false, [3, 5], [300, 300], "172E8EBD47800419998C8D9EBB426BC2", null, "PF_Stick_3", [-250, 0, 250], 0], [1025, false, [111, 112, 113, 114, 115, 116, 121, 122, 123, 124, 125, 131, 132], true, [3, 3], [300, 300], "89F3B086402AAD1ED1517E92E9F9519D", null, "PF_Capsule", [-175, 0, 175], 0], [111, true, null, null, null, null, "E40FA73044FE4EAEBDF9CCAB5610EF0E", [101], null, [-120, 0, 120], 0], [112, true, null, null, null, null, "E40FA73044FE4EAEBDF9CCAB5610EF0E", [102], null, [-120, 0, 120], 0], [113, true, null, null, null, null, "E40FA73044FE4EAEBDF9CCAB5610EF0E", [103], null, [-120, 0, 120], 0], [114, true, null, null, null, null, "E40FA73044FE4EAEBDF9CCAB5610EF0E", [104], null, [-120, 0, 120], 0], [115, true, null, null, null, null, "E40FA73044FE4EAEBDF9CCAB5610EF0E", [105], null, [-120, 0, 120], 0], [116, true, null, null, null, null, "E40FA73044FE4EAEBDF9CCAB5610EF0E", [106], null, [-120, 0, 120], 0], [121, true, null, null, null, null, "793226CB4FEE5EB01C01BFA916FD0B52", [102, 104], null, [0], 0], [122, true, null, null, null, null, "793226CB4FEE5EB01C01BFA916FD0B52", [101, 103], null, [0], 0], [123, true, null, null, null, null, "793226CB4FEE5EB01C01BFA916FD0B52", [103, 102], null, [0], 0], [124, true, null, null, null, null, "793226CB4FEE5EB01C01BFA916FD0B52", [105, 101], null, [0], 0], [125, true, null, null, null, null, "793226CB4FEE5EB01C01BFA916FD0B52", [104, 105], null, [0], 0], [131, true, null, null, null, null, "6A9F635A4E96BF358BC497B23E3C0444", [102], null, [0], 0], [132, true, null, null, null, null, "6A9F635A4E96BF358BC497B23E3C0444", [105], null, [0], 0]];
class ObstacleConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$3);
    }
}

var foreign9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ObstacleConfig: ObstacleConfig
});

const EXCELDATA$2 = [["ID", "Name", "Guid", "Quality", "Experience1", "Speed1", "Gold1", "Experience2", "Speed2", "Gold2", "Experience", "Icon"], ["", "Language", "", "", "", "", "", "", "", "", "", ""], [10009, "Skin_Name_10009", ["1C4C390748495E5E819021947D0A3FC4", "5DFB174C4EF9A629227048AEF01CCB3A", "EA84C0274C32C479AEF2DCAFA333ED44", "023BD9904B3A08C662E19C8B04A164E8", "ADE7442045E2B25DA5D6949D3A48EF12", "01963F2543DC0E8C6ADE828F4B36A3BA"], 1, 0, 0, 0.01, 0, 0, 0.05, 500, "91193"]];
class SkinConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$2);
    }
}

var foreign10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SkinConfig: SkinConfig
});

const EXCELDATA$1 = [["id", "SoundGuid", "SoundName", "LoopPlayBack", "SoundSpatialization", "SoundRadius", "SoundPropportion", "PS"], ["", "", "", "", "", "", "", ""], [100001, 61113, "按键声", 0, 0, 0, 0.6, "所有按钮的声音"], [100002, 13818, "技能获取", 0, 0, 0, 0.8, "获取新技能后播放"], [100003, 19592, "行走音效", 1, 0, 0, 1, "根据角色移动速度，反复播放"], [100004, 117498, "BGM", 1, 0, 0, 0.2, "BGM"], [100005, 75362, "力量球与机关的碰撞 ", 0, 0, 0, 0.8, "力量球与机关碰撞后的声音"], [100006, 39350, "玩家碰到机关", 0, 0, 0, 0.9, "玩家碰到机关后发出的声音"], [100007, 117500, "打响指", 0, 0, 0, 2, "玩家穿过灵魂门后，开始打响指，这时播放打响指音效"], [100008, 116247, "灭霸语录（游戏开始）", 0, 0, 0, 2, "游戏开始的时候，灭霸会说一句：I am prepared"], [100009, 116255, "灭霸语录（关卡通关）", 0, 0, 0, 2, "通过终点后，由于攒了一些宝石，灭霸会说：You are strong"], [100010, 116248, "灭霸语录（灵魂门）", 0, 0, 0, 2, "穿过灵魂门后，获得打响指的力量，灭霸说：Pretty, isn’t it?"], [100011, 27468, "穿过力量宝石门", 1, 0, 0, 0.6, "穿过力量宝石门后播放"], [100012, 14038, "穿过时间宝石门", 0, 0, 0, 1.5, "穿过时间宝石门后播放"], [100013, 14065, "穿过空间宝石门", 0, 0, 0, 1.5, "穿过空间宝石门后播放"], [100014, 39873, "穿过心灵宝石门", 0, 0, 0, 1.5, "穿过心灵宝石门后播放"], [100015, 21076, "穿过现实宝石门", 0, 0, 0, 1.5, "穿过现实宝石门后播放"], [100016, 39815, "UI划入与划出音效", 0, 0, 0, 0.8, "需要划入划出的UI播放该音效"], [100017, 27971, "失败音效", 0, 0, 0, 0.5, "失败界面播放"], [100018, 29302, "胜利音效", 0, 0, 0, 0.5, "胜利界面播放"], [100019, 52570, "技能奖励展示音效", 0, 0, 0, 0.4, "奖励界面展示获得宝石时播放"], [100020, 29189, "宝石镶嵌音效", 0, 0, 0, 0.8, "游戏中玩家获得宝石，宝石显示时播放"], [100021, 29335, "宝石集齐音效", 0, 0, 0, 0.8, "玩家在游戏中集齐所有宝石时播放"], [100022, 114002, "死亡音效", 0, 0, 0, 1, "玩家死亡时播放"], [100023, 27836, "技能升级音效", 0, 0, 0, 1, "进度条升高时播放"], [100024, 116252, "机关爆炸", 0, 0, 0, 1, "打响指后，所有机关爆炸并消失，播放该音效"]];
class SoundConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$1);
    }
}

var foreign11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SoundConfig: SoundConfig
});

const EXCELDATA = [["id", "tips"], ["", "Language"], [1001, "Tips_1"], [1002, "Tips_2"], [1003, "Tips_3"], [1004, "Tips_4"], [1005, "Tips_5"], [1006, "Tips_6"], [1007, "Tips_7"], [1008, "Tips_8"], [1009, "Tips_9"], [1010, "Tips_10"], [1011, "Tips_11"]];
class TipsConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA);
    }
}

var foreign12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    TipsConfig: TipsConfig
});

class GameConfig {
    /**
    * 多语言设置
    * @param languageIndex 语言索引(-1为系统默认语言)
    * @param getLanguageFun 根据key获取语言内容的方法
    */
    static initLanguage(languageIndex, getLanguageFun) {
        ConfigBase.initLanguage(languageIndex, getLanguageFun);
        this.configMap.clear();
    }
    static getConfig(ConfigClass) {
        if (!this.configMap.has(ConfigClass.name)) {
            this.configMap.set(ConfigClass.name, new ConfigClass());
        }
        return this.configMap.get(ConfigClass.name);
    }
    static get DoorColor() { return this.getConfig(DoorColorConfig); }
    ;
    static get GemSkill() { return this.getConfig(GemSkillConfig); }
    ;
    static get Global() { return this.getConfig(GlobalConfig); }
    ;
    static get GuidePrefabs() { return this.getConfig(GuidePrefabsConfig); }
    ;
    static get LangueConfig() { return this.getConfig(LangueConfigConfig); }
    ;
    static get LevelSettings() { return this.getConfig(LevelSettingsConfig); }
    ;
    static get Obstacle() { return this.getConfig(ObstacleConfig); }
    ;
    static get Skin() { return this.getConfig(SkinConfig); }
    ;
    static get Sound() { return this.getConfig(SoundConfig); }
    ;
    static get Tips() { return this.getConfig(TipsConfig); }
    ;
}
GameConfig.configMap = new Map();

var foreign3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GameConfig: GameConfig
});

/**一些固定常量定义 */
var consts;
(function (consts) {
    /**当前语言ID */
    consts.curLanguage = 0;
    /**技能最高等级 */
    consts.skillMaxLv = 5;
    /**技能加点最大值 */
    consts.skillMaxPoints = 5;
    /**主UI图片颜色 */
    consts.skillImgColorlist = [
        new mw.LinearColor(0.1, 0.2, 0.3),
        new mw.LinearColor(0.3, 0.3, 0.3),
        new mw.LinearColor(0.4, 0.2, 0.3),
        new mw.LinearColor(0.5, 0.2, 0.3),
        new mw.LinearColor(0.6, 0.5, 0.3),
        new mw.LinearColor(0.8, 0.7, 0.3),
    ];
    /**可被力量宝石技能摧毁的物体tag */
    consts.officeTag = "office";
    /**致死Tag */
    consts.deadTag = "dead";
    consts.normalColor = "#FFFFFFFF";
    consts.forbiddenColor = "#7F7F7FFF";
    /**力量球移动半径 */
    consts.powerBallRadius = 200;
    consts.powerBallHight = 0;
    /**球体转动速度 每帧转动角度*/
    consts.rotationSpeed = 5;
    /**空间宝石基础扩宽数值(缩放倍数) */
    consts.spaceBaseNum = 2;
    /**空间宝石每级增加扩宽数值(缩放倍数) */
    consts.spaceLvAddNum = 1;
    /**空间宝石扩宽所需时长 单位ms */
    consts.spaceNeedTime = 1000;
    /**现实宝石基础无效化概率 */
    consts.baseRealityProbabillity = 0.2;
    /**现实宝石每级增长无效化概率 */
    consts.addRealityProbabillity = 0.1;
    /**时间宝石基础减速比例 */
    consts.baseTimeProportion = 0.2;
    /**时间宝石每级增长减速比例 */
    consts.addTimeProportion = 0.1;
    ////////////////////////测试用
    consts.testSkillTypeName = ["Power", "Space", "Reality", "Time", "Mind", "Soul"];
    ///////////////////////////////////
    consts.playWinTime = 8.7;
})(consts || (consts = {}));
/**存放需预加载的guid */
class ProLoadGuid {
    constructor() {
        // 底座材质
        this.materialCube = "100234";
    }
}
// 原始材质
ProLoadGuid.materialPre = "94245";
// 更换材质guid
ProLoadGuid.materialChange = "94240";
ProLoadGuid.worldUI = "UIWidget";
ProLoadGuid.Trigger = "Trigger";
ProLoadGuid.playerPre = "21581";
ProLoadGuid.playerPreV = "31969";
ProLoadGuid.anchor = "25782";
ProLoadGuid.cube = '7667';
ProLoadGuid.effect_power = '57200';
ProLoadGuid.effect_soul = '61004';
ProLoadGuid.playerDead = '15847';
ProLoadGuid.playerStand = '78906';
ProLoadGuid.playerSuccess = '88450,52965,84930,29717,88449,52979,46292,88541';
////角色服装id
ProLoadGuid.playerCLothStr = "114591,60746,114593,114595,114597,114596";
/**存放被引用和动态生成的的场景guid和预制体guid等 */
class ProLoadGuid_SceneGuid {
}
/**力量宝石技能球体预制体 */
ProLoadGuid_SceneGuid.powerBallPre = "D9FA342A4548A8C7FE4B908E27E838C0";
/**需要被查找的guid  ---供测试功能和道具时使用 */
var FindSceneGuid;
(function (FindSceneGuid) {
    FindSceneGuid.LevelPath = "C24A3645490C464E1F9C5791782821E6";
    FindSceneGuid.BigObj = "619CC9BE4A91AA7A115052A526F506E7";
})(FindSceneGuid || (FindSceneGuid = {}));
/**C端通信 */
var C2CEvent;
(function (C2CEvent) {
    C2CEvent.GETSKILLGEM = "getSkillGem";
    C2CEvent.SCENE_FINISH = 'SCENE_FINISH';
    /**触发技能门 */
    C2CEvent.SKILL_DOORGET = "skill_doorget";
    /**重置主UI */
    C2CEvent.HALLUI_SKILLRESET = "hallui_skillreset";
    /**摧毁机关 */
    C2CEvent.DESTORY_OFFICE = "dedstory_office";
    /**主UI移出动画 */
    C2CEvent.HALLUI_UIOUT = "hallui_uiout";
    /**主UI等级变动 */
    C2CEvent.HALLUI_LVCHANGE = "hallui_lvchange";
    /**主UI隐藏摇杆 */
    C2CEvent.HALLUI_HIDECONTROL = "hallui_hidecontrol";
    /**主U玩家停止 */
    C2CEvent.HALLUI_PLAYERSTOP = "hallui_playerstop";
})(C2CEvent || (C2CEvent = {}));

var foreign13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get C2CEvent () { return C2CEvent; },
    get FindSceneGuid () { return FindSceneGuid; },
    ProLoadGuid: ProLoadGuid,
    ProLoadGuid_SceneGuid: ProLoadGuid_SceneGuid,
    get consts () { return consts; }
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

class GuideDataHelper extends Subdata {
}

var foreign22 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GuideDataHelper: GuideDataHelper
});

class GeneralManager {
    vscodeChange() {
        let animation;
        animation.speed = 1; // 先通过vscodeF2替换为 rate 再替换为 speed
        let obj;
        obj.gameObjectId; // 先通过vscodeF2替换为 guid 再替换为 gameObjectId
        let camera;
        camera.worldTransform; // 先通过vscodeF2替换为 transform 再替换为 worldTransform
        let model;
        model.onTouch; // 先通过vscodeF2替换为 onEnter 再替换为 onTouch
        model.onTouchEnd; // 先通过vscodeF2替换为 onLeave 再替换为 onTouchEnd 
        let effect;
        effect.maskcolor; // 先通过vscodeF2替换为 color 再替换为 maskcolor
        effect.onFinish; // 先通过vscodeF2替换为 onFinished 再替换为 onFinish
        effect.timeLength; // 先通过vscodeF2替换为 particleLength 再替换为 timeLength
        let sound;
        sound.timePosition; // 先通过vscodeF2替换为 currentProgress 再替换为 timePosition
        sound.timeLength; // 先通过vscodeF2替换为 duration 再替换为 timeLength
        sound.timeLength; // 先通过vscodeF2替换为 timelength 再替换为 timeLength
        sound.isLoop; // 先通过vscodeF2替换为 loop 再替换为 isLoop
        let transform;
        transform.position; // 先通过vscodeF2替换为 location 再替换为 position
        class module extends ModuleC {
            get localPlayer() {
                return null;
            }
            get localPlayerId() {
                return null;
            }
        }
    }
    static async asyncRpcGetData(key) {
        let value = await DataStorage.asyncGetData(key);
        return value.data;
    }
    static rpcPlayEffectOnPlayer(source, target, slotType, loopCount, offset, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playOnGameObject(source, target instanceof mw.Player ? target.character : target, {
            slotType: slotType,
            loopCount: loopCount,
            duration: duration,
            position: offset,
            rotation: rotation,
            scale: scale
        });
    }
    static rpcPlayEffectOnGameObject(source, target, loopCount, offset, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playOnGameObject(source, target, {
            loopCount: loopCount,
            duration: duration,
            position: offset,
            rotation: rotation,
            scale: scale
        });
    }
    static rpcPlayEffectAtLocation(source, location, loopCount, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playAtPosition(source, location, {
            loopCount: loopCount,
            duration: duration,
            rotation: rotation,
            scale: scale,
        });
    }
    static modifyShowAd(adsType, callback) {
        AdsService.showAd(adsType, isSuccess => {
            if (isSuccess) {
                callback(AdsState.Success);
                if (adsType == AdsType.Reward)
                    callback(AdsState.Reward);
                callback(AdsState.Close);
            }
            else {
                callback(AdsState.Fail);
            }
        });
    }
    static modiftEnterInteractiveState(inter, characterObj) {
        if (!(characterObj instanceof mw.Character)) {
            return Promise.resolve(false);
        }
        let reult = inter.enter(characterObj);
        if (!reult)
            return Promise.resolve(false);
        return new Promise((resolve, reject) => {
            let resultFun = () => {
                inter.onEnter.remove(resultFun);
                resolve(true);
            };
            inter.onEnter.add(resultFun);
        });
    }
    static modifyExitInteractiveState(inter, Location, stance) {
        let result = inter.leave(Location, null, stance);
        return Promise.resolve(result);
    }
    static modifyaddOutlineEffect(obj, OutlineColor, OutlineWidth, OutlineDepthOffset, OutlineClampValue, considerCameraPosition, outlineSilhouetteOnly) {
        if (obj instanceof mw.Model || obj instanceof Character) {
            obj.setOutline(true, OutlineColor, OutlineWidth);
        }
    }
    static modifyRemoveOutlineEffect(obj) {
        if (obj instanceof mw.Model || obj instanceof Character) {
            obj.setOutline(false);
        }
    }
    static modiftboxOverlap(startLocation, endLocation, width, height, drawDebug, objectsToIgnore, ignoreObjectsByType, self) {
        let halfSize = new Vector(1, width / 2, height / 2);
        let orientation = Vector.subtract(endLocation, startLocation).toRotation();
        let results = QueryUtil.boxTrace(startLocation, endLocation, halfSize, orientation, true, drawDebug, objectsToIgnore, ignoreObjectsByType, self);
        let objResults = new Array();
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj)
                continue;
            if (objResults.indexOf(obj) == -1)
                objResults.push(obj);
        }
        return objResults;
    }
    static modifyboxOverlapInLevel(StartLocation, EndLocation, Width, Height, debug, IgnoreObjectsGuid, IgnoreByKind, Source) {
        let halfSize = new Vector(1, Width / 2, Height / 2);
        let orientation = Vector.subtract(EndLocation, StartLocation).toRotation();
        let results = QueryUtil.boxTrace(StartLocation, EndLocation, halfSize, orientation, true, debug, IgnoreObjectsGuid, IgnoreByKind, Source);
        let objResults = new Array();
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj)
                continue;
            if (objResults.indexOf(obj) == -1)
                objResults.push(obj);
        }
        return objResults;
    }
    static modifyGetShootDir(chara, startPos, shootRange) {
        const camera = Camera.currentCamera;
        let start = Vector.zero;
        let end = Vector.zero;
        let dir = Vector.zero;
        if (startPos) {
            start = startPos;
        }
        if (camera) {
            end = camera.worldTransform.position.add(camera.worldTransform.getForwardVector().multiply(shootRange));
            const hits = QueryUtil.lineTrace(camera.worldTransform.position, end, false, true, [], false, false, chara);
            dir = end.subtract(start);
            if (hits.length > 0) {
                dir = hits[0].impactPoint.subtract(start);
            }
        }
        return dir.normalize();
    }
    static modifyProjectWorldLocationToWidgetPosition(player, worldLocation, outScreenPosition, isPlayerViewportRelative) {
        let result = InputUtil.projectWorldPositionToWidgetPosition(worldLocation, isPlayerViewportRelative);
        outScreenPosition.x = result.screenPosition.x;
        outScreenPosition.y = result.screenPosition.y;
        return result.result;
    }
    static setMaterialColor(model, Index, InColor) {
        let materialList = model.getMaterialInstance();
        materialList[Index].getAllVectorParameterName().forEach((v, i) => {
            materialList[Index].setVectorParameterValue(v, InColor);
        });
    }
    static getMaterialColor(model, Index) {
        let materialList = model.getMaterialInstance();
        if (!(materialList.length > 0)) {
            return;
        }
        let nameList = materialList[Index].getAllVectorParameterName();
        return nameList.length > 0 ? materialList[Index].getVectorParameterValue(nameList[0]) : new LinearColor(1, 1, 1, 1);
    }
}

var foreign20 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GeneralManager: GeneralManager
});

class SpawnManager {
    static replicateGuid(guid) {
        let res = guid;
        if (this.replicateDic.has(guid)) {
            res = this.replicateDic.get(guid);
        }
        else if (this.deleteDic.has(guid)) {
            console.error("-------", guid, "------- is deleted!");
        }
        return res;
    }
    static modifyPoolSpawn(guid, type) {
        let assetId = this.replicateGuid(guid);
        if (type == undefined) {
            return GameObjPool.spawn(assetId);
        }
        return GameObjPool.spawn(assetId, type);
    }
    static modifyPoolAsyncSpawn(guid, type) {
        let assetId = this.replicateGuid(guid);
        if (type == undefined) {
            return GameObjPool.asyncSpawn(assetId);
        }
        return GameObjPool.asyncSpawn(assetId, type);
    }
    static wornSpawn(assetId, inReplicates, transform) {
        let info = {
            guid: assetId,
            replicates: inReplicates,
            transform: transform
        };
        return this.spawn(info);
    }
    static wornAsyncSpawn(assetId, inReplicates, transform) {
        let info = {
            guid: assetId,
            replicates: inReplicates,
            transform: transform
        };
        return this.asyncSpawn(info);
    }
    static spawn(info) {
        let assetId = info.gameObjectId ? info.gameObjectId : info.guid;
        let guid = this.replicateGuid(assetId);
        let obj = mw.GameObject.spawn(guid, { replicates: info.replicates, transform: info.transform });
        return obj;
    }
    static asyncSpawn(info) {
        let assetId = info.gameObjectId ? info.gameObjectId : info.guid;
        let guid = this.replicateGuid(assetId);
        let obj = mw.GameObject.asyncSpawn(guid, { replicates: info.replicates, transform: info.transform });
        return obj;
    }
}
SpawnManager.replicateDic = new Map([
    ["104", "Sound"],
    ["109", "SpawnLocation"],
    ["113", "Trigger"],
    ["116", "Interactor"],
    ["117", "BlockingVolume"],
    ["4301", "PointLight"],
    ["4306", "Effect"],
    ["20191", "PhysicsThruster"],
    ["20193", "NavigationVolume"],
    ["21151", "PostProcess"],
    ["108547", "ObjectLauncher"],
    ["119918", "IntegratedMover"],
    ["12683", "SwimmingVolume"],
    ["16037", "UIWidget"],
    ["16038", "WheeledVehicle4W"],
    ["20504", "PhysicsFulcrum"],
    ["20194", "NavModifierVolume"],
    ["20638", "HotWeapon"],
    ["25782", "Anchor"],
    ["67455", "PhysicsImpulse"],
    ["NPC", "Character"],
    ["31969", "Character"],
    ["124744", "Character"],
    ["28449", "Character"],
    ["BlockingArea", "BlockingVolume"],
    ["RelativeEffect", "Effect"],
    ["Thruster", "PhysicsThruster"],
    ["NavMeshVolume", "NavigationVolume"],
    ["PostProcessAdvance", "PostProcess"],
    ["ProjectileLauncher", "ObjectLauncher"],
    ["PhysicsSports", "IntegratedMover"],
]);
SpawnManager.deleteDic = new Map([
    ["110", true],
    ["8444", true],
    ["14090", true],
    ["14971", true],
    ["2695", true],
    ["30829", true],
    ["31479", true],
    ["14197", true],
]);

var foreign19 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SpawnManager: SpawnManager
});

var SkillType;
(function (SkillType) {
    SkillType[SkillType["Power"] = 0] = "Power";
    SkillType[SkillType["Space"] = 1] = "Space";
    SkillType[SkillType["Reality"] = 2] = "Reality";
    SkillType[SkillType["Time"] = 3] = "Time";
    SkillType[SkillType["Heart"] = 4] = "Heart";
    SkillType[SkillType["Soul"] = 5] = "Soul";
})(SkillType || (SkillType = {}));
class SkillDataHelper extends Subdata {
    constructor() {
        super(...arguments);
        /**技能等级列表 力量-空间-现实-时间-心灵 */
        this.skillLvList = [];
        /**各技能当前技能点列表 */
        this.skillUsePointsList = [];
        /**技能未使用技能点列表 */
        this.skillHavePointsList = [];
        /**是否拥有灵魂宝石 */
        this.haveSoul = false;
        /**已获取过的技能宝石列表 */
        this.skillGetList = [];
    }
    initDefaultData() {
        if (!this.skillLvList || this.skillLvList.length <= 0) {
            this.skillLvList = [1, 1, 1, 1, 1];
        }
        if (!this.skillUsePointsList || this.skillUsePointsList.length <= 0) {
            this.skillUsePointsList = [0, 0, 0, 0, 0];
        }
        if (!this.skillHavePointsList || this.skillHavePointsList.length <= 0) {
            this.skillHavePointsList = [0, 0, 0, 0, 0];
        }
        if (!this.skillGetList || this.skillGetList.length <= 0) {
            this.skillGetList = [false, false, false, false, false];
        }
        this.save(false);
    }
    onDataInit() {
        if (!this.skillGetList || this.skillGetList.length <= 0) {
            this.skillGetList = [false, false, false, false, false];
        }
        this.save(false);
    }
    /**
     * 获得某技能的技能点
     * @param type 技能类型
     * @param num 获得的技术点数量
     */
    skillHavePointGet(type, num) {
        this.skillHavePointsList[type] += num;
        this.save(false);
    }
    /**
     * 技能花费技能点
     * @param type 技能类型
     */
    skillUsePoint(type) {
        this.skillHavePointsList[type] -= 1;
        this.skillUsePointsList[type] += 1;
        if (this.skillUsePointsList[type] >= 5) {
            this.skillUsePointsList[type] = 5;
        }
        this.save(false);
    }
    /**
     * 技能升级
     * @param type 技能类型
     */
    skillLvUp(type) {
        this.skillLvList[type] += 1;
        this.skillUsePointsList[type] = 0;
        if (this.skillLvList[type] > consts.skillMaxLv) {
            this.skillLvList[type] = consts.skillMaxLv;
        }
        this.save(false);
    }
    /**
     * 获取某技能的当前使用技能点
     * @param type 技能类型
     */
    getSkillUsePointByType(type) {
        return this.skillUsePointsList[type];
    }
    /**
     * 获取某技能的当前等级
     * @param type 技能类型
     */
    getSkillLvByType(type) {
        return this.skillLvList[type];
    }
    /**
     * 获取某类型的技能点数量
     * @param type 技能点类型
     * @returns 数量
     */
    getSkillHaveByType(type) {
        return this.skillHavePointsList[type];
    }
    /**返回玩家等级列表 */
    getSkillLvList() {
        return this.skillLvList;
    }
    /**返回技能拥有的技能点 */
    getSkillHavePoint() {
        return this.skillHavePointsList;
    }
    /**返回技能使用的技能点 */
    getSkillUsePoint() {
        return this.skillUsePointsList;
    }
    /**设置技能宝石获取表 */
    setSkillGem(type) {
        this.skillGetList[type] = true;
        this.save(false);
    }
    /**获得技能宝石表 */
    getSkillGem() {
        return this.skillGetList;
    }
}
__decorate([
    Decorator.persistence()
], SkillDataHelper.prototype, "skillLvList", void 0);
__decorate([
    Decorator.persistence()
], SkillDataHelper.prototype, "skillUsePointsList", void 0);
__decorate([
    Decorator.persistence()
], SkillDataHelper.prototype, "skillHavePointsList", void 0);
__decorate([
    Decorator.persistence()
], SkillDataHelper.prototype, "haveSoul", void 0);

var foreign37 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SkillDataHelper: SkillDataHelper,
    get SkillType () { return SkillType; }
});

let SkillPanelUI_Generate = class SkillPanelUI_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.txt_skillNum1 = undefined;
        this.txt_skillNum2 = undefined;
        this.txt_skillNum3 = undefined;
        this.txt_skillNum4 = undefined;
        this.txt_skillNum5 = undefined;
        this.canvas_left = undefined;
        this.pro_skill1 = undefined;
        this.btn_add1 = undefined;
        this.txt_skillLv1 = undefined;
        this.pro_skill2 = undefined;
        this.btn_add2 = undefined;
        this.txt_skillLv2 = undefined;
        this.pro_skill3 = undefined;
        this.btn_add3 = undefined;
        this.txt_skillLv3 = undefined;
        this.pro_skill4 = undefined;
        this.btn_add4 = undefined;
        this.txt_skillLv4 = undefined;
        this.pro_skill5 = undefined;
        this.btn_add5 = undefined;
        this.txt_skillLv5 = undefined;
        this.canvas_center = undefined;
        this.btn_start = undefined;
        this.canvas_BtnContinue = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.btn_add1.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btn_add1");
        });
        this.initLanguage(this.btn_add1);
        this.btn_add1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.btn_add2.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btn_add2");
        });
        this.initLanguage(this.btn_add2);
        this.btn_add2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.btn_add3.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btn_add3");
        });
        this.initLanguage(this.btn_add3);
        this.btn_add3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.btn_add4.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btn_add4");
        });
        this.initLanguage(this.btn_add4);
        this.btn_add4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.btn_add5.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btn_add5");
        });
        this.initLanguage(this.btn_add5);
        this.btn_add5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.btn_start.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btn_start");
        });
        this.initLanguage(this.btn_start);
        this.btn_start.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        //按钮添加点击
        //按钮多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWButton_1"));
        //文本多语言
        this.initLanguage(this.txt_skillNum1);
        this.initLanguage(this.txt_skillNum2);
        this.initLanguage(this.txt_skillNum3);
        this.initLanguage(this.txt_skillNum4);
        this.initLanguage(this.txt_skillNum5);
        this.initLanguage(this.txt_skillLv1);
        this.initLanguage(this.txt_skillLv2);
        this.initLanguage(this.txt_skillLv3);
        this.initLanguage(this.txt_skillLv4);
        this.initLanguage(this.txt_skillLv5);
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_1/Txt_Skill_Name1"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_2/Txt_Skill_Name2"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_3/Txt_Skill_Name3"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_4/Txt_Skill_Name4"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_5/Txt_Skill_Name5"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/RightBottom/canvas_BtnContinue/Text_Start"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/LeftTop/canvas_left/Canvas_SkillCount/Canvas_Skill_001/txt_skillNum1')
], SkillPanelUI_Generate.prototype, "txt_skillNum1", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/LeftTop/canvas_left/Canvas_SkillCount/Canvas_Skill_002/txt_skillNum2')
], SkillPanelUI_Generate.prototype, "txt_skillNum2", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/LeftTop/canvas_left/Canvas_SkillCount/Canvas_Skill_003/txt_skillNum3')
], SkillPanelUI_Generate.prototype, "txt_skillNum3", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/LeftTop/canvas_left/Canvas_SkillCount/Canvas_Skill_004/txt_skillNum4')
], SkillPanelUI_Generate.prototype, "txt_skillNum4", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/LeftTop/canvas_left/Canvas_SkillCount/Canvas_Skill_005/txt_skillNum5')
], SkillPanelUI_Generate.prototype, "txt_skillNum5", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/LeftTop/canvas_left')
], SkillPanelUI_Generate.prototype, "canvas_left", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_1/pro_skill1')
], SkillPanelUI_Generate.prototype, "pro_skill1", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_1/btn_add1')
], SkillPanelUI_Generate.prototype, "btn_add1", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_1/txt_skillLv1')
], SkillPanelUI_Generate.prototype, "txt_skillLv1", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_2/pro_skill2')
], SkillPanelUI_Generate.prototype, "pro_skill2", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_2/btn_add2')
], SkillPanelUI_Generate.prototype, "btn_add2", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_2/txt_skillLv2')
], SkillPanelUI_Generate.prototype, "txt_skillLv2", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_3/pro_skill3')
], SkillPanelUI_Generate.prototype, "pro_skill3", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_3/btn_add3')
], SkillPanelUI_Generate.prototype, "btn_add3", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_3/txt_skillLv3')
], SkillPanelUI_Generate.prototype, "txt_skillLv3", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_4/pro_skill4')
], SkillPanelUI_Generate.prototype, "pro_skill4", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_4/btn_add4')
], SkillPanelUI_Generate.prototype, "btn_add4", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_4/txt_skillLv4')
], SkillPanelUI_Generate.prototype, "txt_skillLv4", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_5/pro_skill5')
], SkillPanelUI_Generate.prototype, "pro_skill5", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_5/btn_add5')
], SkillPanelUI_Generate.prototype, "btn_add5", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center/MWCanvas_3/MWCanvas_5/txt_skillLv5')
], SkillPanelUI_Generate.prototype, "txt_skillLv5", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_center')
], SkillPanelUI_Generate.prototype, "canvas_center", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/RightBottom/canvas_BtnContinue/btn_start')
], SkillPanelUI_Generate.prototype, "btn_start", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/RightBottom/canvas_BtnContinue')
], SkillPanelUI_Generate.prototype, "canvas_BtnContinue", void 0);
SkillPanelUI_Generate = __decorate([
    UIBind('UI/SkillPanelUI.ui')
], SkillPanelUI_Generate);
var SkillPanelUI_Generate$1 = SkillPanelUI_Generate;

var foreign110 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SkillPanelUI_Generate$1
});

var SoundConfigID;
(function (SoundConfigID) {
    SoundConfigID[SoundConfigID["BUTTON_CLICK"] = 100001] = "BUTTON_CLICK";
    SoundConfigID[SoundConfigID["GET_SKILL"] = 100002] = "GET_SKILL";
    SoundConfigID[SoundConfigID["WALK"] = 100003] = "WALK";
    SoundConfigID[SoundConfigID["BGM"] = 100004] = "BGM";
    SoundConfigID[SoundConfigID["BALL_AND_BARRIER"] = 100005] = "BALL_AND_BARRIER";
    SoundConfigID[SoundConfigID["PLAYER_AND_BARRIER"] = 100006] = "PLAYER_AND_BARRIER";
    SoundConfigID[SoundConfigID["SOUL_FINGER"] = 100007] = "SOUL_FINGER";
    SoundConfigID[SoundConfigID["GAME_START_TALK"] = 100008] = "GAME_START_TALK";
    SoundConfigID[SoundConfigID["PASS_GAME_TALK"] = 100009] = "PASS_GAME_TALK";
    SoundConfigID[SoundConfigID["PASS_SOUL_TALK"] = 100010] = "PASS_SOUL_TALK";
    SoundConfigID[SoundConfigID["PASS_POWER"] = 100011] = "PASS_POWER";
    SoundConfigID[SoundConfigID["PASS_TIME"] = 100012] = "PASS_TIME";
    SoundConfigID[SoundConfigID["PASS_SPACE"] = 100013] = "PASS_SPACE";
    SoundConfigID[SoundConfigID["PASS_MIND"] = 100014] = "PASS_MIND";
    SoundConfigID[SoundConfigID["PASS_REALITY"] = 100015] = "PASS_REALITY";
    SoundConfigID[SoundConfigID["UI_ENTER_END"] = 100016] = "UI_ENTER_END";
    SoundConfigID[SoundConfigID["FAIL"] = 100017] = "FAIL";
    SoundConfigID[SoundConfigID["SUCCESS"] = 100018] = "SUCCESS";
    SoundConfigID[SoundConfigID["SKILL_REWARD"] = 100019] = "SKILL_REWARD";
    SoundConfigID[SoundConfigID["INSET_GEM"] = 100020] = "INSET_GEM";
    SoundConfigID[SoundConfigID["COLLECT_FINISH"] = 100021] = "COLLECT_FINISH";
    SoundConfigID[SoundConfigID["DIE"] = 100022] = "DIE";
    SoundConfigID[SoundConfigID["SKILL_UP"] = 100023] = "SKILL_UP"; // 技能升级音效
})(SoundConfigID || (SoundConfigID = {}));
class SoundPlay {
    constructor() {
        this.stopSound = false;
        if (mw.SystemUtil.isClient()) ;
    }
    static get ins() {
        if (!this._ins) {
            this._ins = new SoundPlay();
        }
        return this._ins;
    }
    closeSound() {
        setTimeout(() => {
            mw.SoundService.stopAllSound();
            this.stopBGM();
            this.stopSound = true;
        }, 250);
    }
    openSound() {
        this.stopSound = false;
        this.playBGM();
    }
    onEvent() {
        // UI 所有按钮接收事件
        Event.addLocalListener('PlayButtonClick', () => {
            this.stop(SoundConfigID.BUTTON_CLICK);
            this.play(SoundConfigID.BUTTON_CLICK);
        });
    }
    /**
     * 只能在客户端调用
     * @param id
     */
    play(id) {
        if (this.stopSound) { // 禁止播放任何音效
            return;
        }
        let sound = GameConfig.Sound.getElement(id);
        let guid = sound.SoundGuid.toString();
        const num = Number(sound.LoopPlayBack === 0);
        mw.SoundService.playSound(guid, num, sound.SoundPropportion);
    }
    play3DSound(id, target) {
        let sound = GameConfig.Sound.getElement(id);
        if (!sound) {
            return;
        }
        let guid = sound.SoundGuid.toString();
        mw.SoundService.play3DSound(guid, target, 1, sound.SoundPropportion); //循环播放音效
    }
    playBGM() {
        if (this.stopSound) { // 禁止播放任何音效
            return;
        }
        let sound = GameConfig.Sound.getElement(SoundConfigID.BGM);
        mw.SoundService.playBGM(sound.SoundGuid + '', sound.SoundPropportion);
    }
    stopBGM() {
        mw.SoundService.stopBGM();
    }
    stop(id) {
        let sound = GameConfig.Sound.getElement(id);
        let guid = sound.SoundGuid.toString();
        mw.SoundService.stopSound(guid);
    }
}

var foreign112 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get SoundConfigID () { return SoundConfigID; },
    SoundPlay: SoundPlay
});

class SkillPanelUI extends SkillPanelUI_Generate$1 {
    constructor() {
        super(...arguments);
        this.isWin = true;
        /**
         * 设置不显示时触发
         */
        //protected onHide() {
        //}
    }
    /**
    * 构造UI文件成功后，在合适的时机最先初始化一次
    */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.btn_add1.onClicked.add(() => {
            this.skillPointUse(SkillType.Power);
            this.sendMsg();
        });
        this.btn_add2.onClicked.add(() => {
            this.skillPointUse(SkillType.Space);
            this.sendMsg();
        });
        this.btn_add3.onClicked.add(() => {
            this.skillPointUse(SkillType.Reality);
            this.sendMsg();
        });
        this.btn_add4.onClicked.add(() => {
            this.skillPointUse(SkillType.Time);
            this.sendMsg();
        });
        this.btn_add5.onClicked.add(() => {
            this.skillPointUse(SkillType.Heart);
            this.sendMsg();
        });
        this.btn_start.onClicked.add(() => {
            this.playAni(false);
        });
        if (!this.player) {
            this.player = Player.localPlayer;
        }
    }
    /**
    * 构造UI文件成功后，onStart之后
    * 对于UI的根节点的添加操作，进行调用
    * 注意：该事件可能会多次调用
    */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
    /**
    * 每一帧调用
    * 通过canUpdate可以开启关闭调用
    * dt 两帧调用的时间差，毫秒
    */
    //protected onUpdate(dt :number) {
    //}
    /**
         * 埋点
         */
    sendMsg() {
        let mdLevelC = ModuleService.getModule(LevelModuleC);
        mdLevelC.addSkilNum();
    }
    /**技能加点 */
    skillPointUse(type) {
        ModuleService.getModule(SkillModule_C).net_SkillLvUpPoint(type);
    }
    /**
     * 技能加点结果
     * @param type 技能类型
     * @param haveNum 技能点剩余
     * @param useNum 已加点数量
     */
    skillAddPoint(type, haveNum, useNum, lv) {
        let index = type + 1;
        this[`txt_skillNum${index}`].text = (`X${haveNum}`);
        this[`pro_skill${index}`].currentValue = (useNum);
        if (haveNum == 0 || lv == consts.skillMaxLv) {
            this[`btn_add${index}`].visibility = (mw.SlateVisibility.Hidden);
        }
    }
    /**
     * 技能升级
     * @param type 技能类型
     * @param num 升级后的等级
     */
    skillLvUp(type, num) {
        let index = type + 1;
        this[`pro_skill${index}`].sliderMaxValue = (num + 1);
        if (num >= consts.skillMaxLv) {
            this[`txt_skillLv${index}`].text = (`Max`);
            this[`pro_skill${index}`].currentValue = (num + 1);
        }
        else {
            this[`txt_skillLv${index}`].text = (`Lv${num}`);
            this[`pro_skill${index}`].currentValue = (0);
        }
        if (num == consts.skillMaxLv) {
            this[`btn_add${index}`].visibility = (mw.SlateVisibility.Hidden);
        }
    }
    onShow(isWin) {
        this.isWin = isWin;
        let skillModule = ModuleService.getModule(SkillModule_C);
        let havePoint = skillModule.net_GetSkillHavePoints();
        let lvList = skillModule.net_GetSKillLvList();
        let usePoint = skillModule.net_GetSkillUsePoints();
        this.initSkillLvUI(lvList);
        this.initSkillProUI(usePoint);
        this.initHavePoints(havePoint);
        this.judgeAddBtn(havePoint, lvList);
        this.judgeProMax(lvList);
        this.playAni(true);
    }
    judgeAddBtn(havePoints, lvList) {
        for (let i = 0; i < havePoints.length; i++) {
            let haveNum = havePoints[i];
            let lv = lvList[i];
            if (this[`btn_add${i + 1}`]) {
                if (haveNum == 0 || lv >= consts.skillMaxLv) {
                    this[`btn_add${i + 1}`].visibility = (mw.SlateVisibility.Hidden);
                }
                else {
                    this[`btn_add${i + 1}`].visibility = (mw.SlateVisibility.Visible);
                }
            }
        }
    }
    judgeProMax(lvList) {
        for (let i = 0; i < lvList.length; i++) {
            if (this[`pro_skill${i + 1}`]) {
                this[`pro_skill${i + 1}`].sliderMaxValue = (lvList[i] + 1);
                if (lvList[i] >= consts.skillMaxLv) {
                    this[`pro_skill${i + 1}`].currentValue = (lvList[i] + 1);
                }
            }
        }
    }
    playAni(isIn) {
        SoundPlay.ins.play(SoundConfigID.UI_ENTER_END);
        if (!isIn) {
            let btn = this.canvas_BtnContinue;
            let btnStart = -335;
            let btnEnd = 0;
            let btnMovePos = new mw.Vector2(0, -175);
            const btnMoveAni = new mw.Tween({ hight: btnStart }).to({ hight: btnEnd }, 500).onUpdate((object) => {
                btnMovePos.x = size.x * object.hight;
                btn.position = (leftMovePos);
            }).onComplete(() => {
            });
            btnMoveAni.start();
        }
        else {
            let btn = this.canvas_BtnContinue;
            btn.position = (new mw.Vector2(-335, -175));
        }
        const size = mw.WindowUtil.getViewportSize();
        let slot = this.canvas_center;
        let start = isIn ? -1 : 0;
        let end = isIn ? 0 : 1;
        let movePos = new mw.Vector2(0, 0);
        if (isIn)
            this.canvas_center.visibility = (mw.SlateVisibility.Hidden);
        movePos.x = size.x * start;
        movePos.y = 0;
        slot.position = (movePos);
        const moveAni = new mw.Tween({ hight: start }).to({ hight: end }, 500).onUpdate((object) => {
            movePos.x = size.x * object.hight;
            movePos.y = 0;
            slot.position = (movePos);
        }).onComplete(() => {
            if (isIn) ;
            else {
                this.hide();
                Camera.currentCamera.localTransform = new mw.Transform(new mw.Vector(0, 30, 400), new mw.Rotation(0, -30, -10), mw.Vector.one);
                Camera.currentCamera.springArm.length = 400;
                if (this.isWin) {
                    ModuleService.getModule(LevelModuleC).passGame();
                }
                else {
                    ModuleService.getModule(LevelModuleC).resetGame();
                }
            }
        }).onStart(() => {
            this.canvas_center.visibility = (mw.SlateVisibility.Visible);
        });
        moveAni.start();
        let leftSlot = this.canvas_left;
        let leftStart = isIn ? -200 : 0;
        let leftEnd = isIn ? 0 : -200;
        let leftMovePos = new mw.Vector2(0, 0);
        const leftMoveAni = new mw.Tween({ hight: leftStart }).to({ hight: leftEnd }, 500).onUpdate((object) => {
            leftMovePos.x = size.x * object.hight;
            leftMovePos.y = 0;
            leftSlot.position = (leftMovePos);
        }).onComplete(() => {
        });
        leftMoveAni.start();
    }
    hide() {
        mw.UIService.hide(SkillPanelUI);
    }
    /**设置拥有技能点UI
     * @param havePoints 拥有的技能点数组
     */
    initHavePoints(havePoints) {
        for (let i = 0; i < havePoints.length; i++) {
            if (this[`txt_skillNum${i + 1}`]) {
                this[`txt_skillNum${i + 1}`].text = (`X${havePoints[i]}`);
            }
        }
    }
    /**
     * 设置技能等级UI
     * @param lvList 等级列表
     */
    initSkillLvUI(lvList) {
        for (let i = 0; i < lvList.length; i++) {
            if (this[`txt_skillLv${i + 1}`]) {
                if (lvList[i] >= consts.skillMaxLv) {
                    this[`txt_skillLv${i + 1}`].text = (`Max`);
                }
                else {
                    this[`txt_skillLv${i + 1}`].text = (`Lv${lvList[i]}`);
                }
            }
            if (this[`pro_skill${i + 1}`]) {
                this[`pro_skill${i + 1}`].sliderMaxValue = (lvList[i] + 1);
            }
        }
    }
    /**
     * 设置技能加点进度
     * @param usePoint 技能加点列表
     */
    initSkillProUI(usePoint) {
        // 设置按钮显示
        for (let i = 0; i < usePoint.length; i++) {
            if (this[`pro_skill${i + 1}`]) {
                this[`pro_skill${i + 1}`].currentValue = (usePoint[i]);
                this[`pro_skill${i + 1}`].visibility = (mw.SlateVisibility.SelfHitTestInvisible);
            }
        }
    }
}

var foreign99 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SkillPanelUI
});

let SoulUI_Generate = class SoulUI_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.img_thanos = undefined;
        this.canvas_Ani = undefined;
    }
    onAwake() {
    }
};
__decorate([
    UIWidgetBind('RootCanvas/canvas_Ani/img_thanos')
], SoulUI_Generate.prototype, "img_thanos", void 0);
__decorate([
    UIWidgetBind('RootCanvas/canvas_Ani')
], SoulUI_Generate.prototype, "canvas_Ani", void 0);
SoulUI_Generate = __decorate([
    UIBind('UI/SoulUI.ui')
], SoulUI_Generate);
var SoulUI_Generate$1 = SoulUI_Generate;

var foreign111 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SoulUI_Generate$1
});

const ENTER_TIME = 500; // 划入时间
const END_TIME = 600; // 划出时间
const PARSE_TIME = 1350; // 停顿时间
class SoulUI extends SoulUI_Generate$1 {
    /**
    * 构造UI文件成功后，在合适的时机最先初始化一次
    */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        //this.initButtons();
    }
    /**
    * 构造UI文件成功后，onStart之后
    * 对于UI的根节点的添加操作，进行调用
    * 注意：该事件可能会多次调用
    */
    onAdded() {
        const x = -mw.WindowUtil.getViewportSize().x;
        this.canvas_Ani.position = (new mw.Vector2(x, 0));
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
    /**
    * 每一帧调用
    * 通过canUpdate可以开启关闭调用
    * dt 两帧调用的时间差，毫秒
    */
    //protected onUpdate(dt :number) {
    //}
    /**
     * 设置显示时触发
     */
    onShow(callBack) {
        let fun = () => {
            SoundPlay.ins.play(SoundConfigID.PASS_SOUL_TALK);
            setTimeout(() => {
                SoundPlay.ins.play(SoundConfigID.SOUL_FINGER);
                this.anim(true, () => {
                    callBack && callBack();
                });
            }, PARSE_TIME);
        };
        this.anim(false, fun);
    }
    anim(isBack, cb) {
        const pos = this.canvas_Ani.position;
        let moveNum = isBack ? -mw.getViewportSize().x : 0;
        let time = isBack ? END_TIME : ENTER_TIME;
        new mw.Tween({ v: pos })
            .to({ v: new mw.Vector2(moveNum, pos.y) }, time)
            .onUpdate((obj) => {
            this.canvas_Ani.position = (obj.v);
        })
            .onStart(() => {
            SoundPlay.ins.play(SoundConfigID.UI_ENTER_END);
        })
            .onComplete(() => {
            cb && cb();
        })
            .start();
    }
}

var foreign100 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SoulUI
});

/**
 * 获取多语言字符
 * @param key 多语言表key值
 * @param errorStr 如果没找到的替代文本
 * @param args 多语言格式化参数列表
 * @returns
 */
function Lanstr(key, errorStr, ...args) {
    let ret = null;
    let languages = GameConfig.LangueConfig.getAllElement();
    for (let i = 0; i < languages.length; i++) {
        if (languages[i].Name == key) {
            ret = Tools.FormatString(languages[i].Value, ...args);
            break;
        }
    }
    if (!ret) {
        ret = Tools.FormatString(errorStr, ...args); //errorStr
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
    static setMWGameUIVisibility(ui, isShow, isBlock = false) {
        let visibilityType = isShow ?
            isBlock ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Visible
            : mw.SlateVisibility.Hidden;
        ui.visibility = (visibilityType);
    }
    static initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
     * 转化数组为向量
     * @param arr 长度为2或者3的数组
     */
    static convertArrToVec(arr) {
        if (arr.length > 3 || arr.length < 2) {
            return mw.Vector.zero;
        }
        else {
            if (arr.length === 2) {
                return new mw.Vector2(arr[0], arr[1]);
            }
            else {
                return new mw.Vector(arr[0], arr[1], arr[2]);
            }
        }
    }
    /**字符串格式化 */
    static FormatString(text, ...args) {
        return text.replace(/\{(\d+)\}/g, (text, index, ...parms) => {
            if (args[index] === 0)
                return 0;
            return args[index] || "undefined";
        });
    }
    /**将总秒数转为 [时，分，秒] 的数组 */
    static Seconds2Hour(second) {
        let minutes = second % 3600;
        let h = Math.floor(second / 3600);
        let m = Math.floor(minutes / 60);
        let s = minutes % 60;
        return [h, m, s];
    }
    /**限定值在范围内 */
    static RoundNumber(value, min, max) {
        if (value > max)
            return min;
        if (value < min)
            return max;
        return value;
    }
    /**数字插值 */
    static NumLerp(n1, n2, lerp) {
        return n1 + (n2 - n1) * lerp;
    }
    /**向量的插值计算 */
    static LerpVector(v1, v2, lerp) {
        if (lerp > 1) {
            lerp = 1;
        }
        if (lerp < 0) {
            lerp = 0;
        }
        let result = new mw.Vector(0, 0, 0); //  .ZERO;
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
    static Distance(from, to, isPlane = false) {
        let x1 = from.x;
        let y1 = from.y;
        let z1 = from.z;
        let x2 = to.x;
        let y2 = to.y;
        let z2 = to.z;
        let distance;
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
    static DistancePow(from, to, isPlane = false) {
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
    static CheckRect(p1, p2, checkDis, isPlane = false) {
        if (Math.abs(p1.x - p2.x) > checkDis) {
            return false;
        }
        if (Math.abs(p1.y - p2.y) > checkDis) {
            return false;
        }
        if (!isPlane) {
            if (Math.abs(p1.z - p2.z) > checkDis) {
                return false;
            }
        }
        return true;
    }
    /**随机浮点数 [min,max) */
    static RangeFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    /**随机整数 */
    static RangeInt(min, max) {
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
    static randomBetweenMinAndMax(min, max) {
        let v = Math.floor((max - min + 1) * Math.random());
        return Math.floor(min + v);
    }
    static CombinationString(from, insert) {
        for (let i of insert) {
            from = from.replace(/@/, i);
        }
        return from;
    }
    /**开启一个循环定时器，异步查找一个游戏物体，每100毫秒找一次，一直找到为止 */
    static async AsyncFind(guid) {
        const gameObject = GameObject.findGameObjectById(guid);
        if (gameObject)
            return gameObject;
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
    static DumpObject(object, showFunc = false, deep = 5) {
        if (object == null || object == undefined) {
            if (typeof (object) == "object") {
                return "null";
            }
            return String(object);
        }
        if (typeof (object) != "object") {
            return String(object);
        }
        deep = Math.min(5, deep); //最多递归5层
        let spaceLength = Math.abs(deep - 5) * 2; //空格数量
        let space = "";
        for (let i = 0; i < spaceLength; i++) {
            space += " ";
        }
        let result = "\n" + space + "{";
        if (object instanceof Map) //本身是Map对象
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
                if (object[k] instanceof Map) //是一个map对象
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
    static Vec3Dot(vec1, vec2) {
        return vec1.x * vec2.x + vec1.y * vec1.y;
    }
    /**
     * 根据不用概率取值
     * @param arr 对象列表,rate:概率
     * @returns 随机结果
     */
    static RandomObjByRate(arr) {
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
        return arr[index].obj;
    }
    /**
     * 旋转一个二维向量
     * @param vec2 向量
     * @param angle 角度
     * @returns 旋转后的向量
     */
    static RotationVecter2(vec2, angle) {
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
    static createTriggerToGameObject(gameObject, useSelf = true, sync = false) {
        let trigger = null;
        if (gameObject instanceof mw.Trigger && useSelf) //如果本身是一个触发器,且允许使用自身作为返回
         {
            trigger = gameObject;
        }
        else {
            trigger = SpawnManager.wornSpawn("113", sync);
            trigger.name = gameObject.name + "_Trigger";
            trigger.localTransform.scale = (gameObject.localTransform.scale.multiply(1.2)); //触发器比本体稍微大一点
            trigger.parent = (gameObject);
            trigger.localTransform.position = (new mw.Vector(0, 0, 50));
            trigger.localTransform.rotation = (mw.Rotation.zero);
        }
        trigger.enabled = (true);
        return trigger;
    }
    /**根据条件，移除数组内的一些元素，其余元素依次补全索引位 */
    static ArrayRemoveBy(array, callbackfn) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (callbackfn(array[i])) {
                array.splice(i, 1);
            }
        }
    }
    /**数组去重，以及特定元素，返回新数组 */
    static ArrayUnLink(array, ...args) {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            if (!result.includes(array[i]) && !args.includes(array[i])) {
                result.push(array[i]);
            }
        }
    }
    /**异步函数内使用，等待一段时间(毫秒) */
    static sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    /**
    * 获取物体的所有子级(包含子级的子级，不包含自身)
    * @param parent 父节点
    * @param deep 查找深度
    * @param property 特定查找成员名，没有则返回游戏物体本身
    * @returns
    */
    static getAllChild(parent, deep = 5, property = null) {
        if (parent.getChildren().length <= 0 || deep <= 0) {
            return null;
        }
        else {
            let result = [];
            for (let c of parent.getChildren()) {
                if (property) {
                    result.push(c[property]);
                }
                else {
                    result.push(c);
                }
                // result.push(c);//加上本身
                let cc = this.getAllChild(c, deep - 1, property); //拿到此子级的子级
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
    static changeObjTag(parent, tag) {
        let allChild = this.getAllChild(parent);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject)
                obj.setCollision(mw.PropertyStatus.On);
            obj.tag = tag;
        });
    }
    /**
     * 贝塞尔曲线
     * 给出一组点，算出的这个曲线在某个阶段的值
     * @param points 曲线点参数组
     * @param lerp 0-1的插值
     */
    static Bezier(points, lerp) {
        lerp = this.RoundNumber(lerp, 0, 1);
        if (points.length == 2) //只有2个点时，直接返回插值点
         {
            return this.LerpVector(points[0], points[1], lerp);
        }
        let nextArray = [];
        for (let i = 0; i < points.length - 1; i++) {
            let pointA = points[i];
            let pointB = points[i + 1];
            let lerpPoint = this.LerpVector(pointA, pointB, lerp);
            nextArray.push(lerpPoint);
        }
        return this.Bezier(nextArray, lerp);
    }
    /**根据圆心和半径，单位角度，获取圆上的坐标点集合 */
    static getCirclePoints(center, radius, step) {
        let result = [];
        [center.x, center.y];
        for (let angle = 0; angle < 360; angle += step) {
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
    static getRamdomIndexByWeight(arr) {
        let allWet = 0;
        for (let i = 0; i < arr.length; i++) {
            allWet += arr[i][1]; //权值总和
        }
        let random = Math.floor(Math.random() * allWet);
        let weight = 0;
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
    static triggerCharacter(gameObject) {
        if ((gameObject) instanceof mw.Character) {
            return gameObject.player;
        }
        return null;
    }
    /**
 * 异步寻找一个物体
 * @param guid
 * @param timeout
 * @returns
 */
    static async asyncFindGo(guid, timeout = 10) {
        const gameObject = GameObject.findGameObjectById(guid);
        if (gameObject)
            return gameObject;
        return new Promise((resolve, reject) => {
            let inter = setInterval(() => {
                const gameObject = Tools.findGo(guid);
                if (gameObject) {
                    resolve(gameObject);
                    clearInterval(inter);
                }
                else {
                    timeout--;
                    if (timeout == 0) {
                        reject();
                        clearInterval(inter);
                    }
                }
            }, 100);
        });
    }
    /**
 * 寻找一个物体
 */
    static findGo(guid) {
        return GameObject.findGameObjectById(guid);
    }
    /**设置角色的移动为给定轴移动 */
    static setCharacterMoveInput(dir, character) {
        character.movementAxisDirection = dir;
        character.movementDirection = mw.MovementDirection.AxisDirection;
    }
    /**
     * 扩宽物体 ：暂定X轴
     * @param obj 扩宽的物体
     * @param addwWidScale 扩增的倍数
     */
    static timeBroadenObj(obj, addWidScale) {
        let worldScale = new mw.Vector(obj.worldTransform.scale.x, obj.worldTransform.scale.y, obj.worldTransform.scale.z);
        let sumTime = 0;
        let singleTime = 10;
        let singleAdd = addWidScale / (consts.spaceNeedTime / singleTime);
        let k = setInterval(() => {
            worldScale.x += singleAdd;
            sumTime += singleTime;
            obj.worldTransform.scale = (worldScale); // = worldScale;
            if (obj)
                obj.worldTransform.scale = (worldScale);
            if (!obj)
                clearInterval(k);
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
    static timeBigObj(obj, addWidScale) {
        let worldScale = new mw.Vector(obj.worldTransform.scale.x, obj.worldTransform.scale.y, obj.worldTransform.scale.z);
        let sumTime = 0;
        let singleTime = 10;
        let singleAdd = addWidScale / (consts.spaceNeedTime / singleTime);
        let k = setInterval(() => {
            worldScale.x += singleAdd;
            worldScale.y += singleAdd;
            worldScale.z += singleAdd;
            sumTime += singleTime;
            if (obj)
                obj.worldTransform.scale = (worldScale); // = worldScale;
            if (!obj)
                clearInterval(k);
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
    static getUIWorldPos(ui, moveUI) {
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
    static playDynamic(dur) {
        mw.vibrate(true);
        setTimeout(() => {
            mw.vibrate(false);
        }, dur);
    }
}
var TimeUtilTool;
(function (TimeUtilTool) {
    function startUp() {
        startTime = new Date().getTime();
        elapsedTime = mw.TimeUtil.elapsedTime() * 1000;
    }
    TimeUtilTool.startUp = startUp;
    let startTime = 0;
    let timeDiff = 0;
    let elapsedTime = 0;
    function getServerMillSecond() {
        let pas = mw.TimeUtil.elapsedTime() * 1000;
        let ret = startTime + (pas - elapsedTime);
        if (mw.SystemUtil.isClient()) {
            ret += timeDiff;
        }
        return ret;
    }
    TimeUtilTool.getServerMillSecond = getServerMillSecond;
    /**
     * 设置服务器时间
     * @param time 毫秒
     */
    function setServerTime(time) {
        if (mw.SystemUtil.isClient()) {
            timeDiff = time - getServerMillSecond();
        }
    }
    TimeUtilTool.setServerTime = setServerTime;
    function seconds2Hour(second) {
        let minutes = second % 3600;
        let h = Math.floor(second / 3600);
        let m = Math.floor(minutes / 60);
        let s = minutes % 60;
        return [h < 10 ? ("0" + h) : h, m < 10 ? ("0" + m) : m, s < 10 ? ("0" + s) : s];
    }
    TimeUtilTool.seconds2Hour = seconds2Hour;
})(TimeUtilTool || (TimeUtilTool = {}));

var foreign113 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Lanstr: Lanstr,
    get TimeUtilTool () { return TimeUtilTool; },
    default: Tools
});

class PlayerManagerExtesion {
    static init() {
        ModuleService.registerModule(RpcExtesionS, RpcExtesionC, null);
    }
    static isNpc(obj) {
        if ((obj instanceof Character) && obj.player == null) {
            return true;
        }
        return false;
    }
    static isCharacter(obj) {
        if ((obj instanceof Character) && obj.player != null) {
            return true;
        }
        return false;
    }
    static isUseRpc(isSync) {
        if (SystemUtil.isServer()) {
            return false;
        }
        else {
            return isSync;
        }
    }
    static stopStanceExtesion(char, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            char.currentSubStance?.stop();
            return;
        }
        let mtStance = new RpcStance("", char);
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopStanceSync(char.gameObjectId, mtStance);
    }
    static changeBaseStanceExtesion(char, assetId) {
        if (!this.isUseRpc(true)) {
            if (assetId == "") {
                char.currentStance?.stop();
                return;
            }
            let basicStance = char.loadStance(assetId);
            basicStance.play();
        }
        else {
            let module = ModuleService.getModule(RpcExtesionC);
            module.playBasicStance(char.gameObjectId, assetId);
        }
    }
    static changeStanceExtesion(char, assetId) {
        let sync = true;
        if (!this.isUseRpc(sync)) {
            if (assetId == "") {
                char.currentSubStance?.stop();
                return;
            }
            char.loadSubStance(assetId).play();
            return;
        }
        let mtStance = new RpcStance(assetId, char);
        let module = ModuleService.getModule(RpcExtesionC);
        module.playStanceSync(char.gameObjectId, mtStance);
    }
    static loadStanceExtesion(char, assetId, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            return char.loadSubStance(assetId);
        }
        sync = sync == undefined ? true : sync;
        const stance = new RpcStance(assetId, char);
        return stance;
    }
    static rpcPlayAnimation(owner, assetId, loop = 1, speed = 1) {
        let ani = this.loadAnimationExtesion(owner, assetId);
        ani.loop = loop;
        ani.speed = speed;
        ani.play();
        return ani;
    }
    static rpcStopAnimation(owner, assetId) {
        if (!this.isUseRpc(true)) {
            if (owner.currentAnimation && owner.currentAnimation.assetId == assetId)
                owner.currentAnimation.stop();
            return;
        }
        if (owner.currentAnimation && owner.currentAnimation.assetId == assetId)
            owner.currentAnimation.stop();
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopAnimationSync(owner.gameObjectId, assetId);
    }
    static rpcPlayAnimationLocally(owner, assetId, AnimationLength = 0, loopCount = 1) {
        if (owner === undefined || owner === null)
            return;
        let anim = owner.loadAnimation(assetId);
        anim.loop = loopCount;
        anim.speed = AnimationLength === 0 ? 1 : this.getRate(anim.length / AnimationLength);
        anim.play();
        return anim;
    }
    static getRate(num) {
        return Math.round(num * 100) / 100;
    }
    static loadAnimationExtesion(char, assetid, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            return char.loadAnimation(assetid);
        }
        const anim = new RpcAnimation(char, assetid);
        return anim;
    }
}
class RpcExtesionC extends ModuleC {
    constructor() {
        super(...arguments);
        this.syncAnimation = null;
    }
    net_playerJoin(playerId) {
        if (this.localPlayerId == playerId)
            return;
        let char = this.localPlayer.character;
        let curAnimation = char.currentAnimation;
        if (!curAnimation)
            return;
        let ani = this.syncAnimation;
        if (ani && curAnimation.assetId == ani.assetId && ani.isPlaying) {
            this.server.net_playAnimationSync(char.gameObjectId, ani.assetId, ani.speed, ani.loop, ani.slot, playerId);
        }
    }
    playAnimationSync(charGuid, myAnimation) {
        if (charGuid == this.localPlayer.character.gameObjectId) {
            this.syncAnimation = myAnimation;
        }
        this.server.net_playAnimationSync(charGuid, myAnimation.assetId, myAnimation.speed, myAnimation.loop, myAnimation.slot);
    }
    pauseAnimationSync(charGuid, myAnimation) {
        this.server.net_pauseAnimationSync(charGuid, myAnimation.assetId);
    }
    resumeAnimationSync(charGuid, myAnimation) {
        this.server.net_resumeAnimationSync(charGuid, myAnimation.assetId);
    }
    stopAnimationSync(charGuid, myAnimation) {
        if (charGuid == this.localPlayer.character.gameObjectId) {
            this.syncAnimation = null;
        }
        let assetId = typeof myAnimation == "string" ? myAnimation : myAnimation.assetId;
        this.server.net_stopAnimationSync(charGuid, assetId);
    }
    playBasicStance(charGuid, basicStance) {
        this.server.net_playBasicStance(charGuid, basicStance);
    }
    playStanceSync(charGuid, myStance) {
        this.server.net_playStanceSync(charGuid, myStance.assetId, myStance.blendMode);
    }
    stopStanceSync(charGuid, stance) {
        this.server.net_stopStanceSync(charGuid, stance.assetId);
    }
    net_playAnimation(charGuid, assetId, rate, loop, slot) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.playAnimation(charGuid, assetId, rate, loop, slot);
    }
    net_pauseAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.pauseAnimation(charGuid, assetId);
    }
    net_resumeAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.resumeAnimation(charGuid, assetId);
    }
    net_stopAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.stopAnimation(charGuid, assetId);
    }
}
class RpcExtesionS extends ModuleS {
    async net_playBasicStance(charGuid, basicStance) {
        let char = await GameObject.asyncFindGameObjectById(charGuid);
        char.loadStance(basicStance).play();
    }
    net_playAnimationSync(charGuid, assetId, rate, loop, slot, playerId = 0) {
        if (playerId != 0) {
            this.getClient(playerId).net_playAnimation(charGuid, assetId, rate, loop, slot);
            return;
        }
        this.getAllClient().net_playAnimation(charGuid, assetId, rate, loop, slot);
    }
    net_pauseAnimationSync(charGuid, assetId) {
        this.getAllClient().net_pauseAnimation(charGuid, assetId);
    }
    net_resumeAnimationSync(charGuid, assetId) {
        this.getAllClient().net_resumeAnimation(charGuid, assetId);
    }
    net_stopAnimationSync(charGuid, assetId) {
        this.getAllClient().net_stopAnimation(charGuid, assetId);
    }
    playStanceSync(charGuid, mystance) {
        RpcStance.playStance(charGuid, mystance.assetId, mystance.blendMode);
    }
    net_stopStanceSync(charGuid, assetId) {
        RpcStance.stopStance(charGuid, assetId);
    }
    stopStanceSync(charGuid, stance) {
        RpcStance.stopStance(charGuid, stance.assetId);
    }
    net_playStanceSync(charGuid, assetid, blendMode) {
        RpcStance.playStance(charGuid, assetid, blendMode);
    }
    onPlayerEnterGame(player) {
        this.getAllClient().net_playerJoin(player.playerId);
    }
}
class RpcAnimation {
    constructor(char, assetId) {
        this.ani = null;
        this.assetId = null;
        this.owner = null;
        this._loop = 1;
        this._speed = 1;
        this._slot = mw.AnimSlot.Default;
        this.owner = char;
        this.assetId = assetId;
        this.ani = char.loadAnimation(assetId);
    }
    get loop() {
        return this._loop;
    }
    set loop(value) {
        this._loop = value;
        this.ani.loop = value;
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
        this.ani.speed = value;
    }
    get slot() {
        return this._slot;
    }
    set slot(value) {
        this._slot = value;
        this.ani.slot = value;
    }
    get length() {
        return this.ani.length;
    }
    get isPlaying() {
        return this.ani.isPlaying;
    }
    get onFinish() {
        return this.ani.onFinish;
    }
    play() {
        this.ani?.play();
        let module = ModuleService.getModule(RpcExtesionC);
        module.playAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    pause() {
        this.ani?.pause();
        let module = ModuleService.getModule(RpcExtesionC);
        module.pauseAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    resume() {
        this.ani?.resume();
        let module = ModuleService.getModule(RpcExtesionC);
        module.resumeAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    stop() {
        this.ani?.stop();
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    static playAnimation(guid, assetid, speed, loop, slot) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.loadAnimation(assetid);
        anim.loop = loop;
        anim.speed = speed;
        anim.slot = slot;
        anim.play();
        return anim;
    }
    static pauseAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.currentAnimation;
        if (!anim)
            return;
        anim.pause();
    }
    static resumeAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.currentAnimation;
        if (!anim)
            return;
        anim.resume();
    }
    static stopAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.currentAnimation;
        if (!anim)
            return;
        anim.stop();
    }
}
class RpcStance {
    constructor(assetId, owner) {
        this.assetId = null;
        this.owner = null;
        this.blendMode = null;
        this.assetId = assetId;
        this.owner = owner;
    }
    play() {
        let module = SystemUtil.isServer() ? ModuleService.getModule(RpcExtesionS) : ModuleService.getModule(RpcExtesionC);
        module.playStanceSync(this.owner.gameObjectId, this);
        return true;
    }
    stop() {
        let module = SystemUtil.isServer() ? ModuleService.getModule(RpcExtesionS) : ModuleService.getModule(RpcExtesionC);
        module.stopStanceSync(this.owner.gameObjectId, this);
        return true;
    }
    static playStance(charGuid, assetId, blendMode) {
        let char = GameObject.findGameObjectById(charGuid);
        if (!char)
            return;
        if (assetId == "") {
            char.currentSubStance?.stop();
            return;
        }
        let stance = char.loadSubStance(assetId);
        if (blendMode != null)
            stance.blendMode = blendMode;
        stance.play();
    }
    static stopStance(charGuid, assetId) {
        let char = GameObject.findGameObjectById(charGuid);
        if (!char)
            return;
        let currentStance = char.currentSubStance;
        if (currentStance && (currentStance.assetId == assetId || assetId == "")) {
            currentStance.stop();
        }
    }
}
PlayerManagerExtesion.init();

var foreign18 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PlayerManagerExtesion: PlayerManagerExtesion
});

class PlayerModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.isDead = false;
        this.movePos = new mw.Vector(0, 0, 1);
        this.nowPos = new mw.Vector(0, 0, 0);
        this.isEnding = false;
    }
    onAwake() {
    }
    onStart() {
        this.initPlayerTrigger();
    }
    onUpdate(dt) {
        if (this.deadTrigger) {
            this.deadTrigger.localTransform.position = (this.nowPos.add(this.movePos));
            this.movePos.z = -this.movePos.z;
        }
    }
    /**玩家位置移动
     * @param pos 目标点位置
     */
    net_PlayerMovePosition(pos) {
        this.server.net_PlayerMovePosition(pos, false, Player.localPlayer);
    }
    /**初始化玩家身上的触发器 */
    initPlayerTrigger() {
        console.log("initPlayerTrigger");
        let player = Player.localPlayer;
        Camera.currentCamera.springArm.collisionEnabled = false;
        player.character.asyncReady().then(() => {
            console.log("player.character.asyncReady()  ok");
            SpawnManager.wornAsyncSpawn(ProLoadGuid.Trigger).then((obj) => {
                obj.parent = (player.character);
                this.deadTrigger = obj;
                obj.worldTransform.scale = (new mw.Vector(0.5, 0.5, 1));
                obj.localTransform.position = (new mw.Vector(0, 0, 0));
                this.nowPos = new mw.Vector(0, 0, 0);
                obj.onEnter.add((other) => {
                    if (other && other.tag && !this.isDead) {
                        let gameobj = other;
                        let parentObj = gameobj.parent;
                        while (parentObj.parent) {
                            if (parentObj.parent) {
                                parentObj = parentObj.parent;
                            }
                        }
                        let scrpit = parentObj.getScripts()[0];
                        let trapId = 0;
                        if (scrpit) {
                            trapId = scrpit["type"];
                        }
                        this.judgeTag(other.tag, trapId);
                    }
                });
            });
        });
    }
    judgeTag(tag, trapId) {
        if (tag.includes(consts.deadTag)) {
            if (!this.isDead) {
                SoundPlay.ins.play(SoundConfigID.PLAYER_AND_BARRIER);
                this.deadToReStart();
            }
        }
        for (let i = 0; i < consts.testSkillTypeName.length; i++) {
            let skilltag = consts.testSkillTypeName[i];
            if (tag.includes(skilltag)) {
                Event.dispatchToLocal(C2CEvent.SKILL_DOORGET, tag);
                ModuleService.getModule(SkillModule_C).net_SetGatherSkills(i);
                // 玩家每触发技能门都发送一次
                ModuleService.getModule(LevelModuleC).setMsgStep(2);
                // 玩家选择的技能 埋点
                let curDoor = this.data.getSkillDoor()[i];
                if (curDoor == false) {
                    curDoor = true;
                    this.server.net_setSkilldoor(i, Player.localPlayer);
                }
                break;
            }
        }
        // if(tag.includes())
    }
    /**玩家死亡重新开始 */
    deadToReStart() {
        SoundPlay.ins.play(SoundConfigID.DIE);
        let player = Player.localPlayer;
        this.isDead = true;
        player.character.switchToWalking();
        PlayerManagerExtesion.rpcPlayAnimationLocally(player.character, ProLoadGuid.playerDead);
        //player.character.loadAnimation(ProLoadGuid.playerDead).play;
        player.character.movementEnabled = false;
        if (this.deadTrigger) {
            this.deadTrigger.enabled = (false);
        }
        Event.dispatchToLocal(C2CEvent.HALLUI_UIOUT, false);
        //todo：显示结算、通知关卡玩家死亡
        let moduleLevel = ModuleService.getModule(LevelModuleC);
        // to do 
        ModuleService.getModule(LevelModuleC).setMsgStep(3);
        moduleLevel.setDefaultTime();
    }
    /**心灵宝石，玩家飞行 */
    heartSetPlayerFly() {
        let player = Player.localPlayer;
        player.character.switchToFlying();
        if (this.deadTrigger) {
            this.deadTrigger.worldTransform.scale = (new mw.Vector(0.5, 0.5, 0.5));
            this.deadTrigger.localTransform.position = (new mw.Vector(0, 0, 40));
            this.nowPos = new mw.Vector(0, 0, 40);
        }
        let pos = player.character.worldTransform.position;
        player.character.worldTransform.position = pos.add(new mw.Vector(0, 0, 100));
        // this.server.net_PlayerMovePosition(pos.add(new mw.Vector(0, 0, 100)), false);
    }
    /**重新开始游戏- 心灵宝石取消 */
    mindSkillReset() {
        let player = Player.localPlayer;
        PlayerManagerExtesion.rpcPlayAnimationLocally(player.character, ProLoadGuid.playerStand);
        player.character.movementEnabled = true;
        let pos = player.character.worldTransform.position;
        // this.server.net_PlayerMovePosition(pos.add(new mw.Vector(0, 0, 100)), true);
        player.character.worldTransform.position = pos.add(new mw.Vector(0, 0, 100));
        setTimeout(() => {
            this.isDead = false;
            this.isEnding = false;
        }, 1000);
        player.character.switchToWalking();
        if (this.deadTrigger) {
            this.deadTrigger.worldTransform.scale = (new mw.Vector(0.5, 0.5, 1));
            this.deadTrigger.localTransform.position = (new mw.Vector(0, 0, 0));
            this.nowPos = new mw.Vector(0, 0, 0);
            this.deadTrigger.enabled = (true);
        }
    }
    /**终局 */
    endGame() {
        this.isEnding = true;
    }
    getIsEnd() {
        return this.isEnding;
    }
    net_moveEnd() {
        this.isDead = false;
    }
    resrtSkilldoor() {
        this.server.net_resrtSkilldoor(Player.localPlayer);
    }
}

var foreign36 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PlayerModuleC: PlayerModuleC
});

class SkillModule_C extends ModuleC {
    constructor() {
        super(...arguments);
        this.nowHaveSkill = [0, 0, 0, 0, 0, 0];
        this.powerBallList = [];
        this.powerBallRotaionList = [];
        this.addRotaionSpeed = new mw.Rotation(0, 0, consts.rotationSpeed);
        this.useSpace = false;
        this.useReality = false;
        this.useTime = false;
        this.useMind = false;
        this.powerTrigger = (obj) => {
            if (obj) {
                if (obj.tag && obj.tag.includes(consts.officeTag)) {
                    // obj.visibility=(mw.PropertyStatus.Off);
                    let objName = obj.name;
                    GeneralManager.rpcPlayEffectAtLocation(ProLoadGuid.effect_power, obj.worldTransform.position, 1, undefined, new mw.Vector(0.3));
                    Event.dispatchToLocal(C2CEvent.DESTORY_OFFICE, obj.tag, objName);
                    SoundPlay.ins.play(SoundConfigID.BALL_AND_BARRIER);
                }
            }
        };
    }
    onStart() {
        this.skillPanel = mw.UIService.getUI(SkillPanelUI); // mw.instance.getPanel(SkillPanelUI);
    }
    /**
     * 技能宝石设置，用来确认玩家时候领取过某宝石
     * @param type
     */
    net_SetGatherSkills(type) {
        let list = this.data.getSkillGem();
        if (list[type] == false) {
            this.data.setSkillGem(type);
            this.server.net_SetGatherSkills(type);
        }
        this.net_GetSkill(type);
    }
    /**获取技能宝石 */
    net_GetGatherSkills() {
        return this.data.getSkillGem();
    }
    ///////////////技能点-技能加点面板逻辑相关
    /**
     *技能点数量增长
     * @param type 技能类型
     * @param num 获得的技能点数量
     */
    net_SkillPointGet(type, num) {
        this.data.skillHavePointGet(type, num);
        this.server.net_SkillPointGet(type, num);
    }
    /**
     * 技能升级技能点添加
     * @param type
     */
    net_SkillLvUpPoint(type) {
        let lv = this.data.getSkillLvByType(type);
        if (lv >= consts.skillMaxLv)
            return;
        SoundPlay.ins.play(SoundConfigID.SKILL_UP);
        let havePoints = this.data.getSkillHaveByType(type);
        if (havePoints <= 0)
            return;
        this.data.skillUsePoint(type);
        this.server.net_SkillLvUpPoint(type);
        let point = this.data.getSkillUsePointByType(type);
        this.skillPanel.skillAddPoint(type, this.data.getSkillHaveByType(type), point, lv);
        if (this.juageSkillLvPoints(lv, point)) {
            this.skillLvUp(type);
        }
    }
    /**
     * 玩家技能等级提升
     * @param type
     */
    skillLvUp(type) {
        this.data.skillLvUp(type);
        this.skillPanel.skillLvUp(type, this.data.getSkillLvByType(type));
        this.server.net_SkillLvUp(type);
        Tools.playDynamic(30);
    }
    /**
     * 判断技能是否升级
     * @param lv
     * @param point
     */
    juageSkillLvPoints(lv, point) {
        if (lv >= consts.skillMaxLv)
            return;
        if (point >= lv + 1) {
            return true;
        }
        return false;
    }
    /**
     *获取当前等级距离最高等级所需技能点数量
     * @param lv
     * @param usePoints
     */
    getMaxNeedPoint(lv, usePoints) {
        if (lv >= consts.skillMaxLv)
            return 0;
        let needPoints = 0;
        for (let i = lv; i < consts.skillMaxLv; i++) {
            needPoints += (i + 1);
        }
        return needPoints - usePoints;
    }
    /**获取技能等级列表 */
    net_GetSKillLvList() {
        return this.data.getSkillLvList();
    }
    /**获取加点数据 */
    net_GetSkillUsePoints() {
        return this.data.getSkillUsePoint();
    }
    /**获取拥有的技能点列表 */
    net_GetSkillHavePoints() {
        return this.data.getSkillHavePoint();
    }
    /////////////////技能获取-释放-主ui变动等逻辑
    /**重置/通关 重置技能获取 */
    net_SkillReset() {
        this.useMind = false;
        this.useReality = false;
        this.useSpace = false;
        this.useTime = false;
        if (this.powerBallAncher) {
            for (let i = 0; i < this.powerBallList.length; i++) {
                if (this.powerBallList[i]) {
                    this.powerBallList[i].parent = null;
                    // let trigger = this.powerBallList[i].getChildByName("Ball").getChildByName("BallTrigger") as mw.Trigger;
                    // if (trigger) {
                    //     trigger.enabled = (false);
                    // }
                    // mwext.GameObjPool.despawn(this.powerBallList[i]);
                    this.powerBallList[i].destroy();
                }
            }
            this.powerBallList = [];
            this.powerBallAncher.destroy();
            this.powerBallAncher = null;
            // mwext.GameObjPool.despawn(this.powerBallAncher);
        }
        this.powerBallAncher = null;
        Event.dispatchToLocal(C2CEvent.HALLUI_SKILLRESET);
        ModuleService.getModule(PlayerModuleC).mindSkillReset();
    }
    /**播放技能 */
    net_GetSkill(type) {
        let lv = this.data.getSkillLvByType(type);
        switch (type) {
            case SkillType.Power:
                {
                    this.playSkillPower(lv);
                }
                break;
            case SkillType.Space:
                {
                    this.playSkillSpace(lv);
                }
                break;
            case SkillType.Reality:
                {
                    this.playSkillReality(lv);
                }
                break;
            case SkillType.Time:
                {
                    this.playSkillTime(lv);
                }
                break;
            case SkillType.Heart:
                {
                    this.playSkillHeart(lv);
                }
                break;
            case SkillType.Soul:
                {
                    this.playSoul();
                }
                break;
        }
    }
    /**释放力量宝石能力
     *  @param lv 技能等级
     */
    playSkillPower(lv) {
        if (this.powerBallAncher)
            return;
        Event.dispatchToLocal(C2CEvent.HALLUI_PLAYERSTOP);
        const func = () => {
            SoundPlay.ins.play(SoundConfigID.PASS_POWER);
            this.playEffectAtPlayer(SkillType.Power);
            ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Power, lv);
            this.setPowerBall(lv);
        };
        // SoundPlay.ins.play(SoundConfigID.GET_SKILL);
        Event.dispatchToLocal(C2CEvent.GETSKILLGEM, SkillType.Power, func);
    }
    setPowerBall(lv) {
        let player = Player.localPlayer;
        let ancher = SpawnManager.wornSpawn(ProLoadGuid.anchor); //SpawnManager.modifyPoolSpawn(ProLoadGuid.anchor) as mw.Anchor;
        ancher.worldTransform.position = (player.character.worldTransform.position); // = player.character.worldTransform.position;
        this.powerBallAncher = ancher;
        let num = GameConfig.GemSkill.getElement(1).skillValue[lv - 1];
        if (!num)
            num = lv + 1;
        let singleR = 360 / (num);
        let cirPosList = Tools.getCirclePoints(ancher.worldTransform.position, consts.powerBallRadius, singleR);
        for (let i = 0; i < num; i++) {
            let ball = SpawnManager.wornSpawn(ProLoadGuid_SceneGuid.powerBallPre); // SpawnManager.modifyPoolSpawn(ProLoadGuid_SceneGuid.powerBallPre);
            let trigger = ball.getChildByName("Ball").getChildByName("BallTrigger");
            if (trigger) {
                trigger.enabled = (true);
                trigger.onEnter.remove(this.powerTrigger);
                trigger.onEnter.add(this.powerTrigger);
            }
            this.powerBallList.push(ball);
            ball.parent = (ancher);
            let pos = cirPosList[i];
            ball.localTransform.position = (pos);
        }
    }
    /**释放空间宝石 */
    playSkillSpace(lv) {
        if (this.useSpace)
            return;
        Event.dispatchToLocal(C2CEvent.HALLUI_PLAYERSTOP);
        const func = () => {
            SoundPlay.ins.play(SoundConfigID.PASS_SPACE);
            this.playEffectAtPlayer(SkillType.Space);
            ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Space, lv);
        };
        // SoundPlay.ins.play(SoundConfigID.GET_SKILL);
        this.useSpace = true;
        Event.dispatchToLocal(C2CEvent.GETSKILLGEM, SkillType.Space, func);
        // let widthNum = consts.spaceBaseNum + consts.spaceLvAddNum * (lv - 1);
    }
    /**释放现实宝石 */
    playSkillReality(lv) {
        if (this.useReality)
            return;
        Event.dispatchToLocal(C2CEvent.HALLUI_PLAYERSTOP);
        const func = () => {
            SoundPlay.ins.play(SoundConfigID.PASS_SPACE);
            this.playEffectAtPlayer(SkillType.Space);
            ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Reality, lv);
        };
        // SoundPlay.ins.play(SoundConfigID.GET_SKILL);
        this.useReality = true;
        Event.dispatchToLocal(C2CEvent.GETSKILLGEM, SkillType.Reality, func);
        consts.baseRealityProbabillity + consts.addRealityProbabillity * (lv - 1);
    }
    /**释放时间宝石 */
    playSkillTime(lv) {
        if (this.useTime)
            return;
        Event.dispatchToLocal(C2CEvent.HALLUI_PLAYERSTOP);
        const func = () => {
            SoundPlay.ins.play(SoundConfigID.PASS_TIME);
            this.playEffectAtPlayer(SkillType.Time);
            ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Time, lv);
        };
        // SoundPlay.ins.play(SoundConfigID.GET_SKILL);
        this.useTime = true;
        Event.dispatchToLocal(C2CEvent.GETSKILLGEM, SkillType.Time, func);
        consts.baseTimeProportion + consts.addTimeProportion * (lv - 1);
        //todo：通知机关延时:减速比例为timepro
    }
    /**释放心灵宝石 */
    playSkillHeart(lv) {
        SoundPlay.ins.play(SoundConfigID.PASS_MIND);
        if (this.useMind)
            return;
        Event.dispatchToLocal(C2CEvent.HALLUI_PLAYERSTOP);
        const func = () => {
            this.playEffectAtPlayer(SkillType.Heart);
            SoundPlay.ins.stop(SoundConfigID.WALK);
            ModuleService.getModule(PlayerModuleC).heartSetPlayerFly();
            ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Heart, lv);
        };
        // SoundPlay.ins.play(SoundConfigID.GET_SKILL);
        this.useMind = true;
        Event.dispatchToLocal(C2CEvent.GETSKILLGEM, SkillType.Heart, func);
    }
    /**释放灵魂宝石 */
    playSoul() {
        Event.dispatchToLocal(C2CEvent.HALLUI_PLAYERSTOP);
        const func = () => {
            mw.UIService.show(SoulUI, () => {
                this.playEffectAtPlayer(SkillType.Soul);
                ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Soul, 1);
            });
            // mw.instance.showPanel(SoulSkill, () => {
            //     this.playEffectAtPlayer(SkillType.Soul);
            //     ModuleService.getModule(LevelModuleC).useSkillByType(SkillType.Soul, 1);
            // });
        };
        // SoundPlay.ins.play(SoundConfigID.GET_SKILL);
        Event.dispatchToLocal(C2CEvent.GETSKILLGEM, SkillType.Soul, func);
    }
    onUpdate(dt) {
        if (this.powerBallAncher) {
            this.powerBallAncher.worldTransform.position = (Player.localPlayer.character.worldTransform.position);
            this.powerBallAncher.worldTransform.rotation = (this.powerBallAncher.worldTransform.rotation.add(this.addRotaionSpeed));
        }
    }
    /**
     * 播放技能特效
     * @param type
     */
    async playEffectAtPlayer(type) {
        const cfg = GameConfig.GemSkill.getElement(type + 1);
        if (cfg) {
            const playId = EffectService.playAtPosition(cfg.effect, Player.localPlayer.character.worldTransform.position, { loopCount: 0 });
            //const effect = SpawnManager.modifyPoolAsyncSpawn(cfg.effect) as Effect;
            EffectService.getEffectById(playId).then((effect) => {
                setTimeout(async () => {
                    effect.play();
                    // char.detac (effect);
                    let worldScale = 1;
                    const inter = setInterval(async () => {
                        worldScale += 0.2;
                        if (worldScale >= 5) { // 扩大10倍
                            clearInterval(inter);
                            effect.worldTransform.scale = (mw.Vector.one); // = new mw.Vector(1);
                            effect.stop();
                            mwext.GameObjPool.despawn(effect);
                            return;
                        }
                        effect.worldTransform.scale = (new mw.Vector(worldScale)); // = ;
                    }, 50);
                }, 100);
            });
        }
        else {
            throw new Error("skill type error,not find cfg");
        }
    }
}

var foreign38 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SkillModule_C: SkillModule_C
});

let EndUI_LOSE_Generate = class EndUI_LOSE_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.canvas_Move = undefined;
        this.btn_start = undefined;
        this.centerBottom_Retry = undefined;
        this.btn_lvup = undefined;
        this.centerBottom_SetSkill = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.btn_start.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btn_start");
        });
        this.initLanguage(this.btn_start);
        this.btn_start.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.btn_lvup.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btn_lvup");
        });
        this.initLanguage(this.btn_lvup);
        this.btn_lvup.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        //按钮添加点击
        //按钮多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWButton_1"));
        //文本多语言
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/CenterTop/canvas_Move/Txt_Lose"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/RightBottom/centerBottom_Retry/Text_Start"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/RightBottom/centerBottom_SetSkill/Text_lvup"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/CenterTop/canvas_Move')
], EndUI_LOSE_Generate.prototype, "canvas_Move", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/RightBottom/centerBottom_Retry/btn_start')
], EndUI_LOSE_Generate.prototype, "btn_start", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/RightBottom/centerBottom_Retry')
], EndUI_LOSE_Generate.prototype, "centerBottom_Retry", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/RightBottom/centerBottom_SetSkill/btn_lvup')
], EndUI_LOSE_Generate.prototype, "btn_lvup", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/RightBottom/centerBottom_SetSkill')
], EndUI_LOSE_Generate.prototype, "centerBottom_SetSkill", void 0);
EndUI_LOSE_Generate = __decorate([
    UIBind('UI/EndUI_LOSE.ui')
], EndUI_LOSE_Generate);
var EndUI_LOSE_Generate$1 = EndUI_LOSE_Generate;

var foreign101 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: EndUI_LOSE_Generate$1
});

class EndUILose extends EndUI_LOSE_Generate$1 {
    onStart() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        //this.initButtons();
        this.btn_start.onClicked.add(() => {
            this.btn_start.enable = (false);
            this.playOutAni(false, null, true);
        });
        this.btn_lvup.onClicked.add(() => {
            this.btn_lvup.enable = (false);
            this.playOutAni(false, null, false);
        });
        this.centerBottom_Retry.visibility = (mw.SlateVisibility.Hidden);
    }
    // 	/**
    // 	* 构造UI文件成功后，onStart之后
    // 	* 对于UI的根节点的添加操作，进行调用
    // 	* 注意：该事件可能会多次调用
    // 	*/
    onAdded() {
        const size = mw.WindowUtil.getViewportSize();
        let slot = this.canvas_Move;
        slot.position = (new mw.Vector2(-size.x, 0));
    }
    // protected onEnable(): void {
    //     const size = mw.WindowUtil.getViewportSize();
    //     let slot = this.canvas_Move ;
    //     slot.setPosition(new mw.Vector2(-size.x, 0));
    // }
    onShow(endData) {
        this.btn_start.enable = (true);
        this.btn_lvup.enable = (true);
        this.playOutAni(true, endData, false);
        SoundPlay.ins.stop(SoundConfigID.PASS_POWER);
        SoundPlay.ins.play(SoundConfigID.FAIL);
    }
    playOutAni(isIn, endData, reset) {
        SoundPlay.ins.stop(SoundConfigID.FAIL);
        SoundPlay.ins.play(SoundConfigID.UI_ENTER_END);
        const size = mw.WindowUtil.getViewportSize();
        let slot = this.canvas_Move;
        let start = isIn ? -1 : 0;
        let end = isIn ? 0 : 1;
        let movePos = new mw.Vector2(0, 0);
        movePos.x = size.x * start;
        movePos.y = 0;
        slot.position = (movePos);
        const moveAni = new mw.Tween({ hight: start }).to({ hight: end }, 500).onUpdate((object) => {
            movePos.x = size.x * object.hight;
            movePos.y = 0;
            slot.position = (movePos);
        }).onComplete(() => {
            if (isIn) {
                setTimeout(() => {
                    this.centerBottom_Retry.visibility = (mw.SlateVisibility.Visible);
                    let have = ModuleService.getModule(SkillModule_C).net_GetSkillHavePoints();
                    let haveNotUse = false;
                    for (let i = 0; i < have.length; i++) {
                        if (have[i] != 0) {
                            haveNotUse = true;
                            break;
                        }
                    }
                    Tools.setMWGameUIVisibility(this.centerBottom_SetSkill, haveNotUse);
                }, 250);
            }
            else {
                this.centerBottom_Retry.visibility = (mw.SlateVisibility.Hidden);
                this.centerBottom_SetSkill.visibility = (mw.SlateVisibility.Hidden);
                this.hide();
                if (reset) {
                    ModuleService.getModule(LevelModuleC).resetGame();
                }
                else {
                    mw.UIService.show(SkillPanelUI, false);
                    // mw.instance.showPanel(SkillPanelUI, false);
                }
            }
        });
        moveAni.start();
    }
    hide() {
        mw.UIService.hide(EndUILose);
    }
    onHide() {
    }
}

var foreign93 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    EndUILose: EndUILose
});

let RewardsUI_Generate = class RewardsUI_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.btn_start = undefined;
        this.canvas_btnPanel = undefined;
        this.img_check1 = undefined;
        this.mbtn_skill1 = undefined;
        this.mTxt_Skill1 = undefined;
        this.canvas_skill1 = undefined;
        this.img_check2 = undefined;
        this.mbtn_skill2 = undefined;
        this.mTxt_Skill2 = undefined;
        this.canvas_skill2 = undefined;
        this.img_check3 = undefined;
        this.mbtn_skill3 = undefined;
        this.mTxt_Skill3 = undefined;
        this.canvas_skill3 = undefined;
        this.canvas_allReward = undefined;
        this.txt_skillNum1 = undefined;
        this.txt_skillNum2 = undefined;
        this.txt_skillNum3 = undefined;
        this.txt_skillNum4 = undefined;
        this.txt_skillNum5 = undefined;
        this.canvas_CenterMove = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.btn_start.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btn_start");
        });
        this.initLanguage(this.btn_start);
        this.btn_start.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.mbtn_skill1.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mbtn_skill1");
        });
        this.initLanguage(this.mbtn_skill1);
        this.mbtn_skill1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.mbtn_skill2.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mbtn_skill2");
        });
        this.initLanguage(this.mbtn_skill2);
        this.mbtn_skill2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.mbtn_skill3.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mbtn_skill3");
        });
        this.initLanguage(this.mbtn_skill3);
        this.mbtn_skill3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        //按钮添加点击
        //按钮多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWButton_1"));
        //文本多语言
        this.initLanguage(this.mTxt_Skill1);
        this.initLanguage(this.mTxt_Skill2);
        this.initLanguage(this.mTxt_Skill3);
        this.initLanguage(this.txt_skillNum1);
        this.initLanguage(this.txt_skillNum2);
        this.initLanguage(this.txt_skillNum3);
        this.initLanguage(this.txt_skillNum4);
        this.initLanguage(this.txt_skillNum5);
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Canvas_BtnContinue/canvas_btnPanel/Text_Start"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/Txt_Tip_Reward"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Canvas_BtnContinue/canvas_btnPanel/btn_start')
], RewardsUI_Generate.prototype, "btn_start", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Canvas_BtnContinue/canvas_btnPanel')
], RewardsUI_Generate.prototype, "canvas_btnPanel", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill1/img_check1')
], RewardsUI_Generate.prototype, "img_check1", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill1/mbtn_skill1')
], RewardsUI_Generate.prototype, "mbtn_skill1", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill1/mTxt_Skill1')
], RewardsUI_Generate.prototype, "mTxt_Skill1", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill1')
], RewardsUI_Generate.prototype, "canvas_skill1", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill2/img_check2')
], RewardsUI_Generate.prototype, "img_check2", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill2/mbtn_skill2')
], RewardsUI_Generate.prototype, "mbtn_skill2", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill2/mTxt_Skill2')
], RewardsUI_Generate.prototype, "mTxt_Skill2", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill2')
], RewardsUI_Generate.prototype, "canvas_skill2", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill3/img_check3')
], RewardsUI_Generate.prototype, "img_check3", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill3/mbtn_skill3')
], RewardsUI_Generate.prototype, "mbtn_skill3", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill3/mTxt_Skill3')
], RewardsUI_Generate.prototype, "mTxt_Skill3", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward/canvas_skill3')
], RewardsUI_Generate.prototype, "canvas_skill3", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_Reward/canvas_allReward')
], RewardsUI_Generate.prototype, "canvas_allReward", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_SkillCount/Canvas_Skill_001/txt_skillNum1')
], RewardsUI_Generate.prototype, "txt_skillNum1", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_SkillCount/Canvas_Skill_002/txt_skillNum2')
], RewardsUI_Generate.prototype, "txt_skillNum2", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_SkillCount/Canvas_Skill_003/txt_skillNum3')
], RewardsUI_Generate.prototype, "txt_skillNum3", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_SkillCount/Canvas_Skill_004/txt_skillNum4')
], RewardsUI_Generate.prototype, "txt_skillNum4", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove/Canvas_SkillCount/Canvas_Skill_005/txt_skillNum5')
], RewardsUI_Generate.prototype, "txt_skillNum5", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Center/canvas_CenterMove')
], RewardsUI_Generate.prototype, "canvas_CenterMove", void 0);
RewardsUI_Generate = __decorate([
    UIBind('UI/RewardsUI.ui')
], RewardsUI_Generate);
var RewardsUI_Generate$1 = RewardsUI_Generate;

var foreign107 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RewardsUI_Generate$1
});

class RewardsUI extends RewardsUI_Generate$1 {
    constructor() {
        super(...arguments);
        this.nowChoseIndex = 0;
        this.nowSendRewards = [];
        this.imgGuidList = [116241, 116251, 116259, 116260, 116261];
        this.showContinue = false;
    }
    /**
    * 构造UI文件成功后，在合适的时机最先初始化一次
    */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        //this.initButtons();
        this.btn_start.onClicked.add(() => {
            if (!this.showContinue) {
                if (this.nowSendRewards.length > 0) {
                    if (this.nowChoseIndex == 0) {
                        this.nowChoseIndex = 1;
                    }
                    ModuleService.getModule(SkillModule_C).net_SkillPointGet(this.nowSendRewards[this.nowChoseIndex - 1], 1);
                }
                this.showContinue = true;
                this.playAni(false, null);
            }
        });
        ////奖励按钮点击
        this.mbtn_skill1.onClicked.add(() => {
            this.changeChoseSkill(1);
        });
        this.mbtn_skill2.onClicked.add(() => {
            this.changeChoseSkill(2);
        });
        this.mbtn_skill3.onClicked.add(() => {
            this.changeChoseSkill(3);
        });
    }
    changeChoseSkill(skillIndex) {
        this.nowChoseIndex = skillIndex;
        for (let i = 1; i <= 3; i++) {
            if (i != skillIndex) {
                this[`img_check${i}`].visibility = (mw.SlateVisibility.Hidden);
            }
            else {
                this[`img_check${skillIndex}`].visibility = (mw.SlateVisibility.Visible);
            }
        }
    }
    hideAllRewards() {
        for (let i = 1; i <= 3; i++) {
            this[`canvas_skill${i}`].visibility = (mw.SlateVisibility.Hidden);
            this[`img_check${i}`].visibility = (mw.SlateVisibility.Hidden);
            this[`mbtn_skill${i}`].visibility = (mw.SlateVisibility.Hidden);
        }
    }
    /**
    * 构造UI文件成功后，onStart之后
    * 对于UI的根节点的添加操作，进行调用
    * 注意：该事件可能会多次调用
    */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
    /**
    * 每一帧调用
    * 通过canUpdate可以开启关闭调用
    * dt 两帧调用的时间差，毫秒
    */
    //protected onUpdate(dt :number) {
    //}
    /**
     * 设置显示时触发
     */
    onShow(endData) {
        this.canvas_btnPanel.visibility = (mw.SlateVisibility.Hidden);
        this.playAni(true, endData);
        let havePoint = ModuleService.getModule(SkillModule_C).net_GetSkillHavePoints();
        for (let i = 0; i < havePoint.length; i++) {
            if (this[`txt_skillNum${i + 1}`]) {
                this[`txt_skillNum${i + 1}`].text = (`X${havePoint[i]}`);
            }
        }
    }
    showRewards(endData) {
        let rewards = endData.rewards;
        this.hideAllRewards();
        this.nowSendRewards = [];
        let strList = GameConfig.DoorColor.getAllElement();
        for (let i = 0; i < rewards.length; i++) {
            this.nowSendRewards.push(rewards[i]);
            setTimeout(() => {
                this[`canvas_skill${i + 1}`].visibility = (mw.SlateVisibility.Visible);
                this[`mbtn_skill${i + 1}`].normalImageGuid = (this.imgGuidList[rewards[i]]);
                this[`mbtn_skill${i + 1}`].visibility = (mw.SlateVisibility.Visible);
                this[`mTxt_Skill${i + 1}`].text = (strList[rewards[i]].name);
                if (i == 0) {
                    this.img_check1.visibility = (mw.SlateVisibility.Visible);
                }
                SoundPlay.ins.stop(SoundConfigID.SKILL_REWARD);
                SoundPlay.ins.play(SoundConfigID.SKILL_REWARD);
            }, 350 * (i + 1));
        }
        setTimeout(() => {
            this.canvas_btnPanel.visibility = (mw.SlateVisibility.Visible);
        }, 350 * (rewards.length + 1));
    }
    playAni(isIn, endData) {
        SoundPlay.ins.play(SoundConfigID.UI_ENTER_END);
        const size = mw.WindowUtil.getViewportSize();
        let slot = this.canvas_CenterMove;
        let start = isIn ? -1 : 0;
        let end = isIn ? 0 : 1;
        let pos = new mw.Vector2(0, 0);
        if (isIn)
            this.canvas_CenterMove.visibility = (mw.SlateVisibility.Hidden);
        pos.x = size.x * start;
        pos.y = 0;
        slot.position = (pos);
        const moveAni = new mw.Tween({ hight: start }).to({ hight: end }, 500).onUpdate((object) => {
            pos.x = size.x * object.hight;
            pos.y = 0;
            slot.position = (pos);
        }).onComplete(() => {
            if (isIn) {
                setTimeout(() => {
                    this.showRewards(endData);
                }, 250);
            }
            else {
                this.showContinue = false;
                mw.UIService.show(SkillPanelUI, true);
                // mw.instance.showPanel(SkillPanelUI, true);
                this.hide();
            }
        }).onStart(() => {
            this.canvas_CenterMove.visibility = (mw.SlateVisibility.Visible);
        });
        moveAni.start();
    }
    hide() {
        mw.UIService.hide(RewardsUI);
    }
    /**
     * 设置不显示时触发
     */
    onHide() {
        this.nowChoseIndex = 0;
        this.nowSendRewards = [];
        this.hideAllRewards();
    }
}

var foreign97 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RewardsUI
});

let EndUI_WIN_Generate = class EndUI_WIN_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.canvas_Move = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        //按钮多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWButton_1"));
        //文本多语言
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/CenterTop/canvas_Move/Txt_Win"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/CenterTop/canvas_Move')
], EndUI_WIN_Generate.prototype, "canvas_Move", void 0);
EndUI_WIN_Generate = __decorate([
    UIBind('UI/EndUI_WIN.ui')
], EndUI_WIN_Generate);
var EndUI_WIN_Generate$1 = EndUI_WIN_Generate;

var foreign102 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: EndUI_WIN_Generate$1
});

class EndUI_WIN extends EndUI_WIN_Generate$1 {
    constructor() {
        super(...arguments);
        /** 当脚本被实例后，会在第一帧更新前调用此函数 */
        this.movePos = new mw.Vector2(0, 0);
    }
    /**
    * 构造UI文件成功后，在合适的时机最先初始化一次
    */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        //this.initButtons();
    }
    /**
    * 构造UI文件成功后，onStart之后
    * 对于UI的根节点的添加操作，进行调用
    * 注意：该事件可能会多次调用
    */
    onAdded() {
        const size = mw.WindowUtil.getViewportSize();
        let slot = this.canvas_Move;
        slot.position = (new mw.Vector2(-size.x, 0));
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
    playOutAni(isIn, endData) {
        SoundPlay.ins.play(SoundConfigID.UI_ENTER_END);
        const size = mw.WindowUtil.getViewportSize();
        let slot = this.canvas_Move;
        let start = isIn ? -1 : 0;
        let end = isIn ? 0 : 1;
        this.movePos.x = size.x * start;
        this.movePos.y = 0;
        slot.position = (this.movePos);
        const moveAni = new mw.Tween({ hight: start }).to({ hight: end }, 500).onUpdate((object) => {
            this.movePos.x = size.x * object.hight;
            this.movePos.y = 0;
            slot.position = (this.movePos);
        }).onComplete(() => {
            if (isIn) {
                setTimeout(() => {
                    this.playOutAni(false, endData);
                }, 2000);
            }
            else {
                this.hide();
                // mw.instance.showPanel(EndUIRewards, endData);
                mw.UIService.show(RewardsUI, endData);
            }
        });
        moveAni.start();
    }
    hide() {
        mw.UIService.hide(EndUI_WIN);
    }
    /**
    * 每一帧调用
    * 通过canUpdate可以开启关闭调用
    * dt 两帧调用的时间差，毫秒
    */
    //protected onUpdate(dt :number) {
    //}
    /**
     * 设置显示时触发
     */
    onShow(endData) {
        this.playOutAni(true, endData);
        SoundPlay.ins.stop(SoundConfigID.PASS_POWER);
        SoundPlay.ins.play(SoundConfigID.SUCCESS);
    }
    /**
     * 设置不显示时触发
     */
    onHide() {
        this.movePos.y = 0;
    }
}

var foreign94 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: EndUI_WIN
});

let EnterLoading_Generate = class EnterLoading_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mImgRing = undefined;
        this.mTxtTips = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        //按钮多语言
        //文本多语言
        this.initLanguage(this.mTxtTips);
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWTextBlock_1"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mImgRing')
], EnterLoading_Generate.prototype, "mImgRing", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxtTips')
], EnterLoading_Generate.prototype, "mTxtTips", void 0);
EnterLoading_Generate = __decorate([
    UIBind('UI/EnterLoading.ui')
], EnterLoading_Generate);
var EnterLoading_Generate$1 = EnterLoading_Generate;

var foreign103 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: EnterLoading_Generate$1
});

class EnterLoading extends EnterLoading_Generate$1 {
    constructor() {
        super(...arguments);
        this.time = 0;
        this.pause = false;
        this.isSceneLoadFinish = false;
        this.fixedTime = 3;
        /**
         * 设置不显示时触发
         */
        //protected onHide() {
        //}
    }
    /**
    * 构造UI文件成功后，在合适的时机最先初始化一次
    */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = true;
        this.layer = mw.UILayerMiddle;
        //this.initButtons();
        Event.addLocalListener(C2CEvent.SCENE_FINISH, () => {
            this.isSceneLoadFinish = true;
        });
    }
    /**
    * 构造UI文件成功后，onStart之后
    * 对于UI的根节点的添加操作，进行调用
    * 注意：该事件可能会多次调用
    */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
    /**
    * 每一帧调用
    * 通过canUpdate可以开启关闭调用
    * dt 两帧调用的时间差，毫秒
    */
    onUpdate(dt) {
        if (!this.pause) {
            this.time += dt;
            this.rotateImg();
            if (this.time >= this.fixedTime && this.isSceneLoadFinish) {
                this.pause = true;
                this.hideAnim();
            }
        }
    }
    hide() {
        this.time = 0;
        this.isSceneLoadFinish = false;
        this.rootCanvas.renderScale = (mw.Vector2.one);
        mw.UIService.hide(EnterLoading);
    }
    hideAnim() {
        new mw.Tween({ worldScale: mw.Vector2.one })
            .to({ worldScale: new mw.Vector2(0, 5) }, 200)
            .onUpdate(o => {
            this.rootCanvas.renderScale = (o.worldScale);
        })
            .onComplete(() => {
            SoundPlay.ins.playBGM();
            this.hide();
        })
            .start();
    }
    /**
     * 设置显示时触发
     */
    onShow(...params) {
        SoundPlay.ins.stopBGM();
        this.randomText();
        this.pause = false;
    }
    /**旋转图片 */
    rotateImg() {
        let angle = this.mImgRing.renderTransformAngle;
        if (angle < 180) {
            angle += 5;
        }
        else {
            angle = -180;
        }
        this.mImgRing.renderTransformAngle = (angle);
    }
    /**随机tips */
    randomText() {
        const tips = GameConfig.Tips.getAllElement();
        const len = tips.length;
        const index = Tools.randomBetweenMinAndMax(0, len - 1);
        const cfg = tips[index];
        this.mTxtTips.text = (`tips:${cfg.tips}`);
    }
}

var foreign95 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: EnterLoading
});

/**障碍物信息 */
class BarrierInfo {
    constructor() {
        this.prefabID = 0;
        this.prefabLoc = [];
    }
}
/**游戏系数 */
class GameCoefficient {
    constructor(speed) {
        this.speedCoefficient = 0; // 速度系数
        this.speedCoefficient = speed;
    }
}
class LevelDataHelper extends Subdata {
    constructor() {
        super(...arguments);
        this.level = 0; // 正确的关卡lv
        this.oldLevel = 0; // 机关绑定的关卡lv
        this.startPos = []; // 出发位置
        this.gameCoefficient = null; // 游戏参数系数
        this.barrierInfo = [];
        this.ifNewPlayer = true;
        this.fallTime = 0;
        this.ifNewEnter = true;
        // 当天累计闯过的关卡
        this.levelDay = 0;
        this.sendMSGTime = 0;
        // 玩家在整个游戏中消耗的技能点的总和
        this.skillSum = 0;
        // 核心循环记录全为true的时候发送一次
        this.sendMsgStep = [false, false, false, false];
        // 玩家完成核心循环的次数
        this.sendStepTimes = 0;
    }
    /**
     * 保存关卡障碍物数据
     * @param level 障碍物对应的关卡lv
     * @param barrierInfo 障碍物信息
     * @param pos 出生位置
     * @param gameCoefficient 当前关卡的参数系数
     */
    saveLevelInfo(level, barrierInfo, pos, gameCoefficient) {
        this.oldLevel = level - 1;
        this.barrierInfo = barrierInfo;
        this.startPos = pos;
        this.gameCoefficient = gameCoefficient;
    }
    /**
     * 保存关卡等级
     * @param level
     */
    saveLevel(level) {
        this.level = level;
    }
    /**
     * 获得起始位置
     */
    getStartPos() {
        return this.startPos;
    }
    /**
     * 当前关卡
     */
    getLevel() {
        return this.level;
    }
    /**
     * 障碍物关卡
     */
    getBarrierLevel() {
        return this.oldLevel;
    }
    /**
     * 关卡障碍物信息
     */
    getBarrierInfo() {
        return this.barrierInfo;
    }
    /**获取游戏系数 */
    getGameCoefficient() {
        return this.gameCoefficient;
    }
    resetDefaultTime() {
        this.fallTime = 0;
    }
    setDefaultTime() {
        this.fallTime++;
    }
    getDefaultTime() {
        return this.fallTime;
    }
    getIfNewPlayer() {
        return this.ifNewPlayer;
    }
    setNewPlayer() {
        this.ifNewPlayer = false;
    }
    getIfNewEnter() {
        return this.ifNewEnter;
    }
    setIfNewEnter() {
        this.ifNewEnter = false;
    }
    getLevelDay() {
        return this.levelDay;
    }
    checkIsSendMsg(player) {
        let starTime = new Date().getTime();
        let curTime = Math.floor(this.sendMSGTime / 86400000);
        let perTime = Math.floor(starTime / 86400000);
        // 第一个条件判断是否同一天
        if (curTime < perTime) {
            // 是同一天再考虑关卡数
            this.levelDay += 1;
            if (this.levelDay < 2)
                return;
            this.sendMSGTime = starTime;
            this.levelDay = 0;
            this.save(false);
        }
    }
    getDate() {
        return this;
    }
}
__decorate([
    Decorator.persistence()
], LevelDataHelper.prototype, "level", void 0);
__decorate([
    Decorator.persistence()
], LevelDataHelper.prototype, "oldLevel", void 0);
__decorate([
    Decorator.persistence()
], LevelDataHelper.prototype, "startPos", void 0);
__decorate([
    Decorator.persistence()
], LevelDataHelper.prototype, "gameCoefficient", void 0);
__decorate([
    Decorator.persistence()
], LevelDataHelper.prototype, "barrierInfo", void 0);
__decorate([
    Decorator.persistence()
], LevelDataHelper.prototype, "ifNewPlayer", void 0);
__decorate([
    Decorator.persistence()
], LevelDataHelper.prototype, "fallTime", void 0);
__decorate([
    Decorator.persistence()
], LevelDataHelper.prototype, "ifNewEnter", void 0);
__decorate([
    Decorator.persistence()
], LevelDataHelper.prototype, "levelDay", void 0);
__decorate([
    Decorator.persistence()
], LevelDataHelper.prototype, "sendMSGTime", void 0);
__decorate([
    Decorator.persistence()
], LevelDataHelper.prototype, "skillSum", void 0);
__decorate([
    Decorator.persistence()
], LevelDataHelper.prototype, "sendMsgStep", void 0);
__decorate([
    Decorator.persistence()
], LevelDataHelper.prototype, "sendStepTimes", void 0);

var foreign30 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BarrierInfo: BarrierInfo,
    GameCoefficient: GameCoefficient,
    LevelDataHelper: LevelDataHelper
});

const SOUL_SKILL_DOOR = 116; // 特殊门编号
const MAX_DOOR = 6; // 技能门最大数量
const SKILL_MAP = {
    'Power': SkillType.Power,
    'Space': SkillType.Space,
    'Reality': SkillType.Reality,
    'Time': SkillType.Time,
    'Mind': SkillType.Heart,
    'Soul': SkillType.Soul
};
/**
 * 场景障碍物生成器
 */
class SceneCreator {
    constructor(module) {
        this.module = null; // 关卡module
        this.allPrefabScripts = []; // 当前场景的所有脚本
        this.pos = mw.Vector.zero; // 起始位置
        this.startPos = mw.Vector.zero; // 玩家出发位置
        this.soulDoor = null; // 灵魂门
        this.useSKillID = new Set(); // 当前关卡使用的技能门id 
        this.allBarriers = []; // 障碍物信息
        this.offsetDis1 = 0; // 出生点到第一个机关距离
        this.offsetDis2 = 0; // 不同机关类型之间的距离
        this.offsetDis3 = 0; // 技能门之前的距离
        this.offsetDis4 = 0; // 技能门之后的距离
        this.gameCoefficient = null; // 当前游戏关卡相关系数
        this.useSkillDoorType = new Set(); // 当前已经存在的技能类型（筛选技能门时候使用）
        this.module = module;
        const globalCfg = GameConfig.Global; // 全局表配置
        this.pos = Tools.convertArrToVec(globalCfg.getElement(101).parameter2)
            .subtract(new mw.Vector(globalCfg.getElement(102).parameter1, 0, 0));
        this.offsetDis1 = globalCfg.getElement(103).parameter1;
        this.offsetDis2 = globalCfg.getElement(105).parameter1;
        this.offsetDis3 = globalCfg.getElement(106).parameter1;
        this.offsetDis4 = globalCfg.getElement(107).parameter1;
    }
    /**重置脚本属性(通关的时候调用) */
    resetScript() {
        this.soulDoor = null;
        this.useSKillID.clear();
        this.useSkillDoorType.clear();
        this.expandRoad(1, false);
        this.despawnGo();
    }
    /**
     * 创建场景
     */
    createScene() {
        const guideModule = ModuleService.getModule(GuideModuleC);
        if (guideModule.isIncludeGuide()) {
            this.createGuideScene();
        }
        else {
            this.createNormalScene();
        }
        this.createBarrier();
    }
    // 还原场景
    restoreScene() {
        if (!this.module.getCurrentSceneLv()) { // 第一次进入
            this.module.sendLevel();
            return;
        }
        if (this.module.isUpdateLv()) { // 是更新后的就用保存的信息生成
            const info = this.module.getCurrentSceneBarrierInfo();
            this.allBarriers = info;
            this.startPos = this.module.getStartPos();
            this.gameCoefficient = this.module.getGameCoefficient();
            this.createBarrier();
        }
        else {
            // 不是就从新创建
            this.createScene();
        }
    }
    // 重置场景
    resetScene() {
        ModuleService.getModule(PlayerModuleC).net_PlayerMovePosition(this.startPos);
        this.allPrefabScripts.forEach(s => {
            s.resetPrefab();
            s.moving && s.moving(true, this.gameCoefficient.speedCoefficient);
        });
        this.expandRoad(1, false);
        this.useSKillID.clear();
        if (this.soulDoor) {
            this.soulDoor.setVisibility(mw.PropertyStatus.Off, true);
            Event.dispatchToLocal('SoulMgs', false); // 给技能门预制件发送的消息
        }
    }
    /**
     * 技能使用
     * @param type 技能类型
     */
    useSkill(type, lv) {
        const types = this.createTypes(lv);
        if (typeof types[type] !== 'function') {
            throw new Error("Invalid type");
        }
        types[type]();
        this.useSKillID.add(type);
        this.checkShowSoulDoor();
    }
    // ===============================================================================================================
    /**保存障碍物信息 */
    saveBarrierInfo(cfgID, pos) {
        const barrier = new BarrierInfo();
        barrier.prefabID = cfgID;
        barrier.prefabLoc = [pos.x, pos.y, pos.z];
        this.allBarriers.push(barrier);
    }
    /**分帧加载预制件 */
    createBarrier() {
        mw.UIService.show(EnterLoading);
        // mw.instance.showPanel(EnterLoading);
        let moduleC = ModuleService.getModule(LevelModuleC);
        if (moduleC.getCurrentSceneLv() == 1 && moduleC.getIfNewEnter()) {
            moduleC.setIfNewEnter();
        }
        // 先保存数据
        ModuleService.getModule(PlayerModuleC).net_PlayerMovePosition(this.startPos);
        this.module.sendLevelData(this.allBarriers, [this.startPos.x, this.startPos.y, this.startPos.z], this.gameCoefficient);
        const inter = setInterval(async () => {
            const info = this.allBarriers.pop();
            if (!info) { // 加载完了
                Event.dispatchToLocal(C2CEvent.SCENE_FINISH);
                Event.dispatchToLocal('SoulMgs', false); // 给技能门预制件发送的消息
                this.moveBarrier(true);
                clearInterval(inter);
                return;
            }
            const cfg = GameConfig.Obstacle.getElement(info.prefabID);
            const guid = cfg.guid;
            const mwGO = SpawnManager.modifyPoolAsyncSpawn(guid);
            (await mwGO).worldTransform.position = Tools.convertArrToVec(info.prefabLoc);
            (await mwGO).asyncReady().then(go => {
                const scripts = go.getScripts();
                if (!scripts || scripts.length <= 0)
                    return;
                const script = scripts[0];
                script["type"] = info.prefabID;
                script["newLevel"] = true;
                this.allPrefabScripts.push(scripts[0]); // 预制件脚本添加
                if (cfg.isSkillDoor) { // 预制件特殊tag添加
                    const strArr = [];
                    cfg.doorColorID.forEach(id => {
                        const doorCfg = GameConfig.DoorColor.getElement(id);
                        strArr.push(doorCfg.textColor + '_'
                            + doorCfg.skillName + '_'
                            + doorCfg.skillTexture + '_'
                            + doorCfg.name);
                    });
                    const a = script;
                    a.setSkillType && a.setSkillType(strArr);
                }
            });
            if (info.prefabID === SOUL_SKILL_DOOR) { // 隐藏特殊的灵魂门
                this.soulDoor = await mwGO;
                this.soulDoor.setVisibility(mw.PropertyStatus.Off, true);
            }
        }, 100);
    }
    /**查找技能门 */
    findAllSkillDoor() {
        const arr = [];
        const allCfg = GameConfig.Obstacle.getAllElement();
        for (let i = 0; i < allCfg.length; i++) {
            const cfg = allCfg[i];
            if (cfg.isSkillDoor && cfg.ID !== SOUL_SKILL_DOOR) {
                arr.push(cfg.ID);
            }
        }
        return arr;
    }
    /**查找特殊的技能门 */
    findSpecialDoor() {
        const arr = [];
        const allCfg = GameConfig.Obstacle.getAllElement();
        for (let i = 0; i < allCfg.length; i++) {
            const cfg = allCfg[i];
            if (cfg.isSkillDoor && cfg.doorColorID.length > 1) { // 双门
                arr.push(cfg.ID);
            }
        }
        return arr;
    }
    /**查看机关交集 */
    intersectionSet(set1, set2) {
        const intersect = [...set1].filter(x => set2.has(x));
        return intersect;
    }
    /**根据技能门查找机关集合 */
    findBarrierSetBySkillDoor(skillDoorID) {
        const arr = new Set();
        const allCfg = GameConfig.Obstacle.getAllElement();
        for (let i = 0; i < allCfg.length; i++) {
            const cfg = allCfg[i];
            if (!cfg.isSkillDoor && cfg.skillType.includes(skillDoorID)) {
                arr.add(cfg.ID);
            }
        }
        return arr;
    }
    /**类switch的方法 */
    createTypes(lv) {
        const types = Object.create(null);
        const cfg = GameConfig.GemSkill;
        const skillLV = lv;
        types[SkillType.Heart] = () => { };
        types[SkillType.Power] = () => {
            this.allPrefabScripts.forEach(s => {
                s.power && s.power();
            });
        };
        types[SkillType.Reality] = () => {
            const ratio = cfg.getElement(3).skillValue[skillLV - 1]; // 现实数值配置
            this.allPrefabScripts.forEach(s => {
                if (ratio > Math.random()) {
                    s.reality && s.reality();
                }
            });
        };
        types[SkillType.Space] = () => {
            const ratio = cfg.getElement(2).skillValue[skillLV - 1]; // 空间数值配置
            this.expandRoad(ratio);
            this.allPrefabScripts.forEach(s => {
                s.space && s.space(ratio);
            });
        };
        types[SkillType.Time] = () => {
            const ratio = this.gameCoefficient.speedCoefficient
                * cfg.getElement(4).skillValue[skillLV - 1]; // 时间数值配置
            this.allPrefabScripts.forEach(s => {
                s.time && s.time(ratio);
            });
        };
        types[SkillType.Soul] = () => {
            this.allPrefabScripts.forEach(s => {
                s.destroyPrefab();
                GeneralManager.rpcPlayEffectAtLocation(ProLoadGuid.effect_soul, s.gameObject.worldTransform.position, 1, undefined, new mw.Vector(2.5));
            });
        };
        return types;
    }
    /**回收所有预制件 */
    despawnGo() {
        this.allPrefabScripts.forEach(s => {
            s.moving && s.moving(false, 1);
            s.resetPrefab();
            mwext.GameObjPool.despawn(s.gameObject);
        });
        this.allPrefabScripts.length = 0;
    }
    /**检查是否需要显示灵魂门 */
    checkShowSoulDoor() {
        if (this.useSKillID.has(SkillType.Soul)) { // 有灵魂不需要在检测
            return;
        }
        if (this.useSKillID.size >= 5 && this.soulDoor) { // 满足5种宝石可以解锁灵魂门
            this.soulDoor.setVisibility(mw.PropertyStatus.On, true);
            // this.soulDoor.getChildByName("boxTrigger").setVisibility(mw.PropertyStatus.Off);
            Event.dispatchToLocal('SoulMgs', true); // 给技能门预制件发送的消息
        }
    }
    /**获取特殊技能门 */
    getDoorID(allDoor) {
        let doorID = 0;
        let cnt = allDoor.length;
        // 获取随机技能门，并且移除
        while (cnt--) {
            doorID = allDoor[Tools.randomBetweenMinAndMax(0, allDoor.length - 1)];
            const index = allDoor.indexOf(doorID);
            if (index !== -1) {
                allDoor.splice(index, 1);
            }
            const barrierCfg = GameConfig.Obstacle.getElement(doorID);
            const doors = barrierCfg.doorColorID;
            if (doors.length === 2) { // 双选门
                let isCoincide = false;
                for (let i = 0; i < doors.length; i++) {
                    const door = doors[i];
                    const colorCfg = GameConfig.DoorColor.getElement(door);
                    if (this.useSkillDoorType.has(SKILL_MAP[colorCfg.skillName])) { // 不能与单选重合
                        isCoincide = true;
                        break;
                    }
                }
                if (!isCoincide) { // 找到了
                    break;
                }
            }
            else {
                const colorCfg = GameConfig.DoorColor.getElement(doors[0]);
                const type = SKILL_MAP[colorCfg.skillName];
                if (!this.useSkillDoorType.has(type)) { // 找到了
                    this.useSkillDoorType.add(type);
                    break;
                }
            }
        }
        return doorID;
    }
    /**移动机关 */
    moveBarrier(isMove) {
        const ratio = this.gameCoefficient.speedCoefficient;
        this.allPrefabScripts.forEach(s => {
            s.moving && s.moving(isMove, ratio);
        });
    }
    /**
     * 拉伸地面
     * @param scaleX x的缩放
     * @param isTween 是否有动画
     */
    expandRoad(scaleX, isTween = true) {
        this.module.sendScaleRoad(scaleX, isTween);
    }
    /**
     * 随机获取指定数量的门
     * @param cnt 数量
     * @param doors 随机的门池子
     * @returns
     */
    getRandomDoor(cnt, doors) {
        const res = [];
        for (let i = 0; i < cnt; i++) {
            let id = this.getDoorID(doors);
            if (id !== 0) { // 没找到就不放入
                res.push(id);
            }
        }
        if (cnt >= MAX_DOOR) { // 特殊的灵魂门
            res.push(SOUL_SKILL_DOOR);
        }
        return res;
    }
    /**获取障碍物 */
    getObstacles(doors) {
        const cfg = this.module.getSceneCfg();
        const obstacleIDs = new Set(cfg.obstacleID);
        const obstacles = [];
        for (let i = 0; i < doors.length; i++) {
            const arr = [];
            const door = doors[Tools.randomBetweenMinAndMax(0, i)];
            const cnt = Tools.randomBetweenMinAndMax(cfg.count[0], cfg.count[1]);
            for (let j = 0; j < cnt; j++) { // 生成障碍物信息
                // 当前关卡的障碍物和技能门对应障碍物的交集
                const intersect = this.intersectionSet(this.findBarrierSetBySkillDoor(door), obstacleIDs);
                if (intersect.length === 0)
                    continue;
                // 从交集随机一个机关放入
                const barrierID = intersect[Tools.randomBetweenMinAndMax(0, intersect.length - 1)];
                arr.push(barrierID);
                // 删除已经使用过的
                obstacleIDs.delete(barrierID);
            }
            // 保存数据
            obstacles.push(arr);
        }
        return obstacles;
    }
    //  正常随机生成的场景
    createNormalScene() {
        let len = this.pos.x; // 整体长度控制参数
        const cfg = this.module.getSceneCfg();
        const skillDoorCnt = Tools.randomBetweenMinAndMax(cfg.segment[0], cfg.segment[1]);
        // 6扇技能门，就是有灵魂关卡
        const allDoor = skillDoorCnt >= MAX_DOOR ? this.findSpecialDoor() : this.findAllSkillDoor();
        // 确定生成的技能数据
        const sureDoors = this.getRandomDoor(skillDoorCnt, allDoor);
        // 确定生成的障碍物数据
        const sureObstacles = this.getObstacles(sureDoors);
        for (let i = sureDoors.length - 1; i >= 0; i--) { // 从最后面的门开始生成（因为终点坐标不会改变）
            const doorID = sureDoors[i]; // 技能门ID
            const obstacles = sureObstacles[i]; // 技能门对应的障碍物
            for (let j = 0; j < obstacles.length; j++) {
                const obstacleID = obstacles[j]; // 障碍物ID
                const barrierCfg = GameConfig.Obstacle.getElement(obstacleID);
                // 机关间隔距离
                const intervalDis = Tools.randomBetweenMinAndMax(barrierCfg.distance[0], barrierCfg.distance[1]);
                // 基础数量
                let createCnt = Tools.RangeFloat(barrierCfg.count[0], barrierCfg.count[1]);
                let isFirst = true;
                if (barrierCfg.isRow) { // 列数系数判断
                    createCnt = Math.floor(createCnt * Tools.randomBetweenMinAndMax(cfg.row[0], cfg.row[1]));
                }
                const offsetArr = barrierCfg.offset;
                const index = offsetArr.length - 1;
                let value = barrierCfg.offset[Tools.randomBetweenMinAndMax(0, index < 0 ? 0 : index)];
                for (let idx = 0; idx < createCnt; idx++) { // 生成机关
                    if (isFirst) {
                        len -= barrierCfg.locationX;
                        isFirst = false;
                    }
                    else { // 不是第一个生成，改变机关的间距
                        len -= intervalDis;
                    }
                    if (barrierCfg.offset.length > 1) { // 至少要2个数才能走随机位置
                        const arr = [];
                        offsetArr.forEach(offset => {
                            if (offset !== value) {
                                arr.push(offset);
                            }
                        });
                        value = arr[Tools.randomBetweenMinAndMax(0, arr.length - 1)]; // 相同机关的横向偏移
                    }
                    this.saveBarrierInfo(obstacleID, new mw.Vector(len, this.pos.y + value, this.pos.z));
                }
                if (j !== (obstacles.length - 1)) {
                    len -= this.offsetDis2 + barrierCfg.locationX; // 不同机关之间的偏移
                }
                else {
                    len -= barrierCfg.locationX; // 最后一个防止与后面的门碰撞，需要偏移
                }
            }
            len -= this.offsetDis3; // 机关与门位置偏移
            const offsetArr = GameConfig.Obstacle.getElement(doorID).offset;
            const index = offsetArr.length - 1;
            // 左右偏移
            const offsetY = offsetArr[Tools.randomBetweenMinAndMax(0, index < 0 ? 0 : index)];
            this.saveBarrierInfo(doorID, new mw.Vector(len, this.pos.y + offsetY, this.pos.z));
            len -= this.offsetDis4;
        }
        len -= this.offsetDis1; // 出生点位置偏移
        this.startPos = new mw.Vector(len, this.pos.y, this.pos.z + 160);
        let speedCoefficient = Math.random() < 0.5 ? cfg.speed[0] : cfg.speed[1];
        this.gameCoefficient = new GameCoefficient(speedCoefficient);
    }
    // 特殊关卡（之前是新手引导关卡）
    createGuideScene() {
        const guideModule = ModuleService.getModule(GuideModuleC);
        const barrierInfo = guideModule.getGuideLevelInfo();
        this.allBarriers = barrierInfo;
        const cfg = this.module.getSceneCfg();
        this.gameCoefficient = new GameCoefficient(Math.random() < 0.5 ? cfg.speed[0] : cfg.speed[1]);
        this.startPos = guideModule.getGuidePos();
    }
}

var foreign33 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SceneCreator
});

class LevelModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.sceneCreator = null;
    }
    onStart() {
        this.sceneCreator = new SceneCreator(this);
    }
    onEnterScene(sceneType) {
        // 等待加载场景
        this.sceneCreator.restoreScene();
        Player.localPlayer.character.name = "";
    }
    /**显示结算 */
    showEndUI(isSuccess) {
        let endData = {
            rewards: [],
            success: isSuccess
        };
        ///计算随机奖励
        if (isSuccess) {
            let rewards = this.getEndRewards();
            endData.rewards = rewards;
        }
        if (isSuccess) {
            mw.UIService.show(EndUI_WIN, endData);
            // mw.instance.showPanel(EndUIWin, endData);
            // mw.UIService.show();
        }
        else {
            mw.UIService.show(EndUILose, endData);
            // mw.instance.showPanel(EndUILose, endData);
        }
    }
    /**计算获取结算奖励 */
    getEndRewards() {
        let skillModule = ModuleService.getModule(SkillModule_C);
        let getSkills = skillModule.net_GetGatherSkills();
        let lvList = skillModule.net_GetSKillLvList();
        let allRewards = [];
        //已有数量
        let havePoints = skillModule.net_GetSkillHavePoints();
        //已使用数量
        let usePoint = skillModule.net_GetSkillUsePoints();
        for (let i = 0; i < getSkills.length; i++) {
            if (getSkills[i] && lvList[i] < consts.skillMaxLv) { //已获取过该宝石，并且未满级
                //计算当前等级距离满级所需数量
                let needPoints = skillModule.getMaxNeedPoint(lvList[i], usePoint[i]);
                if (needPoints != 0 && needPoints > havePoints[i]) {
                    allRewards.push(i);
                }
            }
        }
        ///如果奖励超过3个，则随机抽取3个
        if (allRewards.length > 3) {
            while (allRewards.length > 3) {
                let index = Math.round(Math.random() * (allRewards.length - 1));
                allRewards.splice(index, 1);
            }
        }
        return allRewards;
    }
    /**重来（失败） */
    resetGame() {
        Player.localPlayer;
        // player.character.ragdoll(false);
        ModuleService.getModule(SkillModule_C).net_SkillReset();
        this.sceneCreator.resetScene();
    }
    /**通关游戏（成功） */
    passGame() {
        Player.localPlayer;
        // player.character.ragdoll(false);
        ModuleService.getModule(SkillModule_C).net_SkillReset();
        this.sendLevel();
    }
    /**
     * 全局使用技能
     * @param type
     */
    useSkillByType(type, lv) {
        this.sceneCreator.useSkill(type, lv);
    }
    /**查找当前关卡对应配置 */
    findParamConfig(lv) {
        let cfgID = 1;
        const allCfg = GameConfig.LevelSettings.getAllElement();
        for (let i = 0; i < allCfg.length; i++) {
            const cfg = allCfg[i];
            if (lv >= cfg.rangeID[0] && lv <= cfg.rangeID[1]) {
                cfgID = cfg.ID;
                break;
            }
        }
        return cfgID;
    }
    /**获取当前场景对应参数配置 */
    getSceneCfg() {
        const sceneLv = this.getCurrentSceneLv();
        const cfgID = this.findParamConfig(sceneLv);
        const cfg = GameConfig.LevelSettings.getElement(cfgID);
        return cfg;
    }
    // Data==============================================================================================
    getCurrentSceneLv() {
        return this.data.getLevel();
    }
    getCurrentSceneBarrierInfo() {
        return this.data.getBarrierInfo();
    }
    getStartPos() {
        return Tools.convertArrToVec(this.data.getStartPos());
    }
    getGameCoefficient() {
        return this.data.getGameCoefficient();
    }
    isUpdateLv() {
        return this.data.getLevel() === this.data.getBarrierLevel();
    }
    addSkilNum() {
        this.data.getDate().skillSum++;
        this.server.net_addSkilNum(Player.localPlayer);
    }
    getData() {
        return this.data;
    }
    setLevelNum() {
        this.server.net_addLevelNum(Player.localPlayer);
    }
    /**
     * 核心循环步骤
     */
    setMsgStep(num) {
        let dataHelp = this.data.getDate();
        // 如果已经改了，就不需要改了;
        if (dataHelp.sendMsgStep[num - 1] == true) {
            return;
        }
        dataHelp.sendMsgStep[num - 1] = true;
        this.server.net_setMsgStep(num, Player.localPlayer);
        let sendMsgStep = dataHelp.sendMsgStep;
        for (let i = 0; i < sendMsgStep.length; i++) {
            if (!sendMsgStep[i]) {
                return;
            }
        }
        // 还原
        for (let i = 0; i < sendMsgStep.length; i++) {
            sendMsgStep[i] = false;
        }
        this.server.net_resetMsgStep(Player.localPlayer);
        // 计数
        dataHelp.sendStepTimes++;
        this.server.net_setColNum(Player.localPlayer);
    }
    // C2S==============================================================================================
    /**
     * 发送关卡信息，服务器保存
     * @param barriers 障碍物
     * @param pos 出生位置
     * @param gameCoefficient 游戏系数
     */
    sendLevelData(barriers, pos, gameCoefficient) {
        const lv = this.data.getLevel();
        this.server.net_saveLevelData(lv, barriers, pos, gameCoefficient, Player.localPlayer);
    }
    /**
     * 缩放地面
     * @param scaleX 缩放倍数
     * @param isTween 是否有动画
     */
    sendScaleRoad(scaleX, isTween) {
        this.server.net_scaleRoad(scaleX, isTween);
    }
    /**
     * 发送关卡等级
     */
    sendLevel() {
        const lv = this.data.getLevel() + 1;
        const result = this.server.net_saveLevel(lv, Player.localPlayer);
        if (result) {
            this.data.saveLevel(lv);
            this.sceneCreator.resetScript();
            this.sceneCreator.createScene();
            Event.dispatchToLocal(C2CEvent.HALLUI_LVCHANGE, lv);
        }
    }
    resetDefaultTime() {
        this.data.resetDefaultTime();
        this.server.net_resetDefaultTime(Player.localPlayer);
    }
    setDefaultTime() {
        this.data.setDefaultTime();
        this.server.net_setDefaultTime(Player.localPlayer);
    }
    getDefaultTime() {
        return this.data.getDefaultTime();
    }
    getIfNewPlayer() {
        return this.data.getIfNewPlayer();
    }
    setNewPlayer() {
        this.data.setNewPlayer();
        this.server.net_setNewPlayer(Player.localPlayer);
    }
    getIfNewEnter() {
        return this.data.getIfNewEnter();
    }
    setIfNewEnter() {
        this.data.setIfNewEnter();
        this.server.net_setIfNewEnter(Player.localPlayer);
    }
    getLevelDay() {
        return this.data.getLevelDay();
    }
    setLevelDay() {
        this.data.getDate().levelDay++;
        this.server.net_setLevelDay(Player.localPlayer);
    }
}

var foreign31 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: LevelModuleC
});

let SkillGetUI_Generate = class SkillGetUI_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mImg_Skill_Power1 = undefined;
        this.mImg_Skill_Power2 = undefined;
        this.powerCanvas = undefined;
        this.mImg_Skill_Space1 = undefined;
        this.mImg_Skill_Space2 = undefined;
        this.spaceCanvas = undefined;
        this.mImg_Skill_Reality1 = undefined;
        this.mImg_Skill_Reality2 = undefined;
        this.realityCanvas = undefined;
        this.mImg_Skill_Time = undefined;
        this.timeCanvas = undefined;
        this.mImg_Skill_Mind = undefined;
        this.mindCanvas = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        //按钮多语言
        //文本多语言
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/powerCanvas/mImg_Skill_Power1')
], SkillGetUI_Generate.prototype, "mImg_Skill_Power1", void 0);
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/powerCanvas/mImg_Skill_Power2')
], SkillGetUI_Generate.prototype, "mImg_Skill_Power2", void 0);
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/powerCanvas')
], SkillGetUI_Generate.prototype, "powerCanvas", void 0);
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/spaceCanvas/mImg_Skill_Space1')
], SkillGetUI_Generate.prototype, "mImg_Skill_Space1", void 0);
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/spaceCanvas/mImg_Skill_Space2')
], SkillGetUI_Generate.prototype, "mImg_Skill_Space2", void 0);
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/spaceCanvas')
], SkillGetUI_Generate.prototype, "spaceCanvas", void 0);
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/realityCanvas/mImg_Skill_Reality1')
], SkillGetUI_Generate.prototype, "mImg_Skill_Reality1", void 0);
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/realityCanvas/mImg_Skill_Reality2')
], SkillGetUI_Generate.prototype, "mImg_Skill_Reality2", void 0);
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/realityCanvas')
], SkillGetUI_Generate.prototype, "realityCanvas", void 0);
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/timeCanvas/mImg_Skill_Time')
], SkillGetUI_Generate.prototype, "mImg_Skill_Time", void 0);
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/timeCanvas')
], SkillGetUI_Generate.prototype, "timeCanvas", void 0);
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/mindCanvas/mImg_Skill_Mind')
], SkillGetUI_Generate.prototype, "mImg_Skill_Mind", void 0);
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/mindCanvas')
], SkillGetUI_Generate.prototype, "mindCanvas", void 0);
SkillGetUI_Generate = __decorate([
    UIBind('UI/SkillGetUI.ui')
], SkillGetUI_Generate);
var SkillGetUI_Generate$1 = SkillGetUI_Generate;

var foreign109 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SkillGetUI_Generate$1
});

class SkillGetUI extends SkillGetUI_Generate$1 {
    constructor() {
        super(...arguments);
        this.nowAction = null;
        /**
        * 每一帧调用
        * 通过canUpdate可以开启关闭调用
        * dt 两帧调用的时间差，毫秒
        */
        //protected onUpdate(dt :number) {
        //}
        /**
         * 设置显示时触发
         */
        //protected onShow(...params:any[]) {
        //}
        /**
         * 设置不显示时触发
         */
        //protected onHide() {
        //}
    }
    /**
    * 构造UI文件成功后，在合适的时机最先初始化一次
    */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        //this.initButtons();
    }
    showSkillGetAni(type, back) {
        if (this.nowAction) {
            this.nowAction.stop();
            this.closeAllUI();
        }
        switch (type) {
            case SkillType.Power:
                { //旋转1圈、放缩、渐隐
                    let startShow = new mw.Tween({ op: 0, rotation: 0 }).to({ op: 10, rotation: -360 }, 1700).easing(mw.TweenUtil.Easing.Cubic.InOut).onUpdate((op) => {
                        this.powerCanvas.renderOpacity = (op.op);
                        this.powerCanvas.renderTransformAngle = (op.rotation);
                        this.mImg_Skill_Power1.renderTransformAngle = (op.rotation * -1);
                        this.mImg_Skill_Power2.renderTransformAngle = (op.rotation * -1);
                    }).onStart(() => {
                        this.powerCanvas.visibility = (mw.SlateVisibility.Visible);
                    });
                    let scale1 = new mw.Tween({ pi: 0 }).to({ pi: Math.PI }, 800).easing(mw.TweenUtil.Easing.Cubic.InOut).onUpdate((sc) => {
                        this.powerCanvas.renderScale = (mw.Vector2.one.multiply(Math.sin(sc.pi) * 0.2 + 1));
                        this.powerCanvas.renderOpacity = (Math.sin(Math.PI / 2 + sc.pi / 2) * 4);
                    }).onComplete(() => {
                        this.nowAction = null;
                    });
                    startShow.chain(scale1).start();
                    this.nowAction = startShow;
                }
                break;
            case SkillType.Space:
                {
                    let pos1 = this.mImg_Skill_Space1.position.clone();
                    let pos2 = this.mImg_Skill_Space2.position.clone();
                    let moveOne = new mw.Tween({ leftx: 135, rightx: 225, op: 10 }).to({ leftx: -85, rightx: 445, op: 0 }, 2500).onUpdate((xpos) => {
                        this.spaceAni(pos1, pos2, xpos);
                        this.spaceCanvas.renderOpacity = (xpos.op);
                    }).easing(mw.TweenUtil.Easing.Cubic.Out).onStart(() => {
                        this.spaceCanvas.renderOpacity = (1);
                        this.spaceCanvas.visibility = (mw.SlateVisibility.Visible);
                    }).onComplete(() => {
                        this.nowAction = null;
                    });
                    moveOne.start();
                    this.nowAction = moveOne;
                }
                break;
            case SkillType.Reality:
                {
                    let ro2 = new mw.Tween({ op1: 1, op2: 0.5 }).to({ op1: 0, op2: 0 }, 400).delay(100).onUpdate((obj) => {
                        this.mImg_Skill_Reality1.renderOpacity = (obj.op1);
                        this.mImg_Skill_Reality2.renderOpacity = (obj.op2);
                    }).onComplete(() => {
                        this.realityCanvas.renderOpacity = (0);
                        this.mImg_Skill_Reality1.renderOpacity = (1);
                        this.mImg_Skill_Reality2.renderOpacity = (1);
                        this.nowAction = null;
                    });
                    let ro1 = new mw.Tween({ rotation: 0, op: 5 }).to({ rotation: -360, op: 0.5 }, 2000).onUpdate((ro) => {
                        this.realityCanvas.renderTransformAngle = (ro.rotation);
                        this.mImg_Skill_Reality1.renderTransformAngle = (ro.rotation * -1);
                        this.mImg_Skill_Reality2.renderTransformAngle = (ro.rotation * -1);
                        this.mImg_Skill_Reality2.renderOpacity = (ro.op);
                    }).easing(mw.TweenUtil.Easing.Cubic.InOut).chain(ro2).onStart(() => {
                        this.realityCanvas.renderOpacity = (1);
                        this.realityCanvas.visibility = (mw.SlateVisibility.Visible);
                    });
                    ro1.start();
                    this.nowAction = ro1;
                }
                break;
            case SkillType.Time:
                {
                    let op = new mw.Tween({ PI: 0 }).to({ PI: Math.PI }, 2500).onUpdate((obj) => {
                        this.mImg_Skill_Time.renderOpacity = (Math.sin(obj.PI) * 5);
                        this.mImg_Skill_Time.renderTransformAngle = (this.mImg_Skill_Time.renderTransformAngle + (Math.sin(obj.PI + Math.PI / 2) + 1) / 2 * 20);
                    }).onStart(() => {
                        this.timeCanvas.visibility = (mw.SlateVisibility.Visible);
                    }).onComplete(() => {
                        this.nowAction = null;
                    });
                    op.start();
                    this.nowAction = op;
                }
                break;
            case SkillType.Heart:
                {
                    let slot = this.mImg_Skill_Mind;
                    let pos = slot.position.clone();
                    let op1 = new mw.Tween({ y: 220, pi: 0 }).to({ y: 135, pi: Math.PI }, 2500).onUpdate((obj) => {
                        pos.y = obj.y;
                        slot.position = (pos);
                        this.mImg_Skill_Mind.renderOpacity = (Math.sin(obj.pi) * 5);
                    }).easing(mw.TweenUtil.Easing.Cubic.InOut).onStart(() => {
                        this.mindCanvas.visibility = (mw.SlateVisibility.Visible);
                    }).onComplete(() => {
                        this.nowAction = null;
                    });
                    op1.start();
                    this.nowAction = op1;
                }
                break;
            case SkillType.Soul:
                {
                    if (back)
                        back();
                }
                break;
        }
    }
    closeAllUI() {
        this.powerCanvas.visibility = (mw.SlateVisibility.Hidden);
        this.spaceCanvas.visibility = (mw.SlateVisibility.Hidden);
        this.realityCanvas.visibility = (mw.SlateVisibility.Hidden);
        this.timeCanvas.visibility = (mw.SlateVisibility.Hidden);
        this.mindCanvas.visibility = (mw.SlateVisibility.Hidden);
    }
    /**
     * 空间宝石获取-UI显示动效
     * @param leftx 左侧位移
     * @param rightx 右侧位移
     */
    spaceAni(pos1, pos2, xpos) {
        pos1.x = xpos.leftx;
        pos2.x = xpos.rightx;
        this.mImg_Skill_Space1.position = (pos1);
        this.mImg_Skill_Space2.position = (pos2);
    }
    /**
    * 构造UI文件成功后，onStart之后
    * 对于UI的根节点的添加操作，进行调用
    * 注意：该事件可能会多次调用
    */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign98 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SkillGetUI
});

let HallUI_Generate = class HallUI_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.txt_lv = undefined;
        this.img_skill1 = undefined;
        this.img_skill2 = undefined;
        this.img_skill3 = undefined;
        this.img_skill4 = undefined;
        this.img_skill5 = undefined;
        this.img_skill6 = undefined;
        this.canvas_Skill = undefined;
        this.img_Move = undefined;
        this.moveControl = undefined;
        this.canvas_moveCtrl = undefined;
        this.img_Shadow = undefined;
        this.btn_start = undefined;
        this.txt_Start = undefined;
        this.canvas_startBtn = undefined;
        this.btn_Set = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.btn_start.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btn_start");
        });
        this.initLanguage(this.btn_start);
        this.btn_start.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.btn_Set.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btn_Set");
        });
        this.initLanguage(this.btn_Set);
        this.btn_Set.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        //按钮添加点击
        //按钮多语言
        //文本多语言
        this.initLanguage(this.txt_lv);
        this.initLanguage(this.txt_Start);
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('RootCanvas/CenterTop/txt_lv')
], HallUI_Generate.prototype, "txt_lv", void 0);
__decorate([
    UIWidgetBind('RootCanvas/RightTop/canvas_Skill/img_skill1')
], HallUI_Generate.prototype, "img_skill1", void 0);
__decorate([
    UIWidgetBind('RootCanvas/RightTop/canvas_Skill/img_skill2')
], HallUI_Generate.prototype, "img_skill2", void 0);
__decorate([
    UIWidgetBind('RootCanvas/RightTop/canvas_Skill/img_skill3')
], HallUI_Generate.prototype, "img_skill3", void 0);
__decorate([
    UIWidgetBind('RootCanvas/RightTop/canvas_Skill/img_skill4')
], HallUI_Generate.prototype, "img_skill4", void 0);
__decorate([
    UIWidgetBind('RootCanvas/RightTop/canvas_Skill/img_skill5')
], HallUI_Generate.prototype, "img_skill5", void 0);
__decorate([
    UIWidgetBind('RootCanvas/RightTop/canvas_Skill/img_skill6')
], HallUI_Generate.prototype, "img_skill6", void 0);
__decorate([
    UIWidgetBind('RootCanvas/RightTop/canvas_Skill')
], HallUI_Generate.prototype, "canvas_Skill", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Center/img_Move')
], HallUI_Generate.prototype, "img_Move", void 0);
__decorate([
    UIWidgetBind('RootCanvas/LeftBottom/canvas_moveCtrl/moveControl')
], HallUI_Generate.prototype, "moveControl", void 0);
__decorate([
    UIWidgetBind('RootCanvas/LeftBottom/canvas_moveCtrl')
], HallUI_Generate.prototype, "canvas_moveCtrl", void 0);
__decorate([
    UIWidgetBind('RootCanvas/RightBottom/canvas_startBtn/img_Shadow')
], HallUI_Generate.prototype, "img_Shadow", void 0);
__decorate([
    UIWidgetBind('RootCanvas/RightBottom/canvas_startBtn/btn_start')
], HallUI_Generate.prototype, "btn_start", void 0);
__decorate([
    UIWidgetBind('RootCanvas/RightBottom/canvas_startBtn/txt_Start')
], HallUI_Generate.prototype, "txt_Start", void 0);
__decorate([
    UIWidgetBind('RootCanvas/RightBottom/canvas_startBtn')
], HallUI_Generate.prototype, "canvas_startBtn", void 0);
__decorate([
    UIWidgetBind('RootCanvas/LeftTop/btn_Set')
], HallUI_Generate.prototype, "btn_Set", void 0);
HallUI_Generate = __decorate([
    UIBind('UI/HallUI.ui')
], HallUI_Generate);
var HallUI_Generate$1 = HallUI_Generate;

var foreign106 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: HallUI_Generate$1
});

class HallUI extends HallUI_Generate$1 {
    constructor() {
        super(...arguments);
        this.soundOpen = true;
        //图片资源 遵循技能宝石设定枚举
        this.imgUIList = [116256, 116243, 116254, 116244, 116250, 116262];
        this.iswalking = false;
        /**
        * 每一帧调用
        * 通过canUpdate可以开启关闭调用
        * dt 两帧调用的时间差，毫秒
        */
        //protected onUpdate(dt :number) {
        //}
        /**
         * 设置显示时触发
         */
        //protected onShow(...params:any[]) {
        //}
        /**
         * 设置不显示时触发
         */
        //protected onHide() {
        //}
    }
    /**
    * 构造UI文件成功后，在合适的时机最先初始化一次
    */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        //this.initButtons();
        // mw.instance.showPanel(SkillGetUI);
        mw.UIService.show(SkillGetUI);
        this.skillGetUI = mw.UIService.getUI(SkillGetUI);
        Player.localPlayer.character.movementEnabled = false;
        this.movePos = new mw.Vector(0);
        // this.canvas_Skill.visibility=(mw.SlateVisibility.Hidden);
        let character = Player.localPlayer.character;
        if (!this.player) {
            this.player = Player.localPlayer;
        }
        this.moveControl.onInputDir.add((pos) => {
            let newpos = pos.clone().multiply(100);
            this.movePos.x = newpos.y;
            this.movePos.y = newpos.x;
            if (!this.iswalking && character.movementMode == mw.MovementMode.Walk
                && character.isMoving) {
                this.iswalking = true;
            }
            character.addMovement(this.movePos);
            // this.moveImage2.setRenderTransformAngle((new mw.Vector(pos.x, -pos.y, 0)).toRotation().z);
        });
        this.moveControl.onJoyStickDown.add(() => {
            let moduleC = ModuleService.getModule(LevelModuleC);
            if (moduleC.getData().getDate().sendMsgStep[0] == false) {
                // 核心循环埋点移动
                ModuleService.getModule(LevelModuleC).setMsgStep(1);
            }
            if (!ModuleService.getModule(SkillModule_C).useMind) {
                SoundPlay.ins.play(SoundConfigID.WALK);
            }
        });
        Event.addLocalListener(C2CEvent.HALLUI_PLAYERSTOP, () => {
            Player.localPlayer.character.movementEnabled = false;
            this.iswalking = false;
            SoundPlay.ins.stop(SoundConfigID.WALK);
        });
        this.moveControl.onJoyStickUp.add(() => {
            this.iswalking = false;
            SoundPlay.ins.stop(SoundConfigID.WALK);
        });
        this.btn_start.onClicked.add(() => {
            this.canvas_startBtn.visibility = (mw.SlateVisibility.Hidden);
            this.playUIAni(true, false);
            SoundPlay.ins.play(SoundConfigID.GAME_START_TALK);
            new mw.Tween({
                trans: Camera.currentCamera.localTransform.clone(),
                leng: Camera.currentCamera.springArm.length,
                rotater: this.player.character.worldTransform.rotation
            }).
                to({
                trans: new mw.Transform(new mw.Vector(0, 30, 400), new mw.Rotation(0, -30, -10), mw.Vector.one),
                leng: 400, rotater: this.player.character.worldTransform.rotation.add(new mw.Rotation(0, 0, 180))
            }, 500).onUpdate(obj => {
                Camera.currentCamera.localTransform = obj.trans;
                Camera.currentCamera.springArm.length = obj.leng;
                this.player.character.worldTransform.rotation = obj.rotater;
            }).start();
        });
        this.btn_Set.onClicked.add(() => {
            const sound = SoundPlay.ins;
            this.soundOpen = !this.soundOpen;
            if (this.soundOpen) {
                sound.openSound();
                sound.play(SoundConfigID.BUTTON_CLICK);
                this.btn_Set.setNormalImageColorByHex(consts.normalColor);
            }
            else {
                sound.closeSound();
                this.btn_Set.setNormalImageColorByHex(consts.forbiddenColor);
            }
        });
        Event.addLocalListener(C2CEvent.GETSKILLGEM, (val, func) => {
            if (!isNaN(val)) {
                SoundPlay.ins.play(SoundConfigID.GET_SKILL);
                this.getSkillAni(val, func);
            }
        });
        Event.addLocalListener(C2CEvent.HALLUI_SKILLRESET, () => {
            this.resetImgSkill();
            this.playUIAni(true, false);
        });
        Event.addLocalListener(C2CEvent.HALLUI_UIOUT, (isWin) => {
            this.playUIAni(false, isWin);
        });
        Event.addLocalListener(C2CEvent.HALLUI_LVCHANGE, (LV) => {
            this.txt_lv.text = (`Lv ${LV}`);
        });
        this.net_LvUp(ModuleService.getModule(LevelModuleC).getCurrentSceneLv());
    }
    resetImgSkill() {
        for (let i = 1; i <= 6; i++) {
            let img = this[`img_skill${i}`];
            if (img) {
                img.visibility = (mw.SlateVisibility.Hidden);
            }
        }
    }
    /**展示主Ui的入场显示动画
     * @param isIn 是否是进场动画
     * @param isWin 是否胜利
     */
    playUIAni(isIn, isWin) {
        SoundPlay.ins.play(SoundConfigID.UI_ENTER_END);
        //set 左飞
        let setSlot = this.btn_Set;
        let setPos = setSlot.position.clone();
        if (isIn)
            this.btn_Set.visibility = (mw.SlateVisibility.Hidden);
        let setStart = isIn ? -100 : 361;
        let setEnd = isIn ? 361 : -100;
        const setAni = new mw.Tween({ pos: setStart }).to({ pos: setEnd }, 500).onUpdate(obj => {
            setPos.x = obj.pos;
            setSlot.position = (setPos);
        }).onStart(() => {
            this.btn_Set.visibility = (mw.SlateVisibility.Visible);
        });
        setAni.start();
        //canvas——Skill右飞
        const skillSlot = this.canvas_Skill;
        let skillPos = skillSlot.position.clone();
        let skillStart = isIn ? 100 : -450;
        let skillEnd = isIn ? -450 : 100;
        // if (isIn) this.canvas_Skill.visibility=(mw.SlateVisibility.Hidden);
        skillPos.x = skillStart;
        skillSlot.position = (skillPos);
        const skillAni = new mw.Tween({ pos: skillStart }).to({ pos: skillEnd }).onUpdate(obj => {
            skillPos.x = obj.pos;
            skillSlot.position = (skillPos);
        });
        skillAni.start();
        //canvas_moveCtrl
        this.moveControl.enable = (false);
        const moveSlot = this.canvas_moveCtrl;
        let movePos = moveSlot.position.clone();
        let moveStart = isIn ? -500 : 90;
        let moveEnd = isIn ? 90 : -500;
        // this.canvas_moveCtrl.visibility=(mw.SlateVisibility.Visible);
        const moveAni = new mw.Tween({ pos: moveStart }).to({ pos: moveEnd }).onUpdate(obj => {
            movePos.x = obj.pos;
            moveSlot.position = (movePos);
        }).onComplete(() => {
            Player.localPlayer.character.movementEnabled = true;
            this.moveControl.enable = (true);
            if (!isIn) {
                ModuleService.getModule(LevelModuleC).showEndUI(isWin);
            }
        });
        moveAni.start();
    }
    /**获取宝石的动画 */
    getSkillAni(type, func) {
        let guid = this.imgUIList[type];
        let slot = this.img_Move;
        let startPos = slot.position.clone();
        let pos = slot.position.clone();
        let startSize = new mw.Vector2(72, 92);
        slot.size = (startSize);
        let size = slot.size.clone();
        this.img_Move.imageGuid = (guid.toString());
        this.img_Move.visibility = (mw.SlateVisibility.Visible);
        let moveToPos = Tools.getUIWorldPos(this[`img_skill${type + 1}`], this.img_Move);
        let moveAni = new mw.Tween({ posx: 0, posy: 0, worldScale: 1, scale2: 0 }).to({ posx: moveToPos.x, posy: moveToPos.y, worldScale: 0.5, scale2: Math.PI }, 1250).onUpdate(obj => {
            pos.x = obj.posx;
            pos.y = obj.posy;
            size.x = (obj.worldScale + Math.pow(Math.sin(obj.scale2), 2) * 2) * startSize.x;
            size.y = (obj.worldScale + Math.pow(Math.sin(obj.scale2), 2) * 2) * startSize.y;
            slot.size = (size);
            slot.position = (pos);
        }).onComplete(() => {
            this.img_Move.visibility = (mw.SlateVisibility.Hidden);
            slot.position = (startPos);
            Player.localPlayer.character.movementEnabled = true;
            if (this.iswalking) {
                SoundPlay.ins.play(SoundConfigID.WALK);
            }
            let img = this[`img_skill${type + 1}`];
            if (img) {
                img.visibility = (mw.SlateVisibility.Visible);
            }
            SoundPlay.ins.play(SoundConfigID.INSET_GEM);
            this.skillGetUI.showSkillGetAni(type, func);
            if (this.isPlayCollectFinish()) {
                SoundPlay.ins.play(SoundConfigID.COLLECT_FINISH);
            }
            if (type != SkillType.Soul)
                func();
        });
        moveAni.start();
    }
    /**
    * 构造UI文件成功后，onStart之后
    * 对于UI的根节点的添加操作，进行调用
    * 注意：该事件可能会多次调用
    */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
    /**
     * 关卡数据更新
     * @param num 当前关卡号
     */
    net_LvUp(num) {
        this.txt_lv.text = (`Lv ${num}`);
    }
    /**是否全部收集完成 */
    isPlayCollectFinish() {
        let res = true;
        for (let i = 1; i <= 6; i++) {
            let img = this[`img_skill${i}`];
            if (!img.visible) {
                res = false;
                break;
            }
        }
        return res;
    }
}

var foreign96 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: HallUI
});

class GuideModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.prefabs = Object.create(null); // 特殊关卡信息
        this.levelModule = null;
    }
    onStart() {
        const guideCfg = GameConfig.GuidePrefabs.getAllElement();
        for (let i = 0; i < guideCfg.length; i++) {
            const info = [];
            const cfg = guideCfg[i];
            const arr = cfg.prefabID;
            if (arr.length !== cfg.prefabPos.length) {
                // 表格检查
                throw new Error(" config error " + cfg.id);
            }
            for (let i = 0; i < arr.length; i++) {
                const id = arr[i];
                const prefabInfo = this.createPrefabInfo(id, cfg.prefabPos[i]);
                info.push(prefabInfo);
            }
            this.prefabs[cfg.level] = info;
        }
        this.levelModule = ModuleService.getModule(LevelModuleC);
    }
    onEnterScene(sceneType) {
        SoundPlay.ins.onEvent();
        // mw.instance.showPanel(HallUI);
        mw.UIService.show(HallUI);
        // mw.instance.showPanel(GMBasePanel);
        // new GMBasePanelUI().show();
        // new GMBasePanelUI().show();
    }
    /**是否包含引导关卡 */
    isIncludeGuide() {
        const lv = this.levelModule.getCurrentSceneLv();
        return !!this.prefabs[lv];
    }
    /**当前关卡信息 */
    getGuideLevelInfo() {
        const lv = this.levelModule.getCurrentSceneLv();
        const arr = this.prefabs[lv] ?? [];
        return arr.map(v => v);
    }
    /**获得引导当前关卡位置 */
    getGuidePos() {
        const lv = this.levelModule.getCurrentSceneLv();
        const guideCfg = GameConfig.GuidePrefabs.getAllElement();
        for (let i = 0; i < guideCfg.length; i++) {
            const element = guideCfg[i];
            if (element.level === lv) {
                return Tools.convertArrToVec(element.born);
            }
        }
        return mw.Vector.zero;
    }
    /**创建预制件的信息 */
    createPrefabInfo(id, pos) {
        const barrier = new BarrierInfo();
        const v3 = Tools.convertArrToVec(pos);
        barrier.prefabID = id;
        barrier.prefabLoc = [v3.x, v3.y, v3.z];
        return barrier;
    }
}

var foreign23 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GuideModuleC
});

class GuideModuleS extends ModuleS {
}

var foreign24 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GuideModuleS
});

class HallDataHelper extends Subdata {
    initDefaultData() {
    }
    onDataInit() {
    }
}

var foreign25 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    HallDataHelper: HallDataHelper
});

class HallModule_C extends ModuleC {
    onAwake() {
    }
    onStart() {
    }
    onRreloadAsset(sceneType) {
        return new Promise((resolve) => {
            resolve();
        });
    }
    onEnterScene(sceneType) {
        Player.localPlayer.character.displayName = "";
    }
    onUpdate(dt) {
    }
    /////
    async setClientTime() {
        let serverTime = await this.server.net_RequestSeverTime();
        TimeUtilTool.setServerTime(serverTime);
    }
}

var foreign26 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    HallModule_C: HallModule_C
});

class HallModule_S extends ModuleS {
    onPlayerJoined(player) {
    }
    onPlayerLeft(player) {
    }
    onStart() {
    }
    net_RequestSeverTime() {
        let severTime = TimeUtilTool.getServerMillSecond();
        return severTime;
    }
    onUpdate(dt) {
    }
}

var foreign27 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    HallModule_S: HallModule_S
});

const ROAD_GUID = 'B0FF298DFCBAC149'; // 跑道guid
class LevelModuleS extends ModuleS {
    /**
     * 保存关卡障碍物数据
     * @param level 关卡等级
     * @param barrierInfo 关卡障碍物信息
     * @param pos 出生的位置
     * @param gameCoefficient 游戏系数
     */
    net_saveLevelData(level, barrierInfo, pos, gameCoefficient, player) {
        const p = player;
        const pData = this.getPlayerData(p);
        pData.saveLevelInfo(level, barrierInfo, pos, gameCoefficient);
        // 因为是所有障碍物都会改变，所以直接双端修改
        pData.save(true);
    }
    /**
     * 保存关卡lv
     * @param level 当前关卡
     * @param player
     */
    net_saveLevel(level, player) {
        const p = player;
        const pData = this.getPlayerData(p);
        if (pData.getLevel() < level) {
            pData.saveLevel(level);
            pData.save(false);
            return true;
        }
        return false;
    }
    /**
     * 拉伸地面
     * @param scaleX x的缩放
     * @param isTween 是否有动画
     * @param player
     */
    net_scaleRoad(scaleX, isTween) {
        const obj = GameObject.findGameObjectById(ROAD_GUID);
        const toVec = new mw.Vector(scaleX, 1, 1);
        if (isTween) {
            new mw.Tween({ worldScale: obj.worldTransform.scale })
                .to({ worldScale: toVec }, 1000)
                .onUpdate((o) => {
                obj.worldTransform.scale = (o.worldScale);
            })
                .start();
        }
        else {
            obj.worldTransform.scale = (toVec); // = toVec;
        }
    }
    net_resetDefaultTime(player) {
        let data = this.getPlayerData(player);
        data.resetDefaultTime();
    }
    net_setDefaultTime(player) {
        let data = this.getPlayerData(player);
        data.setDefaultTime();
    }
    net_setNewPlayer(player) {
        let data = this.getPlayerData(player);
        data.setNewPlayer();
    }
    net_setIfNewEnter(player) {
        let data = this.getPlayerData(player);
        data.setIfNewEnter();
    }
    net_setLevelDay(player) {
        let data = this.getPlayerData(player);
        data.getDate().levelDay++;
    }
    net_addSkilNum(player) {
        let data = this.getPlayerData(player);
        data.getDate().skillSum++;
    }
    net_addLevelNum(player) {
        let data = this.getPlayerData(player);
        data.checkIsSendMsg(player);
    }
    /**
     * 修改完成的相应埋点步骤
     * @param num 完成的第几个
     * @param player 玩家
     */
    net_setMsgStep(num, player) {
        let data = this.getPlayerData(player);
        data.getDate().sendMsgStep[num - 1] = true;
    }
    /**
     * 还原核心循环埋点的数据
     * @param player 玩家
     */
    net_resetMsgStep(player) {
        let data = this.getPlayerData(player);
        let sendMsgStep = data.getDate().sendMsgStep;
        for (let i = 0; i < sendMsgStep.length; i++) {
            sendMsgStep[i] = false;
        }
    }
    /**
     * 玩家完成核心循环步骤加1
     * @param player 玩家
     */
    net_setColNum(player) {
        let data = this.getPlayerData(player);
        data.getDate().sendStepTimes++;
    }
}

var foreign32 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: LevelModuleS
});

class PlayerDataHelper extends Subdata {
    constructor() {
        super(...arguments);
        this.skillDoor = [false, false, false, false, false, false];
    }
    initDefaultData() {
    }
    onDataInit() {
    }
    getSkillDoor() {
        return this.skillDoor;
    }
}
__decorate([
    Decorator.persistence()
], PlayerDataHelper.prototype, "skillDoor", void 0);

var foreign34 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PlayerDataHelper: PlayerDataHelper
});

class PlayerModuleS extends ModuleS {
    onStart() {
    }
    /**
     * 玩家位置移动
     * @param pos 移动的目标点位置
     */
    net_PlayerMovePosition(pos, isGoStart = false, player) {
        player.character.worldTransform.position = (pos); // = pos;
        // this.client.net_moveEnd();
        if (isGoStart) {
            this.getClient(player).net_moveEnd();
        }
    }
    net_setSkilldoor(i, player) {
        let data = this.getPlayerData(player);
        data.getSkillDoor()[i] = true;
    }
    net_resrtSkilldoor(player) {
        player = this.currentPlayer;
        let data = this.getPlayerData(player);
        data.getSkillDoor();
    }
}

var foreign35 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PlayerModuleS: PlayerModuleS
});

class SkillModule_S extends ModuleS {
    onAwake() {
    }
    onPlayerLeft(player) {
    }
    /**
    * 获取某技能的技能点
    * @param type 技能类型
    * @param num 获得的技能点数量
    */
    net_SkillPointGet(type, num, player) {
        let data = this.getPlayerData(player);
        if (data)
            data.skillHavePointGet(type, num);
    }
    /**
 * 技能使用技能点添加
 * @param type
 */
    net_SkillLvUpPoint(type, player) {
        let data = this.getPlayerData(player);
        if (data)
            data.skillUsePoint(type);
    }
    /**
     * 技能升级
     * @param type 技能类型
     * @param player
     */
    net_SkillLvUp(type, player) {
        let data = this.getPlayerData(player);
        if (data)
            data.skillLvUp(type);
    }
    /**技能宝石设置 */
    net_SetGatherSkills(type, player) {
        let data = this.getPlayerData(player);
        if (data) {
            data.setSkillGem(type);
        }
    }
}

var foreign39 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SkillModule_S: SkillModule_S
});

let GameLauncher = class GameLauncher extends mw.Script {
    constructor() {
        super(...arguments);
        this.isOnline = false;
    }
    onStart() {
        mw.UIScript.addBehavior("lan", (ui) => {
            let key = ui.text;
            if (key) {
                let lan = GameConfig.LangueConfig.getElement(key);
                if (lan) {
                    if (ui instanceof mw.StaleButton) {
                        ui.text = (lan.Value);
                    }
                    else {
                        ui.text = (lan.Value);
                    }
                }
            }
        });
        if (mw.SystemUtil.isServer()) {
            if (this.isOnline) {
                DataStorage.setTemporaryStorage(false);
            }
            else {
                DataStorage.setTemporaryStorage(true);
            }
        }
        super.onStart();
        consts.curLanguage = -1;
        TimeUtilTool.startUp();
        GameConfig.initLanguage(consts.curLanguage, (key) => {
            let ele = GameConfig.LangueConfig.getElement(key);
            if (ele == null)
                return "unknow_" + key;
            return ele.Value;
        });
        this.onRegisterModule();
        this.useUpdate = true;
        //初始化表格语言
        // LanUtil.getLan = GameConfig.LangueConfig.getElement.bind(GameConfig.LangueConfig);
    }
    onRegisterModule() {
        this.registerModule(GuideModuleS, GuideModuleC, GuideDataHelper);
        this.registerModule(LevelModuleS, LevelModuleC, LevelDataHelper);
        this.registerModule(HallModule_S, HallModule_C, HallDataHelper);
        this.registerModule(SkillModule_S, SkillModule_C, SkillDataHelper);
        this.registerModule(PlayerModuleS, PlayerModuleC, PlayerDataHelper);
    }
    registerModule(ModuleClass_S, ModuleClass_C, DataEleHelperClass) {
        ModuleService.registerModule(ModuleClass_S, ModuleClass_C, DataEleHelperClass);
    }
    //获取系统语言索引
    getSystemLanguageIndex() {
        let language = mw.LocaleUtil.getDefaultLocale().toString().toLowerCase();
        if (!!language.match("zh")) {
            return 0;
        }
        if (!!language.match("en")) {
            return 1;
        }
        return 0;
    }
    onUpdate(dt) {
        super.onUpdate(dt);
        // update();
        mw.TweenUtil.TWEEN.update();
    }
};
__decorate([
    mw.Property()
], GameLauncher.prototype, "isOnline", void 0);
GameLauncher = __decorate([
    Component
], GameLauncher);
var GameLauncher$1 = GameLauncher;

var foreign14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GameLauncher$1
});

let GMHUD_Generate = class GMHUD_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.oKbutton = undefined;
        this.dropList = undefined;
        this.argText = undefined;
        this.cmdButton = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.oKbutton.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "oKbutton");
        });
        this.initLanguage(this.oKbutton);
        this.oKbutton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.cmdButton.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "cmdButton");
        });
        this.initLanguage(this.cmdButton);
        this.cmdButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        //按钮添加点击
        //按钮多语言
        //文本多语言
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/oKbutton')
], GMHUD_Generate.prototype, "oKbutton", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/dropList')
], GMHUD_Generate.prototype, "dropList", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/argText')
], GMHUD_Generate.prototype, "argText", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/cmdButton')
], GMHUD_Generate.prototype, "cmdButton", void 0);
GMHUD_Generate = __decorate([
    UIBind('UI/gm/GMHUD.ui')
], GMHUD_Generate);
var GMHUD_Generate$1 = GMHUD_Generate;

var foreign104 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GMHUD_Generate$1
});

class GMHUD extends GMHUD_Generate$1 {
    /**
    * 构造UI文件成功后，在合适的时机最先初始化一次
    */
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    /**
    * 构造UI文件成功后，onStart之后
    * 对于UI的根节点的添加操作，进行调用
    * 注意：该事件可能会多次调用
    */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GMHUD
});

let GMItem_Generate = class GMItem_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.button = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.button.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "button");
        });
        this.initLanguage(this.button);
        this.button.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        //按钮添加点击
        //按钮多语言
        //文本多语言
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/button')
], GMItem_Generate.prototype, "button", void 0);
GMItem_Generate = __decorate([
    UIBind('UI/gm/GMItem.ui')
], GMItem_Generate);
var GMItem_Generate$1 = GMItem_Generate;

var foreign105 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GMItem_Generate$1
});

class GMItem extends GMItem_Generate$1 {
    /**
    * 构造UI文件成功后，在合适的时机最先初始化一次
    */
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    /**
    * 构造UI文件成功后，onStart之后
    * 对于UI的根节点的添加操作，进行调用
    * 注意：该事件可能会多次调用
    */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GMItem
});

class ModifiedCameraSystem {
    static get cameraLocationMode() {
        if (!SystemUtil.isClient()) {
            return;
        }
        return Camera.currentCamera.positionMode;
    }
    static set cameraLocationMode(newCameraLocationMode) {
        if (!SystemUtil.isClient()) {
            return;
        }
        let tempTransform = Camera.currentCamera.springArm.localTransform;
        Camera.currentCamera.positionMode = newCameraLocationMode;
        if (newCameraLocationMode == CameraPositionMode.PositionFollow) {
            Camera.currentCamera.parent = Player.localPlayer.character;
            Camera.currentCamera.springArm.localTransform = tempTransform;
        }
    }
    static setCameraFollowTarget(target) {
        if (!SystemUtil.isClient())
            return;
        Camera.currentCamera.parent = target;
        Camera.currentCamera.springArm.localTransform = Transform.identity;
    }
    static cancelCameraFollowTarget() {
        if (!SystemUtil.isClient())
            return;
        Camera.currentCamera.parent = Player.localPlayer.character;
        Camera.currentCamera.springArm.localTransform = Transform.identity;
    }
    static setOverrideCameraRotation(newOverrideRotation) {
        if (!SystemUtil.isClient())
            return;
        ModifiedCameraSystem.followEnable = true;
        ModifiedCameraSystem.followRotationValue = newOverrideRotation;
        Player.setControllerRotation(ModifiedCameraSystem.followRotationValue);
        if (!ModifiedCameraSystem.isBind) {
            TimeUtil.onEnterFrame.add(() => {
                if (ModifiedCameraSystem.followEnable) {
                    Player.setControllerRotation(ModifiedCameraSystem.followRotationValue);
                }
            }, this);
            ModifiedCameraSystem.isBind = true;
        }
    }
    static resetOverrideCameraRotation() {
        if (!SystemUtil.isClient())
            return;
        ModifiedCameraSystem.followEnable = false;
    }
    static getCurrentSettings() {
        if (!SystemUtil.isClient())
            return;
        cameraSystemConfig.cameraRelativeTransform = Camera.currentCamera.localTransform;
        cameraSystemConfig.cameraWorldTransform = Camera.currentCamera.worldTransform;
        cameraSystemConfig.targetArmLength = Camera.currentCamera.springArm.length;
        cameraSystemConfig.enableCameraLocationLag = Camera.currentCamera.positionLagEnabled;
        cameraSystemConfig.cameraLocationLagSpeed = Camera.currentCamera.positionLagSpeed;
        cameraSystemConfig.enableCameraRotationLag = Camera.currentCamera.rotationLagEnabled;
        cameraSystemConfig.cameraRotationLagSpeed = Camera.currentCamera.rotationLagSpeed;
        cameraSystemConfig.cameraFOV = Camera.currentCamera.fov;
        cameraSystemConfig.cameraLocationMode = Camera.currentCamera.positionMode;
        cameraSystemConfig.cameraRotationMode = Camera.currentCamera.rotationMode;
        cameraSystemConfig.enableCameraCollision = Camera.currentCamera.springArm.collisionEnabled;
        cameraSystemConfig.cameraUpLimitAngle = Camera.currentCamera.upAngleLimit;
        cameraSystemConfig.cameraDownLimitAngle = Camera.currentCamera.downAngleLimit;
        return cameraSystemConfig;
    }
    static applySettings(CameraSetting) {
        if (!SystemUtil.isClient())
            return;
        Camera.currentCamera.localTransform = CameraSetting.cameraRelativeTransform;
        Camera.currentCamera.springArm.length = CameraSetting.targetArmLength;
        Camera.currentCamera.positionLagEnabled = CameraSetting.enableCameraLocationLag;
        Camera.currentCamera.positionLagSpeed = CameraSetting.cameraLocationLagSpeed;
        Camera.currentCamera.rotationLagEnabled = CameraSetting.enableCameraRotationLag;
        Camera.currentCamera.rotationLagSpeed = CameraSetting.cameraRotationLagSpeed;
        Camera.currentCamera.fov = CameraSetting.cameraFOV;
        ModifiedCameraSystem.cameraLocationMode = CameraSetting.cameraLocationMode;
        Camera.currentCamera.rotationMode = CameraSetting.cameraRotationMode;
        Camera.currentCamera.springArm.collisionEnabled = CameraSetting.enableCameraCollision;
        Camera.currentCamera.upAngleLimit = CameraSetting.cameraUpLimitAngle;
        Camera.currentCamera.downAngleLimit = CameraSetting.cameraDownLimitAngle;
    }
    static cameraFocusing(targetArmLength, targetOffset, timeInterval = 20) {
        if (!SystemUtil.isClient())
            return;
        let timer = TimeUtil.onEnterFrame.add(() => {
            let interpolationValue = Camera.currentCamera.springArm.length + (targetArmLength - Camera.currentCamera.springArm.length) / timeInterval;
            Camera.currentCamera.springArm.length = interpolationValue;
            if (Math.abs(Camera.currentCamera.springArm.length - targetArmLength) <= 0.5) {
                TimeUtil.onEnterFrame.remove(timer);
            }
        });
    }
    static startCameraShake(shakeData) {
        if (!SystemUtil.isClient())
            return;
        let info = {
            rotationYAmplitude: shakeData.rotYawOscillation.amplitude,
            rotationYFrequency: shakeData.rotYawOscillation.frequency,
            rotationZAmplitude: shakeData.rotRollOscillation.amplitude,
            rotationZFrequency: shakeData.rotRollOscillation.frequency,
            rotationXAmplitude: shakeData.rotPitchOscillation.amplitude,
            rotationXFrequency: shakeData.rotPitchOscillation.frequency,
            positionXAmplitude: shakeData.locXOscillation.amplitude,
            positionXFrequency: shakeData.locXOscillation.frequency,
            positionYAmplitude: shakeData.locYOscillation.amplitude,
            positionYFrequency: shakeData.locYOscillation.frequency,
            positionZAmplitude: shakeData.locZOscillation.amplitude,
            positionZFrequency: shakeData.locZOscillation.frequency,
        };
        Camera.shake(info);
    }
    static stopCameraShake() {
        if (!SystemUtil.isClient())
            return;
        Camera.stopShake();
    }
    static getDefaultCameraShakeData() {
        const defaultOscillator = {
            amplitude: 0,
            frequency: 0,
            waveform: CameraModifid.EOscillatorWaveform.SineWave,
        };
        const defaultCameraShakeData = {
            rotPitchOscillation: { ...defaultOscillator },
            rotYawOscillation: { ...defaultOscillator },
            rotRollOscillation: { ...defaultOscillator },
            locXOscillation: { ...defaultOscillator },
            locYOscillation: { ...defaultOscillator },
            locZOscillation: { ...defaultOscillator },
            fovOscillation: { ...defaultOscillator },
        };
        return defaultCameraShakeData;
    }
}
ModifiedCameraSystem.isBind = false;
ModifiedCameraSystem.followTargetEnable = true;
ModifiedCameraSystem.followTargetInterpSpeed = 15;
var CameraModifid;
(function (CameraModifid) {
    (function (EOscillatorWaveform) {
        /** 正弦波 */
        EOscillatorWaveform[EOscillatorWaveform["SineWave"] = 0] = "SineWave";
        /** Perlin噪声 */
        EOscillatorWaveform[EOscillatorWaveform["PerlinNoise"] = 1] = "PerlinNoise";
    })(CameraModifid.EOscillatorWaveform || (CameraModifid.EOscillatorWaveform = {}));
})(CameraModifid || (CameraModifid = {}));
const cameraSystemConfig = {
    cameraRelativeTransform: Transform.identity,
    cameraWorldTransform: Transform.identity,
    targetArmLength: 400,
    enableCameraLocationLag: false,
    cameraLocationLagSpeed: 10,
    enableCameraRotationLag: false,
    cameraRotationLagSpeed: 10,
    cameraFOV: 90,
    cameraLocationMode: CameraPositionMode.PositionFollow,
    cameraRotationMode: CameraRotationMode.RotationControl,
    enableCameraCollision: true,
    cameraUpLimitAngle: 40,
    cameraDownLimitAngle: -40,
};

var foreign17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get CameraModifid () { return CameraModifid; },
    ModifiedCameraSystem: ModifiedCameraSystem
});

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

var foreign21 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var foreign28 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

let EndTrigger = class EndTrigger extends mw.Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        const trigger = this.gameObject;
        if (mw.SystemUtil.isClient()) {
            trigger.onEnter.add(async (go) => {
                if ((go) instanceof mw.Character) {
                    let isEnd = ModuleService.getModule(PlayerModuleC).getIsEnd();
                    if (isEnd)
                        return;
                    let ModuleC = ModuleService.getModule(LevelModuleC);
                    ModuleService.getModule(PlayerModuleC).endGame();
                    const char = go;
                    char.switchToWalking();
                    let successDanceGuid = ProLoadGuid.playerSuccess.split(",");
                    PlayerManagerExtesion.rpcPlayAnimation(char, successDanceGuid[Math.floor(Math.random() * (successDanceGuid.length - 0.01))], 0, 1);
                    new mw.Tween({ trans: Camera.currentCamera.localTransform.clone(), leng: Camera.currentCamera.springArm.length }).to({ trans: new mw.Transform(new mw.Vector(600, 0, 0), new mw.Rotation(0, 0, 180), mw.Vector.one), leng: 200 }, 500).onUpdate(obj => {
                        Camera.currentCamera.localTransform = obj.trans;
                        Camera.currentCamera.springArm.length = obj.leng;
                    }).start();
                    let ModuleData = DataCenterC.getData(PlayerDataHelper);
                    ModuleData.getSkillDoor();
                    ModuleService.getModule(PlayerModuleC).resrtSkilldoor();
                    ModuleC.resetDefaultTime();
                    // ModuleService.getModule(LevelModuleC).showEndUI(true);
                    Event.dispatchToLocal(C2CEvent.HALLUI_UIOUT, true);
                    // mw.instance.showPanel()
                    // ModuleService.getModule(LevelModuleC).passGame();
                    SoundPlay.ins.play(SoundConfigID.PASS_GAME_TALK);
                }
            });
        }
    }
};
EndTrigger = __decorate([
    Component
], EndTrigger);
var EndTrigger$1 = EndTrigger;

var foreign29 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: EndTrigger$1
});

var foreign40 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

let PositionTemp = class PositionTemp extends mw.Script {
    constructor() {
        super(...arguments);
        this.ros = "y"; // 开门时间(毫秒)：从门完全关闭到完全打开需要的时间
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 0.1;
        this.trapName = "CircularSaw";
        this.stayTime = 0;
        // 用于计算位置相加
        this._addLocation = new mw.Vector(0, 0, 0);
        // 用于update里面计算停留时间
        this._stayTimeCountdown = 0;
        // 尖刺固定停留时间
        this.originTime = 1000;
    }
    onStart() {
        // 这里控制为false，会在对应Prefab内的moving方法里面控制为TRUE
        // 获取到要控制的物体对象
        this._moveObj = this.gameObject.getChildByName(this.trapName);
        // 获取该物体的位置缓存起来，后续更新时就不需要每帧获取了
        // this._location = this._moveObj.localTransform.position
    }
    /**
     * 更改物体位置
     * @param type 更改物体的哪个轴
     * @param num 更改偏移量
     */
    moveLocation(type, num) {
        // 根据属性和偏移量更改物体位置
        this._addLocation[type] = num;
        this._location = this._moveObj.localTransform.position.add(this._addLocation);
        // 判断边界情况，更改运动方向
        if (this._location[type] >= this.max) {
            this._location[type] = this.max;
            this.dir = -Math.abs(this.dir);
            // 如果移动的是z轴，只有地刺类型，让他再上面停留时的时间不受影响
            this._stayTimeCountdown = (type == "z" ? this.originTime : this.stayTime);
        }
        else if (this._location[type] <= this.min) {
            this._location[type] = this.min;
            this.dir = Math.abs(this.dir);
            this._stayTimeCountdown = this.stayTime;
        }
        this._moveObj.localTransform.position = (this._location);
    }
    onUpdate(dt) {
        if (!this._moveObj)
            return;
        if (dt > 1)
            return;
        // 计算停留时间，如果还在冷却，那就先不动
        this._stayTimeCountdown = this._stayTimeCountdown - (dt * 1000);
        if (this._stayTimeCountdown > 0) {
            return;
        }
        // 计算偏移量，根据速度、方向和dt计算
        let v = (dt * 1000) * this.vt * this.dir;
        this.moveLocation(this.ros, v);
    }
    onDestroy() {
    }
};
__decorate([
    mw.Property({ displayName: "移动轴", tooltip: "陷阱绕那个轴移动" })
], PositionTemp.prototype, "ros", void 0);
__decorate([
    mw.Property({ displayName: "上限", tooltip: "旋转上限" })
], PositionTemp.prototype, "max", void 0);
__decorate([
    mw.Property({ displayName: "下限", tooltip: "旋转下限" })
], PositionTemp.prototype, "min", void 0);
__decorate([
    mw.Property({ displayName: "方向", tooltip: "旋转方向" })
], PositionTemp.prototype, "dir", void 0);
__decorate([
    mw.Property({ displayName: "速度", tooltip: "移动速度" })
], PositionTemp.prototype, "vt", void 0);
__decorate([
    mw.Property({ displayName: "下方陷阱名称", tooltip: "移动速度" })
], PositionTemp.prototype, "trapName", void 0);
__decorate([
    mw.Property({ displayName: "停留时间" })
], PositionTemp.prototype, "stayTime", void 0);
PositionTemp = __decorate([
    Component
], PositionTemp);
var PositionTemp$1 = PositionTemp;

var foreign41 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PositionTemp$1
});

let RotationTemp = class RotationTemp extends mw.Script {
    constructor() {
        super(...arguments);
        this.ros = "y"; // 开门时间(毫秒)：从门完全关闭到完全打开需要的时间
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 1;
        this.type = 2;
        this.stayTime = 1000;
        this.trapName = "CircularSaw";
        // 刺板在上面固定停留时间
        this.originTime = 1000;
        // 用来记录类型1和类型2的两个物体
        // 用于update里面计算停留时间
        this._stayTimeCountdown = 0;
        this.temp = 0;
        this.addTemp = new mw.Rotation(0, 0, 0);
    }
    onStart() {
        // oTrace("调试看onStart是否正常执行")
        this.tempObj = this.gameObject.getChildByName(this.trapName);
        if (this.tempObj) {
            this.trapRos = this.tempObj.localTransform.rotation;
        }
        this.temp = this.trapRos[this.ros];
        if (this.type == 2) {
            this.rosObj = this.gameObject;
        }
        else {
            this.rosObj = this.tempObj;
        }
    }
    rotationChange(type, addTemp) {
        if (addTemp[type] >= this.max) {
            this.dir = -Math.abs(this.dir);
            // addTemp[type] = this.max
            this._stayTimeCountdown = ((this.trapName == "board" || this.trapName == "boardLeft") ? this.originTime : this.stayTime);
        }
        else if (addTemp[type] <= this.min) {
            // addTemp[type] = this.min
            this.dir = Math.abs(this.dir);
            this._stayTimeCountdown = this.stayTime;
        }
        this.rosObj.localTransform.rotation = (addTemp);
    }
    onUpdate(dt) {
        // let temp = this.gameObject.getChildByName(this.trapName);
        if (!this.tempObj)
            return;
        // 1为范围旋转，2为自传
        if (this.type == 1) {
            this._stayTimeCountdown = this._stayTimeCountdown - (dt * 1000);
            if (this._stayTimeCountdown > 0) {
                return;
            }
            let v = this.vt * this.dir;
            this.temp += v;
            this.addTemp.x = this.trapRos.x;
            this.addTemp.y = this.trapRos.y;
            this.addTemp.z = this.trapRos.z;
            this.addTemp[this.ros] = this.temp;
            this.rotationChange(this.ros, this.addTemp);
        }
        else {
            let v = this.vt * this.dir;
            this.temp += v;
            this.addTemp.x = this.trapRos.x;
            this.addTemp.y = this.trapRos.y;
            this.addTemp.z = this.trapRos.z;
            if (this.ros == "x") {
                this.addTemp.x = this.temp;
                this.tempObj.localTransform.rotation = (this.addTemp);
            }
            else if (this.ros == "y") {
                this.addTemp.y = this.temp;
                this.tempObj.localTransform.rotation = (this.addTemp);
            }
            else if (this.ros == "z") {
                this.addTemp.z = this.temp;
                this.tempObj.localTransform.rotation = (this.addTemp);
            }
        }
    }
};
__decorate([
    mw.Property({ displayName: "旋转轴", tooltip: "陷阱绕那个轴旋转" })
], RotationTemp.prototype, "ros", void 0);
__decorate([
    mw.Property({ displayName: "上限", tooltip: "旋转上限" })
], RotationTemp.prototype, "max", void 0);
__decorate([
    mw.Property({ displayName: "下限", tooltip: "旋转下限" })
], RotationTemp.prototype, "min", void 0);
__decorate([
    mw.Property({ displayName: "方向", tooltip: "旋转方向" })
], RotationTemp.prototype, "dir", void 0);
__decorate([
    mw.Property({ displayName: "速度", tooltip: "旋转速度" })
], RotationTemp.prototype, "vt", void 0);
__decorate([
    mw.Property({ displayName: "移动类型", tooltip: "旋转类型" })
], RotationTemp.prototype, "type", void 0);
__decorate([
    mw.Property({ displayName: "停留时间", tooltip: "摇摆停留时间" })
], RotationTemp.prototype, "stayTime", void 0);
__decorate([
    mw.Property({ displayName: "下方陷阱名称", tooltip: "移动速度" })
], RotationTemp.prototype, "trapName", void 0);
RotationTemp = __decorate([
    Component
], RotationTemp);

var foreign42 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get RotationTemp () { return RotationTemp; }
});

let RotationTempMany = class RotationTempMany extends mw.Script {
    constructor() {
        super(...arguments);
        this.ros = "y"; // 开门时间(毫秒)：从门完全关闭到完全打开需要的时间
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 1;
        this.type = 2;
        this.stayTime = 1000;
        this.trapName = "CircularSaw|CircularSaw-1|CircularSaw-2|CircularSaw-3";
        // 旋转物体的初始位置
        this.trapRos = [];
        // 旋转物体 
        this.tempObj = [];
        // 用来记录类型1和类型2的两个物体
        // 用于update里面计算停留时间
        this._stayTimeCountdown = 0;
        this.temp = 0;
        this.addTemp = new mw.Rotation(0, 0, 0);
    }
    onStart() {
        // oTrace("调试看onStart是否正常执行")
        let list = this.trapName.split("|");
        for (let i = 0; i < list.length; i++) {
            let obj = this.gameObject.getChildByName(list[i]);
            if (!obj)
                continue;
            let rotation = obj.localTransform.rotation.clone();
            this.trapRos.push(rotation);
            this.tempObj.push(obj);
        }
        // this.tempObj = this.gameObject.getChildByName(this.trapName);
        // if (this.tempObj) {
        // 	this.trapRos = this.tempObj.localTransform.rotation;
        // }
    }
    rotationChange(type, addTemp) {
        if (addTemp[type] >= this.max) {
            this._stayTimeCountdown = this.stayTime;
            this.dir = -Math.abs(this.dir);
            addTemp[type] = this.max;
        }
        else if (addTemp[type] <= this.min) {
            addTemp[type] = this.min;
            this.dir = Math.abs(this.dir);
            this._stayTimeCountdown = this.stayTime;
        }
        this.rosObj.localTransform.rotation = (addTemp);
    }
    onUpdate(dt) {
        // let temp = this.gameObject.getChildByName(this.trapName);
        if (!this.tempObj || this.tempObj.length <= 0)
            return;
        // 1为范围旋转，2为自传
        if (this.type == 1) ;
        else {
            let v = this.vt * this.dir;
            this.temp += v;
            for (let i = 0; i < this.tempObj.length; i++) {
                this.rotationSelf(this.tempObj[i], this.trapRos[i]);
            }
        }
    }
    rotationSelf(obj, trapRos) {
        this.addTemp.x = trapRos.x;
        this.addTemp.y = trapRos.y;
        this.addTemp.z = trapRos.z;
        if (this.ros == "x") {
            this.addTemp.x = this.temp;
            obj.localTransform.rotation = (this.addTemp);
        }
        else if (this.ros == "y") {
            this.addTemp.y = this.temp;
            obj.localTransform.rotation = (this.addTemp);
        }
        else if (this.ros == "z") {
            this.addTemp.z = this.temp;
            obj.localTransform.rotation = (this.addTemp);
        }
    }
};
__decorate([
    mw.Property({ displayName: "旋转轴", tooltip: "陷阱绕那个轴旋转" })
], RotationTempMany.prototype, "ros", void 0);
__decorate([
    mw.Property({ displayName: "上限", tooltip: "旋转上限" })
], RotationTempMany.prototype, "max", void 0);
__decorate([
    mw.Property({ displayName: "下限", tooltip: "旋转下限" })
], RotationTempMany.prototype, "min", void 0);
__decorate([
    mw.Property({ displayName: "方向", tooltip: "旋转方向" })
], RotationTempMany.prototype, "dir", void 0);
__decorate([
    mw.Property({ displayName: "速度", tooltip: "旋转速度" })
], RotationTempMany.prototype, "vt", void 0);
__decorate([
    mw.Property({ displayName: "移动类型", tooltip: "旋转类型" })
], RotationTempMany.prototype, "type", void 0);
__decorate([
    mw.Property({ displayName: "停留时间", tooltip: "摇摆停留时间" })
], RotationTempMany.prototype, "stayTime", void 0);
__decorate([
    mw.Property({ displayName: "下方陷阱名称", tooltip: "移动速度" })
], RotationTempMany.prototype, "trapName", void 0);
RotationTempMany = __decorate([
    Component
], RotationTempMany);

var foreign43 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get RotationTempMany () { return RotationTempMany; }
});

class TrapUtil {
    /**
     * 对单个物体进行缩放
     * @param obj 要缩放的物体
     * @param scaleX 缩放倍数
     * @param scaleTime 缩放时间
     * @param scaleType 缩放轴 x/y/z，不传就是所有轴都一起缩放（暂不支持只缩放其中两个轴）
     * @returns 缩放的计时器ID，可以用来自己取消（在外部业务逻辑回收的时候），一般不用管
     */
    static scaleGameObject(obj, scaleX, scaleTime, scaleType) {
        let objScale = obj.worldTransform.scale;
        let worldScale = new mw.Vector(objScale.x, objScale.y, objScale.z);
        let targetScale = scaleType ? worldScale[scaleType] * scaleX : worldScale.x * scaleX;
        let singleTime = 10;
        let singleAdd = scaleX / (scaleTime / singleTime);
        let intervalId = setInterval(() => {
            if (scaleType) {
                worldScale[scaleType] += singleAdd;
            }
            else {
                worldScale.x += singleAdd;
                worldScale.y += singleAdd;
                worldScale.z += singleAdd;
            }
            obj.worldTransform.scale = (worldScale); // = worldScale;
            // if (obj) obj.worldTransform.scale = worldScale;
            if (!obj)
                clearInterval(intervalId);
            if (worldScale.x > targetScale) {
                clearInterval(intervalId);
            }
        }, singleTime);
        return intervalId;
    }
    /**
     * 根据传入的根节点，从该节点中遍历所有子节点并返回
     * @param parent 根节点
     * @param deep 查找的最深深度，默认为5
     * @param property 如果为空，返回的列表为子对象列表。如果该属性不为空，返回的列表将是子物体的该属性值列表
     * @returns 子对象列表或者子对象的属性值列表
     */
    static getAllChild(parent, deep = 5, property = null) {
        if (parent.getChildren().length <= 0 || deep <= 0) {
            // 没娃，就不遍历了
            return null;
        }
        let result = [];
        for (let c of parent.getChildren()) {
            if (property) {
                result.push(c[property]);
            }
            else {
                result.push(c);
            }
            let cc = this.getAllChild(c, deep - 1, property); //拿到此子级的子级
            if (cc != null) {
                result.push(...cc);
            }
        }
        return result;
    }
}

var foreign46 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    TrapUtil: TrapUtil
});

class TrapBase extends mw.Script {
    constructor() {
        super(...arguments);
        this.rosV = 1;
        this.posV = 0.1;
        // 可被力量宝石技能摧毁的物体tag
        this.officeTag = "office";
        // 死亡Tag，有该tag的物体，角色碰到会死亡
        this.deadTag = "dead";
        // 原始材质
        this.materialPre = "94245";
        // 更换材质guid
        this.materialChange = "94240";
        // 底座材质
        this.materialCube = "100234";
        // 缩放时间（受空间宝石影响）
        this.scaleTime = 1000;
    }
    onStart() {
        this.trapObj = this.gameObject.getChildByName(this.getTrapObjName());
        let trapObjTwoName = this.getTrapObjNameTwo();
        if (trapObjTwoName) {
            this.trapObjtwo = this.gameObject.getChildByName(this.getTrapObjNameTwo());
        }
        let scaleObjName = this.getScaleObjName();
        if (scaleObjName) {
            this.scaleObj = this.gameObject.getChildByName(scaleObjName);
        }
        let scaleObjNameDown = this.getScaleObjNameDown();
        if (scaleObjNameDown) {
            this.scaleObjTwo = this.gameObject.getChildByName(scaleObjNameDown);
        }
        let canDestory = this.canDestroy();
        if (canDestory) {
            Event.addLocalListener("dedstory_office", (tag, name) => {
                if (tag.includes(this.gameObject.gameObjectId)) {
                    this.destroyTrap(name);
                }
            });
        }
    }
    initTrap() {
        // 初始化该Prefab时，展示机关（因为回收时会隐藏）
        this.gameObject.setVisibility(mw.PropertyStatus.On);
        //碰撞和标签
        let canDestory = this.canDestroy();
        let isCollisionDead = this.isCollisionDead();
        this.changeObjTagAndCollision(this.trapObj, (isCollisionDead ? this.deadTag : "")
            + (canDestory ? this.officeTag + this.gameObject.gameObjectId : ""));
        if (this.trapObjtwo) {
            this.changeObjTagAndCollision(this.trapObjtwo, (isCollisionDead ? this.deadTag : "")
                + (canDestory ? this.officeTag + this.gameObject.gameObjectId : ""));
        }
    }
    destroyPrefab() {
        // 回收机关，隐藏机关，改变Tag为不可碰撞
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.changeObjTagAndCollision(this.trapObj, "");
        // 把所有子节点关闭碰撞
        // let allChild = TrapUtil.getAllChild(this.gameObject);
        // allChild.forEach((obj) => {
        //     if (obj instanceof mw.GameObject) {
        //         obj.setCollision(mw.CollisionStatus.Off)
        //     }
        // })
    }
    ;
    /**
     * 根据根节点，改变所有子物体的Tag和碰撞状态
     * 如果Tag为空，会把所有子物体的tag改为空，且将物体的碰撞关系改为关闭
     * 一般是死亡tag和可摧毁tag，设置该tag时，代表该物体可被碰撞
     * 如果Tag不为空，讲碰撞关系改为 mw.CollisionStatus.QueryOnly
     * @param parent 根节点
     * @param tag 要改变为什么tag
     */
    changeObjTagAndCollision(parent, tag) {
        let allChild = TrapUtil.getAllChild(parent);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                // 需要判断一些是GameObject，避免改到脚本
                obj.setCollision(tag ? mw.CollisionStatus.QueryOnly : mw.CollisionStatus.Off);
                obj.tag = tag;
            }
        });
    }
}
__decorate([
    mw.Property({ displayName: "旋转初始速度" })
], TrapBase.prototype, "rosV", void 0);
__decorate([
    mw.Property({ displayName: "位移初始速度" })
], TrapBase.prototype, "posV", void 0);

var foreign44 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TrapBase
});

class TrapBaseMany extends mw.Script {
    constructor() {
        super(...arguments);
        this.rosV = 1;
        this.posV = 0.1;
        // 可被力量宝石技能摧毁的物体tag
        this.officeTag = "office";
        // 死亡Tag，有该tag的物体，角色碰到会死亡
        this.deadTag = "dead";
        // 原始材质
        this.materialPre = "94245";
        // 更换材质guid
        this.materialChange = "94240";
        // 底座材质
        this.materialCube = "100234";
        // 缩放时间（受空间宝石影响）
        this.scaleTime = 1000;
        // 机关对象
        this.trapObj = [];
        // 要缩放的对象
        this.scaleObj = [];
    }
    onStart() {
        let trapName = this.getTrapObjName();
        let list = trapName.split("|");
        for (let i = 0; i < list.length; i++) {
            let obj = this.gameObject.getChildByName(list[i]);
            if (!obj)
                continue;
            this.trapObj.push(obj);
        }
        // this.trapObj = this.gameObject.getChildByName();
        // let trapObjTwoName = this.getTrapObjNameTwo();
        // if (trapObjTwoName) {
        //     this.trapObjtwo = this.gameObject.getChildByName(this.getTrapObjNameTwo());
        // }
        // let scaleObjName = this.getScaleObjName()
        // if (scaleObjName) {
        //     this.scaleObj = this.gameObject.getChildByName(scaleObjName);
        // }
        // let scaleObjNameDown = this.getScaleObjNameDown()
        // if (scaleObjNameDown) {
        //     this.scaleObjTwo = this.gameObject.getChildByName(scaleObjNameDown);
        // }
        let canDestory = this.canDestroy();
        if (canDestory) {
            Event.addLocalListener("dedstory_office", (tag, name) => {
                if (tag.includes(this.gameObject.gameObjectId)) {
                    this.destroyTrap(name);
                }
            });
        }
    }
    initTrap() {
        // 初始化该Prefab时，展示机关（因为回收时会隐藏）
        this.gameObject.setVisibility(mw.PropertyStatus.On);
        //碰撞和标签
        let canDestory = this.canDestroy();
        let isCollisionDead = this.isCollisionDead();
        this.trapObj.forEach(obj => {
            // 给父类也设置一下碰撞
            if (isCollisionDead || canDestory)
                obj.setCollision(mw.CollisionStatus.QueryOnly);
            obj.tag = (isCollisionDead ? this.deadTag : "")
                + (canDestory ? this.officeTag + this.gameObject.gameObjectId : "");
            obj.setVisibility(mw.PropertyStatus.On);
            // this.changeObjTagAndCollision(obj, (isCollisionDead ? this.deadTag : "")
            //     + (canDestory ? this.officeTag + this.gameObject.gameObjectId : ""));
        });
    }
    destroyPrefab() {
        // 回收机关，隐藏机关，改变Tag为不可碰撞
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.trapObj.forEach(obj => {
            obj.setCollision(mw.PropertyStatus.Off);
            obj.tag = "";
            obj.setVisibility(mw.PropertyStatus.Off);
        });
        // this.changeObjTagAndCollision(this.trapObj, "");
        // 把所有子节点关闭碰撞
        // let allChild = TrapUtil.getAllChild(this.gameObject);
        // allChild.forEach((obj) => {
        //     if (obj instanceof mw.GameObject) {
        //         obj.setCollision(mw.CollisionStatus.Off)
        //     }
        // })
    }
    ;
}
__decorate([
    mw.Property({ displayName: "旋转初始速度" })
], TrapBaseMany.prototype, "rosV", void 0);
__decorate([
    mw.Property({ displayName: "位移初始速度" })
], TrapBaseMany.prototype, "posV", void 0);

var foreign45 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TrapBaseMany
});

/**
 * 大石门机关，人物碰到就要死亡
 * 不能被力量宝石摧毁
 */
let WallTrapSkill$1 = class WallTrapSkill extends TrapBase {
    getTrapObjNameTwo() {
        return null;
    }
    getTrapObjName() {
        return "arched";
    }
    getScaleObjName() {
        return "arched";
    }
    getScaleObjNameDown() {
        return null;
    }
    destroyTrap(name) {
    }
    canDestroy() {
        return false;
    }
    isCollisionDead() {
        return true;
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    space(worldScale) {
        // 空间宝石，根据缩放值缩放
        if (this.gameObject && this.scaleObj) {
            this.clock = TrapUtil.scaleGameObject(this.scaleObj, worldScale, 1000);
        }
    }
    ;
    resetPrefab() {
        // 恢复机关状态，再展示机关，恢复缩放状态
        clearInterval(this.clock);
        if (this.scaleObj) {
            this.scaleObj.worldTransform.scale = new mw.Vector(1.6, 1.6, 1.3);
        }
        this.initTrap();
    }
    ;
};

var foreign47 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: WallTrapSkill$1
});

class CapsuleRotateComp extends RotationTemp {
    onStart() {
        super.onStart();
    }
}

var foreign48 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CapsuleRotateComp
});

class CapsuleTrap extends TrapBase {
    constructor() {
        super(...arguments);
        this.originPos = null; // 原始位置
        this.tween = null; // 动画
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    onUpdate(dt) {
        super.onUpdate(dt);
    }
    /**空间宝石 */
    space(worldScale) {
        const y = this.gameObject.worldTransform.position.y * worldScale;
        // 不能包含0 因为0位置不移动
        if (y) {
            this.spacing(y);
        }
    }
    /**限时宝石 */
    reality() {
        this.isReality = true;
        this.setMaterial(this.materialChange);
        this.changeObjTagAndCollision(this.trapObj, "");
    }
    /**移动控制 */
    moving(isMoving, ratio) {
        // const rotateComp = this.gameObject.getScriptByName('CapsuleRotateComp') as CapsuleRotateComp;
        // rotateComp.vt = ratio * this.rosV;
        // rotateComp.useUpdate = isMoving;
    }
    /**重置机关 */
    resetPrefab() {
        if (this["newLevel"]) {
            this.originPos = null;
        }
        this.initTrap();
    }
    /**毁灭机关 */
    destroyTrap(name) {
    }
    initTrap() {
        super.initTrap();
        this.stopSpacing();
        if (!this.originPos && this['newLevel']) {
            this.originPos = this.gameObject.worldTransform.position;
            this['newLevel'] = false;
        }
        if (this.originPos) {
            this.gameObject.worldTransform.position = this.originPos;
        }
        // 获取所有需要改变的机关部件
        this.setMaterial(this.materialPre);
        this.isReality = false;
    }
    canDestroy() {
        return false;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return 'mergeGear';
    }
    getTrapObjNameTwo() {
        return '';
    }
    getScaleObjName() {
        return '';
    }
    getScaleObjNameDown() {
        return '';
    }
    // =====================================================================
    // 位置移动
    spacing(moveDis) {
        const start = this.gameObject.worldTransform.position;
        this.tween = new mw.Tween({ y: start.y })
            .to({ y: moveDis }, 1000)
            .onUpdate(o => {
            this.gameObject.worldTransform.position = new mw.Vector(start.x, o.y, start.z);
        })
            .onComplete(() => {
            this.tween = null;
        })
            .start();
    }
    // 停止移动
    stopSpacing() {
        if (this.tween) {
            this.tween.stop();
            this.tween = null;
        }
    }
    setMaterial(guid) {
        // 获取所有需要改变的机关部件
        const traps = this.gameObject.getChildByName('mergeGear').getChildren();
        traps.forEach(trap => {
            trap.setMaterial(guid);
        });
    }
}

var foreign49 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CapsuleTrap
});

/**
 * 陷进墙，中间洞
 */
class WallTrapSkill extends TrapBase {
    getTrapObjNameTwo() {
        return null;
    }
    getScaleObjName() {
        return null;
    }
    getScaleObjNameDown() {
        return null;
    }
    destroyTrap(name) {
    }
    canDestroy() {
        return false;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "holeChild";
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    resetPrefab() {
        this.initTrap();
    }
}

var foreign50 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: WallTrapSkill
});

let CircularSawPos = class CircularSawPos extends PositionTemp$1 {
    onStart() {
        this.ros = "y";
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 0.1;
        this.trapName = "CircularSaw";
        this.stayTime = 0;
        super.onStart();
    }
};
CircularSawPos = __decorate([
    Component
], CircularSawPos);
var CircularSawPos$1 = CircularSawPos;

var foreign51 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CircularSawPos$1
});

let CircularSawRos = class CircularSawRos extends RotationTemp {
    onStart() {
        this.ros = "y";
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 1;
        this.type = 2;
        this.trapName = "CircularSaw";
        this.stayTime = 1000;
        super.onStart();
    }
};
CircularSawRos = __decorate([
    Component
], CircularSawRos);
var CircularSawRos$1 = CircularSawRos;

var foreign52 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CircularSawRos$1
});

class CircularTrapSkill extends TrapBase {
    getTrapObjNameTwo() {
        return null;
    }
    getScaleObjNameDown() {
        return null;
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "CircularSaw";
    }
    getScaleObjName() {
        return "Track";
    }
    onStart() {
        super.onStart();
        this.originPos = this.trapObj.localTransform.position;
        this.initTrap();
    }
    destroyTrap() {
        super.destroyPrefab();
    }
    /**
     * 初始机关
     * @param ifMove s控制机关移动
     * @param ratio  关卡难度系数
     */
    moving(ifMove, ratio) {
        let scriptPos = this.gameObject.getScriptByName("CircularSawPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.vt = ratio * this.posV;
            scriptTempPos.max = 210;
            scriptTempPos.min = -210;
            scriptTempPos.useUpdate = ifMove;
        }
        let scriptRos = this.gameObject.getScriptByName("CircularSawRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove;
        }
    }
    resetPrefab() {
        let scriptPos = this.gameObject.getScriptByName("CircularSawPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.dir = 1;
        }
        clearInterval(this.clock);
        this.scaleObj.worldTransform.scale = new mw.Vector(6, 0.4, 0.1);
        this.initTrap();
    }
    /**
     * 机关拉伸
     */
    space(worldScale) {
        this.clock = TrapUtil.scaleGameObject(this.scaleObj, worldScale, this.scaleTime, "x");
        let scriptPos = this.gameObject.getScriptByName("CircularSawPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.max = scriptTempPos.max * worldScale + 86 * (worldScale - 1);
            scriptTempPos.min = scriptTempPos.min * worldScale - 86 * (worldScale - 1);
        }
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptPos = this.gameObject.getScriptByName("CircularSawPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.vt = this.posV * ratio;
        }
        let scriptRos = this.gameObject.getScriptByName("CircularSawRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = this.rosV * ratio;
        }
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        this.isReality = true;
        this.changeObjTagAndCollision(this.trapObj, "");
        let mesh = this.trapObj;
        mesh.setMaterial(this.materialChange);
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialChange);
        });
    }
    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        this.originPos.y = 0;
        this.trapObj.localTransform.position = (this.originPos);
        this.isReality = false;
        let mesh = this.trapObj;
        mesh.setMaterial(this.materialPre);
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre);
        });
    }
}

var foreign53 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CircularTrapSkill
});

let CicularStandRos = class CicularStandRos extends RotationTempMany {
};
CicularStandRos = __decorate([
    Component
], CicularStandRos);
var CicularStandRos$1 = CicularStandRos;

var foreign54 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CicularStandRos$1
});

let CircularSingle$1 = class CircularSingle extends TrapBaseMany {
    getScaleObjName() {
        return null;
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "CircularSaw|CircularSaw-1|CircularSaw-2|CircularSaw-3";
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    destroyTrap(name) {
        let destroyObj = this.gameObject.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }
    }
    destroyPrefab() {
        super.destroyPrefab();
    }
    moving(ifMove, ratio) {
        let scriptRos = this.gameObject.getScriptByName("CicularStandRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove;
        }
    }
    resetPrefab() {
        // will todo
        if (this["newLevel"]) {
            this.orginPos = null;
        }
        // this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }
    /**
     * 机关拉伸  改机关不需要拉伸
     */
    space() {
        this.trapMove();
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("CicularStandRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = this.rosV * ratio;
        }
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        this.isReality = true;
        this.trapObj.forEach(obj => {
            // 给父类也设置一下碰撞
            obj.setCollision(mw.CollisionStatus.Off);
            obj.tag = "";
        });
        this.changeMaterial(false);
    }
    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        this.isReality = false;
        let ifNewLevel = this["newLevel"];
        if (!this.orginPos && ifNewLevel) {
            this.orginPos = this.gameObject.worldTransform.position;
            this["newLevel"] = false;
        }
        this.gameObject.worldTransform.position = this.orginPos;
        // 初始化材质
        this.changeMaterial(true);
    }
    /**
     * 改变材质，只做改变材质的事
     * @param isPre 材质类型，是否初始化
     * @returns
     */
    changeMaterial(isPre) {
        if (!this.trapObj || this.trapObj.length <= 0)
            return;
        let matral = isPre ? this.materialPre : this.materialChange;
        this.trapObj.forEach(obj => {
            let gameTemp = obj;
            gameTemp.setMaterial(matral);
            let materialObjs = obj.getChildren();
            materialObjs.forEach((ele) => {
                ele.setMaterial(matral);
            });
        });
    }
    trapMove() {
        let curTrap = this.gameObject.localTransform.position;
        let curTrapY = curTrap.y;
        let targetPos = curTrapY * 1.25;
        let tempAdd = new mw.Vector(0, 0, 0);
        tempAdd.x = curTrap.x;
        tempAdd.y = curTrap.y;
        tempAdd.z = curTrap.z;
        if (curTrapY > 0) {
            let clock = setInterval(() => {
                curTrapY++;
                tempAdd.y = curTrapY;
                this.gameObject.localTransform.position = (tempAdd);
                if (curTrapY > targetPos) {
                    clearInterval(clock);
                }
            }, 30);
        }
        else if (curTrapY < 0) {
            let clock = setInterval(() => {
                curTrapY--;
                tempAdd.y = curTrapY;
                this.gameObject.localTransform.position = (tempAdd);
                if (curTrapY < targetPos) {
                    clearInterval(clock);
                }
            }, 30);
        }
    }
};

var foreign55 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CircularSingle$1
});

let CircularSawStillRos = class CircularSawStillRos extends RotationTemp {
    onStart() {
        this.ros = "y";
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 1;
        this.type = 2;
        this.trapName = "CircularSaw";
        this.stayTime = 1000;
        super.onStart();
    }
};
CircularSawStillRos = __decorate([
    Component
], CircularSawStillRos);
var CircularSawStillRos$1 = CircularSawStillRos;

var foreign56 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CircularSawStillRos$1
});

class CircularSingle extends TrapBase {
    getTrapObjNameTwo() {
        return null;
    }
    getScaleObjName() {
        return null;
    }
    getScaleObjNameDown() {
        return null;
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "CircularSaw";
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    destroyTrap() {
        super.destroyPrefab();
    }
    moving(ifMove, ratio) {
        let scriptRos = this.gameObject.getScriptByName("CircularSawStillRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove;
        }
    }
    resetPrefab() {
        // will todo
        if (this["newLevel"]) {
            this.orginPos = null;
        }
        // this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }
    /**
     * 机关拉伸  改机关不需要拉伸
     */
    space() {
        this.trapMove();
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("CircularSawStillRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = this.rosV * ratio;
        }
    }
    /**
     * 可以被摧毁
     */
    power() {
        if (!this.isReality)
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        this.isReality = true;
        let gameTemp = this.trapObj;
        gameTemp.setMaterial(this.materialChange);
        this.changeObjTagAndCollision(this.trapObj, "");
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialChange);
        });
    }
    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        this.isReality = false;
        let ifNewLevel = this["newLevel"];
        if (!this.orginPos && ifNewLevel) {
            this.orginPos = this.gameObject.worldTransform.position;
            this["newLevel"] = false;
        }
        this.gameObject.worldTransform.position = this.orginPos;
        // 初始化材质
        let gameTemp = this.trapObj;
        gameTemp.setMaterial(this.materialPre);
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre);
        });
    }
    trapMove() {
        let curTrap = this.gameObject.localTransform.position;
        let curTrapY = curTrap.y;
        let targetPos = curTrapY * 1.25;
        let tempAdd = new mw.Vector(0, 0, 0);
        tempAdd.x = curTrap.x;
        tempAdd.y = curTrap.y;
        tempAdd.z = curTrap.z;
        if (curTrapY > 0) {
            let clock = setInterval(() => {
                curTrapY++;
                tempAdd.y = curTrapY;
                this.gameObject.localTransform.position = (tempAdd);
                if (curTrapY > targetPos) {
                    clearInterval(clock);
                }
            }, 30);
        }
        else if (curTrapY < 0) {
            let clock = setInterval(() => {
                curTrapY--;
                tempAdd.y = curTrapY;
                this.gameObject.localTransform.position = (tempAdd);
                if (curTrapY < targetPos) {
                    clearInterval(clock);
                }
            }, 30);
        }
    }
}

var foreign57 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CircularSingle
});

let FanRotateRos = class FanRotateRos extends RotationTemp {
    onStart() {
        this.ros = "x";
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 1;
        this.type = 2;
        this.trapName = "fanObj";
        this.stayTime = 1000;
        super.onStart();
    }
};
FanRotateRos = __decorate([
    Component
], FanRotateRos);
var FanRotateRos$1 = FanRotateRos;

var foreign58 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: FanRotateRos$1
});

class FanTrapSkill extends TrapBase {
    getTrapObjNameTwo() {
        return null;
    }
    getScaleObjName() {
        return null;
    }
    getScaleObjNameDown() {
        return null;
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "fanObj";
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    moving(ifMove, ratio) {
        let scriptRos = this.gameObject.getScriptByName("FanRotateRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove;
        }
    }
    destroyTrap() {
        super.destroyPrefab();
    }
    resetPrefab() {
        this.initTrap();
    }
    /**
     * 机关拉伸  该类型不受影响
     */
    space() {
        // Tools.timeBroadenObj(this.scaleObj, this.worldTransform.scale);
    }
    /**
     * 机关慢速移动
     */
    time(ratio) {
        let scriptPos = this.gameObject.getScriptByName("FanRotateRos");
        if (scriptPos) {
            let script = scriptPos;
            script.vt = this.rosV * ratio;
        }
    }
    /**
     * 可以被摧毁
     */
    power() {
        if (!this.isReality)
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        this.isReality = true;
        this.changeObjTagAndCollision(this.trapObj, "");
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialChange);
        });
    }
    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        this.isReality = false;
        // 设置虚拟材质
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre);
        });
    }
}

var foreign59 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: FanTrapSkill
});

class NeedleBoard extends TrapBase {
    getTrapObjNameTwo() {
        return null;
    }
    getScaleObjName() {
        return null;
    }
    getScaleObjNameDown() {
        return null;
    }
    canDestroy() {
        return false;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "board";
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    destroyTrap() {
        super.destroyPrefab();
    }
    moving(ifMove, ratio) {
        let scriptPos = this.gameObject.getScriptByName("NeedleBoardPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.vt = ratio * this.posV;
            scriptTempPos.useUpdate = ifMove;
        }
    }
    resetPrefab() {
        // will todo
        // this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }
    /**
     * 机关拉伸  改机关不需要拉伸
     */
    space() {
        // this.timeBroadenObj(this.scaleObj, this.worldTransform.scale);
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptPos = this.gameObject.getScriptByName("NeedleBoardPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.vt = this.posV * ratio;
        }
    }
    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
    }
}

var foreign60 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: NeedleBoard
});

let NeedleBoardPos = class NeedleBoardPos extends PositionTemp$1 {
    onStart() {
        this.ros = "z";
        this.max = 300;
        this.min = 10;
        this.dir = 1;
        this.vt = 0.1;
        this.trapName = "board";
        this.stayTime = 0;
        super.onStart();
    }
};
NeedleBoardPos = __decorate([
    Component
], NeedleBoardPos);
var NeedleBoardPos$1 = NeedleBoardPos;

var foreign61 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: NeedleBoardPos$1
});

class NeedleBoardCube extends TrapBase {
    getTrapObjNameTwo() {
        return null;
    }
    getScaleObjName() {
        return null;
    }
    getScaleObjNameDown() {
        return null;
    }
    canDestroy() {
        return false;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "needCubeObj";
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    destroyTrap() {
        super.destroyPrefab();
    }
    resetPrefab() {
        this.initTrap();
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            let temp = ele;
            temp.tag = "";
            temp.setCollision(mw.CollisionStatus.Off);
            ele.setMaterial(this.materialChange);
        });
    }
    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre);
        });
        // 底座需要单独设置材质
        let cube = this.trapObj.getChildren()[0];
        cube.setMaterial(this.materialCube);
    }
}

var foreign62 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: NeedleBoardCube
});

let SpikesAsynPos = class SpikesAsynPos extends PositionTemp$1 {
    onStart() {
        this.ros = "z";
        this.max = -20;
        this.min = -170;
        this.dir = 1;
        this.vt = 0.1;
        this.trapName = "SpikesRight";
        this.stayTime = 1000;
        super.onStart();
    }
};
SpikesAsynPos = __decorate([
    Component
], SpikesAsynPos);
var SpikesAsynPos$1 = SpikesAsynPos;

var foreign63 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpikesAsynPos$1
});

let SpikesAsynPosLeft = class SpikesAsynPosLeft extends PositionTemp$1 {
    onStart() {
        this.ros = "z";
        this.max = -20;
        this.min = -180;
        this.dir = 1;
        this.vt = 0.1;
        this.trapName = "SpikesLeft";
        this.stayTime = 1000;
        super.onStart();
    }
};
SpikesAsynPosLeft = __decorate([
    Component
], SpikesAsynPosLeft);
var SpikesAsynPosLeft$1 = SpikesAsynPosLeft;

var foreign64 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpikesAsynPosLeft$1
});

class SpikesTrapUpAndDown extends TrapBase {
    constructor() {
        super(...arguments);
        this.realityItems = [];
    }
    getScaleObjName() {
        return null;
    }
    getScaleObjNameDown() {
        return null;
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "SpikesLeft";
    }
    getTrapObjNameTwo() {
        return "SpikesRight";
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    // 力量球摧毁机关，只摧毁部件
    destroyTrap(name) {
        let destroyObj = this.trapObj.getChildByName(name);
        let destroyObjTemp = this.trapObjtwo.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }
        else if (destroyObjTemp) {
            destroyObjTemp.setVisibility(mw.PropertyStatus.Off);
            destroyObjTemp.tag = "";
            destroyObjTemp.setCollision(mw.PropertyStatus.Off);
        }
    }
    //  整个机关摧毁
    destroyPrefab() {
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.changeObjTagAndCollision(this.trapObj, "");
        this.changeObjTagAndCollision(this.trapObjtwo, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
                obj.setVisibility(mw.PropertyStatus.FromParent);
            }
        });
        let allChildTwo = TrapUtil.getAllChild(this.trapObjtwo);
        allChildTwo.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
                obj.setVisibility(mw.PropertyStatus.FromParent);
            }
        });
    }
    moving(ifMove, ratio) {
        let scriptPos = this.gameObject.getScriptByName("SpikesAsynPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.stayTime = ratio * 1000;
            scriptTempPos.vt = 0.7;
            scriptTempPos.useUpdate = ifMove;
        }
        let scriptPosTemp = this.gameObject.getScriptByName("SpikesAsynPosLeft");
        if (scriptPosTemp) {
            let scriptTemp2Pos = scriptPosTemp;
            scriptTemp2Pos.stayTime = ratio * 1000;
            scriptTemp2Pos.vt = 0.7;
            scriptTemp2Pos.useUpdate = ifMove;
        }
    }
    resetPrefab() {
        // will todo
        // this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.trapObjtwo.localTransform.position = (new mw.Vector(0, 48, -50));
        this.initTrap();
    }
    /**
     * 机关拉伸  改机关不需要拉伸
     */
    space() {
        // this.timeBroadenObj(this.scaleObj, this.worldTransform.scale);
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptPos = this.gameObject.getScriptByName("SpikesAsynPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.stayTime = scriptTempPos.stayTime / ratio;
        }
        let scriptPosTemp = this.gameObject.getScriptByName("SpikesAsynPosLeft");
        if (scriptPosTemp) {
            let scriptTemp2Pos = scriptPosTemp;
            scriptTemp2Pos.stayTime = scriptTemp2Pos.stayTime / ratio;
        }
    }
    /**
     * 可以被摧毁
     */
    power() {
        if (!this.isReality) {
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
            this.changeObjTagAndCollision(this.trapObjtwo, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
        }
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        // this.changeObjTag(this.trapObj, "");
        // this.changeObjTag(this.trapObjtwo, "");
        this.isReality = true;
        let materialObjs = this.trapObj.getChildren();
        let materialObjsDown = this.trapObjtwo.getChildren();
        this.realityItems = materialObjs.concat(materialObjsDown);
        this.realityItems.forEach((ele) => {
            if (Math.random() > 0.5) {
                let temp = ele;
                temp.tag = "";
                temp.setCollision(mw.CollisionStatus.QueryOnly);
                ele.setMaterial(this.materialChange);
            }
        });
    }
    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        this.isReality = false;
        let resetVisibeTrap = TrapUtil.getAllChild(this.trapObj);
        resetVisibeTrap.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        });
        let resetVisibeTrapTemp = TrapUtil.getAllChild(this.trapObjtwo);
        resetVisibeTrapTemp.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        });
        if (this.realityItems.length > 0) {
            this.realityItems.forEach((ele) => {
                ele.setMaterial(this.materialPre);
            });
            this.realityItems = [];
        }
    }
}

var foreign65 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpikesTrapUpAndDown
});

class SpikesSideMoveComp extends PositionTemp$1 {
    onStart() {
        super.onStart();
    }
}

var foreign66 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpikesSideMoveComp
});

class SpikesSideTrap extends TrapBase {
    constructor() {
        super(...arguments);
        this.pos = new mw.Vector(-0.62, 5, 50); // 尖刺原始位置
        this.originPos = null; // 原始位置
        this.tween = null; // 动画
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    /**移动控制 */
    moving(isMoving, ratio) {
        const moveComp = this.gameObject.getScriptByName('SpikesSideMoveComp');
        moveComp.vt = ratio * this.posV;
        moveComp.useUpdate = isMoving;
    }
    /**力量 */
    power() {
        if (this.isReality) {
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
        }
    }
    /**空间 */
    space(worldScale) {
        const y = this.gameObject.worldTransform.position.y * worldScale;
        // 不能包含0 因为0位置不移动
        if (y) {
            this.spacing(y);
        }
    }
    /**现实 */
    reality() {
        this.isReality = true;
        // this.changeObjTagAndCollision(this.trapObj, "");
        this.setMaterial(false);
    }
    /**时间 */
    time(ratio) {
        let script = this.gameObject.getScriptByName("SpikesSideMoveComp");
        if (script) {
            let s = script;
            s.vt = this.posV * ratio;
        }
    }
    resetPrefab() {
        if (this["newLevel"]) {
            this.originPos = null;
        }
        this.initTrap();
    }
    initTrap() {
        super.initTrap();
        this.stopSpacing();
        // 预制件位置
        if (!this.originPos && this['newLevel']) {
            this.originPos = this.gameObject.worldTransform.position;
            this['newLevel'] = false;
        }
        if (this.originPos) {
            this.gameObject.worldTransform.position = this.originPos;
        }
        // 恢复尖刺位置
        this.gameObject.getChildByName('spikes').localTransform.position = (this.pos);
        // 恢复材质
        this.setMaterial(true);
        this.isReality = false;
        const objs = this.gameObject.getChildByName(this.getTrapObjName()).getChildren();
        for (let i = 0; i < objs.length; i++) {
            const obj = objs[i];
            obj.setVisibility(mw.PropertyStatus.FromParent);
            obj.setCollision(mw.PropertyStatus.FromParent);
        }
    }
    destroyTrap(name) {
        const objs = this.gameObject.getChildByName(this.getTrapObjName()).getChildren();
        for (let i = 0; i < objs.length; i++) {
            const obj = objs[i];
            if (obj.name === name) {
                obj.setVisibility(mw.PropertyStatus.Off);
                obj.setCollision(mw.PropertyStatus.Off);
                obj.tag = "";
                this.changeObjTagAndCollision(obj, '');
                break;
            }
        }
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return 'spikes';
    }
    getTrapObjNameTwo() {
        return '';
    }
    getScaleObjName() {
        return '';
    }
    getScaleObjNameDown() {
        return '';
    }
    // =====================================================================
    // 位置移动
    spacing(moveDis) {
        const start = this.gameObject.worldTransform.position;
        this.tween = new mw.Tween({ y: start.y })
            .to({ y: moveDis }, 1000)
            .onUpdate(o => {
            this.gameObject.worldTransform.position = new mw.Vector(start.x, o.y, start.z);
        })
            .onComplete(() => {
            this.tween = null;
        })
            .start();
    }
    // 停止移动
    stopSpacing() {
        if (this.tween) {
            this.tween.stop();
            this.tween = null;
        }
    }
    setMaterial(isDead) {
        const spikes = this.gameObject.getChildByName('spikes');
        // spikes三根刺
        const spikesUnder = spikes.getChildren();
        // spikesUnder其中一根刺spike_1;
        // 虚拟
        spikesUnder.forEach((temp) => {
            if (!isDead && Math.random() > 0.5) {
                this.changeObjTagAndCollision(temp, "");
                // 改整条的材质
                let items = temp.getChildren();
                items.forEach((item) => {
                    item.setMaterial(this.materialChange);
                });
            }
        });
        // 初始化        
        if (isDead) {
            spikesUnder.forEach((temp) => {
                temp.tag = "";
                let items = temp.getChildren();
                items.forEach((item) => {
                    item.setMaterial(this.materialPre);
                });
            });
        }
    }
}

var foreign67 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpikesSideTrap
});

class SpikeTrapSkill extends TrapBase {
    getTrapObjNameTwo() {
        return null;
    }
    getScaleObjName() {
        return null;
    }
    getScaleObjNameDown() {
        return null;
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "Spikes";
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    // 力量球摧毁机关，只摧毁部件
    destroyTrap(name) {
        let destroyObj = this.trapObj.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }
    }
    //  整个机关摧毁
    destroyPrefab() {
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.changeObjTagAndCollision(this.trapObj, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
                obj.setVisibility(mw.PropertyStatus.FromParent);
            }
        });
    }
    resetPrefab() {
        this.trapObj.localTransform.position = (new mw.Vector(0, -240, -50));
        this.initTrap();
    }
    moving(ifMove, ratio) {
        let scriptPos = this.gameObject.getScriptByName("SpikeTrapSynPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.stayTime = ratio * 1000;
            scriptTempPos.vt = 0.7;
            scriptTempPos.useUpdate = ifMove;
        }
    }
    /**
     * 机关拉伸  改机关不需要拉伸
     */
    space() {
        // this.timeBroadenObj(this.scaleObj, this.worldTransform.scale);
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptPos = this.gameObject.getScriptByName("SpikeTrapSynPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            // 1 表示原来的速度 (1-ratio)表示增加的停留时间
            scriptTempPos.stayTime = scriptTempPos.stayTime / ratio;
        }
    }
    /**
     * 可以被摧毁
     */
    power() {
        if (!this.isReality)
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        this.isReality = true;
        // this.changeObjTag(this.trapObj, "");
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            if (Math.random() > 0.5) {
                let temp = ele;
                temp.tag = "";
                temp.setCollision(mw.CollisionStatus.QueryOnly);
                ele.setMaterial(this.materialChange);
            }
        });
    }
    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        let resetVisibeTrap = TrapUtil.getAllChild(this.trapObj);
        resetVisibeTrap.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        });
        this.isReality = false;
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre);
        });
    }
}

var foreign68 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpikeTrapSkill
});

let SpikeTrapSynPos = class SpikeTrapSynPos extends PositionTemp$1 {
    onStart() {
        this.ros = "z";
        this.max = -20;
        this.min = -170;
        this.dir = -1;
        this.vt = 0.1;
        this.trapName = "Spikes";
        this.stayTime = 2000;
        super.onStart();
    }
};
SpikeTrapSynPos = __decorate([
    Component
], SpikeTrapSynPos);
var SpikeTrapSynPos$1 = SpikeTrapSynPos;

var foreign69 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpikeTrapSynPos$1
});

let SpikesTriplePos = class SpikesTriplePos extends PositionTemp$1 {
    onStart() {
        this.ros = "z";
        this.max = -20;
        this.min = -180;
        this.dir = 1;
        this.vt = 0.1;
        this.trapName = "spikesTrapObj";
        this.stayTime = 1000;
        super.onStart();
    }
};
SpikesTriplePos = __decorate([
    Component
], SpikesTriplePos);
var SpikesTriplePos$1 = SpikesTriplePos;

var foreign70 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpikesTriplePos$1
});

class SpikesTripleSkill extends TrapBase {
    getTrapObjNameTwo() {
        return null;
    }
    getScaleObjName() {
        return null;
    }
    getScaleObjNameDown() {
        return null;
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "spikesTrapObj";
    }
    onStart() {
        super.onStart();
        // 设置死亡标签
        this.initTrap();
    }
    // 力量球摧毁机关，只摧毁部件
    destroyTrap(name) {
        let destroyObj = this.trapObj.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }
    }
    //  整个机关摧毁
    destroyPrefab() {
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.changeObjTagAndCollision(this.trapObj, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
                obj.setVisibility(mw.PropertyStatus.FromParent);
            }
        });
    }
    moving(ifMove, ratio) {
        let scriptPos = this.gameObject.getScriptByName("SpikesTriplePos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.stayTime = ratio * 1000;
            scriptTempPos.vt = 0.7;
            scriptTempPos.useUpdate = ifMove;
        }
        // let allChild = TrapUtil.getAllChild(this.trapObj);
        // allChild.forEach((obj) => {
        //     if (obj instanceof mw.GameObject) {
        //         obj.setCollision(mw.CollisionStatus.QueryOnly)
        //     }
        // })
    }
    resetPrefab() {
        this.trapObj.localTransform.position = (new mw.Vector(0, 0, -50));
        this.initTrap();
    }
    /**
     * 机关拉伸  改机关不需要拉伸
     */
    space() {
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptPos = this.gameObject.getScriptByName("SpikesTriplePos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.stayTime = scriptTempPos.stayTime / 0.1;
        }
    }
    /**
     * 可以被摧毁
     */
    power() {
        if (!this.isReality) {
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
        }
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        this.isReality = true;
        // this.changeObjTag(this.trapObj, "");
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            if (Math.random() > 0.5) {
                let temp = ele;
                temp.tag = "";
                temp.setCollision(mw.CollisionStatus.QueryOnly);
                ele.setMaterial(this.materialChange);
            }
        });
    }
    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        let resetVisibeTrap = TrapUtil.getAllChild(this.trapObj);
        resetVisibeTrap.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        });
        this.isReality = false;
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre);
        });
    }
}

var foreign71 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpikesTripleSkill
});

let SpileRotation$1 = class SpileRotation extends RotationTemp {
    onStart() {
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
};

var foreign72 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpileRotation$1
});

class SpileRotation extends RotationTemp {
    onStart() {
        this.type = 1;
        this.max = 180;
        this.min = 90;
        this.ros = "x";
        // to do 这个14太小了就不能运行了
        this.vt = 1;
        this.stayTime = 1000;
        this.trapName = "boardLeft";
        super.onStart();
        this.useUpdate = true;
    }
}

var foreign73 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpileRotation
});

class SpikeSkillTrap extends TrapBase {
    constructor() {
        super(...arguments);
        this.realityItems = [];
        this.rosUpV = 1;
        this.rosDownV = 1;
    }
    canDestroy() {
        return false;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "board";
    }
    getTrapObjNameTwo() {
        return "boardLeft";
    }
    getScaleObjName() {
        return "";
    }
    getScaleObjNameDown() {
        return "";
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    /**
     * 不被了力量宝石摧毁，不需要写内容
     * @param name
     */
    destroyTrap(name) {
    }
    destroyPrefab() {
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.changeObjTagAndCollision(this.trapObj, "");
        this.changeObjTagAndCollision(this.trapObjtwo, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
                obj.setVisibility(mw.PropertyStatus.FromParent);
            }
        });
        let allChildTwo = TrapUtil.getAllChild(this.trapObjtwo);
        allChildTwo.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
                obj.setVisibility(mw.PropertyStatus.FromParent);
            }
        });
    }
    resetPrefab() {
        clearInterval(this.clock);
        this.gameObject.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }
    moving(ifMove, ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("SpikeRotation");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * this.rosUpV;
            scriptTempRos.useUpdate = ifMove;
        }
        let scriptRosDown = this.gameObject.getScriptByName("SpikeRotationLeft");
        if (scriptRosDown) {
            let scriptTempRosDown = scriptRosDown;
            scriptTempRosDown.vt = ratio * this.rosDownV;
            scriptTempRosDown.useUpdate = ifMove;
        }
    }
    space(worldScale) {
        // // let tempScale = (worldScale - 1) / 2;
        // this.clock = TrapUtil.scaleGameObject(this.gameObject, worldScale, this.scaleTime);
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("SpikeRotation");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.stayTime = scriptTempRos.stayTime / ratio;
        }
        let scriptRosDown = this.gameObject.getScriptByName("SpikeRotationLeft");
        if (scriptRosDown) {
            let scriptTempRosDown = scriptRosDown;
            scriptTempRosDown.stayTime = scriptTempRosDown.stayTime / ratio;
        }
    }
    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        this.isReality = false;
        // 初始化位置
        this.trapObj.localTransform.rotation = (new mw.Rotation(110, 0, -180));
        this.trapObjtwo.localTransform.rotation = (new mw.Rotation(110, 0, -180));
        let resetVisibeTrap = TrapUtil.getAllChild(this.trapObj);
        resetVisibeTrap.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        });
        let resetVisibeTrapTemp = TrapUtil.getAllChild(this.trapObjtwo);
        resetVisibeTrapTemp.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        });
    }
}
__decorate([
    mw.Property({ displayName: "上方旋转初始速度" })
], SpikeSkillTrap.prototype, "rosUpV", void 0);
__decorate([
    mw.Property({ displayName: "下方旋转初始速度" })
], SpikeSkillTrap.prototype, "rosDownV", void 0);

var foreign74 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpikeSkillTrap
});

class StickThirdRos extends RotationTemp {
    onStart() {
        this.type = 1;
        this.max = 180;
        this.min = 0;
        this.ros = "x";
        this.vt = 1;
        this.stayTime = 1000;
        super.onStart();
        this.useUpdate = true;
    }
}

var foreign75 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: StickThirdRos
});

let StickSingle$1 = class StickSingle extends TrapBase {
    getTrapObjNameTwo() {
        return null;
    }
    getScaleObjNameDown() {
        return "rosObj";
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "rosObj";
    }
    getScaleObjName() {
        return "rosObj";
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    /**
     * 被力量宝石摧毁
     * @param name 被摧毁机关单个的name
     */
    destroyTrap(name) {
        let destroyObj = this.trapObj.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }
    }
    /**
     * 被响指摧毁
     */
    destroyPrefab() {
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.changeObjTagAndCollision(this.trapObj, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
                obj.setVisibility(mw.PropertyStatus.FromParent);
            }
        });
    }
    resetPrefab() {
        // will todo
        clearInterval(this.clock);
        this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }
    moving(ifMove, ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickThirdRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove;
        }
    }
    /**
     * 机关拉伸
     */
    space(worldScale) {
        let tempScale = (worldScale - 1) / 2;
        this.clock = TrapUtil.scaleGameObject(this.scaleObj, tempScale, this.scaleTime, "y");
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickThirdRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = scriptTempRos.vt * ratio;
        }
    }
    /**
     * 可以被摧毁
     */
    power() {
        if (!this.isReality) {
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
        }
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        // 修改标签和碰撞
        this.isReality = true;
        this.changeObjTagAndCollision(this.trapObj, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
            }
        });
        // 修改材质
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialChange);
        });
    }
    /**
     * 初始化机关
     */
    initTrap() {
        this.isReality = false;
        super.initTrap();
        let resetVisibeTrap = TrapUtil.getAllChild(this.trapObj);
        resetVisibeTrap.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        });
        // 还原材质
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre);
        });
    }
};

var foreign76 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: StickSingle$1
});

let StickDoubleRos = class StickDoubleRos extends RotationTemp {
    onStart() {
        this.ros = "z";
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 1;
        this.type = 2;
        this.trapName = "StickUp";
        this.stayTime = 1000;
        super.onStart();
    }
};
StickDoubleRos = __decorate([
    Component
], StickDoubleRos);
var StickDoubleRos$1 = StickDoubleRos;

var foreign77 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: StickDoubleRos$1
});

let StickDoubleRosDown = class StickDoubleRosDown extends RotationTemp {
    onStart() {
        this.ros = "z";
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = -1;
        this.type = 2;
        this.trapName = "StickDown";
        this.stayTime = 1000;
        super.onStart();
    }
};
StickDoubleRosDown = __decorate([
    Component
], StickDoubleRosDown);
var StickDoubleRosDown$1 = StickDoubleRosDown;

var foreign78 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: StickDoubleRosDown$1
});

class stickDouble extends TrapBase {
    constructor() {
        super(...arguments);
        this.rosUpV = 1;
        this.rosDownV = 1;
        this.realityItems = [];
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "StickUp";
    }
    getTrapObjNameTwo() {
        return "StickDown";
    }
    getScaleObjName() {
        return "StickUp";
    }
    getScaleObjNameDown() {
        return "StickDown";
    }
    onStart() {
        super.onStart();
        // 设置死亡标签
        this.initTrap();
    }
    destroyTrap(name) {
        let destroyObj = this.trapObj.getChildByName(name);
        let destroyObjTemp = this.trapObjtwo.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }
        else if (destroyObjTemp) {
            destroyObjTemp.setVisibility(mw.PropertyStatus.Off);
            destroyObjTemp.tag = "";
            destroyObjTemp.setCollision(mw.PropertyStatus.Off);
        }
    }
    destroyPrefab() {
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.changeObjTagAndCollision(this.trapObj, "");
        this.changeObjTagAndCollision(this.trapObjtwo, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
                obj.setVisibility(mw.PropertyStatus.FromParent);
            }
        });
        let allChildTwo = TrapUtil.getAllChild(this.trapObjtwo);
        allChildTwo.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
                obj.setVisibility(mw.PropertyStatus.FromParent);
            }
        });
    }
    resetPrefab() {
        clearInterval(this.clock);
        clearInterval(this.clockUp);
        this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.trapObjtwo.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }
    moving(ifMove, ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickDoubleRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * this.rosUpV;
            scriptTempRos.useUpdate = ifMove;
        }
        let scriptRosDown = this.gameObject.getScriptByName("StickDoubleRosDown");
        if (scriptRosDown) {
            let scriptTempRosDown = scriptRosDown;
            scriptTempRosDown.vt = ratio * this.rosDownV;
            scriptTempRosDown.useUpdate = ifMove;
        }
    }
    space(worldScale) {
        let tempScale = (worldScale - 1) / 2;
        this.clock = TrapUtil.scaleGameObject(this.scaleObj, tempScale, this.scaleTime, "y");
        this.clockUp = TrapUtil.scaleGameObject(this.scaleObjTwo, tempScale, this.scaleTime, "y");
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickDoubleRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * scriptTempRos.vt;
        }
        let scriptRosDown = this.gameObject.getScriptByName("StickDoubleRosDown");
        if (scriptRosDown) {
            let scriptTempRosDown = scriptRosDown;
            scriptTempRosDown.vt = ratio * scriptTempRosDown.vt;
        }
    }
    /**
     * 可以被摧毁
     */
    power() {
        if (!this.isReality) {
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
            this.changeObjTagAndCollision(this.trapObjtwo, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
        }
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        this.isReality = true;
        let materialObjs = this.trapObj.getChildren();
        let materialObjsDown = this.trapObjtwo.getChildren();
        this.realityItems = materialObjs.concat(materialObjsDown);
        this.realityItems.forEach((ele) => {
            if (Math.random() > 0.5) {
                let temp = ele;
                temp.tag = "";
                temp.setCollision(mw.CollisionStatus.Off);
                ele.setMaterial(this.materialChange);
            }
        });
    }
    /**
     * 初始化机关
     */
    initTrap() {
        this.isReality = false;
        super.initTrap();
        let resetVisibeTrap = TrapUtil.getAllChild(this.trapObj);
        resetVisibeTrap.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        });
        let resetVisibeTrapTemp = TrapUtil.getAllChild(this.trapObjtwo);
        resetVisibeTrapTemp.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        });
        if (this.realityItems.length > 0) {
            this.realityItems.forEach((ele) => {
                ele.setMaterial(this.materialPre);
            });
            this.realityItems = [];
        }
    }
}
__decorate([
    mw.Property({ displayName: "上方旋转初始速度" })
], stickDouble.prototype, "rosUpV", void 0);
__decorate([
    mw.Property({ displayName: "下方旋转初始速度" })
], stickDouble.prototype, "rosDownV", void 0);

var foreign79 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: stickDouble
});

let StickDoubleTwoRos = class StickDoubleTwoRos extends RotationTemp {
    onStart() {
        this.ros = "z";
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 1;
        this.type = 2;
        this.trapName = "StickUp";
        this.stayTime = 1000;
        super.onStart();
    }
};
StickDoubleTwoRos = __decorate([
    Component
], StickDoubleTwoRos);
var StickDoubleTwoRos$1 = StickDoubleTwoRos;

var foreign80 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: StickDoubleTwoRos$1
});

let StickDoubleTwoRosDown = class StickDoubleTwoRosDown extends RotationTemp {
    onStart() {
        this.ros = "z";
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = -1;
        this.type = 2;
        this.trapName = "StickDown";
        this.stayTime = 1000;
        super.onStart();
    }
};
StickDoubleTwoRosDown = __decorate([
    Component
], StickDoubleTwoRosDown);
var StickDoubleTwoRosDown$1 = StickDoubleTwoRosDown;

var foreign81 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: StickDoubleTwoRosDown$1
});

class stickDouble2 extends TrapBase {
    constructor() {
        super(...arguments);
        this.realityItems = [];
        this.rosUpV = 1;
        this.rosDownV = 1;
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "StickUp";
    }
    getTrapObjNameTwo() {
        return "StickDown";
    }
    getScaleObjName() {
        return "StickUp";
    }
    getScaleObjNameDown() {
        return "StickDown";
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    destroyTrap(name) {
        let destroyObj = this.trapObj.getChildByName(name);
        let destroyObjTemp = this.trapObjtwo.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }
        else if (destroyObjTemp) {
            destroyObjTemp.setVisibility(mw.PropertyStatus.Off);
            destroyObjTemp.tag = "";
            destroyObjTemp.setCollision(mw.PropertyStatus.Off);
        }
    }
    destroyPrefab() {
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.changeObjTagAndCollision(this.trapObj, "");
        this.changeObjTagAndCollision(this.trapObjtwo, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
                obj.setVisibility(mw.PropertyStatus.FromParent);
            }
        });
        let allChildTwo = TrapUtil.getAllChild(this.trapObjtwo);
        allChildTwo.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
                obj.setVisibility(mw.PropertyStatus.FromParent);
            }
        });
    }
    resetPrefab() {
        // will todo
        // this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        clearInterval(this.clock);
        clearInterval(this.clockUp);
        this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.scaleObjTwo.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }
    moving(ifMove, ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickDoubleTwoRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * this.rosUpV;
            scriptTempRos.useUpdate = ifMove;
        }
        let scriptRosDown = this.gameObject.getScriptByName("StickDoubleTwoRosDown");
        if (scriptRosDown) {
            let scriptTempRosDown = scriptRosDown;
            scriptTempRosDown.vt = ratio * this.rosDownV;
            scriptTempRosDown.useUpdate = ifMove;
        }
    }
    space(worldScale) {
        let tempScale = (worldScale - 1) / 2;
        this.clock = TrapUtil.scaleGameObject(this.scaleObj, tempScale, this.scaleTime, "y");
        this.clockUp = TrapUtil.scaleGameObject(this.scaleObjTwo, tempScale, this.scaleTime, "y");
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickDoubleTwoRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * scriptTempRos.vt;
        }
        let scriptRosDown = this.gameObject.getScriptByName("StickDoubleTwoRosDown");
        if (scriptRosDown) {
            let scriptTempRosDown = scriptRosDown;
            scriptTempRosDown.vt = ratio * scriptTempRosDown.vt;
        }
    }
    /**
     * 可以被摧毁
     */
    power() {
        if (!this.isReality) {
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
            this.changeObjTagAndCollision(this.trapObjtwo, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
        }
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        // this.changeObjTagAndCollision(this.trapObj, "");
        // this.changeObjTagAndCollision(this.trapObjtwo, "");
        this.isReality = true;
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
            }
        });
        let allChildTwo = TrapUtil.getAllChild(this.trapObjtwo);
        allChildTwo.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
            }
        });
        let materialObjs = this.trapObj.getChildren();
        let materialObjsDown = this.trapObjtwo.getChildren();
        this.realityItems = materialObjs.concat(materialObjsDown);
        this.realityItems.forEach((ele) => {
            if (Math.random() > 0.5) {
                let temp = ele;
                temp.tag = "";
                temp.setCollision(mw.CollisionStatus.Off);
                ele.setMaterial(this.materialChange);
            }
        });
    }
    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        this.isReality = false;
        let resetVisibeTrap = TrapUtil.getAllChild(this.trapObj);
        resetVisibeTrap.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        });
        let resetVisibeTrapTemp = TrapUtil.getAllChild(this.trapObjtwo);
        resetVisibeTrapTemp.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        });
        if (this.realityItems.length > 0) {
            this.realityItems.forEach((ele) => {
                ele.setMaterial(this.materialPre);
            });
            this.realityItems = [];
        }
        //
    }
}
__decorate([
    mw.Property({ displayName: "上方旋转初始速度" })
], stickDouble2.prototype, "rosUpV", void 0);
__decorate([
    mw.Property({ displayName: "下方旋转初始速度" })
], stickDouble2.prototype, "rosDownV", void 0);

var foreign82 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: stickDouble2
});

class StickSingle extends TrapBase {
    getTrapObjNameTwo() {
        return null;
    }
    getScaleObjNameDown() {
        return null;
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "stickObj";
    }
    getScaleObjName() {
        return "stickObj";
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    destroyTrap(name) {
        let destroyObj = this.trapObj.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }
    }
    destroyPrefab() {
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.changeObjTagAndCollision(this.trapObj, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
                obj.setVisibility(mw.PropertyStatus.FromParent);
            }
        });
    }
    resetPrefab() {
        // will todo
        clearInterval(this.clock);
        this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }
    moving(ifMove, ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickSingleRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove;
        }
    }
    /**
     * 机关拉伸  改机关不需要拉伸
     */
    space(worldScale) {
        let tempScale = (worldScale - 1) / 2;
        this.clock = TrapUtil.scaleGameObject(this.scaleObj, tempScale, this.scaleTime, "y");
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickSingleRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = scriptTempRos.vt * ratio;
        }
    }
    /**
     * 可以被摧毁
     */
    power() {
        if (!this.isReality) {
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
        }
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        // 修改标签和碰撞
        this.isReality = true;
        this.changeObjTagAndCollision(this.trapObj, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
            }
        });
        // 修改材质
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialChange);
        });
    }
    /**
     * 初始化机关
     */
    initTrap() {
        this.isReality = false;
        super.initTrap();
        let resetVisibeTrap = TrapUtil.getAllChild(this.trapObj);
        resetVisibeTrap.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        });
        // 还原材质
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre);
        });
    }
}

var foreign83 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: StickSingle
});

let StickSingleRos$2 = class StickSingleRos extends RotationTemp {
    onStart() {
        this.ros = "z";
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 1;
        this.type = 2;
        this.trapName = "stickObj";
        this.stayTime = 1000;
        super.onStart();
    }
};
StickSingleRos$2 = __decorate([
    Component
], StickSingleRos$2);
var StickSingleRos$3 = StickSingleRos$2;

var foreign84 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: StickSingleRos$3
});

let StickSingleRos = class StickSingleRos extends RotationTemp {
    onStart() {
        this.ros = "z";
        this.max = 210;
        this.min = -210;
        this.dir = 1;
        this.vt = 1;
        this.type = 2;
        this.trapName = "stickObj";
        this.stayTime = 1000;
        super.onStart();
    }
};
StickSingleRos = __decorate([
    Component
], StickSingleRos);
var StickSingleRos$1 = StickSingleRos;

var foreign85 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: StickSingleRos$1
});

class StickTrapSkill extends TrapBase {
    getTrapObjNameTwo() {
        return null;
    }
    getScaleObjNameDown() {
        return null;
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "stickObj";
    }
    getScaleObjName() {
        return "stickObj";
    }
    onStart() {
        super.onStart();
        this.initTrap();
    }
    destroyTrap(name) {
        let destroyObj = this.trapObj.getChildByName(name);
        if (destroyObj) {
            destroyObj.setVisibility(mw.PropertyStatus.Off);
            destroyObj.tag = "";
            destroyObj.setCollision(mw.PropertyStatus.Off);
        }
    }
    destroyPrefab() {
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        this.changeObjTagAndCollision(this.trapObj, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
                obj.setVisibility(mw.PropertyStatus.FromParent);
            }
        });
    }
    moving(ifMove, ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickSingleRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove;
        }
    }
    resetPrefab() {
        // will todo\
        clearInterval(this.clock);
        this.scaleObj.worldTransform.scale = new mw.Vector(1, 1, 1);
        this.initTrap();
    }
    /**
     * 机关拉伸
     */
    space(worldScale) {
        let tempScale = (worldScale - 1) / 2;
        this.clock = TrapUtil.scaleGameObject(this.scaleObj, tempScale, this.scaleTime, "y");
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptRos = this.gameObject.getScriptByName("StickSingleRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = scriptTempRos.vt * ratio;
        }
    }
    /**
     * 可以被摧毁
     */
    power() {
        // 不是虚拟状态
        if (!this.isReality) {
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
        }
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        this.isReality = true;
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            if (Math.random() > 0.2) {
                let temp = ele;
                temp.tag = "";
                temp.setCollision(mw.CollisionStatus.Off);
                ele.setMaterial(this.materialChange);
            }
        });
    }
    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        this.isReality = false;
        let resetVisibeTrap = TrapUtil.getAllChild(this.trapObj);
        resetVisibeTrap.forEach((ele) => {
            ele.setVisibility(mw.PropertyStatus.On);
            ele.setVisibility(mw.PropertyStatus.FromParent);
        });
        let materialObjs = this.trapObj.getChildren();
        materialObjs.forEach((ele) => {
            ele.setMaterial(this.materialPre);
        });
    }
}

var foreign86 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: StickTrapSkill
});

let WolfToothPos = class WolfToothPos extends PositionTemp$1 {
    onStart() {
        this.ros = "y";
        this.max = 260;
        this.min = -260;
        this.dir = 1;
        this.vt = 0.1;
        this.trapName = "Cylinder";
        this.stayTime = 0;
        super.onStart();
    }
};
WolfToothPos = __decorate([
    Component
], WolfToothPos);
var WolfToothPos$1 = WolfToothPos;

var foreign87 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: WolfToothPos$1
});

let WolfToothRos = class WolfToothRos extends RotationTemp {
    onStart() {
        this.ros = "z";
        this.max = 210;
        this.min = -260;
        this.dir = 1;
        this.type = 2;
        this.trapName = "Cylinder";
        this.stayTime = 1000;
        if (!this.useUpdate) {
            this.vt = 1;
        }
        super.onStart();
    }
};
WolfToothRos = __decorate([
    Component
], WolfToothRos);
var WolfToothRos$1 = WolfToothRos;

var foreign88 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: WolfToothRos$1
});

class wolfTrapSkill extends TrapBase {
    getTrapObjNameTwo() {
        return null;
    }
    getScaleObjNameDown() {
        return null;
    }
    canDestroy() {
        return true;
    }
    isCollisionDead() {
        return true;
    }
    getTrapObjName() {
        return "Cylinder";
    }
    getScaleObjName() {
        return "Track";
    }
    onStart() {
        super.onStart();
        // 设置死亡标签
        this.originPos = this.trapObj.localTransform.position;
        this.initTrap();
    }
    destroyTrap() {
        super.destroyPrefab();
    }
    resetPrefab() {
        // will todo
        let scriptPos = this.gameObject.getScriptByName("WolfToothPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.dir = 1;
        }
        clearInterval(this.clock);
        this.scaleObj.worldTransform.scale = new mw.Vector(6, 1, 0.1);
        this.initTrap();
    }
    moving(ifMove, ratio) {
        //变慢
        let scriptPos = this.gameObject.getScriptByName("WolfToothPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.vt = ratio * this.posV;
            scriptTempPos.max = 260;
            scriptTempPos.min = -260;
            scriptTempPos.useUpdate = ifMove;
        }
        let scriptRos = this.gameObject.getScriptByName("WolfToothRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * this.rosV;
            scriptTempRos.useUpdate = ifMove;
        }
    }
    /**
     * 机关拉伸
     */
    space(worldScale) {
        this.clock = TrapUtil.scaleGameObject(this.scaleObj, worldScale, this.scaleTime, "x");
        let scriptPos = this.gameObject.getScriptByName("WolfToothPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.max = scriptTempPos.max * worldScale + 60 * (worldScale - 1);
            scriptTempPos.min = scriptTempPos.min * worldScale - 60 * (worldScale - 1);
        }
    }
    /**
     * 机关停止
     */
    time(ratio) {
        //变慢
        let scriptPos = this.gameObject.getScriptByName("WolfToothPos");
        if (scriptPos) {
            let scriptTempPos = scriptPos;
            scriptTempPos.vt = ratio * this.posV;
        }
        let scriptRos = this.gameObject.getScriptByName("WolfToothRos");
        if (scriptRos) {
            let scriptTempRos = scriptRos;
            scriptTempRos.vt = ratio * this.rosV;
        }
    }
    /**
     * 可以被摧毁
     */
    power() {
        if (!this.isReality)
            this.changeObjTagAndCollision(this.trapObj, this.deadTag + "_" + this.officeTag + this.gameObject.gameObjectId);
    }
    /**
     * 不会对玩家造成伤害
     */
    reality() {
        // 修改标签和碰撞
        this.isReality = true;
        this.changeObjTagAndCollision(this.trapObj, "");
        let allChild = TrapUtil.getAllChild(this.trapObj);
        allChild.forEach((obj) => {
            if (obj instanceof mw.GameObject) {
                obj.setCollision(mw.PropertyStatus.Off);
            }
        });
        // 修改材质
        this.trapObj.setMaterial(this.materialChange);
    }
    /**
     * 初始化机关
     */
    initTrap() {
        super.initTrap();
        this.originPos.y = 0;
        this.trapObj.localTransform.position = (this.originPos);
        this.isReality = false;
        let ifNewLevel = this["newLevel"];
        if (!this.originPos && ifNewLevel) {
            this.originPos = this.gameObject.worldTransform.position;
            this["newLevel"] = false;
        }
        this.trapObj.setMaterial(this.materialPre);
    }
}

var foreign89 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: wolfTrapSkill
});

class DoubleDoorTrapSkill extends mw.Script {
    constructor() {
        super(...arguments);
        this.worldScale = 10;
        this.skillTag = [];
        this.trigger = [];
        this.moveTime = 1000;
        this.moveLength = 300;
        this.deadInterval = [];
    }
    onStart() {
        this.scaleObj = this.gameObject.getChildByName("skillDoorDouble");
        Event.addLocalListener("skill_doorget", (inTag) => {
            if (this.skillTag.includes(inTag)) {
                this.trigger.forEach((t) => {
                    // t.enabled = (false);
                    t.setCollision(mw.CollisionStatus.Off);
                });
                this.playGetAnimation();
            }
        });
    }
    playGetAnimation() {
        this.clearAllIntervall();
        this.setDoor(false);
    }
    setDoor(show) {
        let skillDoorDouble = this.gameObject.getChildByName("skillDoorDouble");
        let left = skillDoorDouble.getChildByName("skillDoor_Left");
        let right = skillDoorDouble.getChildByName("skillDoor_Right");
        this.showSkill(left, show);
        this.showSkill(right, show);
    }
    clearAllIntervall() {
        if (this.deadInterval && this.deadInterval.length > 0) {
            for (let i = 0; i < this.deadInterval.length; i++) {
                clearInterval(this.deadInterval[i]);
            }
            this.deadInterval = [];
        }
    }
    resetPos(obj) {
        let rePos = obj.localTransform.position;
        obj.localTransform.position = (new mw.Vector(rePos.x, rePos.y, 0));
    }
    showSkill(parObj, show) {
        let ball = parObj.getChildByName("skillBall");
        let left = parObj.getChildByName("base_1");
        let right = parObj.getChildByName("base_2");
        let ui = parObj.getChildByName("skillTypeUI");
        if (show) {
            ui.setVisibility(mw.PropertyStatus.On);
            ball.setVisibility(mw.PropertyStatus.On);
            this.resetPos(left);
            this.resetPos(right);
        }
        else {
            ui.setVisibility(mw.PropertyStatus.Off);
            ball.setVisibility(mw.PropertyStatus.Off);
            let leftpos = left.worldTransform.position;
            let rightpos = right.worldTransform.position;
            let time = 0;
            let num = this.moveTime / 10;
            let single = this.moveLength / num;
            let k = setInterval(() => {
                leftpos.z -= single;
                rightpos.z -= single;
                left.worldTransform.position = leftpos;
                right.worldTransform.position = rightpos;
                time++;
                if (time >= num) {
                    clearInterval(k);
                }
            }, 10);
            this.deadInterval.push(k);
        }
    }
    setSkillType(types) {
        if (types.length < 2) {
            console.log("双重门设置异常");
        }
        else {
            if (!this.scaleObj)
                this.scaleObj = this.gameObject.getChildByName("skillDoorDouble");
            let left = types[0];
            let right = types[1];
            let leftObj = this.scaleObj.getChildByName("skillDoor_Left");
            let rightObj = this.scaleObj.getChildByName("skillDoor_Right");
            if (left && leftObj) {
                this.setSkillName(leftObj, left);
            }
            if (right && rightObj) {
                this.setSkillName(rightObj, right);
            }
        }
    }
    setSkillName(obj, type) {
        let info = type.split("_");
        let txtColor = info[0];
        let typeName = info[1];
        let ballGuid = info[2];
        let showname = info[3];
        //////////////
        let ui = obj.getChildByName("skillTypeUI");
        let tag = ui.getTargetUIWidget();
        let txt = tag.rootContent.getChildByName("mText_SkillName");
        if (txt) {
            txt.text = (showname);
            txt.setFontColorByHex(txtColor);
        }
        ui.refresh();
        let ball = obj.getChildByName("skillBall");
        ball.setMaterial(ballGuid);
        let trigger = obj.getChildByName("boxTrigger");
        if (!trigger)
            return;
        this.trigger.push(trigger);
        let tagStr = typeName + "_" + obj.gameObjectId;
        trigger.tag = tagStr;
        this.skillTag.push(tagStr);
        trigger.setCollision(mw.CollisionStatus.QueryOnly);
        // trigger.enabled = (true);
    }
    resetPrefab() {
        this.clearAllIntervall();
        this.gameObject.setVisibility(mw.PropertyStatus.On);
        this.trigger.forEach((t) => {
            // t.enabled = (true);
            t.setCollision(mw.CollisionStatus.QueryOnly);
        });
        this.setDoor(true);
    }
    ;
    destroyPrefab() {
        // this.gameObject.visibility=(mw.PropertyStatus.Off);
    }
    ;
    space() {
        // if (this.gameObject && this.scaleObj) {
        // 	this.timeBroadenObj(this.scaleObj, this.worldTransform.scale);
        // }
    }
    ;
}
__decorate([
    mw.Property({ displayName: "需要放大的倍数" })
], DoubleDoorTrapSkill.prototype, "worldScale", void 0);

var foreign90 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DoubleDoorTrapSkill
});

class SingleDoorTrapSkill extends mw.Script {
    constructor() {
        super(...arguments);
        this.worldScale = 10;
        this.skillTag = "";
        this.deadInterval = null;
        this.moveTime = 1000;
        this.moveLength = 300;
    }
    onStart() {
        this.useUpdate = true;
        Event.addLocalListener("skill_doorget", (inTag) => {
            if (this.skillTag == inTag) {
                // this.trigger.enabled = (false);
                this.trigger.setCollision(mw.CollisionStatus.Off);
                this.playGetAnimation();
            }
        });
        Event.addLocalListener('SoulMgs', (isOpen) => {
            const tag = this.gameObject.getChildByName("boxTrigger").tag;
            const tagStr = tag.split('_');
            if (tagStr[0] === 'Soul') {
                this.trigger.setCollision(isOpen ? mw.CollisionStatus.QueryOnly : mw.CollisionStatus.Off);
            }
            this.gameObject.getChildByName("boxTrigger").setVisibility(mw.PropertyStatus.Off);
        });
    }
    playGetAnimation() {
        if (this.deadInterval)
            clearInterval(this.deadInterval);
        this.showSkill(false);
    }
    resetPos(obj) {
        let rePos = obj.localTransform.position;
        obj.localTransform.position = (new mw.Vector(rePos.x, rePos.y, 0));
    }
    showSkill(show) {
        if (this.deadInterval)
            clearInterval(this.deadInterval);
        let ball = this.gameObject.getChildByName("skillBall");
        let left = this.gameObject.getChildByName("base_1");
        let right = this.gameObject.getChildByName("base_2");
        let ui = this.gameObject.getChildByName("skillTypeUI");
        if (show) {
            ui.setVisibility(mw.PropertyStatus.On);
            ball.setVisibility(mw.PropertyStatus.On);
            left.setVisibility(mw.PropertyStatus.On);
            right.setVisibility(mw.PropertyStatus.On);
            this.resetPos(left);
            this.resetPos(right);
        }
        else {
            ui.setVisibility(mw.PropertyStatus.Off);
            ball.setVisibility(mw.PropertyStatus.Off);
            let leftpos = left.worldTransform.position;
            let rightpos = right.worldTransform.position;
            let time = 0;
            let num = this.moveTime / 10;
            let single = this.moveLength / num;
            this.deadInterval = setInterval(() => {
                leftpos.z -= single;
                rightpos.z -= single;
                left.worldTransform.position = leftpos;
                right.worldTransform.position = rightpos;
                time++;
                if (time >= num) {
                    clearInterval(this.deadInterval);
                }
            }, 10);
        }
    }
    setSkillType(types) {
        this.setSkillName(this.gameObject, types[0]);
    }
    setSkillName(obj, type) {
        let info = type.split("_");
        let txtColor = info[0];
        let typeName = info[1];
        let ballGuid = info[2];
        let showname = info[3];
        //////////////
        let ui = obj.getChildByName("skillTypeUI");
        let tag = ui.getTargetUIWidget();
        let txt = tag.rootContent.getChildByName("mText_SkillName");
        if (txt) {
            txt.text = (showname);
            txt.setFontColorByHex(txtColor);
        }
        // ui.ifOcclusion = false;
        // ui.selfOcclusion = false;
        ui.refresh();
        let ball = obj.getChildByName("skillBall");
        ball.setMaterial(ballGuid);
        let trigger = obj.getChildByName("boxTrigger");
        if (!trigger)
            return;
        this.trigger = trigger;
        let tagStr = typeName + "_" + obj.gameObjectId;
        trigger.tag = tagStr;
        this.skillTag = tagStr;
        this.trigger.setCollision(mw.CollisionStatus.QueryOnly);
        // trigger.enabled = (true);
        // this.showSkill(true);
    }
    resetPrefab() {
        if (this.deadInterval)
            clearInterval(this.deadInterval);
        this.gameObject.setVisibility(mw.PropertyStatus.On);
        // this.trigger.setCollision(mw.PropertyStatus.On);
        // this.trigger.enabled = (true);
        this.trigger.setCollision(mw.CollisionStatus.QueryOnly);
        this.showSkill(true);
    }
    ;
    destroyPrefab() {
        // this.gameObject.visibility=(mw.PropertyStatus.Off);
    }
    ;
    space() {
        // 
    }
    ;
}
__decorate([
    mw.Property({ displayName: "需要放大的倍数" })
], SingleDoorTrapSkill.prototype, "worldScale", void 0);

var foreign91 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SingleDoorTrapSkill
});

class WallDoorTrapSkill extends mw.Script {
    constructor() {
        super(...arguments);
        this.worldScale = 10;
        this.skillTag = "";
        this.deadInterval = null;
        this.moveTime = 1000;
        this.moveLength = 300;
    }
    onStart() {
        // this.setWall(true)
        this.showSkill(true);
        Event.addLocalListener("skill_doorget", (inTag) => {
            if (this.skillTag == inTag) {
                // this.trigger.enabled = (false);
                this.trigger.setCollision(mw.CollisionStatus.Off);
                this.playGetAnimation();
            }
        });
    }
    playGetAnimation() {
        if (this.deadInterval)
            clearInterval(this.deadInterval);
        this.showSkill(false);
    }
    resetPos(obj) {
        let rePos = obj.localTransform.position;
        obj.localTransform.position = (new mw.Vector(rePos.x, rePos.y, 0));
    }
    showSkill(show) {
        if (this.deadInterval)
            clearInterval(this.deadInterval);
        this.setWall(show);
        let ball = this.gameObject.getChildByName("skillBall");
        let left = this.gameObject.getChildByName("base_1");
        let right = this.gameObject.getChildByName("base_2");
        let ui = this.gameObject.getChildByName("skillTypeUI");
        let wall1 = this.gameObject.getChildByName("wall_1");
        let wall2 = this.gameObject.getChildByName("wall_2");
        if (show) {
            ui.setVisibility(mw.PropertyStatus.On);
            ball.setVisibility(mw.PropertyStatus.On);
            this.resetPos(left);
            this.resetPos(right);
            this.resetPos(wall1);
            this.resetPos(wall2);
        }
        else {
            ui.setVisibility(mw.PropertyStatus.Off);
            ball.setVisibility(mw.PropertyStatus.Off);
            let leftpos = left.worldTransform.position;
            let rightpos = right.worldTransform.position;
            let wall1pos = wall1.worldTransform.position;
            let wall2pos = wall2.worldTransform.position;
            let time = 0;
            let num = this.moveTime / 10;
            let single = this.moveLength / num;
            this.deadInterval = setInterval(() => {
                leftpos.z -= single;
                rightpos.z -= single;
                wall1pos.z -= single;
                wall2pos.z -= single;
                left.worldTransform.position = leftpos;
                right.worldTransform.position = rightpos;
                wall1.worldTransform.position = wall1pos;
                wall2.worldTransform.position = wall2pos;
                time++;
                if (time >= num) {
                    clearInterval(this.deadInterval);
                }
            }, 10);
        }
    }
    setWall(show) {
        let wall1 = this.gameObject.getChildByName("wall_1");
        let wall2 = this.gameObject.getChildByName("wall_2");
        if (wall1) {
            show ? wall1.tag = "dead" : wall1.tag = "";
            show ? wall1.setCollision(mw.PropertyStatus.On) : wall1.setCollision(mw.PropertyStatus.Off);
        }
        if (wall2) {
            show ? wall2.tag = "dead" : wall2.tag = "";
            show ? wall2.setCollision(mw.PropertyStatus.On) : wall2.setCollision(mw.PropertyStatus.Off);
        }
    }
    setSkillType(types) {
        this.setSkillName(this.gameObject, types[0]);
    }
    setSkillName(obj, type) {
        let info = type.split("_");
        let txtColor = info[0];
        let typeName = info[1];
        let ballGuid = info[2];
        let showName = info[3];
        //////////////
        let ui = obj.getChildByName("skillTypeUI");
        let tag = ui.getTargetUIWidget();
        let txt = tag.rootContent.getChildByName("mText_SkillName");
        if (txt) {
            txt.text = (showName);
            txt.setFontColorByHex(txtColor);
        }
        ui.refresh();
        let ball = obj.getChildByName("skillBall");
        ball.setMaterial(ballGuid);
        let trigger = obj.getChildByName("boxTrigger");
        if (!trigger)
            return;
        this.trigger = trigger;
        let tagStr = typeName + "_" + obj.gameObjectId;
        trigger.tag = tagStr;
        this.skillTag = tagStr;
        this.trigger.setCollision(mw.CollisionStatus.QueryOnly);
    }
    resetPrefab() {
        this.gameObject.setVisibility(mw.PropertyStatus.On);
        this.trigger.setCollision(mw.CollisionStatus.QueryOnly);
        this.showSkill(true);
    }
    ;
    destroyPrefab() {
        // this.gameObject.visibility=(mw.PropertyStatus.Off);
    }
    ;
    space() {
        // 
    }
    ;
}
__decorate([
    mw.Property({ displayName: "需要放大的倍数" })
], WallDoorTrapSkill.prototype, "worldScale", void 0);

var foreign92 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: WallDoorTrapSkill
});

let SkillDoorUI_Generate = class SkillDoorUI_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.txt_SkillDoor = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        //按钮多语言
        //文本多语言
        this.initLanguage(this.txt_SkillDoor);
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/txt_SkillDoor')
], SkillDoorUI_Generate.prototype, "txt_SkillDoor", void 0);
SkillDoorUI_Generate = __decorate([
    UIBind('UI/SkillDoorUI.ui')
], SkillDoorUI_Generate);
var SkillDoorUI_Generate$1 = SkillDoorUI_Generate;

var foreign108 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SkillDoorUI_Generate$1
});

const MWModuleMap = { 
     'build': foreign0,
     'JavaScripts/config/ConfigBase': foreign1,
     'JavaScripts/config/DoorColor': foreign2,
     'JavaScripts/config/GameConfig': foreign3,
     'JavaScripts/config/GemSkill': foreign4,
     'JavaScripts/config/Global': foreign5,
     'JavaScripts/config/GuidePrefabs': foreign6,
     'JavaScripts/config/LangueConfig': foreign7,
     'JavaScripts/config/LevelSettings': foreign8,
     'JavaScripts/config/Obstacle': foreign9,
     'JavaScripts/config/Skin': foreign10,
     'JavaScripts/config/Sound': foreign11,
     'JavaScripts/config/Tips': foreign12,
     'JavaScripts/consts/ProLoadGuid': foreign13,
     'JavaScripts/GameLauncher': foreign14,
     'JavaScripts/gm/GMHUD': foreign15,
     'JavaScripts/gm/GMItem': foreign16,
     'JavaScripts/Modified027Editor/ModifiedCamera': foreign17,
     'JavaScripts/Modified027Editor/ModifiedPlayer': foreign18,
     'JavaScripts/Modified027Editor/ModifiedSpawn': foreign19,
     'JavaScripts/Modified027Editor/ModifiedStaticAPI': foreign20,
     'JavaScripts/modules/gm/GmModule': foreign21,
     'JavaScripts/modules/guide/GuideDataHelper': foreign22,
     'JavaScripts/modules/guide/GuideModuleC': foreign23,
     'JavaScripts/modules/guide/GuideModuleS': foreign24,
     'JavaScripts/modules/hall/HallDataHelper': foreign25,
     'JavaScripts/modules/hall/HallModule_C': foreign26,
     'JavaScripts/modules/hall/HallModule_S': foreign27,
     'JavaScripts/modules/level/BarrierConfig': foreign28,
     'JavaScripts/modules/level/EndTrigger': foreign29,
     'JavaScripts/modules/level/module/LevelDataHelper': foreign30,
     'JavaScripts/modules/level/module/LevelModuleC': foreign31,
     'JavaScripts/modules/level/module/LevelModuleS': foreign32,
     'JavaScripts/modules/level/SceneCreator': foreign33,
     'JavaScripts/modules/player/PlayerDataHelper': foreign34,
     'JavaScripts/modules/player/PlayerModudleS': foreign35,
     'JavaScripts/modules/player/PlayerModuleC': foreign36,
     'JavaScripts/modules/skill/SkillDataHelper': foreign37,
     'JavaScripts/modules/skill/SkillModule_C': foreign38,
     'JavaScripts/modules/skill/SkillModule_S': foreign39,
     'JavaScripts/Prefabs/Common/Script/IBarrier': foreign40,
     'JavaScripts/Prefabs/Common/Script/PositionTemp': foreign41,
     'JavaScripts/Prefabs/Common/Script/RotationTemp': foreign42,
     'JavaScripts/Prefabs/Common/Script/RotationTempMany': foreign43,
     'JavaScripts/Prefabs/Common/Script/TrapBase': foreign44,
     'JavaScripts/Prefabs/Common/Script/TrapBaseMany': foreign45,
     'JavaScripts/Prefabs/Common/Script/TrapUtil': foreign46,
     'JavaScripts/Prefabs/PF_Arched/Script/modules/trap/WallTrapSkill': foreign47,
     'JavaScripts/Prefabs/PF_Capsule/Script/modules/trap/CapsuleRotateComp': foreign48,
     'JavaScripts/Prefabs/PF_Capsule/Script/modules/trap/CapsuleTrap': foreign49,
     'JavaScripts/Prefabs/PF_CircularHole/Script/modules/trap/CircularHole': foreign50,
     'JavaScripts/Prefabs/PF_CircularSaw/Script/modules/trap/circularSaw/CircularSawPos': foreign51,
     'JavaScripts/Prefabs/PF_CircularSaw/Script/modules/trap/circularSaw/CircularSawRos': foreign52,
     'JavaScripts/Prefabs/PF_CircularSaw/Script/modules/trap/CircularTrapSkill': foreign53,
     'JavaScripts/Prefabs/PF_CircularSawStand/Script/modules/trap/cicularStand/CicularStandRos': foreign54,
     'JavaScripts/Prefabs/PF_CircularSawStand/Script/modules/trap/cicularStand/CicularStandTrapSkill': foreign55,
     'JavaScripts/Prefabs/PF_CircularSaw_Still/Script/modules/trap/circularSawStill.ts/CircularSawStillRos': foreign56,
     'JavaScripts/Prefabs/PF_CircularSaw_Still/Script/modules/trap/CircularSingle': foreign57,
     'JavaScripts/Prefabs/PF_Fan_Rotate/Script/modules/trap/fanRotate/FanRotateRos': foreign58,
     'JavaScripts/Prefabs/PF_Fan_Rotate/Script/modules/trap/FanTrapSkill': foreign59,
     'JavaScripts/Prefabs/PF_NeedleBoard/Script/modules/trap/needleBoard/NeedleBoard': foreign60,
     'JavaScripts/Prefabs/PF_NeedleBoard/Script/modules/trap/needleBoard/NeedleBoardPos': foreign61,
     'JavaScripts/Prefabs/PF_NeedleCube/Script/modules/trap/NeedleBoardCube': foreign62,
     'JavaScripts/Prefabs/PF_Spikes_Asyn/Script/modules/trap/spikesAsyn/SpikesAsynPos': foreign63,
     'JavaScripts/Prefabs/PF_Spikes_Asyn/Script/modules/trap/spikesAsyn/SpikesAsynPosLeft': foreign64,
     'JavaScripts/Prefabs/PF_Spikes_Asyn/Script/modules/trap/SpikesTrapUpAndDown': foreign65,
     'JavaScripts/Prefabs/PF_Spikes_Side/Script/modules/trap/SpikesSideMoveComp': foreign66,
     'JavaScripts/Prefabs/PF_Spikes_Side/Script/modules/trap/SpikesSideTrap': foreign67,
     'JavaScripts/Prefabs/PF_Spikes_Syn/Script/modules/trap/SpikeTrapSkill': foreign68,
     'JavaScripts/Prefabs/PF_Spikes_Syn/Script/modules/trap/spikeTrapSyn/SpikeTrapSynPos': foreign69,
     'JavaScripts/Prefabs/PF_Spikes_Triple/Script/modules/trap/spikesTriple/SpikesTriplePos': foreign70,
     'JavaScripts/Prefabs/PF_Spikes_Triple/Script/modules/trap/spikesTriple/SpikesTripleSkill': foreign71,
     'JavaScripts/Prefabs/PF_Spike_Rotated/Script/modules/trap/spikeRotation/SpikeRotation': foreign72,
     'JavaScripts/Prefabs/PF_Spike_Rotated/Script/modules/trap/spikeRotation/SpikeRotationLeft': foreign73,
     'JavaScripts/Prefabs/PF_Spike_Rotated/Script/modules/trap/spikeRotation/SpikeSkillTrap': foreign74,
     'JavaScripts/Prefabs/PF_Stick_3/Script/modules/trap/stickThird/StickThirdRos': foreign75,
     'JavaScripts/Prefabs/PF_Stick_3/Script/modules/trap/stickThird/StickThirdTrapSkill': foreign76,
     'JavaScripts/Prefabs/PF_Stick_Double/Script/modules/trap/stickDouble/StickDoubleRos': foreign77,
     'JavaScripts/Prefabs/PF_Stick_Double/Script/modules/trap/stickDouble/StickDoubleRosDown': foreign78,
     'JavaScripts/Prefabs/PF_Stick_Double/Script/modules/trap/stickDouble/StickDoubleSkill': foreign79,
     'JavaScripts/Prefabs/PF_Stick_Double2/Script/modules/trap/stickDoubleTwo/StickDoubleTwoRos': foreign80,
     'JavaScripts/Prefabs/PF_Stick_Double2/Script/modules/trap/stickDoubleTwo/StickDoubleTwoRosDown': foreign81,
     'JavaScripts/Prefabs/PF_Stick_Double2/Script/modules/trap/stickDoubleTwo/StickDoubleTwoSkill': foreign82,
     'JavaScripts/Prefabs/PF_Stick_Single/Script/modules/trap/issuetrap/StickSingle': foreign83,
     'JavaScripts/Prefabs/PF_Stick_Single/Script/modules/trap/stickSingle/StickSingleRos': foreign84,
     'JavaScripts/Prefabs/PF_Stick_SingleTwo/Script/modules/trap/stickSingle/StickSingleRos': foreign85,
     'JavaScripts/Prefabs/PF_Stick_SingleTwo/Script/modules/trap/StickTrapSkill': foreign86,
     'JavaScripts/Prefabs/PF_WolfTooth_L2R/Script/modules/trap/wolfTooth/WolfToothPos': foreign87,
     'JavaScripts/Prefabs/PF_WolfTooth_L2R/Script/modules/trap/wolfTooth/WolfToothRos': foreign88,
     'JavaScripts/Prefabs/PF_WolfTooth_L2R/Script/modules/trap/wolfTooth/WolfToothSkill': foreign89,
     'JavaScripts/Prefabs/skillDoorDouble/Script/modules/trap/DoorTrapSkill': foreign90,
     'JavaScripts/Prefabs/skillDoorPre/Script/modules/trap/DoorTrapSkill': foreign91,
     'JavaScripts/Prefabs/skillDoorWall/Script/modules/trap/DoorTrapSkill': foreign92,
     'JavaScripts/ui/EndUILose': foreign93,
     'JavaScripts/ui/EndUI_WIN': foreign94,
     'JavaScripts/ui/EnterLoading': foreign95,
     'JavaScripts/ui/HallUI': foreign96,
     'JavaScripts/ui/RewardsUI': foreign97,
     'JavaScripts/ui/SkillGetUI': foreign98,
     'JavaScripts/ui/SkillPanelUI': foreign99,
     'JavaScripts/ui/SoulUI': foreign100,
     'JavaScripts/ui-generate/EndUI_LOSE_generate': foreign101,
     'JavaScripts/ui-generate/EndUI_WIN_generate': foreign102,
     'JavaScripts/ui-generate/EnterLoading_generate': foreign103,
     'JavaScripts/ui-generate/gm/GMHUD_generate': foreign104,
     'JavaScripts/ui-generate/gm/GMItem_generate': foreign105,
     'JavaScripts/ui-generate/HallUI_generate': foreign106,
     'JavaScripts/ui-generate/RewardsUI_generate': foreign107,
     'JavaScripts/ui-generate/SkillDoorUI_generate': foreign108,
     'JavaScripts/ui-generate/SkillGetUI_generate': foreign109,
     'JavaScripts/ui-generate/SkillPanelUI_generate': foreign110,
     'JavaScripts/ui-generate/SoulUI_generate': foreign111,
     'JavaScripts/utils/SoundPlay': foreign112,
     'JavaScripts/utils/Tools': foreign113,
};

exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXMiOlsiLi4vSmF2YVNjcmlwdHMvY29uZmlnL0NvbmZpZ0Jhc2UudHMiLCIuLi9KYXZhU2NyaXB0cy9jb25maWcvRG9vckNvbG9yLnRzIiwiLi4vSmF2YVNjcmlwdHMvY29uZmlnL0dlbVNraWxsLnRzIiwiLi4vSmF2YVNjcmlwdHMvY29uZmlnL0dsb2JhbC50cyIsIi4uL0phdmFTY3JpcHRzL2NvbmZpZy9HdWlkZVByZWZhYnMudHMiLCIuLi9KYXZhU2NyaXB0cy9jb25maWcvTGFuZ3VlQ29uZmlnLnRzIiwiLi4vSmF2YVNjcmlwdHMvY29uZmlnL0xldmVsU2V0dGluZ3MudHMiLCIuLi9KYXZhU2NyaXB0cy9jb25maWcvT2JzdGFjbGUudHMiLCIuLi9KYXZhU2NyaXB0cy9jb25maWcvU2tpbi50cyIsIi4uL0phdmFTY3JpcHRzL2NvbmZpZy9Tb3VuZC50cyIsIi4uL0phdmFTY3JpcHRzL2NvbmZpZy9UaXBzLnRzIiwiLi4vSmF2YVNjcmlwdHMvY29uZmlnL0dhbWVDb25maWcudHMiLCIuLi9KYXZhU2NyaXB0cy9jb25zdHMvUHJvTG9hZEd1aWQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9XaW5kb3dzTm9FZGl0b3IvTVcvQ29udGVudC9CdWlsZFRvb2wvbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvZ3VpZGUvR3VpZGVEYXRhSGVscGVyLnRzIiwiLi4vSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRTdGF0aWNBUEkudHMiLCIuLi9KYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFNwYXduLnRzIiwiLi4vSmF2YVNjcmlwdHMvbW9kdWxlcy9za2lsbC9Ta2lsbERhdGFIZWxwZXIudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9Ta2lsbFBhbmVsVUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91dGlscy9Tb3VuZFBsYXkudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9Ta2lsbFBhbmVsVUkudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9Tb3VsVUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9Tb3VsVUkudHMiLCIuLi9KYXZhU2NyaXB0cy91dGlscy9Ub29scy50cyIsIi4uL0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkUGxheWVyLnRzIiwiLi4vSmF2YVNjcmlwdHMvbW9kdWxlcy9wbGF5ZXIvUGxheWVyTW9kdWxlQy50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvc2tpbGwvU2tpbGxNb2R1bGVfQy50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0VuZFVJX0xPU0VfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9FbmRVSUxvc2UudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9SZXdhcmRzVUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9SZXdhcmRzVUkudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9FbmRVSV9XSU5fZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9FbmRVSV9XSU4udHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9FbnRlckxvYWRpbmdfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9FbnRlckxvYWRpbmcudHMiLCIuLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2xldmVsL21vZHVsZS9MZXZlbERhdGFIZWxwZXIudHMiLCIuLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2xldmVsL1NjZW5lQ3JlYXRvci50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvbGV2ZWwvbW9kdWxlL0xldmVsTW9kdWxlQy50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1NraWxsR2V0VUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9Ta2lsbEdldFVJLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvSGFsbFVJX2dlbmVyYXRlLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWkvSGFsbFVJLnRzIiwiLi4vSmF2YVNjcmlwdHMvbW9kdWxlcy9ndWlkZS9HdWlkZU1vZHVsZUMudHMiLCIuLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2d1aWRlL0d1aWRlTW9kdWxlUy50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvaGFsbC9IYWxsRGF0YUhlbHBlci50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvaGFsbC9IYWxsTW9kdWxlX0MudHMiLCIuLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2hhbGwvSGFsbE1vZHVsZV9TLnRzIiwiLi4vSmF2YVNjcmlwdHMvbW9kdWxlcy9sZXZlbC9tb2R1bGUvTGV2ZWxNb2R1bGVTLnRzIiwiLi4vSmF2YVNjcmlwdHMvbW9kdWxlcy9wbGF5ZXIvUGxheWVyRGF0YUhlbHBlci50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvcGxheWVyL1BsYXllck1vZHVkbGVTLnRzIiwiLi4vSmF2YVNjcmlwdHMvbW9kdWxlcy9za2lsbC9Ta2lsbE1vZHVsZV9TLnRzIiwiLi4vSmF2YVNjcmlwdHMvR2FtZUxhdW5jaGVyLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvZ20vR01IVURfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy9nbS9HTUhVRC50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL2dtL0dNSXRlbV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL2dtL0dNSXRlbS50cyIsIi4uL0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkQ2FtZXJhLnRzIiwiLi4vSmF2YVNjcmlwdHMvbW9kdWxlcy9nbS9HbU1vZHVsZS50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvbGV2ZWwvRW5kVHJpZ2dlci50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvQ29tbW9uL1NjcmlwdC9Qb3NpdGlvblRlbXAudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL0NvbW1vbi9TY3JpcHQvUm90YXRpb25UZW1wLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9Db21tb24vU2NyaXB0L1JvdGF0aW9uVGVtcE1hbnkudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL0NvbW1vbi9TY3JpcHQvVHJhcFV0aWwudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL0NvbW1vbi9TY3JpcHQvVHJhcEJhc2UudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL0NvbW1vbi9TY3JpcHQvVHJhcEJhc2VNYW55LnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9BcmNoZWQvU2NyaXB0L21vZHVsZXMvdHJhcC9XYWxsVHJhcFNraWxsLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DYXBzdWxlL1NjcmlwdC9tb2R1bGVzL3RyYXAvQ2Fwc3VsZVJvdGF0ZUNvbXAudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX0NhcHN1bGUvU2NyaXB0L21vZHVsZXMvdHJhcC9DYXBzdWxlVHJhcC50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfQ2lyY3VsYXJIb2xlL1NjcmlwdC9tb2R1bGVzL3RyYXAvQ2lyY3VsYXJIb2xlLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DaXJjdWxhclNhdy9TY3JpcHQvbW9kdWxlcy90cmFwL2NpcmN1bGFyU2F3L0NpcmN1bGFyU2F3UG9zLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DaXJjdWxhclNhdy9TY3JpcHQvbW9kdWxlcy90cmFwL2NpcmN1bGFyU2F3L0NpcmN1bGFyU2F3Um9zLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DaXJjdWxhclNhdy9TY3JpcHQvbW9kdWxlcy90cmFwL0NpcmN1bGFyVHJhcFNraWxsLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DaXJjdWxhclNhd1N0YW5kL1NjcmlwdC9tb2R1bGVzL3RyYXAvY2ljdWxhclN0YW5kL0NpY3VsYXJTdGFuZFJvcy50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfQ2lyY3VsYXJTYXdTdGFuZC9TY3JpcHQvbW9kdWxlcy90cmFwL2NpY3VsYXJTdGFuZC9DaWN1bGFyU3RhbmRUcmFwU2tpbGwudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX0NpcmN1bGFyU2F3X1N0aWxsL1NjcmlwdC9tb2R1bGVzL3RyYXAvY2lyY3VsYXJTYXdTdGlsbC50cy9DaXJjdWxhclNhd1N0aWxsUm9zLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DaXJjdWxhclNhd19TdGlsbC9TY3JpcHQvbW9kdWxlcy90cmFwL0NpcmN1bGFyU2luZ2xlLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9GYW5fUm90YXRlL1NjcmlwdC9tb2R1bGVzL3RyYXAvZmFuUm90YXRlL0ZhblJvdGF0ZVJvcy50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfRmFuX1JvdGF0ZS9TY3JpcHQvbW9kdWxlcy90cmFwL0ZhblRyYXBTa2lsbC50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfTmVlZGxlQm9hcmQvU2NyaXB0L21vZHVsZXMvdHJhcC9uZWVkbGVCb2FyZC9OZWVkbGVCb2FyZC50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfTmVlZGxlQm9hcmQvU2NyaXB0L21vZHVsZXMvdHJhcC9uZWVkbGVCb2FyZC9OZWVkbGVCb2FyZFBvcy50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfTmVlZGxlQ3ViZS9TY3JpcHQvbW9kdWxlcy90cmFwL05lZWRsZUJvYXJkQ3ViZS50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VzX0FzeW4vU2NyaXB0L21vZHVsZXMvdHJhcC9zcGlrZXNBc3luL1NwaWtlc0FzeW5Qb3MudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlc19Bc3luL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3Bpa2VzQXN5bi9TcGlrZXNBc3luUG9zTGVmdC50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VzX0FzeW4vU2NyaXB0L21vZHVsZXMvdHJhcC9TcGlrZXNUcmFwVXBBbmREb3duLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TcGlrZXNfU2lkZS9TY3JpcHQvbW9kdWxlcy90cmFwL1NwaWtlc1NpZGVNb3ZlQ29tcC50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VzX1NpZGUvU2NyaXB0L21vZHVsZXMvdHJhcC9TcGlrZXNTaWRlVHJhcC50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VzX1N5bi9TY3JpcHQvbW9kdWxlcy90cmFwL1NwaWtlVHJhcFNraWxsLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TcGlrZXNfU3luL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3Bpa2VUcmFwU3luL1NwaWtlVHJhcFN5blBvcy50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VzX1RyaXBsZS9TY3JpcHQvbW9kdWxlcy90cmFwL3NwaWtlc1RyaXBsZS9TcGlrZXNUcmlwbGVQb3MudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlc19UcmlwbGUvU2NyaXB0L21vZHVsZXMvdHJhcC9zcGlrZXNUcmlwbGUvU3Bpa2VzVHJpcGxlU2tpbGwudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlX1JvdGF0ZWQvU2NyaXB0L21vZHVsZXMvdHJhcC9zcGlrZVJvdGF0aW9uL1NwaWtlUm90YXRpb24udHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlX1JvdGF0ZWQvU2NyaXB0L21vZHVsZXMvdHJhcC9zcGlrZVJvdGF0aW9uL1NwaWtlUm90YXRpb25MZWZ0LnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TcGlrZV9Sb3RhdGVkL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3Bpa2VSb3RhdGlvbi9TcGlrZVNraWxsVHJhcC50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfMy9TY3JpcHQvbW9kdWxlcy90cmFwL3N0aWNrVGhpcmQvU3RpY2tUaGlyZFJvcy50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfMy9TY3JpcHQvbW9kdWxlcy90cmFwL3N0aWNrVGhpcmQvU3RpY2tUaGlyZFRyYXBTa2lsbC50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfRG91YmxlL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tEb3VibGUvU3RpY2tEb3VibGVSb3MudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1N0aWNrX0RvdWJsZS9TY3JpcHQvbW9kdWxlcy90cmFwL3N0aWNrRG91YmxlL1N0aWNrRG91YmxlUm9zRG93bi50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfRG91YmxlL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tEb3VibGUvU3RpY2tEb3VibGVTa2lsbC50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfRG91YmxlMi9TY3JpcHQvbW9kdWxlcy90cmFwL3N0aWNrRG91YmxlVHdvL1N0aWNrRG91YmxlVHdvUm9zLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TdGlja19Eb3VibGUyL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tEb3VibGVUd28vU3RpY2tEb3VibGVUd29Sb3NEb3duLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TdGlja19Eb3VibGUyL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tEb3VibGVUd28vU3RpY2tEb3VibGVUd29Ta2lsbC50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfU2luZ2xlL1NjcmlwdC9tb2R1bGVzL3RyYXAvaXNzdWV0cmFwL1N0aWNrU2luZ2xlLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TdGlja19TaW5nbGUvU2NyaXB0L21vZHVsZXMvdHJhcC9zdGlja1NpbmdsZS9TdGlja1NpbmdsZVJvcy50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfU2luZ2xlVHdvL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tTaW5nbGUvU3RpY2tTaW5nbGVSb3MudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1N0aWNrX1NpbmdsZVR3by9TY3JpcHQvbW9kdWxlcy90cmFwL1N0aWNrVHJhcFNraWxsLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9Xb2xmVG9vdGhfTDJSL1NjcmlwdC9tb2R1bGVzL3RyYXAvd29sZlRvb3RoL1dvbGZUb290aFBvcy50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfV29sZlRvb3RoX0wyUi9TY3JpcHQvbW9kdWxlcy90cmFwL3dvbGZUb290aC9Xb2xmVG9vdGhSb3MudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1dvbGZUb290aF9MMlIvU2NyaXB0L21vZHVsZXMvdHJhcC93b2xmVG9vdGgvV29sZlRvb3RoU2tpbGwudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL3NraWxsRG9vckRvdWJsZS9TY3JpcHQvbW9kdWxlcy90cmFwL0Rvb3JUcmFwU2tpbGwudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL3NraWxsRG9vclByZS9TY3JpcHQvbW9kdWxlcy90cmFwL0Rvb3JUcmFwU2tpbGwudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL3NraWxsRG9vcldhbGwvU2NyaXB0L21vZHVsZXMvdHJhcC9Eb29yVHJhcFNraWxsLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU2tpbGxEb29yVUlfZ2VuZXJhdGUudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9XaW5kb3dzTm9FZGl0b3IvTVcvQ29udGVudC9CdWlsZFRvb2wvbXctdmlydHVhbC1lbnRyeSJdLCJzb3VyY2VzQ29udGVudCI6W251bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy5wdXNoKF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnB1c2goXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuIixudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsImltcG9ydCAqIGFzIGZvcmVpZ24wIGZyb20gJy4vYnVpbGQnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjEgZnJvbSAnLi9KYXZhU2NyaXB0cy9jb25maWcvQ29uZmlnQmFzZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMiBmcm9tICcuL0phdmFTY3JpcHRzL2NvbmZpZy9Eb29yQ29sb3InO1xuaW1wb3J0ICogYXMgZm9yZWlnbjMgZnJvbSAnLi9KYXZhU2NyaXB0cy9jb25maWcvR2FtZUNvbmZpZyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNCBmcm9tICcuL0phdmFTY3JpcHRzL2NvbmZpZy9HZW1Ta2lsbCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNSBmcm9tICcuL0phdmFTY3JpcHRzL2NvbmZpZy9HbG9iYWwnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjYgZnJvbSAnLi9KYXZhU2NyaXB0cy9jb25maWcvR3VpZGVQcmVmYWJzJztcbmltcG9ydCAqIGFzIGZvcmVpZ243IGZyb20gJy4vSmF2YVNjcmlwdHMvY29uZmlnL0xhbmd1ZUNvbmZpZyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduOCBmcm9tICcuL0phdmFTY3JpcHRzL2NvbmZpZy9MZXZlbFNldHRpbmdzJztcbmltcG9ydCAqIGFzIGZvcmVpZ245IGZyb20gJy4vSmF2YVNjcmlwdHMvY29uZmlnL09ic3RhY2xlJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMCBmcm9tICcuL0phdmFTY3JpcHRzL2NvbmZpZy9Ta2luJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMSBmcm9tICcuL0phdmFTY3JpcHRzL2NvbmZpZy9Tb3VuZCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTIgZnJvbSAnLi9KYXZhU2NyaXB0cy9jb25maWcvVGlwcyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTMgZnJvbSAnLi9KYXZhU2NyaXB0cy9jb25zdHMvUHJvTG9hZEd1aWQnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE0IGZyb20gJy4vSmF2YVNjcmlwdHMvR2FtZUxhdW5jaGVyJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xNSBmcm9tICcuL0phdmFTY3JpcHRzL2dtL0dNSFVEJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xNiBmcm9tICcuL0phdmFTY3JpcHRzL2dtL0dNSXRlbSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTcgZnJvbSAnLi9KYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZENhbWVyYSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTggZnJvbSAnLi9KYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFBsYXllcic7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTkgZnJvbSAnLi9KYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFNwYXduJztcbmltcG9ydCAqIGFzIGZvcmVpZ24yMCBmcm9tICcuL0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkU3RhdGljQVBJJztcbmltcG9ydCAqIGFzIGZvcmVpZ24yMSBmcm9tICcuL0phdmFTY3JpcHRzL21vZHVsZXMvZ20vR21Nb2R1bGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIyIGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9ndWlkZS9HdWlkZURhdGFIZWxwZXInO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIzIGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9ndWlkZS9HdWlkZU1vZHVsZUMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjI0IGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9ndWlkZS9HdWlkZU1vZHVsZVMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjI1IGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9oYWxsL0hhbGxEYXRhSGVscGVyJztcbmltcG9ydCAqIGFzIGZvcmVpZ24yNiBmcm9tICcuL0phdmFTY3JpcHRzL21vZHVsZXMvaGFsbC9IYWxsTW9kdWxlX0MnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjI3IGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9oYWxsL0hhbGxNb2R1bGVfUyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMjggZnJvbSAnLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2xldmVsL0JhcnJpZXJDb25maWcnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjI5IGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9sZXZlbC9FbmRUcmlnZ2VyJztcbmltcG9ydCAqIGFzIGZvcmVpZ24zMCBmcm9tICcuL0phdmFTY3JpcHRzL21vZHVsZXMvbGV2ZWwvbW9kdWxlL0xldmVsRGF0YUhlbHBlcic7XG5pbXBvcnQgKiBhcyBmb3JlaWduMzEgZnJvbSAnLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2xldmVsL21vZHVsZS9MZXZlbE1vZHVsZUMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjMyIGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9sZXZlbC9tb2R1bGUvTGV2ZWxNb2R1bGVTJztcbmltcG9ydCAqIGFzIGZvcmVpZ24zMyBmcm9tICcuL0phdmFTY3JpcHRzL21vZHVsZXMvbGV2ZWwvU2NlbmVDcmVhdG9yJztcbmltcG9ydCAqIGFzIGZvcmVpZ24zNCBmcm9tICcuL0phdmFTY3JpcHRzL21vZHVsZXMvcGxheWVyL1BsYXllckRhdGFIZWxwZXInO1xuaW1wb3J0ICogYXMgZm9yZWlnbjM1IGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9wbGF5ZXIvUGxheWVyTW9kdWRsZVMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjM2IGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9wbGF5ZXIvUGxheWVyTW9kdWxlQyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMzcgZnJvbSAnLi9KYXZhU2NyaXB0cy9tb2R1bGVzL3NraWxsL1NraWxsRGF0YUhlbHBlcic7XG5pbXBvcnQgKiBhcyBmb3JlaWduMzggZnJvbSAnLi9KYXZhU2NyaXB0cy9tb2R1bGVzL3NraWxsL1NraWxsTW9kdWxlX0MnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjM5IGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9za2lsbC9Ta2lsbE1vZHVsZV9TJztcbmltcG9ydCAqIGFzIGZvcmVpZ240MCBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvQ29tbW9uL1NjcmlwdC9JQmFycmllcic7XG5pbXBvcnQgKiBhcyBmb3JlaWduNDEgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL0NvbW1vbi9TY3JpcHQvUG9zaXRpb25UZW1wJztcbmltcG9ydCAqIGFzIGZvcmVpZ240MiBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvQ29tbW9uL1NjcmlwdC9Sb3RhdGlvblRlbXAnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjQzIGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9Db21tb24vU2NyaXB0L1JvdGF0aW9uVGVtcE1hbnknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjQ0IGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9Db21tb24vU2NyaXB0L1RyYXBCYXNlJztcbmltcG9ydCAqIGFzIGZvcmVpZ240NSBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvQ29tbW9uL1NjcmlwdC9UcmFwQmFzZU1hbnknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjQ2IGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9Db21tb24vU2NyaXB0L1RyYXBVdGlsJztcbmltcG9ydCAqIGFzIGZvcmVpZ240NyBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfQXJjaGVkL1NjcmlwdC9tb2R1bGVzL3RyYXAvV2FsbFRyYXBTa2lsbCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNDggZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX0NhcHN1bGUvU2NyaXB0L21vZHVsZXMvdHJhcC9DYXBzdWxlUm90YXRlQ29tcCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNDkgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX0NhcHN1bGUvU2NyaXB0L21vZHVsZXMvdHJhcC9DYXBzdWxlVHJhcCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNTAgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX0NpcmN1bGFySG9sZS9TY3JpcHQvbW9kdWxlcy90cmFwL0NpcmN1bGFySG9sZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNTEgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX0NpcmN1bGFyU2F3L1NjcmlwdC9tb2R1bGVzL3RyYXAvY2lyY3VsYXJTYXcvQ2lyY3VsYXJTYXdQb3MnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjUyIGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DaXJjdWxhclNhdy9TY3JpcHQvbW9kdWxlcy90cmFwL2NpcmN1bGFyU2F3L0NpcmN1bGFyU2F3Um9zJztcbmltcG9ydCAqIGFzIGZvcmVpZ241MyBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfQ2lyY3VsYXJTYXcvU2NyaXB0L21vZHVsZXMvdHJhcC9DaXJjdWxhclRyYXBTa2lsbCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNTQgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX0NpcmN1bGFyU2F3U3RhbmQvU2NyaXB0L21vZHVsZXMvdHJhcC9jaWN1bGFyU3RhbmQvQ2ljdWxhclN0YW5kUm9zJztcbmltcG9ydCAqIGFzIGZvcmVpZ241NSBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfQ2lyY3VsYXJTYXdTdGFuZC9TY3JpcHQvbW9kdWxlcy90cmFwL2NpY3VsYXJTdGFuZC9DaWN1bGFyU3RhbmRUcmFwU2tpbGwnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjU2IGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DaXJjdWxhclNhd19TdGlsbC9TY3JpcHQvbW9kdWxlcy90cmFwL2NpcmN1bGFyU2F3U3RpbGwudHMvQ2lyY3VsYXJTYXdTdGlsbFJvcyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNTcgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX0NpcmN1bGFyU2F3X1N0aWxsL1NjcmlwdC9tb2R1bGVzL3RyYXAvQ2lyY3VsYXJTaW5nbGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjU4IGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9GYW5fUm90YXRlL1NjcmlwdC9tb2R1bGVzL3RyYXAvZmFuUm90YXRlL0ZhblJvdGF0ZVJvcyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNTkgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX0Zhbl9Sb3RhdGUvU2NyaXB0L21vZHVsZXMvdHJhcC9GYW5UcmFwU2tpbGwnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjYwIGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9OZWVkbGVCb2FyZC9TY3JpcHQvbW9kdWxlcy90cmFwL25lZWRsZUJvYXJkL05lZWRsZUJvYXJkJztcbmltcG9ydCAqIGFzIGZvcmVpZ242MSBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfTmVlZGxlQm9hcmQvU2NyaXB0L21vZHVsZXMvdHJhcC9uZWVkbGVCb2FyZC9OZWVkbGVCb2FyZFBvcyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNjIgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX05lZWRsZUN1YmUvU2NyaXB0L21vZHVsZXMvdHJhcC9OZWVkbGVCb2FyZEN1YmUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjYzIGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TcGlrZXNfQXN5bi9TY3JpcHQvbW9kdWxlcy90cmFwL3NwaWtlc0FzeW4vU3Bpa2VzQXN5blBvcyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNjQgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlc19Bc3luL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3Bpa2VzQXN5bi9TcGlrZXNBc3luUG9zTGVmdCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNjUgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlc19Bc3luL1NjcmlwdC9tb2R1bGVzL3RyYXAvU3Bpa2VzVHJhcFVwQW5kRG93bic7XG5pbXBvcnQgKiBhcyBmb3JlaWduNjYgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlc19TaWRlL1NjcmlwdC9tb2R1bGVzL3RyYXAvU3Bpa2VzU2lkZU1vdmVDb21wJztcbmltcG9ydCAqIGFzIGZvcmVpZ242NyBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VzX1NpZGUvU2NyaXB0L21vZHVsZXMvdHJhcC9TcGlrZXNTaWRlVHJhcCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNjggZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlc19TeW4vU2NyaXB0L21vZHVsZXMvdHJhcC9TcGlrZVRyYXBTa2lsbCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNjkgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlc19TeW4vU2NyaXB0L21vZHVsZXMvdHJhcC9zcGlrZVRyYXBTeW4vU3Bpa2VUcmFwU3luUG9zJztcbmltcG9ydCAqIGFzIGZvcmVpZ243MCBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VzX1RyaXBsZS9TY3JpcHQvbW9kdWxlcy90cmFwL3NwaWtlc1RyaXBsZS9TcGlrZXNUcmlwbGVQb3MnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjcxIGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TcGlrZXNfVHJpcGxlL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3Bpa2VzVHJpcGxlL1NwaWtlc1RyaXBsZVNraWxsJztcbmltcG9ydCAqIGFzIGZvcmVpZ243MiBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VfUm90YXRlZC9TY3JpcHQvbW9kdWxlcy90cmFwL3NwaWtlUm90YXRpb24vU3Bpa2VSb3RhdGlvbic7XG5pbXBvcnQgKiBhcyBmb3JlaWduNzMgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlX1JvdGF0ZWQvU2NyaXB0L21vZHVsZXMvdHJhcC9zcGlrZVJvdGF0aW9uL1NwaWtlUm90YXRpb25MZWZ0JztcbmltcG9ydCAqIGFzIGZvcmVpZ243NCBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VfUm90YXRlZC9TY3JpcHQvbW9kdWxlcy90cmFwL3NwaWtlUm90YXRpb24vU3Bpa2VTa2lsbFRyYXAnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjc1IGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TdGlja18zL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tUaGlyZC9TdGlja1RoaXJkUm9zJztcbmltcG9ydCAqIGFzIGZvcmVpZ243NiBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfMy9TY3JpcHQvbW9kdWxlcy90cmFwL3N0aWNrVGhpcmQvU3RpY2tUaGlyZFRyYXBTa2lsbCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNzcgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1N0aWNrX0RvdWJsZS9TY3JpcHQvbW9kdWxlcy90cmFwL3N0aWNrRG91YmxlL1N0aWNrRG91YmxlUm9zJztcbmltcG9ydCAqIGFzIGZvcmVpZ243OCBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfRG91YmxlL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tEb3VibGUvU3RpY2tEb3VibGVSb3NEb3duJztcbmltcG9ydCAqIGFzIGZvcmVpZ243OSBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfRG91YmxlL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tEb3VibGUvU3RpY2tEb3VibGVTa2lsbCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduODAgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1N0aWNrX0RvdWJsZTIvU2NyaXB0L21vZHVsZXMvdHJhcC9zdGlja0RvdWJsZVR3by9TdGlja0RvdWJsZVR3b1Jvcyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduODEgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1N0aWNrX0RvdWJsZTIvU2NyaXB0L21vZHVsZXMvdHJhcC9zdGlja0RvdWJsZVR3by9TdGlja0RvdWJsZVR3b1Jvc0Rvd24nO1xuaW1wb3J0ICogYXMgZm9yZWlnbjgyIGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TdGlja19Eb3VibGUyL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tEb3VibGVUd28vU3RpY2tEb3VibGVUd29Ta2lsbCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduODMgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1N0aWNrX1NpbmdsZS9TY3JpcHQvbW9kdWxlcy90cmFwL2lzc3VldHJhcC9TdGlja1NpbmdsZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduODQgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1N0aWNrX1NpbmdsZS9TY3JpcHQvbW9kdWxlcy90cmFwL3N0aWNrU2luZ2xlL1N0aWNrU2luZ2xlUm9zJztcbmltcG9ydCAqIGFzIGZvcmVpZ244NSBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfU2luZ2xlVHdvL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tTaW5nbGUvU3RpY2tTaW5nbGVSb3MnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjg2IGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TdGlja19TaW5nbGVUd28vU2NyaXB0L21vZHVsZXMvdHJhcC9TdGlja1RyYXBTa2lsbCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduODcgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1dvbGZUb290aF9MMlIvU2NyaXB0L21vZHVsZXMvdHJhcC93b2xmVG9vdGgvV29sZlRvb3RoUG9zJztcbmltcG9ydCAqIGFzIGZvcmVpZ244OCBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfV29sZlRvb3RoX0wyUi9TY3JpcHQvbW9kdWxlcy90cmFwL3dvbGZUb290aC9Xb2xmVG9vdGhSb3MnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjg5IGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9Xb2xmVG9vdGhfTDJSL1NjcmlwdC9tb2R1bGVzL3RyYXAvd29sZlRvb3RoL1dvbGZUb290aFNraWxsJztcbmltcG9ydCAqIGFzIGZvcmVpZ245MCBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvc2tpbGxEb29yRG91YmxlL1NjcmlwdC9tb2R1bGVzL3RyYXAvRG9vclRyYXBTa2lsbCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduOTEgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL3NraWxsRG9vclByZS9TY3JpcHQvbW9kdWxlcy90cmFwL0Rvb3JUcmFwU2tpbGwnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjkyIGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9za2lsbERvb3JXYWxsL1NjcmlwdC9tb2R1bGVzL3RyYXAvRG9vclRyYXBTa2lsbCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduOTMgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS9FbmRVSUxvc2UnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjk0IGZyb20gJy4vSmF2YVNjcmlwdHMvdWkvRW5kVUlfV0lOJztcbmltcG9ydCAqIGFzIGZvcmVpZ245NSBmcm9tICcuL0phdmFTY3JpcHRzL3VpL0VudGVyTG9hZGluZyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduOTYgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS9IYWxsVUknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjk3IGZyb20gJy4vSmF2YVNjcmlwdHMvdWkvUmV3YXJkc1VJJztcbmltcG9ydCAqIGFzIGZvcmVpZ245OCBmcm9tICcuL0phdmFTY3JpcHRzL3VpL1NraWxsR2V0VUknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjk5IGZyb20gJy4vSmF2YVNjcmlwdHMvdWkvU2tpbGxQYW5lbFVJJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMDAgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS9Tb3VsVUknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjEwMSBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0VuZFVJX0xPU0VfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjEwMiBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0VuZFVJX1dJTl9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTAzIGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvRW50ZXJMb2FkaW5nX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMDQgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9nbS9HTUhVRF9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTA1IGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvZ20vR01JdGVtX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMDYgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9IYWxsVUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjEwNyBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1Jld2FyZHNVSV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTA4IGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU2tpbGxEb29yVUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjEwOSBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1NraWxsR2V0VUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjExMCBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1NraWxsUGFuZWxVSV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTExIGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU291bFVJX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMTIgZnJvbSAnLi9KYXZhU2NyaXB0cy91dGlscy9Tb3VuZFBsYXknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjExMyBmcm9tICcuL0phdmFTY3JpcHRzL3V0aWxzL1Rvb2xzJztcbmV4cG9ydCBjb25zdCBNV01vZHVsZU1hcCA9IHsgXG4gICAgICdidWlsZCc6IGZvcmVpZ24wLFxuICAgICAnSmF2YVNjcmlwdHMvY29uZmlnL0NvbmZpZ0Jhc2UnOiBmb3JlaWduMSxcbiAgICAgJ0phdmFTY3JpcHRzL2NvbmZpZy9Eb29yQ29sb3InOiBmb3JlaWduMixcbiAgICAgJ0phdmFTY3JpcHRzL2NvbmZpZy9HYW1lQ29uZmlnJzogZm9yZWlnbjMsXG4gICAgICdKYXZhU2NyaXB0cy9jb25maWcvR2VtU2tpbGwnOiBmb3JlaWduNCxcbiAgICAgJ0phdmFTY3JpcHRzL2NvbmZpZy9HbG9iYWwnOiBmb3JlaWduNSxcbiAgICAgJ0phdmFTY3JpcHRzL2NvbmZpZy9HdWlkZVByZWZhYnMnOiBmb3JlaWduNixcbiAgICAgJ0phdmFTY3JpcHRzL2NvbmZpZy9MYW5ndWVDb25maWcnOiBmb3JlaWduNyxcbiAgICAgJ0phdmFTY3JpcHRzL2NvbmZpZy9MZXZlbFNldHRpbmdzJzogZm9yZWlnbjgsXG4gICAgICdKYXZhU2NyaXB0cy9jb25maWcvT2JzdGFjbGUnOiBmb3JlaWduOSxcbiAgICAgJ0phdmFTY3JpcHRzL2NvbmZpZy9Ta2luJzogZm9yZWlnbjEwLFxuICAgICAnSmF2YVNjcmlwdHMvY29uZmlnL1NvdW5kJzogZm9yZWlnbjExLFxuICAgICAnSmF2YVNjcmlwdHMvY29uZmlnL1RpcHMnOiBmb3JlaWduMTIsXG4gICAgICdKYXZhU2NyaXB0cy9jb25zdHMvUHJvTG9hZEd1aWQnOiBmb3JlaWduMTMsXG4gICAgICdKYXZhU2NyaXB0cy9HYW1lTGF1bmNoZXInOiBmb3JlaWduMTQsXG4gICAgICdKYXZhU2NyaXB0cy9nbS9HTUhVRCc6IGZvcmVpZ24xNSxcbiAgICAgJ0phdmFTY3JpcHRzL2dtL0dNSXRlbSc6IGZvcmVpZ24xNixcbiAgICAgJ0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkQ2FtZXJhJzogZm9yZWlnbjE3LFxuICAgICAnSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRQbGF5ZXInOiBmb3JlaWduMTgsXG4gICAgICdKYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFNwYXduJzogZm9yZWlnbjE5LFxuICAgICAnSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRTdGF0aWNBUEknOiBmb3JlaWduMjAsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL2dtL0dtTW9kdWxlJzogZm9yZWlnbjIxLFxuICAgICAnSmF2YVNjcmlwdHMvbW9kdWxlcy9ndWlkZS9HdWlkZURhdGFIZWxwZXInOiBmb3JlaWduMjIsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL2d1aWRlL0d1aWRlTW9kdWxlQyc6IGZvcmVpZ24yMyxcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvZ3VpZGUvR3VpZGVNb2R1bGVTJzogZm9yZWlnbjI0LFxuICAgICAnSmF2YVNjcmlwdHMvbW9kdWxlcy9oYWxsL0hhbGxEYXRhSGVscGVyJzogZm9yZWlnbjI1LFxuICAgICAnSmF2YVNjcmlwdHMvbW9kdWxlcy9oYWxsL0hhbGxNb2R1bGVfQyc6IGZvcmVpZ24yNixcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvaGFsbC9IYWxsTW9kdWxlX1MnOiBmb3JlaWduMjcsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL2xldmVsL0JhcnJpZXJDb25maWcnOiBmb3JlaWduMjgsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL2xldmVsL0VuZFRyaWdnZXInOiBmb3JlaWduMjksXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL2xldmVsL21vZHVsZS9MZXZlbERhdGFIZWxwZXInOiBmb3JlaWduMzAsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL2xldmVsL21vZHVsZS9MZXZlbE1vZHVsZUMnOiBmb3JlaWduMzEsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL2xldmVsL21vZHVsZS9MZXZlbE1vZHVsZVMnOiBmb3JlaWduMzIsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL2xldmVsL1NjZW5lQ3JlYXRvcic6IGZvcmVpZ24zMyxcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvcGxheWVyL1BsYXllckRhdGFIZWxwZXInOiBmb3JlaWduMzQsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL3BsYXllci9QbGF5ZXJNb2R1ZGxlUyc6IGZvcmVpZ24zNSxcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvcGxheWVyL1BsYXllck1vZHVsZUMnOiBmb3JlaWduMzYsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL3NraWxsL1NraWxsRGF0YUhlbHBlcic6IGZvcmVpZ24zNyxcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvc2tpbGwvU2tpbGxNb2R1bGVfQyc6IGZvcmVpZ24zOCxcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvc2tpbGwvU2tpbGxNb2R1bGVfUyc6IGZvcmVpZ24zOSxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvQ29tbW9uL1NjcmlwdC9JQmFycmllcic6IGZvcmVpZ240MCxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvQ29tbW9uL1NjcmlwdC9Qb3NpdGlvblRlbXAnOiBmb3JlaWduNDEsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL0NvbW1vbi9TY3JpcHQvUm90YXRpb25UZW1wJzogZm9yZWlnbjQyLFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9Db21tb24vU2NyaXB0L1JvdGF0aW9uVGVtcE1hbnknOiBmb3JlaWduNDMsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL0NvbW1vbi9TY3JpcHQvVHJhcEJhc2UnOiBmb3JlaWduNDQsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL0NvbW1vbi9TY3JpcHQvVHJhcEJhc2VNYW55JzogZm9yZWlnbjQ1LFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9Db21tb24vU2NyaXB0L1RyYXBVdGlsJzogZm9yZWlnbjQ2LFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9BcmNoZWQvU2NyaXB0L21vZHVsZXMvdHJhcC9XYWxsVHJhcFNraWxsJzogZm9yZWlnbjQ3LFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DYXBzdWxlL1NjcmlwdC9tb2R1bGVzL3RyYXAvQ2Fwc3VsZVJvdGF0ZUNvbXAnOiBmb3JlaWduNDgsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL1BGX0NhcHN1bGUvU2NyaXB0L21vZHVsZXMvdHJhcC9DYXBzdWxlVHJhcCc6IGZvcmVpZ240OSxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfQ2lyY3VsYXJIb2xlL1NjcmlwdC9tb2R1bGVzL3RyYXAvQ2lyY3VsYXJIb2xlJzogZm9yZWlnbjUwLFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DaXJjdWxhclNhdy9TY3JpcHQvbW9kdWxlcy90cmFwL2NpcmN1bGFyU2F3L0NpcmN1bGFyU2F3UG9zJzogZm9yZWlnbjUxLFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DaXJjdWxhclNhdy9TY3JpcHQvbW9kdWxlcy90cmFwL2NpcmN1bGFyU2F3L0NpcmN1bGFyU2F3Um9zJzogZm9yZWlnbjUyLFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DaXJjdWxhclNhdy9TY3JpcHQvbW9kdWxlcy90cmFwL0NpcmN1bGFyVHJhcFNraWxsJzogZm9yZWlnbjUzLFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DaXJjdWxhclNhd1N0YW5kL1NjcmlwdC9tb2R1bGVzL3RyYXAvY2ljdWxhclN0YW5kL0NpY3VsYXJTdGFuZFJvcyc6IGZvcmVpZ241NCxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfQ2lyY3VsYXJTYXdTdGFuZC9TY3JpcHQvbW9kdWxlcy90cmFwL2NpY3VsYXJTdGFuZC9DaWN1bGFyU3RhbmRUcmFwU2tpbGwnOiBmb3JlaWduNTUsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL1BGX0NpcmN1bGFyU2F3X1N0aWxsL1NjcmlwdC9tb2R1bGVzL3RyYXAvY2lyY3VsYXJTYXdTdGlsbC50cy9DaXJjdWxhclNhd1N0aWxsUm9zJzogZm9yZWlnbjU2LFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9DaXJjdWxhclNhd19TdGlsbC9TY3JpcHQvbW9kdWxlcy90cmFwL0NpcmN1bGFyU2luZ2xlJzogZm9yZWlnbjU3LFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9GYW5fUm90YXRlL1NjcmlwdC9tb2R1bGVzL3RyYXAvZmFuUm90YXRlL0ZhblJvdGF0ZVJvcyc6IGZvcmVpZ241OCxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfRmFuX1JvdGF0ZS9TY3JpcHQvbW9kdWxlcy90cmFwL0ZhblRyYXBTa2lsbCc6IGZvcmVpZ241OSxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfTmVlZGxlQm9hcmQvU2NyaXB0L21vZHVsZXMvdHJhcC9uZWVkbGVCb2FyZC9OZWVkbGVCb2FyZCc6IGZvcmVpZ242MCxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfTmVlZGxlQm9hcmQvU2NyaXB0L21vZHVsZXMvdHJhcC9uZWVkbGVCb2FyZC9OZWVkbGVCb2FyZFBvcyc6IGZvcmVpZ242MSxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfTmVlZGxlQ3ViZS9TY3JpcHQvbW9kdWxlcy90cmFwL05lZWRsZUJvYXJkQ3ViZSc6IGZvcmVpZ242MixcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VzX0FzeW4vU2NyaXB0L21vZHVsZXMvdHJhcC9zcGlrZXNBc3luL1NwaWtlc0FzeW5Qb3MnOiBmb3JlaWduNjMsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlc19Bc3luL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3Bpa2VzQXN5bi9TcGlrZXNBc3luUG9zTGVmdCc6IGZvcmVpZ242NCxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VzX0FzeW4vU2NyaXB0L21vZHVsZXMvdHJhcC9TcGlrZXNUcmFwVXBBbmREb3duJzogZm9yZWlnbjY1LFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TcGlrZXNfU2lkZS9TY3JpcHQvbW9kdWxlcy90cmFwL1NwaWtlc1NpZGVNb3ZlQ29tcCc6IGZvcmVpZ242NixcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VzX1NpZGUvU2NyaXB0L21vZHVsZXMvdHJhcC9TcGlrZXNTaWRlVHJhcCc6IGZvcmVpZ242NyxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VzX1N5bi9TY3JpcHQvbW9kdWxlcy90cmFwL1NwaWtlVHJhcFNraWxsJzogZm9yZWlnbjY4LFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TcGlrZXNfU3luL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3Bpa2VUcmFwU3luL1NwaWtlVHJhcFN5blBvcyc6IGZvcmVpZ242OSxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3Bpa2VzX1RyaXBsZS9TY3JpcHQvbW9kdWxlcy90cmFwL3NwaWtlc1RyaXBsZS9TcGlrZXNUcmlwbGVQb3MnOiBmb3JlaWduNzAsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlc19UcmlwbGUvU2NyaXB0L21vZHVsZXMvdHJhcC9zcGlrZXNUcmlwbGUvU3Bpa2VzVHJpcGxlU2tpbGwnOiBmb3JlaWduNzEsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlX1JvdGF0ZWQvU2NyaXB0L21vZHVsZXMvdHJhcC9zcGlrZVJvdGF0aW9uL1NwaWtlUm90YXRpb24nOiBmb3JlaWduNzIsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1NwaWtlX1JvdGF0ZWQvU2NyaXB0L21vZHVsZXMvdHJhcC9zcGlrZVJvdGF0aW9uL1NwaWtlUm90YXRpb25MZWZ0JzogZm9yZWlnbjczLFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TcGlrZV9Sb3RhdGVkL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3Bpa2VSb3RhdGlvbi9TcGlrZVNraWxsVHJhcCc6IGZvcmVpZ243NCxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfMy9TY3JpcHQvbW9kdWxlcy90cmFwL3N0aWNrVGhpcmQvU3RpY2tUaGlyZFJvcyc6IGZvcmVpZ243NSxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfMy9TY3JpcHQvbW9kdWxlcy90cmFwL3N0aWNrVGhpcmQvU3RpY2tUaGlyZFRyYXBTa2lsbCc6IGZvcmVpZ243NixcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfRG91YmxlL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tEb3VibGUvU3RpY2tEb3VibGVSb3MnOiBmb3JlaWduNzcsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1N0aWNrX0RvdWJsZS9TY3JpcHQvbW9kdWxlcy90cmFwL3N0aWNrRG91YmxlL1N0aWNrRG91YmxlUm9zRG93bic6IGZvcmVpZ243OCxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfRG91YmxlL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tEb3VibGUvU3RpY2tEb3VibGVTa2lsbCc6IGZvcmVpZ243OSxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfRG91YmxlMi9TY3JpcHQvbW9kdWxlcy90cmFwL3N0aWNrRG91YmxlVHdvL1N0aWNrRG91YmxlVHdvUm9zJzogZm9yZWlnbjgwLFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TdGlja19Eb3VibGUyL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tEb3VibGVUd28vU3RpY2tEb3VibGVUd29Sb3NEb3duJzogZm9yZWlnbjgxLFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TdGlja19Eb3VibGUyL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tEb3VibGVUd28vU3RpY2tEb3VibGVUd29Ta2lsbCc6IGZvcmVpZ244MixcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfU2luZ2xlL1NjcmlwdC9tb2R1bGVzL3RyYXAvaXNzdWV0cmFwL1N0aWNrU2luZ2xlJzogZm9yZWlnbjgzLFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9TdGlja19TaW5nbGUvU2NyaXB0L21vZHVsZXMvdHJhcC9zdGlja1NpbmdsZS9TdGlja1NpbmdsZVJvcyc6IGZvcmVpZ244NCxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfU3RpY2tfU2luZ2xlVHdvL1NjcmlwdC9tb2R1bGVzL3RyYXAvc3RpY2tTaW5nbGUvU3RpY2tTaW5nbGVSb3MnOiBmb3JlaWduODUsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1N0aWNrX1NpbmdsZVR3by9TY3JpcHQvbW9kdWxlcy90cmFwL1N0aWNrVHJhcFNraWxsJzogZm9yZWlnbjg2LFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9QRl9Xb2xmVG9vdGhfTDJSL1NjcmlwdC9tb2R1bGVzL3RyYXAvd29sZlRvb3RoL1dvbGZUb290aFBvcyc6IGZvcmVpZ244NyxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvUEZfV29sZlRvb3RoX0wyUi9TY3JpcHQvbW9kdWxlcy90cmFwL3dvbGZUb290aC9Xb2xmVG9vdGhSb3MnOiBmb3JlaWduODgsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL1BGX1dvbGZUb290aF9MMlIvU2NyaXB0L21vZHVsZXMvdHJhcC93b2xmVG9vdGgvV29sZlRvb3RoU2tpbGwnOiBmb3JlaWduODksXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL3NraWxsRG9vckRvdWJsZS9TY3JpcHQvbW9kdWxlcy90cmFwL0Rvb3JUcmFwU2tpbGwnOiBmb3JlaWduOTAsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL3NraWxsRG9vclByZS9TY3JpcHQvbW9kdWxlcy90cmFwL0Rvb3JUcmFwU2tpbGwnOiBmb3JlaWduOTEsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL3NraWxsRG9vcldhbGwvU2NyaXB0L21vZHVsZXMvdHJhcC9Eb29yVHJhcFNraWxsJzogZm9yZWlnbjkyLFxuICAgICAnSmF2YVNjcmlwdHMvdWkvRW5kVUlMb3NlJzogZm9yZWlnbjkzLFxuICAgICAnSmF2YVNjcmlwdHMvdWkvRW5kVUlfV0lOJzogZm9yZWlnbjk0LFxuICAgICAnSmF2YVNjcmlwdHMvdWkvRW50ZXJMb2FkaW5nJzogZm9yZWlnbjk1LFxuICAgICAnSmF2YVNjcmlwdHMvdWkvSGFsbFVJJzogZm9yZWlnbjk2LFxuICAgICAnSmF2YVNjcmlwdHMvdWkvUmV3YXJkc1VJJzogZm9yZWlnbjk3LFxuICAgICAnSmF2YVNjcmlwdHMvdWkvU2tpbGxHZXRVSSc6IGZvcmVpZ245OCxcbiAgICAgJ0phdmFTY3JpcHRzL3VpL1NraWxsUGFuZWxVSSc6IGZvcmVpZ245OSxcbiAgICAgJ0phdmFTY3JpcHRzL3VpL1NvdWxVSSc6IGZvcmVpZ24xMDAsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9FbmRVSV9MT1NFX2dlbmVyYXRlJzogZm9yZWlnbjEwMSxcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0VuZFVJX1dJTl9nZW5lcmF0ZSc6IGZvcmVpZ24xMDIsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9FbnRlckxvYWRpbmdfZ2VuZXJhdGUnOiBmb3JlaWduMTAzLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvZ20vR01IVURfZ2VuZXJhdGUnOiBmb3JlaWduMTA0LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvZ20vR01JdGVtX2dlbmVyYXRlJzogZm9yZWlnbjEwNSxcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0hhbGxVSV9nZW5lcmF0ZSc6IGZvcmVpZ24xMDYsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9SZXdhcmRzVUlfZ2VuZXJhdGUnOiBmb3JlaWduMTA3LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU2tpbGxEb29yVUlfZ2VuZXJhdGUnOiBmb3JlaWduMTA4LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU2tpbGxHZXRVSV9nZW5lcmF0ZSc6IGZvcmVpZ24xMDksXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9Ta2lsbFBhbmVsVUlfZ2VuZXJhdGUnOiBmb3JlaWduMTEwLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU291bFVJX2dlbmVyYXRlJzogZm9yZWlnbjExMSxcbiAgICAgJ0phdmFTY3JpcHRzL3V0aWxzL1NvdW5kUGxheSc6IGZvcmVpZ24xMTIsXG4gICAgICdKYXZhU2NyaXB0cy91dGlscy9Ub29scyc6IGZvcmVpZ24xMTMsXG59XG4iXSwibmFtZXMiOlsiRVhDRUxEQVRBIiwiU2tpbGxQYW5lbFVJX0dlbmVyYXRlIiwiU291bFVJX0dlbmVyYXRlIiwiRW5kVUlfTE9TRV9HZW5lcmF0ZSIsIlJld2FyZHNVSV9HZW5lcmF0ZSIsIkVuZFVJX1dJTl9HZW5lcmF0ZSIsIkVudGVyTG9hZGluZ19HZW5lcmF0ZSIsIlNraWxsR2V0VUlfR2VuZXJhdGUiLCJIYWxsVUlfR2VuZXJhdGUiLCJHTUhVRF9HZW5lcmF0ZSIsIkdNSXRlbV9HZW5lcmF0ZSIsIlBvc2l0aW9uVGVtcCIsIlN0aWNrU2luZ2xlUm9zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQTtBQUNBLE1BQWEsVUFBVSxDQUFBO0FBWXRCLElBQUEsV0FBQSxDQUFtQixTQUEyQixFQUFBO1FBTjdCLElBQVUsQ0FBQSxVQUFBLEdBQVksRUFBRSxDQUFDO0FBQ3pCLFFBQUEsSUFBQSxDQUFBLFVBQVUsR0FBa0IsSUFBSSxHQUFHLEVBQWEsQ0FBQztBQUNqRCxRQUFBLElBQUEsQ0FBQSxNQUFNLEdBQWdDLElBQUksR0FBRyxFQUFFLENBQUM7QUFLaEUsUUFBQSxJQUFJLFVBQVUsR0FBVSxDQUFDLENBQUM7QUFDMUIsUUFBQSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUM7QUFFM0QsUUFBQSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7QUFDOUMsWUFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQU8sQ0FBQTtBQUM1QixTQUFBO1FBQ0Qs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QUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxrQkFBa0IsRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsdUJBQXVCLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLG1CQUFtQixFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxnQkFBZ0IsRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBZXhiLE1BQU8sY0FBZSxTQUFRLFVBQTRCLENBQUE7QUFDL0QsSUFBQSxXQUFBLEdBQUE7UUFDQyxLQUFLLENBQUNBLFdBQVMsQ0FBQyxDQUFDO0tBQ2pCO0FBRUQ7Ozs7Ozs7QUNwQkQsTUFBTUEsV0FBUyxHQUFxQixDQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLGdCQUFnQixFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsVUFBVSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsVUFBVSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQWFyVixNQUFPLFlBQWEsU0FBUSxVQUEwQixDQUFBO0FBQzNELElBQUEsV0FBQSxHQUFBO1FBQ0MsS0FBSyxDQUFDQSxXQUFTLENBQUMsQ0FBQztLQUNqQjtBQUVEOzs7Ozs7O0FDbEJELE1BQU1BLFdBQVMsR0FBcUIsQ0FBQyxDQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxXQUFXLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBYWhvTixNQUFPLGtCQUFtQixTQUFRLFVBQWdDLENBQUE7QUFDdkUsSUFBQSxXQUFBLEdBQUE7UUFDQyxLQUFLLENBQUNBLFdBQVMsQ0FBQyxDQUFDO0tBQ2pCO0FBRUQ7Ozs7Ozs7QUNsQkQsTUFBTUEsV0FBUyxHQUFxQixDQUFDLENB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TyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUVsRSxJQUFJLFdBQVcsR0FBd0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRWxFLElBQUksV0FBVyxHQUF3QixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFbEUsSUFBSSxXQUFXLEdBQXdCLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUVsRSxJQUFJLE1BQU0sR0FBd0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksTUFBTSxHQUF3QixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxNQUFNLEdBQXdCLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLE1BQU0sR0FBd0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksTUFBTSxHQUF3QixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxNQUFNLEdBQXdCLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLE1BQU0sR0FBd0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksTUFBTSxHQUF3QixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxNQUFNLEdBQXdCLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLE9BQU8sR0FBd0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTlELElBQUksT0FBTyxHQUF3QixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFOUQsSUFBSSxHQUFHLEdBQXdCLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUcxRCxJQUFJLFNBQVMsR0FBd0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7QUFFaEU7Ozs7Ozs7QUN6RUQsTUFBTUEsV0FBUyxHQUFxQixDQUFDLENBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQWlCbnNDLE1BQU8sbUJBQW9CLFNBQVEsVUFBaUMsQ0FBQTtBQUN6RSxJQUFBLFdBQUEsR0FBQTtRQUNDLEtBQUssQ0FBQ0EsV0FBUyxDQUFDLENBQUM7S0FDakI7QUFFRDs7Ozs7OztBQ3RCRCxNQUFNQSxXQUFTLEdBQXFCLENBQUMsQ0FBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFdBQVcsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLGtDQUFrQyxFQUFDLElBQUksRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsRUFBQyxrQ0FBa0MsRUFBQyxJQUFJLEVBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsa0NBQWtDLEVBQUMsSUFBSSxFQUFDLGVBQWUsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxrQ0FBa0MsRUFBQyxJQUFJLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLGtDQUFrQyxFQUFDLElBQUksRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxrQ0FBa0MsRUFBQyxJQUFJLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsa0NBQWtDLEVBQUMsSUFBSSxFQUFDLGVBQWUsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxrQ0FBa0MsRUFBQyxJQUFJLEVBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsa0NBQWtDLEVBQUMsSUFBSSxFQUFDLHFCQUFxQixFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxrQ0FBa0MsRUFBQyxJQUFJLEVBQUMsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsa0NBQWtDLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLGtDQUFrQyxFQUFDLElBQUksRUFBQyxpQkFBaUIsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLGtDQUFrQyxFQUFDLElBQUksRUFBQyxlQUFlLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLGtDQUFrQyxFQUFDLElBQUksRUFBQyxrQkFBa0IsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsa0NBQWtDLEVBQUMsSUFBSSxFQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLGtDQUFrQyxFQUFDLElBQUksRUFBQyxpQkFBaUIsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsa0NBQWtDLEVBQUMsSUFBSSxFQUFDLGlCQUFpQixFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxrQ0FBa0MsRUFBQyxJQUFJLEVBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLGtDQUFrQyxFQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLGtDQUFrQyxFQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLGtDQUFrQyxFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLGtDQUFrQyxFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLGtDQUFrQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFD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QU0sRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLGNBQWMsQ0FBQyxFQUFDLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLGNBQWMsQ0FBQyxFQUFDLENBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLDBCQUEwQixDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsOEJBQThCLENBQUMsRUFBQyxDQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxvQ0FBb0MsQ0FBQyxFQUFDLENBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLHVDQUF1QyxDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsZ0JBQWdCLENBQUMsRUFBQyxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxlQUFlLENBQUMsRUFBQyxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxtQkFBbUIsQ0FBQyxFQUFDLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLGlCQUFpQixDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxDQUFDLEVBQUMsQ0FB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QSxDQUFBO0lBRE4sWUFBWSxDQUFDLHlFQUF5RSxDQUFDO0FBQzlDLENBQUEsRUFBQSxxQkFBQSxDQUFBLFNBQUEsRUFBQSxVQUFBLEVBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUVuQyxVQUFBLENBQUE7SUFETixZQUFZLENBQUMsNkVBQTZFLENBQUM7QUFDaEQsQ0FBQSxFQUFBLHFCQUFBLENBQUEsU0FBQSxFQUFBLGNBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRXJDLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FBQywyRUFBMkUsQ0FBQztBQUM5QyxDQUFBLEVBQUEscUJBQUEsQ0FBQSxTQUFBLEVBQUEsWUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFckMsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLHlFQUF5RSxDQUFDO0FBQzlDLENBQUEsRUFBQSxxQkFBQSxDQUFBLFNBQUEsRUFBQSxVQUFBLEVBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUVuQyxVQUFBLENBQUE7SUFETixZQUFZLENBQUMsNkVBQTZFLENBQUM7QUFDaEQsQ0FBQSxFQUFBLHFCQUFBLENBQUEsU0FBQSxFQUFBLGNBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRXJDLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FBQywyRUFBMkUsQ0FBQztBQUM5QyxDQUFBLEVBQUEscUJBQUEsQ0FBQSxTQUFBLEVBQUEsWUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFckMsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLHlFQUF5RSxDQUFDO0FBQzlDLENBQUEsRUFBQSxxQkFBQSxDQUFBLFNBQUEsRUFBQSxVQUFBLEVBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUVuQyxVQUFBLENBQUE7SUFETixZQUFZLENBQUMsNkVBQTZFLENBQUM7QUFDaEQsQ0FBQSxFQUFBLHFCQUFBLENBQUEsU0FBQSxFQUFBLGNBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRXJDLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FB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QUUsQ0FBQyxDQUFDLENBQUM7S0FDL0I7SUFHUyxTQUFTLEdBQUE7S0FDbEI7Q0FDRCxDQUFBO0FBeEVBLFVBQUEsQ0FBQTtBQURDLElBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO0FBQ3ZDLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRWxCLFVBQUEsQ0FBQTtBQURDLElBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ2xDLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRWxCLFVBQUEsQ0FBQTtBQURDLElBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ2pDLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRW5CLFVBQUEsQ0FBQTtBQURDLElBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ3BDLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRWhCLFVBQUEsQ0FBQTtBQURDLElBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ25DLENBQUEsRUFBQSxZQUFBLENBQUEsU0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRWpCLFVBQUEsQ0FBQTtBQURDLElBQUEsRUFBRSxDQUFD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RDtDQUNELENBQUE7QUEzRkEsVUFBQSxDQUFBO0FBREMsSUFBQSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUM7QUFDdkMsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFbEIsVUFBQSxDQUFBO0FBREMsSUFBQSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDbEMsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFbEIsVUFBQSxDQUFBO0FBREMsSUFBQSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDakMsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFbkIsVUFBQSxDQUFBO0FBREMsSUFBQSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDcEMsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFaEIsVUFBQSxDQUFBO0FBREMsSUFBQSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDckMsQ0FBQSxFQUFBLFlBQUEsQ0FBQSxTQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFZixVQUFBLENBQUE7QUFEQyxJQUFBLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFB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UUFBQSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztRQUN4QyxHQUFHLENBQUMsY0FBYyxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkU7QUFDRCxJQUFBLFNBQVMsQ0FBQyxJQUFhLEVBQUE7UUFDdEIsSUFBSSxJQUFJLENBQUMsWUFBWTtBQUFFLFlBQUEsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4RCxRQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckQsUUFBQSxJQUFJLElBQUksRUFBRTtZQUNULEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDekMsWUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLElB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LEtBQUssc0ZBQXNGLEVBQUUsU0FBUztBQUN0RyxLQUFLLDBGQUEwRixFQUFFLFNBQVM7QUFDMUcsS0FBSyx1RkFBdUYsRUFBRSxTQUFTO0FBQ3ZHLEtBQUssNkVBQTZFLEVBQUUsU0FBUztBQUM3RixLQUFLLG1GQUFtRixFQUFFLFNBQVM7QUFDbkcsS0FBSyxvRkFBb0YsRUFBRSxTQUFTO0FBQ3BHLEtBQUssd0ZBQXdGLEVBQUUsU0FBUztBQUN4RyxLQUFLLHNGQUFzRixFQUFFLFNBQVM7QUFDdEcsS0FBSywyRkFBMkYsRUFBRSxTQUFTO0FBQzNHLEtBQUssK0ZBQStGLEVBQUUsU0FBUztBQUMvRyxLQUFLLDZGQUE2RixFQUFFLFNBQVM7QUFDN0csS0FBSywrRUFBK0UsRUFBRSxTQUFTO0FBQy9GLEtBQUssb0ZBQW9GLEVBQUUsU0FBUztBQUNwRyxLQUFLLHVGQUF1RixFQUFFLFNBQVM7QUFDdkcsS0FBSywyRUFBMkUsRUFBRSxTQUFTO0FBQzNGLEtBQUssaUZBQWlGLEVBQUUsU0FBUztBQUNqRyxLQUFLLGlGQUFpRixFQUFFLFNBQVM7QUFDakcsS0FBSyxtRkFBbUYsRUFBRSxTQUFTO0FBQ25HLEtBQUssdUVBQXVFLEVBQUUsU0FBUztBQUN2RixLQUFLLG9FQUFvRSxFQUFFLFNBQVM7QUFDcEYsS0FBSyxxRUFBcUUsRUFBRSxTQUFTO0FBQ3JGLEtBQUssMEJBQTBCLEVBQUUsU0FBUztBQUMxQyxLQUFLLDBCQUEwQixFQUFFLFNBQVM7QUFDMUMsS0FBSyw2QkFBNkIsRUFBRSxTQUFTO0FBQzdDLEtBQUssdUJBQXVCLEVBQUUsU0FBUztBQUN2QyxLQUFLLDBCQUEwQixFQUFFLFNBQVM7QUFDMUMsS0FBSywyQkFBMkIsRUFBRSxTQUFTO0FBQzNDLEtBQUssNkJBQTZCLEVBQUUsU0FBUztBQUM3QyxLQUFLLHVCQUF1QixFQUFFLFVBQVU7QUFDeEMsS0FBSyw2Q0FBNkMsRUFBRSxVQUFVO0FBQzlELEtBQUssNENBQTRDLEVBQUUsVUFBVTtBQUM3RCxLQUFLLCtDQUErQyxFQUFFLFVBQVU7QUFDaEUsS0FBSywyQ0FBMkMsRUFBRSxVQUFVO0FBQzVELEtBQUssNENBQTRDLEVBQUUsVUFBVTtBQUM3RCxLQUFLLHlDQUF5QyxFQUFFLFVBQVU7QUFDMUQsS0FBSyw0Q0FBNEMsRUFBRSxVQUFVO0FBQzdELEtBQUssOENBQThDLEVBQUUsVUFBVTtBQUMvRCxLQUFLLDZDQUE2QyxFQUFFLFVBQVU7QUFDOUQsS0FBSywrQ0FBK0MsRUFBRSxVQUFVO0FBQ2hFLEtBQUsseUNBQXlDLEVBQUUsVUFBVTtBQUMxRCxLQUFLLDZCQUE2QixFQUFFLFVBQVU7QUFDOUMsS0FBSyx5QkFBeUIsRUFBRSxVQUFVO0FBQzFDOzs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlsxM119
