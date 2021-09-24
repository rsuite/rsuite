#!/bin/bash

if [[ "$BRANCH" == "next" || "$BRANCH" == "staging" ]]; then
  # Proceed with the build
  exit 1

else
  # Don't build
  exit 0
fi
