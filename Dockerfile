# Usamos una versión súper ligera de Apache (la cocina)
FROM httpd:alpine

# Copiamos la carpeta de tu app a la ruta oficial de Apache
COPY ./website/ /usr/local/apache2/htdocs/
