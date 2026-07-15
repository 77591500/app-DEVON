pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'stevendevops132'
        APP_NAME        = 'mi-app-banco' // El nombre de la cocina
        PROXY_NAME      = 'mi-nginx-cajero' // El nombre del recepcionista
        NET_NAME        = 'red-banco-seguro' // Nuestra red interna
    }
    stages {
        stage('1. Clonar Codigo') {
            steps {
                checkout scm
            }
        }
        stage('2. Construir Imagen Docker') {
            steps {
                // Esto construye tu Dockerfile (que ahora usa Apache Alpine)
                sh "docker build -t $DOCKER_HUB_USER/$APP_NAME:latest ."
            }
        }
        stage('3. Preparar Entorno de Red') {
            steps {
                // Limpiamos los contenedores anteriores si existen
                sh "docker stop $PROXY_NAME $APP_NAME || true"
                sh "docker rm $PROXY_NAME $APP_NAME || true"
                
                // Creamos la red interna si no existe
                sh "docker network create $NET_NAME || true"
            }
        }
        stage('4. Desplegar Infraestructura Intermediada') {
            steps {
                // Pasito A: Encendemos la cocina (Apache) oculta dentro de la red interna. No lleva "-p"
                sh "docker run -d --name $APP_NAME --network $NET_NAME $DOCKER_HUB_USER/$APP_NAME:latest"
                
                // Pasito B: Encendemos al recepcionista (Nginx) expuesto al puerto 8084 e inyectando tu nginx.conf
                sh "docker run -d --name $PROXY_NAME -p 8084:80 --network $NET_NAME -v \$(pwd)/nginx.conf:/etc/nginx/nginx.conf nginx:latest"
            }
        }
        stage('5. Prueba de Humo (Smoke Test)') {
            steps {
                // Simulamos ser un cliente externo pegándole al puerto público de Nginx (8084)
                echo "Verificando que el recepcionista responda correctamente..."
                sh "sleep 3" // Le damos 3 segundos a Nginx para que termine de despertar
                sh "curl -I http://localhost:8084"
            }
        }
    }
}
