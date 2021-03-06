# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-08 20:10
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_auto_20170408_1208'),
    ]

    operations = [
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('opportunity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Opportunity')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Question')),
                ('volunteer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Volunteer')),
            ],
        ),
    ]
