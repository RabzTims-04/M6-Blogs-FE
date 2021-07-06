import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import "./styles.css";

const { REACT_APP_BACKEND_URL } = process.env
class Blog extends Component {

  state={
    blog:{},
    loading: true
  }

  url = `${REACT_APP_BACKEND_URL}/blogs/${this.props.match.params.id}`

  fetchSingleBlog = () =>{
    console.log(this.url);
    
     const blogId = this.props.match.params.id
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
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
