from django.db import models
from jsonfield import JSONField

class MuscleGroup(models.Model):
  name = models.CharField(max_length=128, blank=False)

  def __str__(self):
    return self.name

class ExerciseOption(models.Model):
  muscle_group = models.ForeignKey(MuscleGroup, on_delete=models.CASCADE)
  name = models.CharField(max_length=128, blank=False, primary_key=True)

  def __str__(self):
    return self.name

class Workout(models.Model):
  title = models.CharField(max_length=16, blank=True)
  date = models.CharField(max_length=32, blank=False, unique=True, primary_key=True)

  def __str__(self):
    return self.date  

class Exercise(models.Model):
  workout = models.ForeignKey(Workout, related_name='exercises', on_delete=models.CASCADE, null=True, blank=True)
  exercise = models.ForeignKey(ExerciseOption, on_delete=models.CASCADE)

class Set(models.Model):
  exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, related_name='sets')
  pos = models.IntegerField()
  weight = models.DecimalField(decimal_places=1, max_digits=3)
  reps = models.IntegerField()
  checked = models.BooleanField(null=True, default=False)

  def __str__(self):
    return str(self.reps) + ' x ' + str(self.weight)
  