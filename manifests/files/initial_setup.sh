#!/bin/bash

cd

if [ -f ~/vpn-credentials.cfg ] ; then
	echo "Vpn config file already exists"
else
	echo -n "Please enter your Allegiant username:"
	read allegiant_username
	echo -n "Please enter your Allegiant password:"
	unset allegiant_password
	while IFS= read -p "$prompt" -r -s -n 1 char
	do
		if [[ $char == $'\0' ]]
		then
			break
		fi

		if [[ $char == $'\177' ]]
		then
			prompt=$'\b \b'
			allegiant_password="${allegiant_password%?}"
		else
			prompt='*'
			allegiant_password+="$char"
		fi
	done

	echo "username=$allegiant_username
userpass=$allegiant_password" > ~/vpn-credentials.cfg
	echo ""
        fullname=`echo $allegiant_username | sed 's/\./ /g'`
        fullname=`echo $fullname | sed -e 's/\b\(.\)/\u\1/g'`
        git config --global user.name "$fullname"
fi

sudo service os-api stop >/dev/null 2>&1

if [ -d ~/source/os-api ] && [ -f ~/.ssh/id_rsa.pub ] ; then
	echo "The os-api and the SSH key already exist"
else

	if [ -f ~/.ssh/id_rsa.pub ] ; then
		echo "SSH key already generated"
	else
		echo -n "Please input your email adress:"
		read email_address

		ssh-keygen -N "" -q -C $email_address -f /home/vagrant/.ssh/id_rsa
		git config --global user.email "$email_address"

	fi

	echo "
Are you already connected to the Allegiant network?
If not start the vpn service (will also require configuring a proxy on one of your browsers)
(c) Already Connected
(v) Start Vpn service
"
	read start_vpn
	if [ "$start_vpn" = 'v' ] || [ "$start_vpn" = 'V' ]
	then
		echo "Please wait while connecting"
		sudo service vpn start
		sleep 10
		echo "Connected"

		proxy_done='n';

		confirmation_vpn() {
			echo "Continue? y/n"
			read continue_setup_vpn

			proxy_done=$continue_setup_vpn;

		}
		echo "
Please continue after configuring the proxy on one of your browsers
( Set 192.168.99.99 as the HTTP Proxy, 3128 as the port, and use the same proxy for all protocols )
"
		while [ "$proxy_done" != 'y' ]; do
		confirmation_vpn #loop execution
		done
	else
		echo ""
	fi

	echo "
Update your git account ( https://git.allegiantair.com:8443/plugins/servlet/ssh/account/keys ) with the key below
--------------------------------------------------

"

	cat ~/.ssh/id_rsa.pub

	echo "
--------------------------------------------------
"

	git_done='n';

	confirmation_git() {
		echo "Continue? y/n"
		read continue_setup_git

		git_done=$continue_setup_git;

	}

	while [ "$git_done" != 'y' ]; do
	confirmation_git #loop execution
	done

	cd ~/source

	if [ -d ~/source/os-api ] ; then
		echo "os-api repo already cloned"
	else

		git clone ssh://git@git.allegiantair.com:7999/g4ptl/os-api.git
		cd os-api/
        make clean && make build

	fi

fi

sudo -u vagrant cp -f /home/vagrant/source/os-api/app/config/example_local.yml /etc/G4PLUS/local.yml
sudo -u vagrant cp -f /home/vagrant/source/os-api/app/config/example_sso.json /etc/G4PLUS/sso.json
sudo sed -i 's/ignore_tls_errors:.*/ignore_tls_errors: 1/' /etc/G4PLUS/local.yml

sudo service os-api start
sudo service selenium start

sudo cp /tmp/vagrant-puppet/manifests/files/motd /etc/motd


