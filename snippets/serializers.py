# -*- coding: utf-8 -*-

from rest_framework import serializers

from django.contrib.auth import get_user_model
from rest_framework.reverse import reverse
from django.utils.translation import ugettext_lazy as _




class TaskSerializer(serializers.ModelSerializer):#Task的序列器
    choice = serializers.IntegerField()
    links = serializers.SerializerMethodField() 
    
    def create(self,validated_data):
        choice = validated_data['data']
        return choice
    
    def update(self,instance,validated_data):
        instance.choice = validated_data.get('choice',instance.choice)
        instance.save()
        return instance
        
    
    