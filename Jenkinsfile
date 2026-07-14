pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'stevendevops132'
        APP_NAME        = 'web-site-3'
    }
    stages {
        stage('1. Clonar Codigo') {
            steps {
                checkout scm
            }
        }
        stage('2. Construir Imagen Docker') {
            steps {
                // Usamos el Docker del servidor gracias al socket compartido
                sh "docker build -t $DOCKER_HUB_USER/$APP_NAME:latest ."
            }
        }
        stage('3. Despliegue Local v2.0') {
            steps {
                // Limpiamos cualquier contenedor viejo en el puerto 8084
                sh "docker stop website-jenkins || true"
                sh "docker rm website-jenkins || true"
                // Encendemos el nuevo contenedor mapeado al puerto 8084
                sh "docker run -d --name website-jenkins -p 8084:80 $DOCKER_HUB_USER/$APP_NAME:latest"
            }
        }
    }
}
