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

  //이미 렌더를 거친 상황
  componentDidMount() {
    this.fetchPostInfo(1);
  }

  //fechpostinfo를 거치기 전 constroctor 시 this.state의 기본 값으로 render data 정리...
  // 그래서 로그를 보면 page 1이 두번 찍혀져 있음
  // Didmiount거치지전 render()로 <Post>의 기본값 전달(post id만 1이지 내부 body는 null상태)  
  //=> DidMount로 fechpostinfo(1)로 데이터값 다시전달 (post id값 1에 대한 내부 데이터 fetching 완료) <Post>의 props데이터 다시 전달
  //=> <Post> 내부에서는 props데이터가 변동(진짜 데이터 들어감 )이 되었음으로 WillReceiveMount()함수 전달 및 진짜값 setting.
  
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
