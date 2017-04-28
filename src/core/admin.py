from django.contrib import admin
from core.models import Volunteer, Survey, Question, Opportunity, Manager, Response

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 2

class SurveyAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]
    list_display = ('name', 'count_dependencies')
    # ordering = ('-count_dependencies',)

class ResponseInline(admin.TabularInline):
    model = Response
    extra = 2
    readonly_fields = ('question',)

class VolunteerAdmin(admin.ModelAdmin):
    inlines = [ResponseInline]
    list_display = ('name', 'email', 'phone')
    search_fields = ['name']

class ManagerAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'role')

class ResponseAdmin(admin.ModelAdmin):
    search_fields = ['volunteer__name', 'question__question_text']
    list_filter = ('volunteer', 'question')

class OpportunityAdmin(admin.ModelAdmin):
    list_display = ('name', 'opportunity_type')
    list_filter = (
        'managers', 'surveys'
    )
    search_fields = [
        'name', 'desc', 'volunteers__name'
    ]

admin.site.register(Volunteer, VolunteerAdmin)
admin.site.register(Opportunity, OpportunityAdmin)
admin.site.register(Manager, ManagerAdmin)
admin.site.register(Survey, SurveyAdmin)
admin.site.register(Response, ResponseAdmin)
