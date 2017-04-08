from django.db import models
from django.contrib.auth.models import User

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

    def __str__(self):
        return self.name

class Question(models.Model):
    ''' Model for each survey question
    '''
    question_text = models.CharField(max_length=255)
    survey = models.ForeignKey(Survey)

    def __str__(self):
        return '<Question: %s>' % self.question_text

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

class Registration(models.Model):
    '''Model for registering a volunteer for a particular opportunity's particular question
    '''

    volunteer = models.ForeignKey(Volunteer)
    opportunity = models.ForeignKey(Opportunity)
    question = models.ForeignKey(Question)
