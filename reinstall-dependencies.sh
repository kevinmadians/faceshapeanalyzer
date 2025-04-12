#!/bin/bash
# Script to reinstall dependencies after removing lovable-tagger

# Check for package manager
if command -v uv &> /dev/null; then
  echo "Using uv package manager..."
  
  # Activate virtual environment if it exists
  if [ -d "./venv" ]; then
    echo "Activating virtual environment..."
    source ./venv/bin/activate
    uv pip install -r requirements.txt
  fi
else
  echo "Using npm package manager..."
  
  # Remove node_modules and package-lock.json
  echo "Removing node_modules and package-lock.json..."
  rm -rf node_modules package-lock.json
  
  # Reinstall dependencies
  echo "Reinstalling dependencies..."
  npm install --legacy-peer-deps
fi

echo "Dependencies reinstalled successfully without lovable-tagger!" 