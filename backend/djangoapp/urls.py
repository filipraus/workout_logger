from django.urls import path 
from . import views 

urlpatterns = [
  path('api/muscle_groups_list', views.MuscleGroupListAPIView.as_view(), name='muscle_groups_list'),
  path('api/exercises_list', views.ExerciseOptionListAPIView.as_view(), name='exercises_list'),
  path('api/retrieve/workout/<date>', views.WorkoutRetrieveAPIView.as_view(), name='retrieve_workout'),
  path('api/create/workout', views.WorkoutCreateAPIView.as_view(), name='create_workout'),
  path('api/delete/workout/<date>', views.WorkoutDestroyAPIView.as_view(), name='delete_workout'),
  path('api/retrieve/exercise/<workout>', views.ExerciseListAPIView.as_view(), name='retrieve_exercise'),
  path('api/update/exercise/<workout>/<exercise>', views.ExerciseRetrieveUpdateAPIView.as_view(), name='update_exercise'),
  path('api/add/exercise', views.ExerciseCreateAPIView.as_view(), name='add_exercise'),
  path('api/delete/exercise/<date>/<exercise>', views.ExerciseDestroyAPIView.as_view, name='delete_exercise'),
  path('api/retrieve/sets/<workout>/<exercise>', views.SetsListAPIView.as_view(), name='sets'),
  path('api/update/set/<id>', views.SetRetrieveUpdateAPIView.as_view(), name='update_workout'),
  path('api/add/set', views.SetCreateAPIView.as_view(), name='add_set'),
  path('api/delete/set/<id>', views.SetDestroyAPIView.as_view(), name='delete_set'),
]