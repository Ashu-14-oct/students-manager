{
    //method to submit new form data for new post using Ajax
    console.log('helllo');
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            
                $.ajax({
                    type: 'POST',
                    url: '/user/post',
                    data: newPostForm.serialize(),
                    success: function(data){
                        let newPost = newPostDom(data.data.post);
                        console.log("year");
                        $('#posts-list-container>ul').prepend(newPost);
                    },
                    error: function(err){
                        console.log(err.responseText);
                    }
                });
        });
    }

    //method to create post in dom

    let newPostDom = function(post){
        console.log(post);
        var page =  $( 
            `<li id="post-${post._id}">
        <p>
            
            <small>
                <a class="delete-post-button" href="/user/post/delete/${post._id}">x</a>
            </small>
            
            ${post.content}
            <br>
            <small>
                 -By ${post.user.name}
            </small>
        </p>
        <div>
            
            
                <form action="/user/create-comment" method="post">
                    <input type="text" name="content" placeholder="Type a comment..">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add comment">
                </form>

           
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                    
                    
                    </ul>
                </div>
            

        </div>
    </li> `

            
            // `<ul>
            // <% for(let i of posts) {%>
            
            //     <li id="post-<%= i._id %>">
            //         <p>
            //             <% if(locals.user && locals.user.id == i.user.id) {%>
            //             <small>
            //                 <a class="delete-post-button" href="/user/post/delete/<%= i._id %>">x</a>
            //             </small>
            //             <% } %>
            //             <%= i.content  %>
            //             <br>
            //             <small>
            //                  -By <%= i.user.name %>
            //             </small>
            //         </p>
            //         <div>
            //             <% if(locals.user) {%>
                        
            //                 <form action="/user/create-comment" method="post">
            //                     <input type="text" name="content" placeholder="Type a comment..">
            //                     <input type="hidden" name="post" value="<%= i._id %>">
            //                     <input type="submit" value="Add comment">
            //                 </form>

            //             <% } %>`

        )
        // console.log(page);
        // document.querySelector('#post-list-container ul').append = page;
        return page;
    }


    createPost();
}