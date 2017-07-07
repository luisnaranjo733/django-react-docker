from rest_framework import serializers
from core.models import Opportunity, Survey

class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = '__all__'
        depth = 2

class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = (
            'id', 'name', 'desc',
            'question_set'
        )
        depth = 1
