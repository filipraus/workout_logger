from django.shortcuts import render
from rest_framework import generics
from .serializers import MuscleGroupListSerializer, ExerciseOptionListSerializer, WorkoutDetailSerializer, ExerciseDetailSerializer, SetDetailSerializer, WorkoutListSerializer
from .models import MuscleGroup, ExerciseOption, Workout, Exercise, Set
from django.shortcuts import get_object_or_404

import os
import logging
from django.http import HttpResponse
from django.views.generic import View
from django.conf import settings

class FrontendAppView(View):
  """
  Serves the compiled frontend entry point (only works if you have run `yarn
  build`).
  """
  index_file_path = os.path.join(settings.REACT_APP_DIR, 'public', 'index.html')

  def get(self, request):
    try:
      with open(self.index_file_path) as f:
          return HttpResponse(f.read())
    except FileNotFoundError:
      logging.exception('Production build of app not found')
      return HttpResponse(
          """
          This URL is only used when you have built the production
          version of the app. Visit http://localhost:3000/ instead after
          running `yarn start` on the frontend/ directory
          """,
          status=501,
      )

class MuscleGroupListAPIView(generics.ListAPIView):
  queryset = MuscleGroup.objects.all()
  serializer_class = MuscleGroupListSerializer

class ExerciseOptionListAPIView(generics.ListAPIView):
  queryset = ExerciseOption.objects.all()
  serializer_class = ExerciseOptionListSerializer

class WorkoutListAPIView(generics.ListAPIView):
  queryset = Workout.objects.all()
  serializer_class = WorkoutListSerializer

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
  serializer_class = ExerciseDetailSerializer

  def get_queryset(self):
    workout = Workout.objects.get(date=self.kwargs['workout'])
    queryset = Exercise.objects.filter(workout=workout)
    return queryset

class ExerciseRetrieveAPIView(generics.RetrieveAPIView):
  lookup_field = 'workout'
  queryset = Exercise.objects.all()
  serializer_class = ExerciseDetailSerializer

class ExerciseCreateAPIView(generics.CreateAPIView):
  queryset = Exercise.objects.all()
  serializer_class = ExerciseDetailSerializer

class ExerciseRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
  lookup_field = 'id'
  queryset = Exercise.objects.all()

class ExerciseDestroyAPIView(generics.DestroyAPIView):
  lookup_field = 'id'
  queryset = Exercise.objects.all()
  serializer_class = ExerciseDetailSerializer

class SetsListAPIView(generics.ListAPIView):
  serializer_class = SetDetailSerializer

  def get_queryset(self):
    exercise = Exercise.objects.get(id=self.kwargs['exercise'])
    queryset = Set.objects.filter(exercise=exercise)
    return queryset

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

