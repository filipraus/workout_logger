from django.shortcuts import render
from rest_framework import generics
from .serializers import MuscleGroupListSerializer, ExerciseOptionListSerializer, WorkoutDetailSerializer, ExerciseDetailSerializer, SetDetailSerializer
from .models import MuscleGroup, ExerciseOption, Workout, Exercise, Set
from django.shortcuts import get_object_or_404

class MuscleGroupListAPIView(generics.ListAPIView):
  queryset = MuscleGroup.objects.all()
  serializer_class = MuscleGroupListSerializer

class ExerciseOptionListAPIView(generics.ListAPIView):
  queryset = ExerciseOption.objects.all()
  serializer_class = ExerciseOptionListSerializer

class WorkoutRetrieveAPIView(generics.RetrieveAPIView):
  lookup_field = 'date'
  queryset = Workout.objects.all()
  serializer_class = WorkoutDetailSerializer

class WorkoutCreateAPIView(generics.CreateAPIView):
  queryset = Workout.objects.all()
  serializer_class = WorkoutDetailSerializer

class WorkoutDestroyAPIView(generics.DestroyAPIView):
  lookup_field = 'date'
  queryset = Workout.objects.all()

class ExerciseListAPIView(generics.ListAPIView):
  queryset = Exercise.objects.all()
  serializer_class = ExerciseDetailSerializer

class ExerciseRetrieveAPIView(generics.RetrieveAPIView):
  lookup_field = 'workout'
  queryset = Exercise.objects.all()
  serializer_class = ExerciseDetailSerializer

class ExerciseCreateAPIView(generics.CreateAPIView):
  queryset = Exercise.objects.all()
  serializer_class = ExerciseDetailSerializer

class ExerciseRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
  lookup_field = 'workout'
  queryset = Exercise.objects.all()
  serializer_class = ExerciseDetailSerializer

class ExerciseDestroyAPIView(generics.DestroyAPIView):
  lookup_field = 'workout'
  queryset = Exercise.objects.all()
  serializer_class = ExerciseDetailSerializer

class SetsListAPIView(generics.ListAPIView):
  queryset = Set.objects.all()
  serializer_class = SetDetailSerializer

class SetsRetrieveAPIView(generics.RetrieveAPIView):
  lookup_field = 'exercise'
  queryset = Set.objects.all()
  serializer_class = SetDetailSerializer

class SetCreateAPIView(generics.CreateAPIView):
  queryset = Set.objects.all()
  serializer_class = SetDetailSerializer

class SetRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
  lookup_field = 'id'
  queryset = Set.objects.all()
  serializer_class = SetDetailSerializer

class SetDestroyAPIView(generics.DestroyAPIView):
  lookup_field = 'id'
  queryset = Set.objects.all()

