#!/bin/bash

if [[ "$BRANCH" == "v4" ]]; then
  # Proceed with the build
  exit 1

else
  # Don't build
  exit 0
fi
