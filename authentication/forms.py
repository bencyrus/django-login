from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class CustomUserCraetionForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2', 'email']

    def __init__(self, *args, **kwargs):
        super(CustomUserCraetionForm, self).__init__(*args, **kwargs)
        self.fields['username'].help_text = None
        self.fields['username'].label = 'Username'
        self.fields['username'].widget.attrs.update({'id': 'username', 'placeholder': 'Username'})

        self.fields['password1'].help_text = None
        self.fields['password1'].label = 'Password'
        self.fields['password1'].widget.attrs.update({'id': 'password1', 'placeholder': 'Password'})
        
        self.fields['password2'].help_text = None
        self.fields['password2'].label = 'Confirm Password'
        self.fields['password2'].widget.attrs.update({'id': 'password2', 'placeholder': 'Confirm Password'})
        
        self.fields['email'].label = 'Email'
        self.fields['email'].widget.attrs.update({'id': 'email', 'placeholder': 'example@gmail.com'})