#!/usr/bin/env bash
# this removes all pyc file under this location - recursively

export TROPOSPHERE_HOME=/opt/dev/troposphere # For dalloway, arturo

find ${TROPOSPHERE_HOME} -name "*.pyc" -exec rm '{}' ';'
