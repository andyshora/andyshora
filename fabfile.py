from __future__ import with_statement
from fabric.api import *
from fabric.contrib.console import confirm

env.roledefs = {
    'test': ['andy@176.58.118.231:23456'],
    'prod': ['andy@176.58.115.154:23456']
}

def test():
    code_dir = '/home/andy/py'
    with cd(code_dir):
        run("uname -n")

def input():
    foo=raw_input('Please enter a value:')
    print "you entered ", foo

def js():
    local('sudo java -jar compiler.jar --js=public_html/js/main.js --js_output_file=public_html/js/main.min.js');

# push repo to test environment        
def push_test():
    local('sudo git push test')

# push repo to production environment        
def push_prod():
    conf = raw_input('Are you sure you want to push to production? ')
    if conf == 'yes' or ans == 'y':
        local('sudo git push prod')
    else:
        print "Exiting"

def cron_log():
    run('cat ~/log/cron.log')

def list_rules():
    run('sudo iptables -L')

def list_jobs():
    run('sudo cat ls /var/spool/cron/crontabs/root')

#block ip: sudo fab -R prod block_ip:ip=209.85.224.96
#sudo fab -R prod block_ip:117.206.154.104
#sudo fab -R prod block_ip:117.206.144.214  
#sudo fab -R prod block_ip:87.126.253.97

def block_ip(ip):
    print("Blocking ip: %s" % ip)
    run("sudo iptables -I INPUT 7 -s %s -j DROP" % ip)
    run("sudo sh -c 'iptables-save>/home/andy/iptables.rules'")

def restart_nginx():
    run('sudo /etc/init.d/nginx restart')

def restart_php():
    run('sudo /etc/init.d/php5-fpm restart')

def access_log(str):
    run("sudo grep %s /var/log/nginx/access.log.1" % str)
