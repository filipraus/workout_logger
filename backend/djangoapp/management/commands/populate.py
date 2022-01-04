from django.core.management.base import BaseCommand, no_translations
from djangoapp.models import MuscleGroup, ExerciseOption 

import json

muscle_groups_db = "./djangoapp/management/commands/muscle_groups.json"
exercise_options_db = "./djangoapp/management/commands/exercise_options.json"

# todo: update 'Commands' so that error doesn't pop at the end of the scritp
with open(muscle_groups_db, encoding='utf-8') as file:
    reader = json.loads(file.read())
    for row in reader:
        print(
            '''
            Adding...
            '''
        )
        print(f'Muscle group: ', row)
        _muscle_group, muscle_group = MuscleGroup.objects.get_or_create(
            name=row['name'],
            color=row['color'],
        )

with open(exercise_options_db, encoding='utf-8') as file:
    reader = json.loads(file.read())
    for row in reader:
        print(
            '''
            Adding...
            '''
        )
        muscle_group = MuscleGroup.objects.get(name=row['muscle_group'])
        _exercise_option, exercise_option = ExerciseOption.objects.get_or_create(
            muscle_group=muscle_group,
            name=row['name']
        )