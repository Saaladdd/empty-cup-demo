# Use official Python image
FROM python:3.10-slim

# Set working directory inside the container
WORKDIR /app

# Copy only requirements.txt first (if you have one)
# If you don't have one, you can create it or skip this and install directly
# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt

# Alternatively, install packages manually (example)
RUN pip install --no-cache-dir flask flask-cors sqlalchemy

# Copy entire backend source code
COPY . .

# Expose port 8080
EXPOSE 8080

# Set environment variable for Flask app entry point
ENV FLASK_APP=run.py
ENV FLASK_RUN_HOST=0.0.0.0

# Run the Flask app
CMD ["flask", "run"]
