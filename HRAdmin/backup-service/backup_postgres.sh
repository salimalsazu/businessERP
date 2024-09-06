#!/bin/bash
BACKUP_DIR="/backup"
TIMESTAMP=$(date +\%F-\%T)
FILENAME="backup-$TIMESTAMP.sql"

# Perform the backup and log output
pg_dump -U postgres erp > $BACKUP_DIR/$FILENAME 2> /backup/backup_error.log

# Check if pg_dump was successful
if [ $? -eq 0 ]; then
    echo "Backup successful: $FILENAME"
else
    echo "Backup failed. Check /backup/backup_error.log for details."
fi