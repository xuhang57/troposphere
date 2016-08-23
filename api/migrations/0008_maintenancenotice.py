# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-06-28 00:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_add_statuspage_sitemetadata'),
    ]

    operations = [
        migrations.CreateModel(
            name='MaintenanceNotice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('show_message', models.BooleanField(default=False)),
                ('message', models.TextField()),
                ('end_date', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'maintenance_notice',
                'verbose_name': 'Maintenance notice',
                'verbose_name_plural': 'Maintenance notice',
            },
        ),
    ]
