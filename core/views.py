from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from core.models import Opportunity

def index(request):
    '''Volunteer home page
    Most likely this page won't be included in production, as NWIRP can hopefully redirect
    directly to the volunteer listing page'''
    return render(request, 'core/volunteer.html')

def volunteer_listing(request):
    '''Volunteer opportunity listing page'''
    params = {
        'opportunity_list': Opportunity.objects.all()
    }
    return render(request, 'core/listing.html', params)

def survey(request):
    '''Volunteer interest survey page'''
    params = {}
    if request.method == 'POST':
        choices = request.POST.getlist('categories[]')
        params['opportunities'] = []
        for opportunity_id in choices:
            params['opportunities'].append(get_object_or_404(Opportunity, pk=opportunity_id))

    return render(request, 'core/survey.html', params)
    