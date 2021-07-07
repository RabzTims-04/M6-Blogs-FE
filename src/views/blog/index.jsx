import React, { Component } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author";
import "./styles.css";

const { REACT_APP_BACKEND_URL } = process.env
class Blog extends Component {

  state={
    blog:{},
    loading: true
  }

  id = this.props.match.params.id
  url = `${REACT_APP_BACKEND_URL}/blogs/${this.id}`

  fetchSingleBlog = () =>{
    console.log(this.url);
    
     const blogId = this.id
     const blog = this.props.blogs.find(blog => blog._id.toString() === blogId)
     if(blog){
       this.setState({
         blog,
         loading:false
       })
     }
  }

  componentDidMount(){
    this.fetchSingleBlog()
    console.log(this.state.blog);
  }

  componentDidUpdate =()=>{
    if(this.state.nextPage){
      window.location.replace('http://localhost:3006')
    }
  }

  deleteBlog = async (e) =>{
    try {
      const response = await fetch(this.url,{
        method:'DELETE'
      })
      if(response.ok){
        alert('deleted successfully')
        this.setState({
          ...this.state,
          nextPage:true
        })
      }
      else{
        console.log('error in deleting');
      }
    } catch (error) {
      console.log(error);
    }
  } 

  currentTime =(dataTime) =>{
    let time = new Date(dataTime).toLocaleTimeString()
    console.log('time',time);
    return time
}

  currentDate =(dataDate) =>{
    let date = new Date(dataDate).toLocaleDateString()
    console.log('date',date);
    return date
}

  render() {
    let {blog, loading } = this.state
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{this.currentDate(blog.createdAt)}</div>
                <div>{this.currentTime(blog.createdAt)}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>

            <div className="d-flex justify-content-between mt-5 pt-5">
              <div>
                  <Link to={`/edit/${this.id}`}>
                    <Button
                      variant="secondary">
                        Edit Post
                      </Button>
                  </Link> 
              </div>
              <div>
           
                    <Button
                      onClick={(e)=>this.deleteBlog(e)} 
                      variant="danger">
                        Delete
                      </Button>
                  
                   
              </div>
            </div> 

          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
