# Use official Python image
FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Copy requirements (if you have requirements.txt)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose port for FastAPI
EXPOSE 8547

# Run the FastAPI app
CMD ["python", "-m", "app"]
