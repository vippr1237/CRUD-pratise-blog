const comment = document.querySelector('#comment');
const like = document.querySelector('#like');
const body =document.forms['comment'];
const likeCount= document.querySelector('#like_count');
const authtoken = localStorage.getItem('auth-token');
const comment_section = document.querySelector('#comment-section');
getLike();
comment.addEventListener('click', async function(e){
    e.preventDefault();
    const response = await fetch(`/article/${comment.getAttribute('data-artid')}/comment`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authtoken
        },
        body: JSON.stringify({
            body: body.body.value
        })
    });
    if (response.redirected) {
        return location.replace(response.url);
    }
    else {
        
        const result = await response.json();
        result.forEach(function(item) {
            comment_section.innerHTML +=
            `<a href =/profile/${item.author}> ${item.username}</a>
            <div>${ item.body }</div>
            <div>${ item.createAt }</div>
            <hr>`
            body.body.value = '';
        })

    }
})

like.addEventListener('click',async function(e){
    const response = await fetch(`/article/${comment.getAttribute('data-artid')}/like`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authtoken
        },
    });
    if (response.redirected) {
        return location.replace(response.url);
    }
    else {
        const result = await response.json();
        if (result.like == -1) {
            like.innerHTML = 'Like';
            likeCount.innerHTML = result.count;
        } else {
            like.innerHTML = 'Liked';
            likeCount.innerHTML = result.count;
        }
    }
})

async function getLike(){
    const response = await fetch(`/article/${comment.getAttribute('data-artid')}/like`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authtoken
        }
    });
    const result = await response.json();
    if (result == -1)
        like.innerHTML = 'Like';
    else 
        like.innerHTML = 'Liked';
}