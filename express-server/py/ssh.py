import sys
from pexpect import pxssh
import time


class ConnectSSH:
    def __init__(self, unitIP, password):
        self.unitIP = unitIP
        self.password = password

        return

    def __enter__(self):
        print "Connecting to %s" % self.unitIP
        sys.stdout.flush()

        try:
            s = pxssh.pxssh()
            s.login(self.unitIP, 'root', self.password, port=10022, login_timeout=10)
            print ("Connected")
            sys.stdout.flush()
        except pxssh.ExceptionPxssh, e:
            print 'SSH failed on login.'
            print str(e)
            sys.stdout.flush()
            raise Exception('SSH failed on login.')

        self.s = s
        return self

    def ssh_cmd(self, cmdlist, time_out=60, prompt=''):
        # self.logfile.write(cmd + '\n')
        time.sleep(1)

        try:
            self.s.setecho(False)
            i = 0
            outputs = {}
            while i < len(cmdlist):
                print (i)
                self.s.sendline(cmdlist[i])
                self.s.prompt(timeout=time_out)
                print("*********************************")
                print (self.s.before)
                lencmd = len(cmdlist[i]) + 2
                result = self.s.before[lencmd:].splitlines()

                outputs[cmdlist[i]] = result
                i += 1

        except pxssh.ExceptionPxssh, e:
            print 'Timed out.'
            print str(e)
            sys.stdout.flush()
            raise Exception('SSH command failed.')

        # self.logfile.write(self.s.before)
        return outputs

    def __exit__(self, exc_type, exc_val, exc_tb):
        print 'Exiting. '
        sys.stdout.flush()

        # self.logfile.write('-' * 80 + '\n')
        try:
            self.s.logout()
        except:
            pass
