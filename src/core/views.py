from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, Http404
from core.models import Opportunity, Question, Manager, Volunteer, Response
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
    '''Volunteer opportunity listing page'''
    params = {
        'opportunity_list': Opportunity.objects.all()
    }
    return render(request, 'core/listing.html', params)


def survey_page(request):
    '''Volunteer interest survey page'''
    params = {}

    # if request.method != 'POST':
    #     raise Http404

    choices = request.POST.getlist('categories[]')
    params['opportunity_list'] = []
    params['survey_list'] = []
    for opportunity_id in choices:
        opportunity = get_object_or_404(Opportunity, pk=opportunity_id)
        params['opportunity_list'].append(opportunity)
        for survey in opportunity.surveys.all().order_by('-priority'):
            if survey not in params['survey_list']:
                params['survey_list'].append(survey)


    return render(request, 'core/survey.html', params)


def done(request):
    'Process a survey submission'
    if request.method != 'POST':
        raise Http404

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
