from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^volunteer_listing/$', views.volunteer_listing, name='volunteer_listing')
]