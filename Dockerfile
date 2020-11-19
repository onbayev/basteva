FROM python:3.6

RUN apt-get update && apt-get install -y libsasl2-dev python-dev libldap2-dev libssl-dev && mkdir /basteva

COPY backend /basteva

RUN pip install -r /basteva/requirements.txt && chmod +x /basteva/app.py

WORKDIR /basteva
CMD python /basteva/app.py
