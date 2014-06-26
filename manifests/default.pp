exec { "apt-update":
    command => "/usr/bin/apt-get update"
}

Exec["apt-update"] -> Package <| |>

package { 'mc':
    ensure => present,
}

package { ['nodejs', 'npm']:
    ensure => present,
}

file { '/usr/local/bin/node':
    ensure => 'link',
    target => '/usr/bin/nodejs',
    require => Package['nodejs'],
}

package { 'git':
    ensure => "present",
}

exec { 'npm-packages':
    command => 'npm --registry http://registry.npmjs.eu/ install -g brunch bower forever chromedriver coffeelint protractor cucumber',
    path => "/usr/bin/:/bin/:/sbin/:/usr/local/bin",
    require => [Package['git'], File['/usr/local/bin/node'], Package['npm']]
}

exec { 'selenium-install':
    command => "sudo webdriver-manager update --standalone",
    path => "/usr/bin/:/bin/:/sbin/",
    require => Exec['npm-packages'],
}

exec { 'selenium-service':
    command => "cp -f /tmp/vagrant-puppet/manifests/files/selenium.conf /etc/init/selenium.conf",
    path => "/bin/",
    require => Exec['selenium-install'],
}

service { 'selenium':
    ensure => "running",
}

Exec['npm-packages'] -> Exec['selenium-install'] -> Exec['selenium-service'] -> Service['selenium']

package { 'nginx':
    ensure => "present",
}

exec { 'nginx-configuration':
    command => "cp /tmp/vagrant-puppet/manifests/files/nginx.conf /etc/nginx/nginx.conf",
    path => "/bin/",
}

service { 'nginx':
    ensure => "running",
}

Package['nginx'] -> Exec['nginx-configuration'] -> Service['nginx']


exec { 'update-bashrc':
    command => "cp -f /tmp/vagrant-puppet/manifests/files/.bashrc /home/vagrant/.bashrc",
    path => "/bin/",
    require => Package['git'],
}


file { '/home/vagrant/.config':
    owner => "vagrant",
    ensure => directory,
}

file { '/home/vagrant/.config/mc':
    owner => "vagrant",
    ensure => directory,
}

exec { 'mc-ini':
    command => "cp -f /tmp/vagrant-puppet/manifests/files/.config-mc-ini /home/vagrant/.config/mc/ini",
    path => "/bin/",
    require => File['/home/vagrant/.config/mc'],
}


file { '/home/vagrant/.config/mc/ini':
    owner => "vagrant",
    require => Exec['mc-ini'],
}

exec { 'motd':
    command => "cp /tmp/vagrant-puppet/manifests/files/motd /etc/motd",
    path => "/bin/",
}

exec { 'copy gitconfig':
    command => "cp /tmp/vagrant-puppet/manifests/files/.gitconfig /home/vagrant/.gitconfig",
    path => "/bin/",
}

file { '/home/vagrant/.gitconfig':
    owner => "vagrant",
    require => Exec['copy gitconfig'],
}

exec { 'copy global gitignore':
    command => "cp /tmp/vagrant-puppet/manifests/files/.gitignore /home/vagrant/.gitignore",
    path => "/bin/",
}

file { '/home/vagrant/.gitignore':
    owner => "vagrant",
    require => Exec['copy global gitignore'],
}


# #e2e

package { 'xvfb':
    ensure => "present",
}

package { 'x11-xkb-utils':
    ensure => "present",
}
package { 'xfonts-100dpi':
    ensure => "present",
}
package { 'xfonts-75dpi':
    ensure => "present",
}
package { 'xfonts-scalable':
    ensure => "present",
}
package { 'xserver-xorg-core':
    ensure => "present",
}
package { 'dbus-x11':
    ensure => "present",
}
package { 'libfontconfig1-dev':
    ensure => "present",
}
package { 'chromium-browser':
    ensure => "present",
}
package { 'firefox':
    ensure => "present",
}
package { 'openjdk-6-jdk':
    ensure => "present",
}
package { 'imagemagick':
    ensure => "present",
}


file { '/phantomjsdriver.log':
    mode => "666",
}

package { 'links':
    ensure => "present",
}
