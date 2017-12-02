FROM python:2.7-alpine

ENV INSTALL_DIR /opt/djapp
ENV PYTHONPATH /opt

RUN apk add --no-cache ca-certificates musl-dev gcc make openssl-dev curl-dev jpeg-dev
ADD requirements.txt ${INSTALL_DIR}/requirements.txt
RUN pip install --upgrade pip
RUN pip install -Ur ${INSTALL_DIR}/requirements.txt
ADD djapp/ ${INSTALL_DIR}

EXPOSE 9090

CMD python ${INSTALL_DIR}/app.py