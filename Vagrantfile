Vagrant.configure("2") do |config|
  config.vm.box = 'ubuntu64-14.04'
  config.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"
  config.vm.provider "virtualbox" do |v|
    #v.gui = true
    v.customize ["modifyvm", :id, "--memory", "2048", "--name", "test-qa.allegiant.com"]
  end
  config.vm.hostname = "test-qa.allegiant.com" #fix fqdn warning
  config.vm.provision :puppet do |puppet|
    #puppet.options = "--verbose --debug"
  end
  #config.vm.provision :shell, :path => "bootstrap.sh"

  config.vbguest.auto_update = false if config.respond_to?(:vbguest=)

  config.vm.network "private_network", ip: "192.168.99.99"
  config.vm.network :forwarded_port, guest: 3333, host: 3333
  config.vm.network :forwarded_port, guest: 3000, host: 3000
  config.ssh.forward_agent = true

  config.vm.synced_folder ".", "/vagrant", disabled: true

  config.vm.synced_folder "./source", "/home/vagrant/source", :nfs => true
  config.vm.synced_folder "./manifests", "/tmp/vagrant-puppet/manifests", :nfs => true

end
