import { useNavigate, useParams } from "react-router-dom"


/*const deleteButton = () => {
    if (currentUser.staff || currentUser.id === post.userId) {
        return <button onClick={() => {
            fetch(`http://localhost:8088/posts/${post.id}`, {
                method: "DELETE"
            })
                .then(() => {
                    fetch('http://localhost:8088/posts?_expand=topic')
                    .then(response => response.json())
                    .then((ticketArray) => {
                        setPosts(ticketArray)
                        return ticketArray
                        
                    }) .then((ticketArray) => {
                        const copyFilter = ticketArray.filter((element) => {return element.isApproved === true} )
                        setPostList(copyFilter)
                    })
                })
                
        }} className="button">Delete</button>
    }
    else {
        return ""
    }
}*/

const UpdateButton = () => {
    if (currentUser.id === post.userId) {
        return <button onClick={() => { navigate(`/posts/postEdit/${post.id}`)
            // fetch(`http://localhost:8088/posts/pos${post.id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify()
            // })
            //     .then(() => {
            //         getAllPosts()
            //     })
        }} className="button">Edit</button>
    }
    else {
        return ""
    }
}
// const closeTicket = () => {
//     const copy = {
//         userId: post.userId,
//         description: post.content,
//         dateCompleted: new Date()
//     }
//     return fetch(`http://localhost:8088/posts/${post.id}`, {
    
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(copy)
//     })
//         .then(response => response.json())
//         .then(getAllPosts())
// }
return <></>