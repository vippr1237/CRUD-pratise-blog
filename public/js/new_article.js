const newf = document.forms['postf'];
const submit = document.querySelector('#submit');
const authtoken = localStorage.getItem('auth-token');
const status = document.querySelector('#status')

submit.addEventListener('click', async function(e) {
    const response = await fetch('/article',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authtoken
        },
        body: JSON.stringify({
            title: newf.title.value,
            body: newf.body.value
        })
    });
    
    if (response.redirected) {
        return location.replace(response.url);
    }
        
    else {
        const result = await response.json();
        status.innerHTML = result;
    }

})