
from django.conf.urls import url, include
from django.views.generic import TemplateView
from django.contrib import admin
from snippets.views import task_list

from rest_framework import routers, serializers, viewsets
from rest_framework.authtoken.views import obtain_auth_token
#from snippets.urls import router
from django.conf.urls.static import static
#from snippets.views import TaskViewSet
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from snippets import views


# 使用自动的URL路由，让我们的API跑起来。
# 此外，我们也包括了登入可视化API的URLs。
urlpatterns =[
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/token/', obtain_auth_token, name='api-token'),#连接路由系统
    #url(r'^task$', views.task_list.as_view(), name='task'),
    #url(r'api/',include(router.urls)),
    #url(r'^task/normal$', TemplateView.as_view(template_name='snippets/normal.html')),
    #url(r'^task$', include('snippets.urls')),
    url(r'^task$', task_list),
    
    #url(r'^static/(?P<path>.*)', 'django.views.static.serve', {'document_root':'E:/Anaconda/Scripts/CorsApi/snippets/static'}),
    #url(r'^task/bayes$', TemplateView.as_view(template_name='snippets/bayes.html')),
    #url(r'^task/(?P<pk>[0-9]+)$', views.task_detail),
    
]

urlpatterns += staticfiles_urlpatterns()