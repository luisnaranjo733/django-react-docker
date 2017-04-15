from django.db import models
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

class Volunteer(models.Model):
    ''' Model for each volunteer
    '''
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.name

class Survey(models.Model):
    ''' Model for each survey
    '''
    name = models.CharField(max_length=255)
    desc = models.TextField(blank=True) # optional
    priority = models.IntegerField(default=1)

    def __str__(self):
        return self.name

    @staticmethod
    def extract_surveys(opportunities):
        '''Take a list of opportunities and extract all of the surveys from it
        Doesn't return duplicate surveys although opportunities may require the same surveys
        @param: List of opportunities
        @returns: List of surveys
        '''
        surveys = []
        for opportunity in opportunities:
            for survey in opportunity.surveys.all().order_by('-priority'):
                if survey not in surveys:
                    surveys.append(survey)
        return surveys

class Question(models.Model):
    ''' Model for each survey question
    '''
    question_text = models.CharField(max_length=255)
    required = models.BooleanField(default=False)
    survey = models.ForeignKey(Survey)

    def __str__(self):
        return self.question_text

class Manager(models.Model):
    '''Model for volunteer opporunity managers
    '''
    user = models.OneToOneField(User)
    phone = models.CharField(max_length=15, default="", blank=True)
    role = models.CharField(max_length=100, default="", blank=True)

    def __str__(self):
        return str(self.user)

class Opportunity(models.Model):
    ''' Model for each volunteer opportunity
    '''
    class Meta:
        verbose_name_plural = "opportunities"

    name = models.CharField(max_length=255)
    desc = models.TextField(blank=True) # optional
    volunteers = models.ManyToManyField(Volunteer, blank=True)
    managers = models.ManyToManyField(Manager, blank=True)
    surveys = models.ManyToManyField(Survey, blank=True)

    def __str__(self):
        return self.name

    @staticmethod
    def get_opportunities(opportunity_ids):
        '''Fetch opportunities by pk
        @param: List of pks
        @returns: An array of opportunity objects

        Skips any non-existing PKs silently
        '''
        opportunities = []
        for opportunity_id in opportunity_ids:
            try:
                opportunity = Opportunity.objects.get(pk=opportunity_id)
                opportunities.append(opportunity)
            except Opportunity.DoesNotExist:
                continue

        return opportunities

class Response(models.Model):
    '''Model for registering a volunteer for a particular opportunity's particular question
    '''

    volunteer = models.ForeignKey(Volunteer)
    question = models.ForeignKey(Question)
    answer = models.CharField(max_length=255)

    # def __str__(self):
    #     return f'{self.volunteer.name}: {self.question.question_text}'