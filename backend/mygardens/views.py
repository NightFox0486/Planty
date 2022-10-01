from datetime import date
from core.utils import s3_upload_image
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from plants.models import PlantKeyword
from .models import MyGarden, Diary
from plants.models import Plant, Plantlike, UpdateTable
from .serializers import MyGardenSerializer, DiarySerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


# 나의 정원 식물 목록
class MygardenListViewSet(viewsets.ModelViewSet):
    queryset = MyGarden.objects.all()
    serializer_class = MyGardenSerializer

    def list(self, request, username):
        user = get_object_or_404(get_user_model(), username=username)
        serializer = self.get_serializer(self.queryset.filter(user=user.id), many=True)

        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=status.HTTP_200_OK)


# 나의 정원 식물 상세 및 CRUD
class MyGardenViewSet(viewsets.ModelViewSet):
    queryset = MyGarden.objects.all()
    serializer_class = MyGardenSerializer

    # get에 매칭, 상세페이지
    def retrieve(self, request, pk):
        serializer = self.get_serializer(MyGarden.objects.get(pk=pk))

        return Response(serializer.data, status=status.HTTP_200_OK)


    createMyGarden_params = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'plant': openapi.Schema(type=openapi.TYPE_INTEGER, description='식물pk'),
        'date_grow': openapi.Schema(type=openapi.TYPE_STRING, format='date', description='키운날짜'),
        'watering_schedule': openapi.Schema(type=openapi.TYPE_INTEGER,  description='물주는 주기'),
        'recent_water': openapi.Schema(type=openapi.TYPE_STRING, format='date', description='최근 물 준 날짜'),
        'memo': openapi.Schema(type=openapi.TYPE_STRING, description='한줄 메모'),
        'present': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='선물용 여부'),
        'preference': openapi.Schema(type=openapi.TYPE_INTEGER, description='선호도'),
        }
    )

    # get에 매칭, 리스트, username으로 접근
    @swagger_auto_schema(
        operation_summary='나의 정원 반려 식물 목록',
        operation_description='유저 이름으로 데이터 주고 받아야 합니다.',
        request_body=createMyGarden_params)

    # post에 매칭, 나의 정원 식물 등록
    def create(self, request):
        # data = eval(request.data['data'])
        # serializer = MyGardenSerializer(data=data)
        serializer = MyGardenSerializer(data=request.data)
        user = request.user
        plant_num = int(request.data['plant'])
        plant = Plant.objects.get(pk=plant_num)

        if serializer.is_valid(raise_exception=True):
            # try:
            #     file=request.FILES['files']
            # except:
            #     file=''
            # file_path = s3_upload_image(file, 'mygardens/')
            
            try:
                # 선호도 테이블에 user정보가 있을 때
                plant_like = Plantlike.objects.get(user=user)
                score = plant_like.score
                tmp = list(score)
                tmp[plant_num - 1] = str(request.data['preference'])
                update_score = ''.join(tmp)
                plant_like.score = update_score
                plant_like.save()

                # update_table에 유저가 없을 때만 추가
                if not UpdateTable.objects.filter(user_id=user.pk).exists():
                    update_user = UpdateTable()
                    update_user.user_id = user.pk
                    update_user.save()

            except:
                # 선호도 테이블에 user 정보가 없을 때 - 선호도 테이블 생성
                plant_like = Plantlike()
                plant_like.user = user
                tmp = ['0' for _ in range(216)]
                tmp[plant_num - 1] = str(request.data['preference'])
                score = ''.join(tmp)
                plant_like.score = score
                plant_like.save()
                
                update_user = UpdateTable()
                update_user.user_id = user.pk
                update_user.save()

            if request.data.get('present'):
                get_plant = PlantKeyword.objects.get(pk=request.data['plant'])
                get_plant.present_adequacy = get_plant.present_adequacy + 1
                get_plant.save()

            # serializer.save(user=user, img_url=file_path)
            serializer.save(user=user, plant=plant)

            user.plants_count = user.plants_count + 1
            user.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

    updateMyGarden_params = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'date_grow': openapi.Schema(type=openapi.TYPE_STRING, format='date', description='키운날짜'),
        'watering_schedule': openapi.Schema(type=openapi.TYPE_INTEGER,  description='물주는 주기'),
        'recent_water': openapi.Schema(type=openapi.TYPE_STRING, format='date', description='최근 물 준 날짜'),
        'memo': openapi.Schema(type=openapi.TYPE_STRING, description='한줄 메모'),
        # 'present': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='선물용 여부'),
        'preference': openapi.Schema(type=openapi.TYPE_INTEGER, description='선호도'),
        'keep': openapi.Schema(type=openapi.TYPE_INTEGER, description='식물 보관'),
        }
    )

    # patch에 매칭, 정원 등록 식물 수정
    @swagger_auto_schema(
    operation_summary='나의 정원 식물 수정',
    operation_description='식물 소개(메모), 식물 보관, 선호도, 이미지',
    request_body=updateMyGarden_params)

    def partial_update(self, request, pk):
        my_garden = get_object_or_404(MyGarden, pk=pk)
        serializer = MyGardenSerializer(instance=my_garden, data=request.data)
        user = request.user
        plant_num = int(request.data['plant'])

        if request.data.get("keep"):
            serializer.keep = request.data["keep"]
        
        if request.data.get("memo"):
            serializer.memo = request.data["memo"]

        if request.data.get("preference"):
            serializer.preference = request.data["preference"]

            # update_table에 유저가 없을 때만 추가
            if not UpdateTable.objects.filter(user_id=user.pk).exists():
                update_user = UpdateTable()
                update_user.user_id = user.pk
                update_user.save()

            plant_like = Plantlike.objects.get(user=user)
            score = plant_like.score
            tmp = list(score)
            tmp[plant_num - 1] = str(request.data['preference'])
            update_score = ''.join(tmp)
            plant_like.score = update_score
            plant_like.save()

 
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)


    # delete에 매칭, 정원 등록 식물 삭제
    def destroy(self, request, pk):
        my_garden = get_object_or_404(MyGarden, pk=pk)
        user = request.user
        plant_num = int(request.data['plant'])

        if user == my_garden.user:
            my_garden.delete()

            plant_like = Plantlike.objects.get(user=user)
            score = plant_like.score
            tmp = list(score)
            tmp[plant_num - 1] = '0'
            update_score = ''.join(tmp)
            plant_like.score = update_score
            plant_like.save()

            if not UpdateTable.objects.filter(user_id=user.pk).exists():
                update_user = UpdateTable()
                update_user.user_id = user.pk
                update_user.save()

            user.plants_count = user.plants_count - 1
            user.save()
            
            data = {
                'delete': f'{pk}번 데이터가 삭제되었습니다.'
            }

            return Response(data, status=status.HTTP_200_OK)


