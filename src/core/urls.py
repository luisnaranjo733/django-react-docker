from django.conf.urls import url

from . import views

urlpatterns = [
    # url(r'^$', views.index, name='index'),
    url(r'^$', views.volunteer_listing, name='volunteer_listing'),
    url(r'^survey/$', views.survey_page, name='volunteer_survey'),
    url(r'^done/$', views.done, name='survey_complete'),
    url(r'api/results$', views.results_endpoint, name='results'),
    url('^reach-out/$', views.reach_out, name='manager-contacts')
]