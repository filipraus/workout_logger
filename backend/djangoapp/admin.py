from django.contrib import admin
from .models import MuscleGroup, ExerciseOption, Workout, Exercise, Set

admin.site.register(MuscleGroup)
admin.site.register(ExerciseOption)
admin.site.register(Workout)
admin.site.register(Exercise)
admin.site.register(Set)