# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Boxing(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    datasource = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'boxing'


class Cleanmissing(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    attribute = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    datasource = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cleanmissing'


class Connections(models.Model):
    connectionid = models.CharField(primary_key=True, max_length=80)
    sourceid = models.CharField(max_length=80)
    targetid = models.CharField(max_length=80)
    sourcetype = models.CharField(max_length=100)
    targettype = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'connections'


class Correlation(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'correlation'


class Decisiontree(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=80, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    attribute = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'decisiontree'


class Decisiontreereg(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=80, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    attribute = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'decisiontreereg'


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class Gbdt(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    attribute = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'gbdt'


class Jointab(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'jointab'


class Kmeans(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    attribute = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'kmeans'


class Linearreg(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    attribute = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'linearreg'


class Localdata(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    choosedataset = models.CharField(max_length=200, blank=True, null=True)
    type = models.CharField(max_length=80, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    row = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'localdata'


class Logitreg(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    attribute = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'logitreg'


class Naivebayes(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    attribute = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'naivebayes'


class Neuralnet(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    attribute = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'neuralnet'


class Neuralreg(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    attribute = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'neuralreg'


class Normalization(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=80, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    datasource = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'normalization'


class Pca(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    datasource = models.TextField(blank=True, null=True)
    attribute = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pca'


class Randomforest(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    attribute = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'randomforest'


class Removeduplicate(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    datasource = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'removeduplicate'


class Sampling(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sampling'


class Scoremodel(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'scoremodel'


class Selectfield(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    checkbox = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=80, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    datasource = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'selectfield'


class Smote(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    datasource = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'smote'


class Standard(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    datasource = models.TextField(blank=True, null=True)
    attribute = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'standard'


class Stat(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stat'


class Svm(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)
    attribute = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'svm'


class Ttest(models.Model):
    id = models.CharField(primary_key=True, max_length=80)
    type = models.CharField(max_length=255, blank=True, null=True)
    positionx = models.CharField(max_length=20, blank=True, null=True)
    positiony = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ttest'
