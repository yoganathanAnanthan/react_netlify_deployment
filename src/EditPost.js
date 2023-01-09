import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
const EditPost = () => {
  const posts = useStoreState((state)=>state.posts)
  const editBody = useStoreState((state)=>state.editBody)
  const editTitle = useStoreState((state)=>state.editTitle)
  const editPost = useStoreActions((actions)=>actions.editPost)
  const setEditBody = useStoreActions((actions)=>actions.setEditBody)
  const setEditTitle = useStoreActions((actions)=>actions.setEditTitle)

  const navigate = useNavigate()
  const {id} = useParams();
  const post = posts.find(post=> (post.id).toString()===id);

  useEffect(()=>{
    if(post){
        setEditTitle(post.title)
        setEditBody(post.body)
    }
  },[post, setEditTitle,setEditBody])

    const  handleEdit =(id)=>{
      const datetime = 'qwe'
      const updatedPost = {id,title:editTitle,datetime,body:editBody}
      editPost(updatedPost)
      navigate(`/post/${id}`)
    }
    return (
        <main className='NewPost'>
            {editTitle && 
            <>
            <h2>Edit Post</h2>
        <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor='postTitle'>Title:</label>
        <input
        id='postTitle'
        type='text'
        required
        value={editTitle}
        onChange={(e)=>setEditTitle(e.target.value)}
        />
        <label htmlFor='postBody'>body:</label>
        <textarea
        id='postBody'
        required
        value={editBody}
        onChange={(e)=>setEditBody(e.target.value)}
        />
        <button type='button'
        onClick={() => handleEdit(post.id)}> Submit </button>
        </form>
        </>
        }
        {!editTitle && 
        <>
        <h2>Post not found</h2>
        <p>well, that ts disapponting</p>
        <p>
            <Link to='/'> Visit our Homepage</Link>
        </p>
        </>
        }
      </main>
  )
}

export default EditPost
