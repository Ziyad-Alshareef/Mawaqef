from django.urls import path
from . import views
from .views import UnapprovedOperatorsView, AuthorizeOperatorView,UserDetailView, RejectOperatorView, AllAuthorizedOperatorsView, CreateParkingSpotsMapView, ParkingSpotsMapView, FlipParkingSpotStatusView2, FlipParkingSpotStatusView,ParkingSpotsView, ForgotPasswordView, ResetPasswordView

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path('operators/unapproved/', UnapprovedOperatorsView.as_view(), name='unapproved_operators'),
    path('operators/authorized/', AllAuthorizedOperatorsView.as_view(), name='all_authorized_operators'),
    path('operators/<int:operator_id>/authorize/', AuthorizeOperatorView.as_view(), name='authorize_operator'),
    path('operators/<int:operator_id>/Reject/', RejectOperatorView.as_view(), name='reject_operator'),
    path('user/', UserDetailView.as_view(), name='user_detail'),
    path('create-parking-map/', CreateParkingSpotsMapView.as_view(), name='create_parking_map'),
    path('parking-map/<int:operator_id>/', ParkingSpotsMapView.as_view(), name='view_parking_map'),
    path('parking-spot/<int:pk>/flip-status2/', FlipParkingSpotStatusView2.as_view(), name='flip_parking_spot_status'),
    path('parking-map/<int:map_id>/spots/', ParkingSpotsView.as_view(), name='parking_spots_map'),
    path('parking-spot/<int:spot_id>/flip-status/', FlipParkingSpotStatusView.as_view(), name='flip_parking_spot_status'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
]
