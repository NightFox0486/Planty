# Generated by Django 3.2.12 on 2022-09-19 09:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Magazine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=15, verbose_name='게시글 제목')),
                ('sub_title', models.CharField(max_length=25, verbose_name='게시글 소제목')),
                ('content', models.TextField(verbose_name='내용')),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='읽을거리 작성일자')),
                ('comments_count', models.IntegerField(default=0, verbose_name='댓글 개수')),
                ('likes_count', models.IntegerField(default=0, verbose_name='좋아요 개수')),
                ('img_url', models.TextField(verbose_name='썸네일 이미지')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='magazines', to=settings.AUTH_USER_MODEL, verbose_name='작성자')),
            ],
        ),
    ]
