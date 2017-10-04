FROM alpine:latest  

RUN apk add --update py-pip
RUN apk add gcc openssl libc-dev python-dev
RUN pip install --upgrade 
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 6061

CMD ["python", "/usr/src/app/gps.py"]