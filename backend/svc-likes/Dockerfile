FROM alpine:latest

RUN apk add --update py-pip
RUN apk add gcc openssl libc-dev python-dev
RUN pip install --upgrade pip
ADD . /usr/src/likes
WORKDIR /usr/src/likes
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8081

CMD ["python", "/usr/src/likes/likes.py"]