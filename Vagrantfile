# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 4200, host: 8080
  # config.vm.network "forwarded_port", guest: 3333, host: 8090

  # Creates a forwarded port mapping, which allows access to a specific port 
  # within the guest machine; from a port on the host machine and only allows access
  # via 127.0.0.1 to disable public access
  config.vm.network "forwarded_port", guest: 4200, host: 8080, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 3333, host: 8090, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Enable provisioning with a shell script. Additional provisioners such as
  # Ansible, Chef, Docker, Puppet and Salt are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
	mkdir _project
	ln -s /vagrant _project
	sudo wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
	sudo echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
	sudo apt-get update
	sudo apt-get install -y mongodb-org
	curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
	sudo apt-get install -y nodejs
	sudo npm install -g -y @angular/cli express prettier create-nx-workspace tslib yarn gulp nx @nestjs/cli @nrwl/nest @nrwl/workspace @nrwl/angular @nrwl/schematics
	sudo systemctl start mongod
	#change to trusted ip location instead of broad access
	#sudo ufw allow from {other-server-ip}/32 to any port 27017
	sudo ufw allow 27017
  SHELL
end