# 식물일기
class DiaryViewSet(viewsets.ModelViewSet):
    queryset = MyGarden.objects.all()
    serializer_class = DiarySerializer

    # post에 매칭, 일기 작성
    def create(self, request, my_garden_pk):
        my_garden = get_object_or_404(MyGarden, pk=my_garden_pk)
        serializer = DiarySerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(my_garden=my_garden)

            my_garden.diaries_count = my_garden.diaries_count + 1
            my_garden.save()
            
            diaries = my_garden.diaries.all()
            serializers = DiarySerializer(instance=diaries, many=True)
            
            return Response(serializers.data, status=status.HTTP_201_CREATED)

    # put에 매칭, 일기 수정
    def update(self, request, my_garden_pk, diary_pk):
        my_garden = get_object_or_404(MyGarden, pk=my_garden_pk)
        diary = get_object_or_404(Diary, pk=diary_pk)

        if request.user == my_garden.user:
            serializer = DiarySerializer(instance=diary, data=request.data)
            serializer.save()

            diaries = my_garden.diaries.all()
            serializer = DiarySerializer(instance=diaries, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)

    # delete에 매칭, 일기 삭제
    def destroy(self, request, my_garden_pk, diary_pk):
        my_garden = get_object_or_404(MyGarden, pk=my_garden_pk)
        diary = get_object_or_404(Diary, pk=diary_pk)

        if request.user == my_garden.user:
            diary.delete()
            
            my_garden.diaries_count = my_garden.diaries_count - 1
            my_garden.save()
            
            diaries = my_garden.diaries.all()
            serializer = DiarySerializer(instance=diaries, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)