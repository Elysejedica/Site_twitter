const JsonPost = fetch("https://jsonplaceholder.typicode.com/posts")
const JsonUser = fetch("https://jsonplaceholder.typicode.com/users")
const JsonComments = fetch("https://jsonplaceholder.typicode.com/comments")
// console.log(JsonPost, JsonComments, JsonUser);
const para = document.getElementById("texte")
const mean = document.getElementById("content")
const main = document.querySelector("main");


function addPost(title, body, name, comment) {
    const template = `  <div class="contenaire">
<h1 id="utilisateur">${name}</h1>
<h3 id="post">${title}</h3>
<div class="contenu" id="content">
    <p id="texte">${body}</p>
</div>
<p class="comments">commentaires</p>
<div class="commentaire">
    ${comment}
</div>
</div>`
    main.innerHTML += template;
}

JsonPost.then(res => {
    return res.json()
}).then(data => {
    for (let i = 0; i < data.length; i++) {
       

        // addPost(data[i].title, data[i].body)

        fetch("https://jsonplaceholder.typicode.com/users/" + data[i].userId)
            .then(res => {
                return res.json()
            }).then(user => {
                // for (let i = 0; i < data.length; i++) {
                //     console.log(data[i].id);
                //     console.log(data[i].name);
                //     console.log(data[i].username);
                //     console.log(data[i].email);
                //     console.log(data[i].address);
                //     console.log(data[i].phone);
                //     console.log(data[i].website);
                //     console.log(data[i].company);
                // }
               


                fetch(`https://jsonplaceholder.typicode.com/posts/${data[i].id}/comments`)
                    .then(res => {
                        return res.json()
                    }).then(comments => {
                        let commentTemplate = "";
                        for(let j = 0 ; j<comments.length ; j++) {
                            commentTemplate += `
                            <b>${comments[j].email}</b>
                            <p>${comments[j].body}</p>
                            `
                        }

                        console.log(commentTemplate);
                        addPost(data[i].title, data[i].body, user.name , commentTemplate)
                    })

            })


    }
})



// JsonComments.then(res => {
//     return res.json()
// }).then(data => {
//     for (let i = 0; i < data.length; i++) {
//         console.log(data[i].postId);
//         console.log(data[i].name);
//         console.log(data[i].email);
//         console.log(data[i].body);

//     }
// })


const darkBtn = document.getElementById("reglage");
let isDarkMode = false;

window.onload = function () {
    let mode = document.querySelector('body');
    if (isDarkMode) {
        mode.classList.add('dark');
    } else {
        mode.classList.remove('dark');
    }
}

darkBtn.onclick = function () {
    let mode = document.querySelector('body');
    if (isDarkMode) {
        mode.classList.remove('dark');
        isDarkMode = false;
    } else {
        mode.classList.add('dark');
        isDarkMode = true;
    }

}


