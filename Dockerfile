# Combined frontend and backend
FROM python:3.9-slim AS combined

# Install necessary libraries for OpenCV
RUN apt-get update && apt-get install -y libgl1-mesa-glx libglib2.0-0

# Backend setup
WORKDIR /app

# Copy and install requirements
COPY lpd-backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask app code
COPY lpd-backend .

# Frontend setup
WORKDIR /app/lpd-frontend

# Copy package.json and install dependencies
COPY lpd-frontend/package.json .
COPY lpd-frontend/package-lock.json .

# Install frontend dependencies
RUN npm install

# Copy the React app code
COPY lpd-frontend .

# Expose ports
EXPOSE 3000
EXPOSE 5000

# Command to build and serve both backend and frontend
CMD npm start & gunicorn --bind 0.0.0.0:5000 app:app --log-file=- --log-level=debug
