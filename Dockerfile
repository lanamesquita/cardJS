FROM nginx:latest
WORKDIR /usr/share/nginx/html/
COPY ./ ./

# docker build -t web .
# docker run -it --rm -d -p 8080:80 --name web web
# docker cp ./index.html web:/usr/share/nginx/html/index.html

# docker image ls
# docker image rm web
# docker container remove XXXX
# docker logs -f web