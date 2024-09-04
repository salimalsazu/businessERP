FROM postgres:latest

# Install cron
RUN apt-get update && apt-get install -y cron

# Create backup directory inside the container
RUN mkdir -p /backup

# Copy the backup script into the container
COPY backup_postgres.sh /usr/local/bin/backup_postgres.sh

# Give execution rights to the script
RUN chmod +x /usr/local/bin/backup_postgres.sh

# Schedule cron job for every 6 hours
# RUN echo "0 */6 * * * /usr/local/bin/backup_postgres.sh" > /etc/cron.d/backup_cron
RUN echo "* * * * * /usr/local/bin/backup_postgres.sh" > /etc/cron.d/backup_cron

# Apply cron job
RUN crontab /etc/cron.d/backup_cron

# Run cron in the foreground
CMD cron -f
