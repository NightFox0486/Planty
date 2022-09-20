from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Magazine, MagazineComment
from django.contrib.auth import get_user_model


# 읽을거리
class MagazineSerializer(serializers.ModelSerializer):


    class UserSerializer(serializers.ModelSerializer):


        class Meta:
            # 레벨, 에디터여부 등 추가해주기
            model = get_user_model()
            fields = ('id', 'username')
    
    user = UserSerializer(read_only=True)


    class Meta:
        model = Magazine
        fields = ('user', 'title', 'sub_title', 'content',)


# 읽을거리 댓글
class MagazineCommentSerializer(serializers.ModelSerializer):


    class CommentUserSerializer(serializers.ModelSerializer):

        
        class Meta:
            # 레벨, 에디터여부 등 추가해주기
            model = get_user_model()
            fields = ('id', 'username',)

    user = CommentUserSerializer(read_only=True)


    class Meta:
        model = MagazineComment
        fields = ('id', 'user', 'content', 'magazine', 'date_created',)
        read_only_fields = ('magazine', )