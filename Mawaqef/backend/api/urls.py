from django.urls import path
from . import views
from .views import UnapprovedOperatorsView, AuthorizeOperatorView,UserDetailView, RejectOperatorView

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path('operators/unapproved/', UnapprovedOperatorsView.as_view(), name='unapproved_operators'),
    path('operators/<int:operator_id>/authorize/', AuthorizeOperatorView.as_view(), name='authorize_operator'),
    path('operators/<int:operator_id>/Reject/', RejectOperatorView.as_view(), name='reject_operator'),
    path('user/', UserDetailView.as_view(), name='user_detail'),
]
