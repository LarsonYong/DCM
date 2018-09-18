from ssh import ConnectSSH
from pexpect import pxssh
import argparse
import json
import time
import datetime


def main(ip, password):
    print '============= Connecting to unit : ' + ip + ' ================'
    success = False

    try:
        with ConnectSSH(ip, password) as c:
            # Check connected server
            cmd = ['uptime', 'df -h', 'initctl list |grep v5', 'last reboot|tail -10', 'tail -n 10 /v5/v5data/events/v5serviceRestart.event', 'cat /v5/.version', 'ifconfig |grep \'inet\\b\'', 'ls -lart /v5/.version', 'du -sh /v5/logs', 'du -mh --max-depth=2 /v5/video/999.4.0/2018/', 'du -mh --max-depth=2 /v5/video/999.18.0/2018/']
            ret = c.ssh_cmd(cmd)
            parsed = json.dumps(ret, indent=4, sort_keys=True)
            with open('py/output.json', 'wb') as f:
                f.write(parsed)

    except pxssh.ExceptionPxssh as e:
        print 'Unable to connect to ' + ip


def data_process(unitID):
    with open('py/output.json') as f:
        raw_data = json.load(f)
    ts = time.time()
    st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    data = {'uptime': get_uptime(raw_data['uptime']), 'last_reboot': get_lastReboot(raw_data['last reboot|tail -10']),
            'version': get_version(raw_data['cat /v5/.version'], raw_data['ls -lart /v5/.version']),
            'disk_usage': get_diskUsage(raw_data['df -h']),
            'service_status': get_services_status(raw_data['initctl list |grep v5']),
            'video_size': get_video_size(raw_data['du -mh --max-depth=2 /v5/video/999.4.0/2018/'],
                                         raw_data['du -mh --max-depth=2 /v5/video/999.18.0/2018/']),
            'log_size': get_v5log_size(raw_data['du -sh /v5/logs']), 'created_time': st,
            'service_event': get_service_event(raw_data['tail -n 10 /v5/v5data/events/v5serviceRestart.event']),
            'ip_interfaces': get_interf(raw_data['ifconfig |grep \'inet\\b\''])}
    data = json.dumps(data, indent=4, sort_keys=True)
    url = 'py/' +unitID + '.json'
    with open(url, 'wb') as f:
        f.write(data)


def get_uptime(data):
    uptime = data[0].split()[2: -7]
    str_uptime = ''
    for i in uptime:
        str_uptime = str_uptime + i
        str_uptime.replace(',', ' ')
    print "uptime:   "
    print str_uptime
    return str_uptime


def get_version(data1, data2):
    version = data1[0][-15:-11]
    modified_time = data2[0].split()[5] +' ' + data2[0].split()[6] +' ' +data2[0].split()[7]
    print version, modified_time
    return version, modified_time


def get_lastReboot(data):
    i, date = 0, 0
    for line in data:
        if 'reboot' in line:
            i += 1
            date = line.split()[5] + ' ' + line.split()[6] + ' ' + line.split()[7]
    print i, date
    return i, date


def get_diskUsage(data):
    ssdline = ''
    for i in data:
        if '/v5/video' in i:
            ssdline = i
    SSD_usage=[ float(ssdline.split()[3][:-1]), float(ssdline.split()[2][:-1])]
    FileSys_usage =[float(data[1].split()[3][:-1]), float(data[1].split()[2][:-1])]
    # FileSys_usage = [float(data[1].split()[3][:-1]), float(data[1].split()[2][:-1])]
    print SSD_usage, FileSys_usage
    return [SSD_usage, FileSys_usage]


def get_services_status(data):
    service_status = {}
    for line in data:
        if 'running' in line:
            service_status[line.split()[0]] = "Running"
        if 'waiting' in line:
            service_status[line.split()[0]] = "Stopped"
    print service_status
    return service_status


def get_video_size(data1, data2):
    low_def_size, high_def_size = {}, {}
    for line in data1:
        if len(line.split('\t')[1]) == 28:
            low_def_size[line.split('\t')[1][-5:]] = line.split('\t')[0]
    for line in data2:
        if len(line.split('\t')[1]) == 29:
            high_def_size[line.split('\t')[1][-5:]] = line.split('\t')[0]
    print low_def_size
    print high_def_size
    return low_def_size, high_def_size


def get_v5log_size(data):
    print data[0].split('\t')[0]
    return data[0].split('\t')[0]


def get_service_event(data):
    print data
    return data


def get_interf(data):
    interface_list = []
    for line in data:
        interface_list.append(line.split()[1][5:])
    print interface_list
    return interface_list


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--unitIP', help='unitIP',

                        required=True)
    parser.add_argument('-p', '--password', help='unit passwordself.s.before[lencmd:]',

                        required=True)
    parser.add_argument('-t', '--unitID', help='unitID',

                        required=True)
    args = parser.parse_args()
    password = args.password
    unitIP = args.unitIP
    unitID = args.unitID
    logfile = 'service'
    main(unitIP, password)
    data_process(unitID)
    print "Done"
