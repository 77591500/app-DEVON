pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'stevendevops132'
        APP_NAME        = 'mi-app-banco'
        PROXY_NAME      = 'mi-nginx-cajero'
        NET_NAME        = 'red-banco-seguro'
    }
    stages {
        stage('1. Clonar Codigo') {
            steps {
                checkout scm
            }
        }
        stage('2. Construir Imagenes Docker') {
            steps {
                // Construye Apache
                sh "docker build -t $DOCKER_HUB_USER/$APP_NAME:latest ."
                
                // Construye Nginx usando el Dockerfile.proxy
                sh "docker build -f Dockerfile.proxy -t $DOCKER_HUB_USER/$PROXY_NAME:latest ."
            }
        }
        stage('3. Preparar Entorno de Red') {
            steps {
                sh "docker stop $PROXY_NAME $APP_NAME || true"
                sh "docker rm $PROXY_NAME $APP_NAME || true"
                sh "docker network create $NET_NAME || true"
            }
        }
        stage('4. Desplegar Infraestructura Intermediada') {
            steps {
                // Levanta la App
                sh "docker run -d --name $APP_NAME --network $NET_NAME $DOCKER_HUB_USER/$APP_NAME:latest"
                
                // Levanta el Nginx personalizado (¡SIN EL -v!)
                sh "docker run -d --name $PROXY_NAME -p 8084:80 --network $NET_NAME $DOCKER_HUB_USER/$PROXY_NAME:latest"
            }
        }
        stage('5. Prueba de Humo (Smoke Test)') {
            steps {
                echo "Verificando que el recepcionista responda correctamente..."
                sh "sleep 3"
                sh "curl -I http://localhost:8084"
            }
        }
    }
}
