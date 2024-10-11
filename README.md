# Installation guide
```
Author: Luke Bhangyi
Position: Senior Software Developer
Skills: C#, Java, c++, PHP, Spring Boot, Themeleaf, React, Angular, Ironic, MS Sql Server, Oracle, MySQL, Postgress, sqlite
```
## Preriquisites
Before we start to install anything on the server, we need to update the system packages to the latest versions available:
```
sudo apt update -y && sudo apt upgrade -y
```
1. Installing Java SE 21
   
   In Ubuntu 24.04, the default Java development repository is set to Java 21. So, there is no need to download the repo, adding GPG keys manually. We can install Java Development Kit 21 with the following command:
   ``` 
   sudo apt install openjdk-21-jdk -y
   ```
   Once installed, we can check the Java version with the command below:
   ```
   java -version
   ```
   The confirmation results will look like below
   ```
   openjdk version "21.0.4" 2024-07-16
   OpenJDK Runtime Environment (build 21.0.4+7-Ubuntu-1ubuntu224.04)
   OpenJDK 64-Bit Server VM (build 21.0.4+7-Ubuntu-1ubuntu224.04, mixed mode, sharing)
   ```
   You can follow [How to Install Java 21 on Ubuntu 24.04](https://www.rosehosting.com/blog/how-to-install-java-21-on-ubuntu-24-04/) to install the Oracle Java version.
   On a system with multiple Java versions, you can change the active version very easily. To do that, execute the following command:
   ```
   sudo update-alternatives --config java
   ```
3. Installing Apache Maven
   
   ```
   sudo apt-get install maven -y
   ```
   The confirmation results will look like below
   ```
   Apache Maven 3.8.7
   Maven home: /usr/share/maven
   Java version: 21.0.4, vendor: Ubuntu, runtime: /usr/lib/jvm/java-21-openjdk-amd64
   Default locale: en_US, platform encoding: UTF-8
   OS name: "linux", version: "6.8.0-45-generic", arch: "amd64", family: "unix"
   ```
4. Installing Node
   
   To install dependecies we run the command:
   ```
   sudo apt install curl apt-transport-https ca-certificates gnupg
   ```
   Then we install node using the command below
   ```
   sudo apt install nodejs -y
   ```
   The verification output will look like below
   ```
   #node -v
   v18.19.1
   ```
## Front-End
## Back-End
1. Open the folder ``dfcu-staff-service`` in your favourite IDE. I used VSCode.
2. In the command prompt, change directory to ``` dfcu-staff-service ``` and run the following commands.
3. To comoile the project run the command:
   ```
   mvn compile
   ```
   After the compile command completes and there are no errors, run the command bellow to create a runnable war file.
   ```
   mvn package
   ```
   this will generate the runnable jar file at the path ``target/dfcu-staff-servise-0.0.1-SNAPSHOT.jar``. This file can be run as a standalone application using the command:
   ```
   java -jar dfcu-staff-servise-0.0.1-SNAPSHOT.jar
   ```
   and it will run the imbedded apache server on port 9090. You can also provide a different port number as a parameter to the ``java -jar`` as follows:
   ``
   java -jar dfcu-staff-servise-0.0.1-SNAPSHOT.jar --server.port=80
   ``
   the above command will run the back-end service on a different command.
   ``
   You cam also host this application using apache tomcat, Oracle Weblogic, Wildfly or any other java compliant web server
   ``
