#!/bin/bash

export ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

export BRANCH=$(git branch --show-current)
export VERSION=$(cat "$ROOT/VERSION")
