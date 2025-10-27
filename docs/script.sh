#!/bin/bash

if [[ "$BRANCH" == "5.x" ]]; then
  # Proceed with the build
  exit 1

else
  # Don't build
  exit 0
fi
