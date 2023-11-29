
import json
import os
import re
import string
from ast import And, For, If, IfExp
from importlib.resources import path
from itertools import count

COMMAND_PATH = os.getcwd()
CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))

os.chdir(os.path.dirname(os.path.realpath(__file__)))

parseFileKey = {
    "asset": 1,
    "hair": 1,
    "shape": 1,
    "uppercloth": 1,
    "gloves": 1,
    "lowercloth": 1,
    "shoe": 1

}
parseApiKey = {
    "setHeadMesh": 1,
    "setFrontHairMesh": 1,
    "setBehindHairMesh": 1,
    "setUpperClothMesh": 1,
    "setGlovesMesh": 1,
    "setLowerClothMesh": 1,
    "setShoeMesh": 1
}


guidMap = {}


def parseLine(line):
    line = line.replace("public", "")
    line = line.replace("//exporti", "")
    line = line.replace("{", "")
    line = line.replace(";", "")
    line = line.replace("async", "")
    line = line.rstrip()
    line = line.lstrip()
    return line


def find_port(path):
    global guidMap
    global parseApiKey

    if not os.path.exists(path):
        return ""
    file = open(path, "r", encoding="utf-8")
    content = file.read()
    content = content.replace("\ufeff", "")
    contentdata = json.loads(content)
    jsonData = json.loads(contentdata["CustomData"])

    realData = json.loads(jsonData["realData"])

    for item in realData:
        if item["apiName"] in parseApiKey:
            guidMap[item["value"]] = 1


def all_path(dirname):
    global parseFileKey
    result = []
    for maindir, subdir, file_name_list in os.walk(dirname):
        print("1:", maindir)  # 当前主目录
        print("2:", subdir)  # 当前主目录下的所有目录
        print("3:", file_name_list)  # 当前主目录下的所有文件
        for filename in file_name_list:
            arr = filename.split(".")
            ext = arr[len(arr)-1]
            if parseFileKey.__contains__(ext):
                apath = os.path.join(maindir, filename)  # 合并成一个完整路径
                result.append(apath)
    return result


def main():
    global guidMap
    allFiles = all_path("../Character/")

    for line in allFiles:
        find_port(line)

    result = ""
    for key in guidMap.keys():
        if result:
            result = key+","+result
        else:
            result = key

    print(result)


if __name__ == "__main__":
    main()
