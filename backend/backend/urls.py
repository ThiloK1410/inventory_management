"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.staticfiles.views import serve
from django.urls import include, path, re_path

urlpatterns = [
    path("api/", include("db_access.urls")),
    path("admin/", admin.site.urls),
    path("test/", include("test_app.urls")),
    # We could use a simpler regex like r".*" but then /api/deliveri/ would show
    # the index_view instead of the Django 404 page which is probably more fitting.
    re_path(r"^(?!api|admin|test).*", lambda request: serve(request, "index.html")),
]
