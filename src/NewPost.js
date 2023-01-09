import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
  const navigate = useNavigate()
  const posts = useStoreState((state)=>state.posts)
  const title = useStoreState((state)=>state.title) 
  const body = useStoreState((state)=>state.body) 
  const setTitle = useStoreActions((actions)=>actions.setTitle) 
  const setBody = useStoreActions((actions)=>actions.setBody) 
  const savePost = useStoreActions((actions)=>actions.savePost) 

  const handleSubmit = ()=>{
    const id = posts.length? posts[posts.length -1].id +1 : 1;
    const datetime = '12345'
    const newPost = {id,title,datetime,body}
    savePost(newPost)
    navigate('/')
  }
  return (
    <main className='NewPost'>
      <form className='newPostForm' onSubmit={handleSubmit}>
      <label htmlFor='postTitle'>Title:</label>
      <input
      id='postTitle'
      type='text'
      required
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      <label htmlFor='postBody'>body:</label>
      <textarea
      id='postBody'
      required
      value={body}
      onChange={(e)=>setBody(e.target.value)}
      />
      <button type='submit'> Submit </button>
      </form>
    </main>
  )
}

export default NewPost
