from django.shortcuts import get_object_or_404, render, redirect
from django.http import HttpResponse, Http404
from core.models import Opportunity, Question, Manager, Volunteer, Response, Survey
from nwirp.settings import DEBUG
import re

import logging
logger = logging.getLogger(__name__)

def index(request):
    '''Volunteer home page
    Most likely this page won't be included in production, as NWIRP can hopefully redirect
    directly to the volunteer listing page'''
    return render(request, 'core/index.html')


def volunteer_listing(request):
    '''Volunteer opportunity listing page
    
    This is where potential new volunteers can view all of the opportunities that are available.
    They can select the opportunities that they are interested in and submit a form.
    '''
    params = {
        'opportunity_list': Opportunity.objects.all()
    }
    return render(request, 'core/listing.html', params)


def survey_page(request):
    '''Volunteer interest survey page
    
    Here potential new volunteers can fill out surveys that are required for the opportunities
    that they expressed interest in when they filled out the form in the listing view.
    When they submit the survey form, they will be redirected to the done view, where they
    will get confirmation that they have applied to be a volunteer
    '''
    params = {}

    if request.method != 'POST':
        return redirect('volunteer_listing')

    choices = request.POST.getlist('categories[]')
    opportunities = Opportunity.get_opportunities(choices)

    params['survey_list'] = Survey.extract_surveys(opportunities)
    return render(request, 'core/survey.html', params)


def done(request):
    '''Process a survey submission
    
    This view proceseses a potential new volunteer's survey results and registers them as a new volunteer.
    It provides the new volunteer confirmation that they have succesfully navigated the process of signing up.
    '''
    if request.method != 'POST':
        return redirect('volunteer_listing')

    volunteer_name = request.POST.get('volunteer_name', '')
    volunteer_email = request.POST.get('volunteer_email', '')
    volunteer_phone = request.POST.get('volunteer_phone', '')

    volunteer = Volunteer()
    volunteer.name = volunteer_name
    volunteer.email = volunteer_email
    volunteer.phone = volunteer_phone
    volunteer.save()

    for key, value in request.POST.items():
        match = re.search(r'^q(\d+)$', key)
        if match and value:
            match = int(match.group(1))
            question = get_object_or_404(Question, pk=match)

            response = Response()
            response.volunteer = volunteer
            response.question = question
            response.answer = value
            response.save()


    return render(request, 'core/done.html')


def reach_out(request):
    return render(request, 'core/reach_out.html', {
        'managers': Manager.objects.all()
    })
