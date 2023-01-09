import React from 'react'
import { useParams,Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
const PostPage = () => {
  const navigate = useNavigate()
  const deletePost = useStoreActions((actions)=>actions.deletePost)
  const getPostById = useStoreState((state)=>state.getPostById)

  const {id} = useParams();
  const post = getPostById(id);

  const handleDelete = async(id)=>{
    deletePost(id)
    navigate('/')
  }
  return (
    <main className='PostPage'>
      <article className='post'></article>
      {post && 
      <>
      <h2>{post.title}</h2>
      <p className='postDate'>{post.datetime}</p>
      <p className='postBody'>{post.body}</p>
      <button onClick={()=>handleDelete(post.id)} className="deleteButton">
        Delete Post
        </button>
          <Link to={`/edit/${post.id}`}>
            <button className='editButton'>
              Edit Post
            </button>
          </Link>

      </>
      }
      {!post && 
      <>
      <h2>page not found</h2>
      <p>well! that is disappointing.</p>
      <p>
        <Link to='/'>
          Visit to our home page
        </Link>
      </p>
      </>
      }
    </main>
  )
}

export default PostPage
