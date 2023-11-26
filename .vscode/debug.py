#!/usr/bin/env python
# -*- coding:utf-8 -*-

'''
Author       : ougato
Date         : 2022-01-07 19:00:20
LastEditors  : ougato
LastEditTime : 2022-01-07 21:57:23
FilePath     : /gamealpha/.vscode/debug.py
Description  : 
'''

import json
import os
import re

COMMAND_PATH = os.getcwd()
CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))

os.chdir(os.path.dirname(os.path.realpath(__file__)))

LOG_PATH = os.path.realpath(os.path.join(CURRENT_PATH, "..", "..", "..", ".." , "..", "..", "Logs"))
LAUNCH_FILE_PATH = os.path.realpath(os.path.join(CURRENT_PATH, "launch.json"))
LOG_2_FILE_NAME = "MW_2.log"
LOG_3_FILE_NAME = "MW_3.log"
SERVER_TAG = "Command Line:  -server"
CLIENT_TAG = "Command Line:  -client"
SERVER_NAME = "Server"
CLIENT_NAME = "Client"

server_port = None
client_port = None

def find_port(content):
    port = None
    pattern = r"Script Debug Port (\d+)"
    result = re.findall(pattern, content)
    if len(result) > 0:
        port = result[0]
    return port

def init_port(file_path):
    global server_port
    global client_port
    file = open(file_path, "r", encoding="utf-8")
    content = file.read()
    if content.find(SERVER_TAG) != -1:
        server_port = find_port(content)
        # print("server %s: %s" % (os.path.basename(file_path), server_port))
    elif content.find(CLIENT_TAG) != -1:
        if client_port == None:
            client_port = find_port(content)
        # print("client %s: %s" % (os.path.basename(file_path), client_port))
    else:
        print("%s 不是一个 Client/Server 文件" % file_path)
        exit(-1)
    file.close()

def update_port():
    file = open(LAUNCH_FILE_PATH, "r", encoding="utf-8")
    content = file.read()
    file.close()

    json_config = json.loads(content)
    configurations = json_config["configurations"]
    for i in range(len(configurations)):
        name = configurations[i]["name"]
        if name == SERVER_NAME:
            configurations[i]["port"] = int(server_port)
        elif name == CLIENT_NAME:
            configurations[i]["port"] = int(client_port)

    file = open(LAUNCH_FILE_PATH, "w", encoding="utf-8")
    file.write(json.dumps(json_config, indent=4))
    file.close()

def find_log():
    file_list  = os.listdir(LOG_PATH)

    for i in range(len(file_list)):
        file_name = file_list[i]
        pattern = r"MW_2.log"
        pattern2 = r"MW_3.log"
        if re.search(pattern, file_name) != None or re.search(pattern2, file_name) != None:
            init_port(os.path.join(LOG_PATH, file_name))

def main():
    find_log()

    print("")
    print("client: %s first window" % (client_port))
    print("server: %s" % (server_port))

    update_port()

if __name__ == "__main__":
    main()
