# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-07-11 19:34
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_sitemetadata_external_allocation_help_link'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sitemetadata',
            name='external_allocation_help_link',
        ),
    ]
