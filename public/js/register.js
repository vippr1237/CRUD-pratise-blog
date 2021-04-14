const submit = document.querySelector('#submit');
const form = document.forms['signupf'];
const status = document.querySelector('#status');

submit.addEventListener('click',async function(e){
    const response = await fetch('/user',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: form.username.value,
            password: form.password.value,
            email: form.email.value
        })
    })

    if (response.redirected){
        status.innerHTML = 'Successful Register';
        setTimeout(function(){
            location.replace(response.url);
        },500)
    }
    else {
        result = await response.json();
        status.innerHTML = result;
    }
})