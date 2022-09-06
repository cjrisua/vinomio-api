from time import sleep
import psycopg2
import os
import subprocess
from datetime import datetime
from pytz import timezone
import filecmp

db_name = os.environ['POSTGRES_DB']
db_user = os.environ['POSTGRES_USER']
db_pass = os.environ['PGPASSWORD']
db_host =  os.environ['POSTGRES_HOST']
db_port = os.environ['POSTGRES_PORT']
#frequency = 18000 if os.environ['BACKUP_INTERVAL'] is None else os.environ['BACKUP_INTERVAL'] 
#/mnt/data/db
KEEP_ALL = 0

def purgeBackup(old_file,new_file):
    if filecmp.cmp(old_file,new_file) == True:
        os.remove(old_file)
    
def loadBackup(backup_file):
    ps = subprocess.Popen(
        ['psql', '-h', db_host, '-U', db_user, '-d', db_name, '-f', backup_file],
        stdout=subprocess.PIPE
    )
    output = ps.communicate()[0]
    for line in output.splitlines():
        print(line)

def getFileInfo(path):
    result={}
    result['path'] = path
    # file modification timestamp of a file
    m_time = os.path.getmtime(path)
    # file creation timestamp in float
    c_time = os.path.getctime(path)

    # convert timestamp into DateTime object
    result['modifiedOn'] = datetime.fromtimestamp(m_time)
    # convert creation timestamp into DateTime object
    result['createdOn'] = datetime.fromtimestamp(c_time)
    

    return result

#get last backup
data = [getFileInfo('/mnt/data/db/{}'.format(item)) for item in os.listdir("/mnt/data/db") if item.endswith(".sql")]
sorted_data=sorted(data, key=lambda i: i['modifiedOn'],reverse=True)
last_backup = sorted_data[0]['path']
print(f"Last backup: {last_backup}")

#Connecto to the database
db_string = 'postgres://{}:{}@{}:{}/{}'.format(db_user, db_pass, db_host, db_port, db_name)
print(db_string)
db = psycopg2.connect(db_string)
cursor = db.cursor()
cursor.execute("SELECT version();")
version = cursor.fetchone()
print(version)

cursor.execute("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'")
count = cursor.fetchone()

if len(count) > 0 and count[0] == 0:
    print("*** RECREATE DB from Backup! ****")
    print('loading {}'.format(last_backup))
    loadBackup(last_backup)

else:
    print("continue....") 

db.close()

while True:
    tz = timezone('EST')
    x = datetime.now(tz)
    new_backup=f'/mnt/data/db/postgres-backup-{x.strftime("%m%d%y%H%M%S")}.sql'
    print('Backing up %s database to %s' % (db_name, new_backup))
    ps = subprocess.Popen(
        ['pg_dump', '-h', db_host, '-U', db_user, '-d', db_name, '-f', new_backup],
        stdout=subprocess.PIPE)
    output = ps.communicate()[0]
    
    for line in output.splitlines():
        print(line)
    if KEEP_ALL == 0:
        purgeBackup(last_backup,new_backup)
    last_backup = new_backup
    
    sleep(3600)
