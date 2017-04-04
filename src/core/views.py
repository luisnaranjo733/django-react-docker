from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from core.models import Opportunity, Question
from nwirp.settings import DEBUG
import re

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

def survey(request):
    '''Volunteer interest survey page'''
    params = {
        'method': request.method,
    }
    if request.method == 'POST':
        choices = request.POST.getlist('categories[]')
        params['opportunity_list'] = []
        params['survey_list'] = []
        for opportunity_id in choices:
            opportunity = get_object_or_404(Opportunity, pk=opportunity_id)
            params['opportunity_list'].append(opportunity)
            for survey in opportunity.surveys.all():
                if survey not in params['survey_list']:
                    params['survey_list'].append(survey)

    elif DEBUG: # load all objects on GET requests for debugging purposes
        params['opportunity_list'] = Opportunity.objects.all()

    return render(request, 'core/survey.html', params)
    
def done(request):
    if request.method == 'POST':
        for key, value in request.POST.items():
            match = re.search('^q(\d+)$', key)
            if match:
                match = int(match.group(1))
                question = get_object_or_404(Question, pk=match)
                


    return render(request, 'core/done.html')