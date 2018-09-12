from ssh import ConnectSSH
from pexpect import pxssh
import argparse


def main(ip, passward):
    pass



def execCmd(ip, password, cmdlist):
    print '============= Connecting to unit : ' + ip + ' ================'
    success = False

    try:
        with ConnectSSH(ip, password) as c:
            # Check connected server
            while i < len(cmdlist):
                output = c.ssh_cmd(cmdlist[i])
                print output


    except pxssh.ExceptionPxssh as e:
        print 'Unable to connect to ' + ip




if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--unitIP', help='unitIP',

                        required=True)
    parser.add_argument('-p', '--password', help='unit password',

                        required=True)
    args = parser.parse_args()
    password = args.password
    unitIP = args.unitIP
    logfile = 'service'
    main(unitIP, password)