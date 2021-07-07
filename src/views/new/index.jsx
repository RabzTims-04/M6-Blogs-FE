import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import striptags from "striptags";
import "./styles.css";

const {REACT_APP_BACKEND_URL} = process.env
export default class NewBlogPost extends Component {

  state={
    nextPage:false,
    blog:{
	    "category": "",
	    "title": "",
	    "cover":"",
      "content":"",
	    "author": {
	      "name": "",
	      "avatar":""
	    }
    }
  }

  url = `${REACT_APP_BACKEND_URL}/blogs`

  addBlog = async (e) =>{
    e.preventDefault()
    try {
      const response = await fetch(this.url,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({
          category:this.state.blog.category,
          title:this.state.blog.title,
          cover:this.state.blog.cover,
          content:this.state.blog.content,
          author:{
            name:this.state.blog.author.name,
            avatar: this.state.blog.author.avatar
          }
        })
      })
      const data = await response.json()
      if(response.ok){
        alert('Data successfully posted :)')
        this.setState({
          blog:{
            "category": "",
            "title": "",
            "cover":"",
            "content":"",
            "author": {
              "name": "",
              "avatar":""
            }
          }
        })
        window.location.replace('http://localhost:3006')
      }
      else{
        console.log("error during adding a new post");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit = {(e)=> this.addBlog(e)}>

         <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control 
            id="title"
            value={this.state.blog.title}
            onChange={(e)=> this.setState({
              blog:{
                ...this.state.blog,
                title: e.target.value
              }
            })}
            size="lg" 
            required
            placeholder="Title" />
          </Form.Group>

          <Form.Group  className="mt-3">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control 
            type="text"
            id="cover"
            required
            value={this.state.blog.cover}
            onChange={(e)=> this.setState({
              blog:{
                ...this.state.blog,
                cover: e.target.value                  
              }
            })}
            size="lg" 
            placeholder="Link" />
          </Form.Group>

          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control 
            id="category"
            required
            value={this.state.blog.category}
            onChange={(e)=> this.setState({
              blog:{
                ...this.state.blog,
                category: e.target.value                  
              }
            })}
            size="lg" 
            as="select">
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Author Name</Form.Label>
            <Form.Control 
            id="name"
            required
            value={this.state.blog.author.name}
            onChange={(e)=> this.setState({
              blog:{
                ...this.state.blog,
                author:{
                  ...this.state.blog.author,
                  name: e.target.value
                }                   
              }
            })}
            size="lg" 
            placeholder="Name" />
          </Form.Group>

          <Form.Group  className="mt-3">
            <Form.Label>Author's Image</Form.Label>
            <Form.Control 
            type="text"
            id="avatar"
            required
            value={this.state.blog.author.avatar}
            onChange={(e)=> this.setState({
              blog:{
                ...this.state.blog,
                author:{
                  ...this.state.blog.author,
                  avatar: e.target.value
                }                   
              }
            })}
            size="lg" 
            placeholder="Link" />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              value={this.state.blog.content}
              onChange={(e)=> this.setState({
                blog:{
                  ...this.state.blog,
                  content: e                  
                }
              })}
              className="new-blog-content"
            />
          </Form.Group>

          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
