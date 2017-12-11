FROM jgoerzen/debian-base-minimal:stretch

ENV INSTALL_DIR /opt/djapp
ENV PYTHONPATH /opt

RUN apt-get -qq update
RUN apt install -y python-pip ca-certificates musl-dev gcc make ffmpeg curl git libjpeg-dev
ADD requirements.txt ${INSTALL_DIR}/requirements.txt
RUN pip install --upgrade pip
RUN pip install -Ur ${INSTALL_DIR}/requirements.txt
ADD djapp/ ${INSTALL_DIR}
RUN python -m pip install git+https://github.com/christensonb/acrcloud_sdk_python


EXPOSE 9090

CMD python ${INSTALL_DIR}/app.py