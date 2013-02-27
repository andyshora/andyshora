from __future__ import with_statement
from fabric.api import *
from fabric.contrib.console import confirm
from fabric.colors import *
import random, string

env.roledefs = {
    'test': ['andy@176.58.118.231:23456'],
    'prod': ['andy@176.58.115.154:23456']
}

def test():
    print random_string(8)

def random_string(len):
    char_set = string.ascii_lowercase
    return  ''.join(random.sample(char_set, len))

# push repo to test environment, and optionally minify main.js files and replace reference 
def push_test():
    local('sudo git push test')
    minify_js('main.js', random_string(8)+'.min.js', '/var/www/andyshora/', '/var/www/andyshora/public_html/*.html');

#sudo fab minify_js:inp=main.js,out=main.min.js,path=/var/www/andyshora/
def minify_js(inp='', out='', path='', infiles='/var/www/andyshora/public_html/hbfeqbfhefb.html'):
    conf = raw_input('Do you want to minify js code?')
    if conf == 'yes' or conf == 'y':
        run("sudo java -jar %scompiler.jar --js=%spublic_html/js/%s --js_output_file=%spublic_html/js/%s" % (path,path,inp,path,out))
        print(cyan("Minification complete."))
        replace_references(inp, out, infiles)
    else:
        print(red("Exiting without minifying js."))

# replace occurences of a string in files, for example, replacing an uncompressed file with a minified version post deployment
def replace_references(inp, out, infiles):
    run("sudo perl -pi -e 's/%s/%s/g' %s" % (inp,out,infiles))
    print(cyan("References to %s replaced with %s in %s" % (inp, out, infiles)))


# push repo to production environment        
def push_prod():
    conf = raw_input('Are you sure you want to push to production? ')
    if conf == 'yes' or conf == 'y':
        local('sudo git push prod')
        minify_js('main.js', random_string(8)+'.min.js', '/var/www/andyshora/', '/var/www/andyshora/public_html/*.html');
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
