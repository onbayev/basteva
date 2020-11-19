#!/usr/bin/env python

import os
import consul
import json
import sql

import psycopg2
conn = psycopg2.connect(dbname='infra', user='infra', 
                        password='ump2.fifteen', host='localhost')
cursor = conn.cursor()

c = consul.Consul(host='consul.qshy.btsdapps.net', port=8500)
_, nodes = c.catalog.nodes()


def jd(a):
    v = json.dumps(a)
    if v == 'null':
        return None
    else:
        return v 

for node in nodes:
    print(node)
    with conn.cursor() as cursor:
        print(type(node['TaggedAddresses']))
        print(jd(node["TaggedAddresses"]))
        conn.autocommit = True
        #cursor.execute("INSERT INTO instance (consul_id, node, address, datacenter, taggedAddresses, meta, createIndex, modifyIndex) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",(node["ID"], node["Node"], node["Address"], node["Datacenter"], jd(node["TaggedAddresses"]), jd(node["Meta"]), node["CreateIndex"], node["ModifyIndex"]))


