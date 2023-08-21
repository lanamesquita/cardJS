FROM nginx:latest
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./imagem.svg /usr/share/nginx/html/imagem.svg