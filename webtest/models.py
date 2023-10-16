from django.db import models
import base64
# Create your models here.

class test(models.Model):
	# 创建模型类并继承models.Model
	# 一个类就是数据库的一张表
	id = models.AutoField(max_lenge=10,verbose_name='id')
	label = models.CharField(max_length=255,verbose_name='标签')