from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^listing/$', views.volunteer_listing, name='volunteer_listing'),
    url(r'^survey/$', views.survey, name='volunteer_survey')
]