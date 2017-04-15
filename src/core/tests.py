import datetime

from django.utils import timezone
from django.test import TestCase
from django.contrib.auth.models import User
from django.test import Client

from .models import Survey, Question, Opportunity, Volunteer, Manager


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

        question1 = Question.objects.create(
            question_text="Do you speak spanish?",
            survey=survey1
        )

        opportunity = Opportunity.objects.create(
            name="Take a pro bono case"
        )
        opportunity.volunteers.add(volunteer1)
        opportunity.managers.add(manager1)
        opportunity.surveys.add(survey1)

    def test_get_opportunities(self):
        """
        get_opportunities() should return opportunities that exist
        Should skip those that don't
        """
        choices = [1, 60]
        opportunities = Opportunity.get_opportunities(choices)
        self.assertEqual(len(opportunities), 1)

    def test_extract_surveys(self):
        choices = [1, 60]
        opportunities = Opportunity.get_opportunities(choices)
        surveys = Survey.extract_surveys(opportunities)
        self.assertEqual(len(surveys), 1)

    def test_done_method(self):
        c = Client()

        nVolunteers = Volunteer.objects.count()

        request = c.post('/volunteer/survey/', {
            'volunteer_name': 'luis',
            'volunteer_email': 'luisnaranjo733@gmail.com',
            'volunteer_phone': '2064784652'})

        self.assertEqual(request.status_code, 200)
        self.assertEqual(Volunteer.objects.count(), nVolunteers + 1)

