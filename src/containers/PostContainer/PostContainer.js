import React, { Component } from "react";
import { PostWrapper, Navigate, Post, Warning } from "../../components";
import * as service from "../../services/post";

export default class PostContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      postId: 1,
      fetching: false,
      post: {
        title: null,
        body: null
      },
      comments: [],
      warningVisibility: false
    };
    //this.handleNavigateClick = this.handleNavigateClick.bind(this);
  }

  showWarning = () => {
    this.setState({
      warningVisibility: true
    });

    //after 1.5 sec,

    setTimeout(() => {
      this.setState({
        warningVisibility: false
      });
    }, 1500);
  };

  fetchPostInfo = async postId => {
    this.setState({
      fetching: true
    });
    // const post = await service.getPost(postId);
    // console.log(post);
    // const comments = await service.getComments(postId);
    // console.log(comments);
    try {
      const info = await Promise.all([
        service.getPost(postId),
        service.getComments(postId)
      ]);
      const { title, body } = info[0].data;
      const comments = info[1].data;

      this.setState({
        postId,
        post: {
          title,
          body
        },
        comments,
        fetching: false // done.
      });
    } catch (e) {
      this.setState({
        fetching: false
      });
      this.showWarning();
    }
  };
  handleNavigateClick = type => {
    const postId = this.state.postId;

    if (type === "NEXT") {
      this.fetchPostInfo(postId + 1);
    } else {
      this.fetchPostInfo(postId - 1);
    }
  };
  /*
  handleNavigateClick(type) {
    const postId = this.state.postId;

    if (type === "NEXT") {
      return this.fetchPostInfo(postId + 1);
    } else {
      return this.fetchPostInfo(postId - 1);
    }
  };*/

  componentDidMount() {
    this.fetchPostInfo(1);
  }

  render() {
    const { postId, fetching, post, comments, warningVisibility } = this.state;
    return (
      <div>
        <PostWrapper>
          <Navigate
            postId={postId}
            disabled={fetching}
            onClick={this.handleNavigateClick}
          />
          <Post
            postId={postId}
            title={post.title}
            body={post.body}
            comments={comments}
          />
          <Warning
            message="That post does not exist"
            visible={warningVisibility}
          />
        </PostWrapper>
      </div>
    );
  }
}
