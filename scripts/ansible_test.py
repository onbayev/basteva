#!/usr/bin/env python

# import subprocess library
import subprocess
import json


out = subprocess.Popen(['ansible', '-m setup', 'localhost'], 
           stdout=subprocess.PIPE, 
           stderr=subprocess.STDOUT)

stdout,stderr = out.communicate()

print(stdout)
cut_string = json.loads(stdout)
print(cut_string)

