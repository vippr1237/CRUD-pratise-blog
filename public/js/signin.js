const status = document.getElementById('status');
const submit = document.getElementById('submit');
const form = document.forms['signin'];
submit.addEventListener('click', async function(e) {
    const response = await fetch('/user/login',     
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: form.username.value,
            password: form.password.value,
        })
    })
    const result = await response.json();
    if (result.redir) {
        localStorage.setItem('auth-token', result.token);
        status.innerHTML = 'Login Success';
        setTimeout(function(){
            location.replace(result.redir);
        },500)
    }
    else{
        status.innerHTML = result;
    }

})
