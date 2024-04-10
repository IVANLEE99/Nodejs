/**
 * 1、安装
 * https://learnku.com/docs/environment-setup/install-nvm-under-mac/3132
 * 
 * 2、https://github.com/nvm-sh/nvm
 * 
 * 
 * 

 * nvm ls-remote

 * 
 * nvm list 
 * 
 * nvm install latest
 * 
 * nvm uninstall latest
 * 
 * nvm use latest
 * 
 * 
 * 
 * 
 * Usage
To download, compile, and install the latest release of node, do this:

nvm install node # "node" is an alias for the latest version
To install a specific version of node:

nvm install 14.7.0 # or 16.3.0, 12.22.1, etc
The first version installed becomes the default. New shells will start with the default version of node (e.g., nvm alias default).

You can list available versions using ls-remote:

nvm ls-remote
And then in any new shell just use the installed version:

nvm use node
Or you can just run it:

nvm run node --version
Or, you can run any arbitrary command in a subshell with the desired version of node:

nvm exec 4.2 node --version
You can also get the path to the executable to where it was installed:

nvm which 12.22
In place of a version pointer like "14.7" or "16.3" or "12.22.1", you can use the following special default aliases with nvm install, nvm use, nvm run, nvm exec, nvm which, etc:

node: this installs the latest version of node
iojs: this installs the latest version of io.js
stable: this alias is deprecated, and only truly applies to node v0.12 and earlier. Currently, this is an alias for node.
unstable: this alias points to node v0.11 - the last "unstable" node release, since post-1.0, all node versions are stable. (in SemVer, versions communicate breakage, not stability).

 * 
 */