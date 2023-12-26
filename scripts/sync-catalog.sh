#!/bin/bash

# This script syncs latest cloud catalog data produced by azure-speed-jobs

SOURCE_DIR="https://azurespeedjobs20231104.blob.core.windows.net/jobs/cloud-catalog"
TARGET_DIR="../ClientApp/src/assets/data"

curl ${SOURCE_DIR}/aws/geographies.json > ${TARGET_DIR}/geographies.json
curl ${SOURCE_DIR}/aws/regions.json > ${TARGET_DIR}/regions.json