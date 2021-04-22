const authtoken = localStorage.getItem('auth-token');
const editBtn = document.querySelector('#editBtn');
const editf = document.forms['editF'];

editBtn.addEventListener('click', async function(e){
    const response = await fetch(`/profile/${editBtn.getAttribute('data-uid')}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authtoken
        },
        body: JSON.stringify({
            email: editf.email.value, 
            dob: editf.dob.value, 
            firstName: editf.firstName.value, 
            lastName: editf.lastName.value, 
            address: editf.address.value
        })
    })
    console.log(response);

    if (response.redirected) {
        location.replace(response.url);
    } else {
        const result = await response.json();
        if (result.n == 1) {
            location.replace(`/profile/${editBtn.getAttribute('data-uid')}`);
        }
    }
})
authorize();


async function authorize() {
   const response = await fetch(`/profile/${editBtn.getAttribute('data-uid')}/edit`, {
       method: 'POST',
       headers: {
            'Content-Type': 'application/json',
            'auth-token': authtoken
       }
   })
   if (response.redirected) {
       location.replace(response.url);
   } 
   else {
       const result = await response.json();
       if (result == -1) {
           location.replace('/403');
       }
   }
}