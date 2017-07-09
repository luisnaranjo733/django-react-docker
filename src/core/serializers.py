from rest_framework import serializers
from core.models import Opportunity, Survey, Question, QuestionResponse, Volunteer

class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = '__all__'
        depth = 2

class ShallowOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = '__all__'
        depth = 1

class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = (
            'id', 'name', 'desc',
            'question_set'
        )
        depth = 1

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
        depth = 1


class QuestionResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionResponse
        fields = '__all__'
        depth = 1


class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'
        depth = 1

