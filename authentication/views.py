from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .forms import CustomUserCraetionForm

# Authentication views
# Login view
def userLogin(request):
    if request.user.is_authenticated:
        # Redirect an already logged in user to the home page
        return redirect('home')
    
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            error_message = 'Invalid login credentials'
            return render(request, 'login.html', {'error': error_message})
    
    else:
        return render(request, 'login.html')

#Logout view
def userLogout(request):
    logout(request)
    return redirect('login')

# Registration view
def userRegister(request):
    if request.user.is_authenticated:
        # Redirect an already logged in user to the home page
        return redirect('home')
    
    form = CustomUserCraetionForm()

    if request.method == 'POST':
        form = CustomUserCraetionForm(request.POST)

        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            user = authenticate(request, username=user.username, password=request.POST['password1'])
            print(user)

            if user is not None:
                login(request, user)
                return redirect('home')
        else:
            error_message = 'Invalid registration credentials'
            return render(request, 'register.html', {'error': error_message})
    
    context = {'form': form}
    return render(request, 'register.html', context)

# Home view
@login_required(login_url='login')
def home(request):
    return render(request, 'index.html')