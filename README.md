# PRL
# Probabalistic Reversal Learning Task
# version 1.0

## Development Guide

#### Install and configure XAMPP:
1. [Download XAMPP](https://www.apachefriends.org/download.html) with PHP version 7.3.19
2. Open XAMPP and click "Start" to boot the XAMPP application.
3. Navigate to "Services" and click "Start All" button.
4. Navigate to "Network", select localhost:8080, and click "Enable".
5. Navigate to "Volumes" and click "Mount".

#### Clone the git repository:
6. Open Terminal and navigate to the htdocs directory:

    Mac/Linux:

        cd ~/.bitnami/stackman/machines/xampp/volumes/root/htdocs
    Windows:

        cd C:\\xampp\\htdocs

7. Clone into htdocs:

        git clone https://github.com/belieflab/socialPRL.git

#### Modify permissions:
8. Copy this text into your terminal from the htdocs folder (the folder you are already in).

        sudo chmod -R 777 socialPRL/
        
#### Start experiment:     
9. Click this URL: [http://localhost:8080/socialPRL](http://localhost:8080/socialPRL)
      
#### View the source code:  
10. Open the socialPRL directory in a text editor of your choice. We prefer [Visual Studio Code](https://code.visualstudio.com/)

    Mac/Linux:

        cd ~/.bitnami/stackman/machines/xampp/volumes/root/htdocs/socialPRL

    Windows:

        cd C:\\xampp\\htdocs\\socialPRL

## Hosting Guide  

#### Clone the git repository:
1. Open Terminal and navigate to the your server's default directory:

    Apache Linux default directory:

        cd /var/www/html

2. Clone respository:

        git clone https://github.com/belieflab/foodAllery.git

#### Modify permissions:
3. Execute these two chmod commands in terminal from  /var/www/html (the directory you are already in).

        sudo chmod -R 755 socialPRL/
        sudo chmod -R 777 socialPRL/data
        
        
