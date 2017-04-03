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
        return f'<Question: {self.question_text}'

class Opportunity(models.Model):
    ''' Model for each volunteer opportunity
    '''
    name = models.CharField(max_length=255)
    desc = models.TextField(blank=True) # optional
    volunteers = models.ManyToManyField(Volunteer)
    manager = models.ManyToManyField(User)
    surveys = models.ManyToManyField(Survey)

    def __str__(self):
        return self.name

