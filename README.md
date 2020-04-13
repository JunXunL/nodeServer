# 1、GitHub创建nodejs仓库，nodeserver
# 2、本地拉取nodeserver
# 3、初始化nodejs服务，在nodeserver下，打开命令行，输入：npm init
# 4、安装package.json中的插件，在nodeserver下，打开命令行，输入：npm install
# 5、全局安装express命令安装工具，输入命令： npm install -g express-generator
# 6、再安装express框架，输入命令： npm install -g express
# 7、安装成功后就可以使用express框架构建项目了，如输入命令： express nodeServer -e 创建项目
  ## 如果返回信息： express : 无法加载文件 D:\softZyl\nvm\v10.18.0\node_global\express.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
  ## 解决方法：
  ### 1）打开终端：win10系统中进去PowerShell的路径,依次点击“C:\WINDOWS\System32\WindowsPowerShell”,第二步继续点击V1.0文件夹,找到powershell.exe,以管理员身份打开PowerShell.exe
  ### 终端：C:\Windows\System32\WindowsPowerShell\v1.0>
  ### 2）在终端执行：get-ExecutionPolicy   ，显示Restricted（表示状态是禁止的）
  ### 3）在终端执行：set-ExecutionPolicy RemoteSigned
  ### 4）如果返回信息是： set-ExecutionPolicy : 对注册表项“HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PowerShell\1\ShellIds\Microsoft.PowerShell”的访问被拒绝。 要更改默认(LocalMachine)作用域的执行策略，请使用“以管理员身份运行”选项启动 Windows PowerShell。要更改当前用户的执行策略，请运行 "Set-Execution Policy -Scope CurrentUser"。
  ### 5） 再在终端执行： Set-ExecutionPolicy -Scope CurrentUser
  ### 返回信息： 位于命令管道位置 1 的 cmdlet Set-ExecutionPolicy
  ###           请为以下参数提供值:
  ###           ExecutionPolicy: RemoteSigned
  ###           执行策略更改
  ###           执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
  ###           [Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”): Y
  ### 7） 再在终端执行： get-ExecutionPolicy   ，显示RemoteSigned（修改成功）
## 8、再cd 进入该目录，输入命令：npm install 安装组件
## 9、最后执行命令：npm start 启动项目，http://localhost:3000/
## 
## 11、拉取项目到本地，运行： npm install 安装组件后，运行： npm start
## 12、
## 13、

