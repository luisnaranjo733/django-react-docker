from django.contrib import admin
from core.models import Volunteer, Survey, Question, Opportunity, Manager

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 2

class SurveyAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]

admin.site.register(Volunteer)
admin.site.register(Opportunity)
admin.site.register(Manager)
admin.site.register(Survey, SurveyAdmin)