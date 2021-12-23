from rest_framework import serializers
from jsonfield import JSONField
from .models import MuscleGroup, ExerciseOption, Workout, Exercise, Set

class MuscleGroupListSerializer(serializers.ModelSerializer):
  class Meta:
    model = MuscleGroup
    fields = [
      'id',
      'name',
    ]


class ExerciseOptionListSerializer(serializers.ModelSerializer):
  class Meta:
    model = ExerciseOption
    fields = [
      'muscle_group',
      'name',
    ]


class SetDetailSerializer(serializers.ModelSerializer):
  exercise = serializers.CharField()

  class Meta:
    model = Set
    fields = [
      'id',
      'exercise',
      'pos',
      'weight',
      'reps',
      'checked',
    ]
    read_only_fields = ['id']

  def create(self, validated_data):
    exercise = Exercise.objects.get(id=validated_data['exercise'])
    new_set = Set(
      exercise=exercise,
      pos=validated_data['pos'],
      weight=validated_data['weight'],
      reps=validated_data['reps']
    )
    new_set.save()
    return new_set

  def update(self, instance, validated_data):
    instance.pos = validated_data['pos']
    instance.weight = validated_data['weight']
    instance.reps = validated_data['reps']
    instance.save()
    return instance


class ExerciseDetailSerializer(serializers.ModelSerializer):
  workout = serializers.CharField()
  exercise = serializers.CharField() 
  sets = SetDetailSerializer(many=True, read_only=True)
  
  class Meta:
    model = Exercise
    depth = 2
    fields = [
      'id',
      'workout',
      'exercise',
      'sets',
    ]
    read_only_fields = ['id',]

  def get_queryset(self, validated_data):
    exercises = Exercise.objects.filter(workout=self.kwargs['workout'])
    return exercises

  def create(self, validated_data):
    workout = Workout.objects.get(date=validated_data['workout'])
    selected_exercise = ExerciseOption.objects.get(
      name=validated_data['exercise'])
    exercise = Exercise(workout=workout,exercise=selected_exercise)
    exercise.save()
    return exercise


class WorkoutDetailSerializer(serializers.ModelSerializer):
  exercises = ExerciseDetailSerializer(many=True, read_only=True)

  class Meta:
    model = Workout
    depth = 2
    fields = [
      'date',
      'exercises',
    ]

class WorkoutListSerializer(serializers.ModelSerializer):
  class Meta:
    model = Workout
    depth = 3
    fields = [
      'date',
      'exercises',
    ]
