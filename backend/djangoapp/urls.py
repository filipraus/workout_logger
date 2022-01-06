from django.urls import path, re_path
from . import views 

urlpatterns = [
  re_path(r'^', views.FrontendAppView.as_view()),
  path('api/muscle_groups_list', views.MuscleGroupListAPIView.as_view(), name='muscle_groups_list'),
  path('api/exercise_options_list', views.ExerciseOptionListAPIView.as_view(), name='exercise_options_list'),
  path('api/workouts_list', views.WorkoutListAPIView.as_view(), name='workouts_list'),
  path('api/retrieve/workout/<date>', views.WorkoutRetrieveAPIView.as_view(), name='retrieve_workout'),
  path('api/create/workout', views.WorkoutCreateAPIView.as_view(), name='create_workout'),
  path('api/delete/workout/<date>', views.WorkoutDestroyAPIView.as_view(), name='delete_workout'),
  path('api/retrieve/<workout>/exercises', views.ExerciseListAPIView.as_view(), name='retrieve_exercise'),
  path('api/update/exercise/<workout>/<exercise>', views.ExerciseRetrieveUpdateAPIView.as_view(), name='update_exercise'),
  path('api/add/exercise', views.ExerciseCreateAPIView.as_view(), name='add_exercise'),
  path('api/delete/exercise/<id>', views.ExerciseDestroyAPIView.as_view(), name='delete_exercise'),
  path('api/retrieve/<exercise>/sets', views.SetsListAPIView.as_view(), name='sets'),
  path('api/update/set/<id>', views.SetRetrieveUpdateAPIView.as_view(), name='update_workout'),
  path('api/add/set', views.SetCreateAPIView.as_view(), name='add_set'),
  path('api/delete/set/<id>', views.SetDestroyAPIView.as_view(), name='delete_set'),
]