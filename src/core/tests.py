import datetime

from django.utils import timezone
from django.test import TestCase
from django.contrib.auth.models import User
from django.test import Client
from django.urls import reverse

from .models import Survey, Question, Opportunity, Volunteer, Manager, Response


class CoreTests(TestCase):

    def setUp(self):

        volunteer1 = Volunteer.objects.create(
            name="John",
            email="john@gmail.com",
            phone="4259712203"
        )

        manager1 = Manager.objects.create(
            user=User.objects.create(username="Bob", password="smith"),
            role="top lawyer",
            phone="2069712264"
        )

        survey1 = Survey.objects.create(
            name="Spanish proficiency"
        )

        survey2 = Survey.objects.create(
            name="Can you physically make it to our Seattle office?"
        )

        question1 = Question.objects.create(
            question_text="Do you speak spanish?",
            survey=survey1
        )

        opportunity1 = Opportunity.objects.create(
            name="Take a pro bono case"
        )
        opportunity1.volunteers.add(volunteer1)
        opportunity1.managers.add(manager1)
        opportunity1.surveys.add(survey1)

        opportunity2 = Opportunity.objects.create(
            name="Become a general intake volunteer"
        )
        opportunity2.volunteers.add(volunteer1)
        opportunity2.managers.add(manager1)
        opportunity2.surveys.add(survey2)

    def test_get_opportunities(self):
        """
        get_opportunities() should return opportunities that exist
        Should skip those that don't
        """
        choices = [1, 60]
        opportunities = Opportunity.get_opportunities(choices)
        self.assertEqual(len(opportunities), 1)

    def test_extract_surveys(self):
        'Test the Survey.extract_surveys method'
        choices = [1, 60]
        opportunities = Opportunity.get_opportunities(choices)
        surveys = Survey.extract_surveys(opportunities)
        self.assertEqual(len(surveys), 1)


    def test_survey_redirect(self):
        'Make sure that the survey view redirects GET requests'
        client = Client()
        response = client.get(reverse('volunteer_survey'))
        self.assertRedirects(response, reverse('volunteer_listing'))

    def test_surveys_selections_simple(self):
        '''Test the survey view's rendering

        Make sure it renders the surveys for the
        opportunities that were passed to it'''
        client = Client()
        response = client.post(reverse('volunteer_survey'), {
            'categories[]': ('1', '2')
        })

        expected = ['<Survey: Spanish proficiency>',
                    '<Survey: Can you physically make it to our Seattle office?>']

        self.assertQuerysetEqual(response.context['survey_list'], expected)

    def test_surveys_selections_advanced(self):
        '''Test the survey view's rendering

        Make sure it renders the surveys for the
        opportunities that were passed to it
        This test also adds an opportunity that shares
        a survey with a second opportunity. Need to make sure
        that we don't get duplicate results'''
        opportunity = Opportunity.objects.get(id=2)
        survey = Survey.objects.get(id=1)
        opportunity.surveys.add(survey)

        client = Client()
        response = client.post(reverse('volunteer_survey'), {
            'categories[]': ('1', '2')
        })

        expected = ['<Survey: Spanish proficiency>',
                    '<Survey: Can you physically make it to our Seattle office?>']

        self.assertQuerysetEqual(response.context['survey_list'], expected)

    def test_done_view(self):
        'Test the done view'
        client = Client()

        n_volunteers = Volunteer.objects.count()
        n_responses = Response.objects.count()

        response = client.post(reverse('survey_complete'), {
            'volunteer_name': 'luis',
            'volunteer_email': 'luisnaranjo733@gmail.com',
            'volunteer_phone': '2064784652',
            'q1': 'this is my answer'
            })

        self.assertEqual(response.status_code, 200)

        # test that a volunteer was added
        self.assertEqual(Volunteer.objects.count(), n_volunteers + 1)

        # test that a volunteer was added
        self.assertEqual(Response.objects.count(), n_responses + 1)


