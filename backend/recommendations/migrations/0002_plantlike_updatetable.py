# Generated by Django 3.2.12 on 2022-10-01 12:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_rename_content_user_description'),
        ('recommendations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Plantlike',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='accounts.user')),
                ('score', models.CharField(blank=True, max_length=500, null=True)),
            ],
            options={
                'db_table': 'plantlike',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UpdateTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
            ],
            options={
                'db_table': 'update_table',
                'managed': False,
            },
        ),
    ]