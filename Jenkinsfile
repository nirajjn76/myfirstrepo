pipeline {
   
    agent { label 'mvp' }
  
    stages {
        stage('CHECKOUT THE SOURCE CODE OF WX-frontend'){
            steps {
                git branch:'$BRANCH',
                credentialsId:'JB',
                url:'git@bitbucket.org:wavexchange/frontend.git'
                }
            }
        
        stage('GENERATING ENV FILES') {
            steps {
                sh '''cat > .env <<EOL
                    PORT=$PORT
                    REACT_APP_API_BASE_URL='$REACT_APP_API_BASE_URL'
                    REACT_APP_PURCHASE_PORT_CHARGE_PER_MONTH='$REACT_APP_PURCHASE_PORT_CHARGE_PER_MONTH'
                    REACT_APP_MY_SELLER_BUCKET_PRE_URL='$REACT_APP_MY_SELLER_BUCKET_PRE_URL'
                    REACT_APP_ABOUT_PAGE_BUCKET_PRE_URL='$REACT_APP_ABOUT_PAGE_BUCKET_PRE_URL'
                    '''              
            }
        }
        

        stage('BUILDING DOCKER IMAGE FOR WX-FRONTEND') {
            steps {
                echo 'Building the Application .....'               
                sh ' docker-compose  build'
                echo 'Application Image Built Successfully !!!'
            }
        }
        
        stage('Docker Compose Down') {
            steps {
                echo 'Taking down the Application .....'                
                sh 'docker-compose  down'
                echo 'Application down Successfully !!!'
            }
        }

       
        stage('DEPLOY') {
            steps {
                echo 'Deploying the Application .....'
                sh 'docker-compose up -d'
                echo 'Application Running Successfully !!!'
            }
        }
        
        stage('CLEANING NOT IN USE DOCKER IMAGE ') {
            steps {
                echo 'Cleaning the images on regular interval to avoid the low storage space left .....'                
                sh 'docker images'
                sh 'docker image prune -af'
                sh 'docker images'
                echo 'Unused images are removed Successfully !!!'
            }
        }
        
    }
}