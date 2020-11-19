#!/bin/bash

cwd=$(pwd)

if ! command -v ansible >/dev/null; then
        echo "Installing Ansible dependencies and Git."
        if command -v yum >/dev/null; then
                sudo yum install -y ansible git
        elif command -v apt-get >/dev/null; then
                sudo apt-get update -qq
                sudo apt-get install -y -qq git 
                sudo apt install -y -qq software-properties-common
                sudo apt-add-repository --yes --update ppa:ansible/ansible
                sudo apt install -y -qq ansible
        else
                echo "neither yum nor apt-get found!"
                exit 1
        fi
fi
