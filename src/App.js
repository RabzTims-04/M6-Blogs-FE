import React from "react";
import { useState } from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import EditBlogPost from "./views/edit"
import { BrowserRouter, Route } from "react-router-dom";

function App() {

  const [blog, setBlog] = useState([])
  const [editPost, setEditPost] = useState(null)

  const updated =(val)=>{
    setBlog(val)
  }

  const editedPost =(editVal)=>{
    setEditPost(editVal)
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/" exact render={(routerProps)=> <Home {...routerProps} blogs={updated} /> }/>
      <Route path="/blog/:id" render={(routerProps)=> <Blog {...routerProps} blogs={blog} edited={editPost} /> }/>
      <Route path="/new" exact component={NewBlogPost} />
      <Route path="/edit/:id" exact render={(routerProps)=> <EditBlogPost blogs={blog} edited={editedPost} {...routerProps}/> }/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
