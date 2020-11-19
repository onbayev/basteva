import datetime
import time
import requests  # Install this if you don't have it already.

PROMETHEUS = 'http://localhost:19090/'

# Midnight at the end of the previous month.
end_of_month = datetime.datetime.today().replace(day=1).date()
# Last day of the previous month.
last_day = end_of_month - datetime.timedelta(days=1)
duration = '[' + str(last_day.day) + 'd]'
nodes = ['s1361.j', 's1362.j', 's1363.j']
interval = '10d'
query = ('100 * (1 - (avg('
                            'avg_over_time(node_memory_MemFree_bytes{instance=~"'+'|'.join(nodes)+'"}['+interval+'])'
                            '+ avg_over_time(node_memory_Cached_bytes{instance=~"'+'|'.join(nodes)+'"}['+interval+'])' 
                            '+ avg_over_time(node_memory_Buffers_bytes{instance=~"'+'|'.join(nodes)+'"}['+interval+'])'
                        ')' 
                        '/ avg(avg_over_time(node_memory_MemTotal_bytes{instance=~"'+'|'.join(nodes)+'"}['+interval+']))))'
        )
query = 'avg(100 * (1 - avg by(instance)(irate(node_cpu_seconds_total{mode="idle",instance=~"'+'|'.join(nodes)+'"}['+interval+']))))'
print(query)                    

response = requests.get(PROMETHEUS + '/api/v1/query',
  params={
    'query': query,
    #'query': 'rate(node_disk_io_time_seconds_total{instance="backup1.kb30.btsdapps.net"}[30d]) * 100',
    #'query': 'sum by (job)(increase(process_cpu_seconds_total{instance="s1730.j"}' + duration + '))',
    'time': time.mktime(datetime.datetime.today().date().timetuple())})
print(response.json())
results = response.json()['data']['result']

print('{:%B %Y}:'.format(last_day))
for result in results:
  print(result["value"][1])
  #print(' {metric}: {value[1]}'.format(**result))
