# Generated by Django 3.2.12 on 2022-10-01 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mygardens', '0004_mygarden_present'),
    ]

    operations = [
        migrations.AddField(
            model_name='mygarden',
            name='preference',
            field=models.IntegerField(default=0, verbose_name='선호도'),
        ),
    ]