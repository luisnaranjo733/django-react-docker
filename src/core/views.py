import re

from django.shortcuts import get_object_or_404, redirect, render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response as DRF_Response
from rest_framework.views import APIView

from core.models import (Manager, Opportunity, Question, QuestionResponse, Survey,
                         Volunteer)
from core import serializers

def index(request):
    '''Volunteer home page
    Most likely this page won't be included in production, as NWIRP can hopefully redirect
    directly to the volunteer listing page'''
    return render(request, 'core/react.html')
    # return render(request, 'core/index.html')

class OpportunityList(APIView):
    '''
    List all opportunities
    '''

    def get(self, request, format=None):
        opportunities = Opportunity.objects.all()
        serializer = serializers.OpportunitySerializer(opportunities, many=True)
        return DRF_Response(serializer.data)


class SurveyList(APIView):
    '''
    List all surveys

    Provide list of opportunity ids
    Return a list of all surveys for those opportunities
    '''

    def get(self, request, format=None):
        ids = request.query_params.getlist('opportunity_id')
        
        if not ids:
            response = DRF_Response(status=status.HTTP_400_BAD_REQUEST)
            response['error'] = 'No opportunity_id query params were provided'
            return response

        opportunities = Opportunity.get_opportunities(ids)

        surveys = Survey.extract_surveys(opportunities)
        serializer = serializers.SurveySerializer(surveys, many=True)
        return DRF_Response(serializer.data)


class SubmitVolunteerInterestForm(APIView):
    '''Submit a volunteer's interest form'''

    renderer_classes = (JSONRenderer, )

    def get(self, request):
        return DRF_Response('hell')
    
    def post(self, request, format=None):

        json = {
            'number_responses_saved': 0,
            'responses_saved': [],
            'volunteer': {},
            'opportunities': []
        }

        volunteer_name = request.POST.get('volunteer_name', '')
        volunteer_email = request.POST.get('volunteer_email', '')
        volunteer_phone = request.POST.get('volunteer_phone', '')

        volunteer = Volunteer()
        volunteer.name = volunteer_name
        volunteer.email = volunteer_email
        volunteer.phone = volunteer_phone
        volunteer.save()

        serialized_volunteer = serializers.VolunteerSerializer(volunteer)
        json['volunteer'] = serialized_volunteer.data

        opportunity_preference_ids = request.POST.getlist('opportunity_preference_id')

        question_responses = {
            'opportunity_preference_ids': opportunity_preference_ids
        }

        for key, value in request.POST.items():
            match = re.search(r'^q(\d+)$', key)
            if match and value:
                match = int(match.group(1))
                try:
                    question = Question.objects.get(pk=match)
                    question_responses[key] = value
                except Question.DoesNotExist:
                    continue

        for opportunity in Opportunity.get_opportunities(opportunity_preference_ids):
            opportunity.volunteers.add(volunteer)
            opportunity.save()
            serialized_opportunity = serializers.ShallowOpportunitySerializer(opportunity)
            json['opportunities'].append(serialized_opportunity.data)
            for survey in opportunity.surveys.all():
                for question in survey.question_set.all():
                    key = 'q%d' % question.id
                    question_exists = QuestionResponse.objects.filter(
                        volunteer=volunteer, question=question
                    ).exists()
                    if key in question_responses and not question_exists:

                        response = QuestionResponse()
                        response.volunteer = volunteer
                        response.question = question
                        response.answer = question_responses[key]
                        response.save()

                        json['number_responses_saved'] += 1
                        serialized_question_response = serializers.QuestionResponseSerializer(response)
                        json['responses_saved'].append(serialized_question_response.data)

        return DRF_Response(json)


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
    params['opportunity_list'] = map(lambda opportunity: opportunity.pk, opportunities)
    return render(request, 'core/survey.html', params)


def done(request):
    '''Process a survey submission

    This view proceseses a potential new volunteer's survey results and registers them
    as a new volunteer. It provides the new volunteer confirmation that they have succesfully
    navigated the process of signing up.
    '''
    if request.method != 'POST':
        return render(request, 'core/done.html', {'volunteer_name' : 'luis'})
        return redirect('volunteer_listing')

    volunteer_name = request.POST.get('volunteer_name', '')
    volunteer_email = request.POST.get('volunteer_email', '')
    volunteer_phone = request.POST.get('volunteer_phone', '')

    volunteer = Volunteer()
    volunteer.name = volunteer_name
    volunteer.email = volunteer_email
    volunteer.phone = volunteer_phone
    volunteer.save()

    params = {
        'volunteer_name': volunteer.name
    }

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


    return render(request, 'core/done.html', params)


def reach_out(request):
    'This view provides contact info for the volunteer opportunity managers'
    return render(request, 'core/reach_out.html', {
        'managers': Manager.objects.all()
    })
