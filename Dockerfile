FROM nginx:latest
WORKDIR /usr/share/nginx/html/
COPY ./ ./

# docker build -t webserver .
# docker run -it --rm -d -p 8080:80 --name web webserver
# docker cp webserver:./ /usr/share/nginx/html/

# docker image ls
# docker image rm webserver
# docker container remove XXXX