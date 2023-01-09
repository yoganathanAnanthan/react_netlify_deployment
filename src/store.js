import { createStore,action,thunk,computed } from "easy-peasy";
import api from './api/posts'

export default createStore({
    posts: [],
    setPosts: action((state,payload)=>{
        state.posts = payload;
    }),
    title: '',
    setTitle: action((state,payload)=>{
        state.title = payload;
    }),
    body: '',
    setBody: action((state,payload)=>{
        state.body = payload;
    }),
    editTitle: '',
    setEditTitle: action((state,payload)=>{
        state.editTitle = payload;
    }),
    editBody: '',
    setEditBody: action((state,payload)=>{
        state.editBody = payload;
    }),
    search: '',
    setSearch: action((state,payload)=>{
        state.search = payload;
    }),
    searchResults:[],
    setSearchResults: action((state,payload)=>{
        state.searchResults = payload;
    }),
    postCount: computed((state)=>state.posts.length),
    getPostById: computed((state)=>{
        return (id) =>state.posts.find(post => (post.id).toString()=== id);
    }),
    savePost: thunk (async(actions,newPost,helpers)=>{
        const {posts} = helpers.getState()
        try{
            const response = await api.post('/posts',newPost);
            actions.setPosts([...posts,response.data])
            actions.setTitle('')
            actions.setBody('')
        }catch(error){
            console.log(`ERROR: ${error.message}`)
        }
    }),
    deletePost: thunk (async(actions,id,helpers)=>{
        const {posts} = helpers.getState()
        try {
            await api.delete(`posts/${id}`)
            actions.setPosts(posts.filter(post=>post.id !== id))
        } catch (error) {
            console.log(`ERROR: ${error.message}`)
        }
    }),
    editPost:thunk (async(actions,updatedPost,helpers)=>{
        const {posts} = helpers.getState()
        const {id} = updatedPost
        try {
            const response = await api.put(`/posts/${id}`,updatedPost)
            actions.setPosts(posts.map(post=> post.id===id ? {...response.data}  : post))
            actions.setEditBody('')
            actions.setEditTitle('')
          } catch (error) {
            console.log(`ERROR: ${error.message}`,updatedPost)
          }
    })
})