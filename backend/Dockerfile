FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app/code

COPY Pipfile Pipfile.lock ./
RUN pip install pipenv && pipenv install --system

COPY . ./

EXPOSE 8000