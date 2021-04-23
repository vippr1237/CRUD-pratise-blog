const authtoken = localStorage.getItem('auth-token');
const editBtn = document.querySelector('#editBtn');
const editf = document.forms['editF'];
const delBtn = document.querySelector('#delBtn');
const status = document.querySelector('#status');
getEdit();
editBtn.addEventListener('click',async function(e) {
    const response = await fetch(`/article/${editBtn.getAttribute('data-artid')}/`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authtoken
        },
        body: JSON.stringify({
            title: editf.title.value,
            body: editf.body.value
        })
    });
    if (response.redirected){
        location.replace(response.url);
    }
    else {
        const result = await response.json();
        status.innerHTML = result;
    }
})

delBtn.addEventListener('click', async function(e){
        const response = await fetch(`/article/${editBtn.getAttribute('data-artid')}/`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authtoken
        },
        body: JSON.stringify({
            title: editf.title.value,
            body: editf.body.value
        })
    });
    if (response.redirected){
        location.replace(response.url);
    }
    else {
        const result = await response.json();
        status.innerHTML = result;
    }
})


async function getEdit() {
    const response = await fetch(`/article/${editBtn.getAttribute('data-artid')}/edit`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authtoken
        }
    });
    if (response.redirected){
        location.replace(response.url);
    }
    else {
    const result = await response.json();
        if (result == -1)
            return document.body.innerHTML = '<h1>You can not access this route</h1>';
        return;
    }
}
