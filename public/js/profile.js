const editBtn = document.querySelector('#editBtn');
const authtoken = localStorage.getItem('auth-token');

editable();
async function editable() {
    const response = await fetch(`/profile/${editBtn.getAttribute('data-uid')}/edit`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authtoken
        },
    });
    if (response.redirected) {
        editBtn.style.display = 'none';
    }
    else {
        const result = await response.json();
        if (result == 1)
            editBtn.style.display = 'inline-block';
        else 
            editBtn.style.display = 'none';
    }
}