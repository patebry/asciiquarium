#!/bin/bash

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

# Dynamically locate asciiquarium
SCRIPT_DIR=$(dirname "$0")
perl "$SCRIPT_DIR/asciiquarium" "$@"