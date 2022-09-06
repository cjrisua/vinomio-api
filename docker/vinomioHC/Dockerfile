FROM python:3.7-alpine
WORKDIR /hc
#ENV HC_APP=app.py
#RUN pip install setuptools
#RUN apk --update add python py-pip openssl postgresql-dev ca-certificates py-openssl libffi-dev musl-dev openssl-dev wget build-base gcc python-dev py-pip jpeg-dev zlib-dev libx
RUN apk update \
    && apk add libpq-dev gcc postgresql-client openssh-client\
    && pip install psycopg2-binary
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "-u", "app.py"]