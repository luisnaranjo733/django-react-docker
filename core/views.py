from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'core/volunteer.html')

def volunteer_listing(request):
    return render(request, 'core/listing.html')