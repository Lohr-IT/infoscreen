#!/bin/bash

# find all Dockerfiles
# shellcheck disable=SC2207
DOCKERFILES=($(find . -type f -name "Dockerfile"))

# run hadolint on all of them
FAILED=0
for file in "${DOCKERFILES[@]}"
do
  echo "Linting $file ..."
  hadolint "$file"
  status=$?
  if [[ "$status" != 0 ]]; then
    FAILED=1
  fi
done

if [[ "$FAILED" != 0 ]]; then
  echo "Please fix the above issues!"
  echo "More info to errors: https://github.com/hadolint/hadolint#rules"
  echo "Dockerfile best practices: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/"
  exit 1
fi

echo "Congratulations, hadolint run successful. All clear!"
