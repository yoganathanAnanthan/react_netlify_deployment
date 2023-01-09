import { createContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/posts'
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";


const DataContext = createContext({});

export const DataProvider = ({children})=>{
    const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState('')
  const [searchResult, setSearchResults] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate()
  const {width} = useWindowSize();


  const {data,fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts')

  useEffect(()=>{
    setPosts(data)
  },[data])



  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])


  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postList = posts.filter(post =>(post.id !== id))
      setPosts(postList)
      navigate('/')
    } catch (error) {
      console.log(`ERROR: ${error.message}`)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = '1234'
    const addPost = { id: id, title: title, datetime: datetime, body: body }
  try{  
    const response = await api.post('/posts',addPost)
    const allPost = [...posts, response.data]
    setPosts(allPost)
    console.log(allPost)
    setTitle('')
    setBody('')
    navigate('/')
  }catch(error){
    console.log(`Error: ${error.message}`)
  }
  }

  const handleEdit = async(id)=>{
    const datetime = '123'
    const updatePost = {id,title:editTitle, datetime, body:editBody}
    try {
      const response = await api.put(`/posts/${id}`,updatePost)
      setPosts(posts.map(post=> post.id===id ? {...response.data}  : post))
      setEditBody('')
      setEditTitle('')
      navigate('/')
    } catch (error) {
      console.log(`ERROR: ${error.message}`,updatePost)
    }

  }
    return(
        <DataContext.Provider value={{
            width,search, setSearch,
            searchResult,isLoading,fetchError,
            handleSubmit,title,setTitle,body,setBody,
            posts,handleDelete,
            posts,handleEdit,editBody,setEditBody,editTitle,setEditTitle
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext