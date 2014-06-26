Allegiant Air QA Challenge
=========================================

1. The Intro
------------
This project is designed as a quick exercise to gauge a candidate's
understanding of testing

2. The Terms
------------
You may use the internet but only consult with Allegiant staff or recruiters for help.

3. Setting Up The Project
-------------------------

To run this project, up must first install VBox and Vagrant. The two can be found at the following links:

```
http://www.vagrantup.com/
https://www.virtualbox.org/wiki/Downloads
```
Once those programs are installed, clone this repository and change into it's directory. You should see a Vagrantfile. Follow the instructions to setup the server:

```
vagrant up
vagrant ssh
cd source
node app&
```

The server should then be running. Navigate to localhost:3333 in your web browser and you should see the main page. However, this is not the page you are testing. The web page you are testing is at:
```
localhost:3333/#/signup
```
You can run vagrant tests by logging into the vagrant box via:

```
vagrant ssh
```

and running

```
cd source
cucumber.js --format pretty

```

Good luck!

4. The Challenge
----------------

The page you are testing is:

http://localhost:3333/#/signup

Your challenge is to test validation of all fields in the sign up form using cucumber.js. You can go to the following url for help with :

https://github.com/cucumber/cucumber/wiki
https://github.com/admc/wd
https://github.com/admc/wd/blob/master/doc/api.md
https://github.com/cucumber/cucumber-js

Please put your feature files in source/features and answer the following questions.

```
  1) What do you think is the purpose of this form? What would you expect to happen?
  2) Create three (3) "positive paths" the lead to a successful "sign up".
  3) List all possible error messages for all required fields.
  4) What possible user interface considerations can be added?
```
5. Submission
---------------

If you don't already have a github account, please create one. Fork this project and start your work. When you are finished, please submit a pull request to this repo. Good Luck!!!

6. The Questions
================
If you have questions or need clarification on the project, please feel
free to send an email to your recruiting contact, and they will be happy
to assist you.

Available Gherkin Steps
=======================
Gherkin Default Steps (Primitive Steps)
When a string is in parenthesis such as in the step:

```
I (can | cannot) login
Then the step can be written as:
I can login
or
I cannot login

```

Also all double quotes need to be included. Strings within braces represent the type of data you are filling in. This is shown bellow in the example step:

```
I (can | cannot) login in as "{username}"
can be written as
I can login in as "Taylor"
or
I cannot login in as "Ben"

Some key words
{element} any html tag or element such as <a></a> or <input></input>, etc...
Then I should see "hello" in the "input" element

{link} any html link like <a href="some_url"></a>
Then I should see "Google" in the "a" element

```

Bellow are Gherkin steps that you can use to write your test cases. If you cannot find a step to write your test case, please consult with your QAE engineer to build a custom Gherkin step.
Defined Gherkin Steps

** Important
When you see a step beginning with 'When' you can substitute 'When' with 'And'
**

```
Given I am (on the | go to) the homepage
Given I (am on | go to) "{url}"
When I reload the page
When I move backward one page
When I move forward one page
When I press "{button}"
When I follow "{link}"
When I fill in "{field}" with "{value}"
When I fill in "{value}" for "{field}"
When I fill in "{field}" with: "{value}"
When I fill in the following:
    | {field 1} | {value 1} |
    | {field 2} | {value 2} |
    .
    .
When I (click | focus | choose | select) "field"
When I select "{value}" from "{selectbox}"
When I additionally select "{value}" from "{selectbox}"
When I check "{checkbox label}"
When I uncheck "{checkbox label}"
When I attach the file "{file_path}" to "{file_input}"
Then the (Url|URL|url) should match "{url}"
Then the response status code should be "{response_status_code}"
Then the response status code should not be "{response_status_code}"
Then I should see "{some text}"
Then I should not see "{some text}"
Then I should see text matching "{some text}"
Then I should not see text matching "{some text}"
Then the response should contain "{some text}"
Then the response should not contain "{some text}"
Then I should see "{some text}" in the "{element}" element
Then I should not see "{some text}" in the "{element}" element
Then the "{element}" element should contain "{some text}"
Then the "{element}" should not contain "{some text}"
Then I should see (a|an) "{element}" element
Then I should not see (a|an) "{element}" element
Then the "{field}" field should contain "{some text}"
Then the "{field}" field should not contain "{some text}"
Then the "{checkbox_label}" checkbox should be checked
Then the checkbox "{checkbox_label}" should not be checked
Then the checkbox "{checkbox_label}" (is|should be) checked
Then the "{checkbox_label}" checkbox should not be checked
Then the checkbox "{checkbox_label}" should (be unchecked|not be checked)
Then the checkbox "{checkbox_label}" is (unchecked|not checked)
Then I should see {number} "{element}" elements
Then the "{field}" field should have focus
Then the "{field}" field should not have focus
Then the "{button}" button should be (en|dis)abled
Then I search "{text of some dom node}" and I click "{text of next closest dom node}"
Then the document title should be "{what the html title needs to be}"
Then the document title should not be "{what the html title should not be}"
Then the "{field}" field should exist
Then the "{field}" field should not exist

```

Confidentiality Notice
======================

Please do not redistribute or make this project public.

This email message, including any attachments, is for the sole use of
the intended recipienti\(s\) and may contain confidential or legally 
priviledged information.  Any unauthorized review, use, disclosure or
distribution is prohibited.  If you are not the intended recipient, please
contact the sender by reply email and destroy all copies of this 
original message.


**G4-Plus-Vagrant**

This virtual machine contains the following software:

 - OS - Ubuntu 14.04, 64 bit
 - nodejs and dependencies

Installation
==============
Download and install dependencies required during installation:

 * [VirtualBox](https://www.virtualbox.org/wiki/Downloads) - 4.3.8 version
 * [Vagrant](http://www.vagrantup.com/downloads.html) - **1.6.x** version at least
 * [Vagrant Vbguest](https://github.com/dotless-de/vagrant-vbguest) `vagrant plugin install vagrant-vbguest` - Not on linux hosts


    ```
    cd vagrant-test-qa
    vagrant up
    ```

Vagrant will automatically download for you the necessary software and initialize the setup process.

The machine will be accessible at the fixed IP address `192.168.99.99`


Machine environment
===================

Upon bootstraping the machine, there will be two mountpoints. From this folder inside vagrant the following mapping
takes place:

 * **source** to **/home/vagrant/source/**
 * **manifests** to **/tmp/vagrant-puppet/manifests**

Working inside the machine, the projects should be checked out inside the **source**.
Application Access
==================
Port 3333 is forwarded to the physical machine, so one can test the application from other machines as well, by accessing http://physical-machine-ip:3333 (if there are no firewall restrictions on the physical machine for that port)

Windows Issues
==============
If running Vagrant with Cygwin and you are having issues with npm install check the following 2 links: (second issue may happen after the first fix)

 * http://snowandbones.com/2013/12/11/vagrant-1-4-0-windows-7-and-symbolic-links/
 * http://geekcredential.wordpress.com/2013/09/05/vagrant-up-fails-with-vboxmanage-exe-error-code-co_e_server_exec_failure-0x80080005/


Troubleshooting
==============
If, during the initial up, the machine times out after displaying `Error: Connection timeout. Retrying` you should take the following steps.
- Open Virtualbox
- Poweroff test-qa.allegiant.com through virtualbox's interface, then pover it on from the same place
- Once it booted up, login using vagrant/vagrant, then run `sudo poweroff` from its console
- Return to the console where you originally ran `vagrant up` and run `vagrant up --provision`

**Known Issue Mac OS X 10.9.2, Mavericks**

 1. If using latest VirtualBox (4.3.10) and vagrant 1.5.2 you may experience freeze of the virtual machine on first bootup. In this case you need to stop the virtual machine and then reinit the initialization process.

 2. If connection to the virtual machine (ping 192.168.99.99) is not working properly you may need to restart the VirtualBox networking:
    ```
    sudo /Library/Application\ Support/VirtualBox/LaunchDaemons/VirtualBoxStartup.sh restart
    ```
 3. If your machine hangs up at mounting nfs, you can go into your Vagrantfile change the following in all the lines:

 :nfs to :nat
