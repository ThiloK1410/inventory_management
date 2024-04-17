# Stage for building the React project.
# We don't need node.js in our runtime stage.
FROM node:18-alpine

COPY react /home/react
WORKDIR /home/react
RUN npm i
RUN npm run build

# Runtime stage
FROM python:3.11-alpine

# Install Django backend
WORKDIR /home/inventory_management/backend
# First only copy the requirements because they rarely change.
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend .
ENV PRODUCTION True
RUN python manage.py migrate

# Create admin account with password admin
ENV DJANGO_SUPERUSER_PASSWORD admin
RUN python manage.py createsuperuser \
        --noinput \
        --username admin \
        --email kek@kek.de

# Move all static files to /home/inventory_management/static
COPY --from=0 /home/react/dist /home/inventory_management/react/dist
RUN rm -rf /home/inventory_management/static
RUN python manage.py collectstatic
RUN rm -rf /home/inventory_management/react

EXPOSE 8000
ENTRYPOINT ["gunicorn", "backend.wsgi", "--bind", "0.0.0.0:8000"]
