#!/bin/bash
BACKUP_DIR="/backup"
TIMESTAMP=$(date +\%F-\%T)
FILENAME="backup-$TIMESTAMP.sql"

pg_dump -U postgres erp > $BACKUP_DIR/$FILENAME
