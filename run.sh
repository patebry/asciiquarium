#!/bin/bash

# Feature flag: set to "node" to use Node.js, "perl" for Perl (default)
ASCIIQUARIUM_IMPL=${ASCIIQUARIUM_IMPL:-perl}

# Dynamically locate script directory
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

if [ "$ASCIIQUARIUM_IMPL" = "node" ]; then
    NODE=$(which node)
    if [ -z "$NODE" ]; then
        echo "Node.js not found. Install Node.js v18 or later."
        exit 1
    fi
    exec node "$SCRIPT_DIR/src/index.js" "$@"
fi

# Original Perl implementation
PERL=$(which perl)

if [ -z "$PERL" ]; then
    echo "install perl v5.40 or later"
    exit 1
fi

PERL_VERSION=$($PERL -e 'print $^V;')
PERL_MAJOR_VERSION=$(echo $PERL_VERSION | cut -d'.' -f1)
PERL_MINOR_VERSION=$(echo $PERL_VERSION | cut -d'.' -f2)
if [ "${PERL_MAJOR_VERSION#v}" -lt 5 ] || [ "${PERL_MINOR_VERSION}" -lt 40 ]; then
    echo "install perl v5.40 or later"
    exit 1
fi


if ! $PERL -MTerm::Animation -e 1 2>/dev/null; then
    echo 'Term::Animation module not found, install before continuing, try using:'
    echo
    echo cpan Term::Animation
    echo
    exit 1
fi

perl "$SCRIPT_DIR/asciiquarium" "$@"