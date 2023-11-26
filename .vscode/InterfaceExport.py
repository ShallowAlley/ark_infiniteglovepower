#!/usr/bin/env python
# -*- coding:utf-8 -*-

'''
Author       : ougato
Date         : 2022-01-07 19:00:20
LastEditors: your name
LastEditTime: 2022-03-10 19:12:21
FilePath: \nonstop\.vscode\InterfaceExport.py
Description  : 
'''

import json
import os
import re
import string
from ast import And, For, If
from importlib.resources import path
from itertools import count

COMMAND_PATH = os.getcwd()
CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))

os.chdir(os.path.dirname(os.path.realpath(__file__)))


proxyStr="export class ModuleBase {\n\tprotected moduleMap_Type: Map<string, any> = new Map();\n";
pathMap={}

def parseLine(line):
    line=line.replace("public","");
    line=line.replace("//exporti","");
    line=line.replace("{","");
    line=line.replace(";","");
    line=line.replace("async","");
    line=line.rstrip()
    line=line.lstrip()
    return line

def find_port(name):
    global pathMap
    name=name.strip()

    isClient=name.find("_C")>0
    classKey="export class "+name;
    endKey="//end"
    isStart=False;

    path="..\JavaScripts/"+pathMap[name]+".ts"
    if not  os.path.exists(path):
        return ""
    file = open(path, "r", encoding="utf-8")
    content = file.read()
    result=content.split("\n")
    cnt=0
    ret= "export interface I"+name+" {\n"
    for line in result:
        
        if isStart and line.find("//exporti")>0:
            cnt=cnt+1
            ret=ret+"\t"+(parseLine(line)+";\n")

        if isStart and line.find(endKey)>=0:
            break;

        if line.find(classKey)>=0:
            isStart=True
            if isClient:
                dataType=line[line.find("<")+1:line.find(">")]
                tdata=dataType.split(",")
                dataStr=tdata[1].lstrip();
                dataStr=dataStr.rstrip();
                # if dataStr!="EmptyDataHelper":
                #     ret=ret+"\tget data():"+dataStr+";\n"
        

    if cnt==0 and not isClient:
        return ""
    ret=ret+"}\n"

    global proxyStr
    last=name[1:]
    propertyName=name[0].lower()+last

    proxyStr=proxyStr+"\tget "+propertyName+"(): I"+name+" {\n\t\treturn this.moduleMap_Type.get(\""+name+"\");\n\t}\n"

    return ret
    





def main():
    file = open("..\JavaScripts/GameLauncher.ts", "r", encoding="utf-8")
    content = file.read()
    result=content.split("\n")
    fileStr=""
    global pathMap
    for line in result:
        if not line:
            continue
        if str.find(line,"import {")>=0:
            line=line.replace("import {","");
            arr2=line.split("from");
            classs=arr2[0].replace("{","")
            classs=classs.replace("}","")
            clsArr=classs.split(",");
            path=arr2[1].replace('"',"")
            path=path.replace(';',"")
            path=path.replace('./',"")
            path=path.lstrip();
            path=path.rstrip();
            for one in clsArr:
                one=one.lstrip();
                one=one.rstrip();
                pathMap[one]=path
       
        if str.find(line,"this.registerModule(")>0:
            line=line.replace("this.registerModule(","");
            line=line.lstrip()
            lineArr=line.split(",");
            if lineArr:
                fileStr=fileStr+find_port(lineArr[0])
                fileStr=fileStr+find_port(lineArr[1])

    global proxyStr
    proxyStr=proxyStr+"}\n"

    #import
    importStr=open(".\import.txt", "r", encoding="utf-8").read()+"\n"
    
    tfile = open("..\JavaScripts/module/ModuleSevers/ModuleInterface.ts", "w+", encoding="utf-8")
    tfile.write(importStr+fileStr+proxyStr)
    tfile.close()

if __name__ == "__main__":
    main()
