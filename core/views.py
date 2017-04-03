from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'core/volunteer.html')

def volunteer_listing(request):
    return render(request, 'core/listing.html')

def survey(request):
    if request.method == 'POST':
        choices = request.POST.getlist('categories[]')
        print(choices)
    return render(request, 'core/survey.html')