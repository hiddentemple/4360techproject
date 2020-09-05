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
  config.vm.network "forwarded_port", guest: 5432, host: 5432, host_ip: "127.0.0.1"


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
  
	echo Create and link directories
	mkdir _project
	ln -s /vagrant _project
	
	echo Create the file repository configuration
	sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

	echo Import the repository signing key
	wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
	
	echo Update the package lists
	sudo apt-get update
	
	echo Install postgresql
	# If a specific version is needed, use 'postgresql-12' or similar instead of 'postgresql':
	sudo apt-get install -y postgresql postgresql-contrib pgadmin4 postgresql-common

    echo Create vagrant super user role
    sudo -u postgres psql -c "CREATE ROLE vagrant WITH SUPERUSER CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD 'password'";
    echo SUPERUSER CREATED

    echo Copy in postgres configuration files
    cp /home/vagrant/_project/vagrant/db/pg_hba.conf /etc/postgresql/12/main/pg_hba.conf
    cp /home/vagrant/_project/vagrant/db/postgresql.conf /etc/postgresql/12/main/postgresql.conf

	echo Download and install nodeJS
	curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
	sudo apt-get install -y nodejs

	echo Install global NPM packages
	# Only packages which are *required* to be global go here. All other packages should be installed via package.json
	sudo npm install -g @angular/cli nx @nestjs/cli

	echo Install all application projects
	cd _project/vagrant/cs4360
	npm install
	cd ../..

	echo Completed :)

  SHELL
end
