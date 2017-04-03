from django.contrib import admin
from core.models import Volunteer, Survey, Question, Opportunity

for model in [Volunteer, Survey, Question, Opportunity]:
    admin.site.register(model)

# Register your models here.
