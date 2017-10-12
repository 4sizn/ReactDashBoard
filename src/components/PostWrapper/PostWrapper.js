import React from 'react';
import './PostWrapper.css';

// PostWrapper의 뷰 하위 콘텐츠 데이터 전달
const PostWrapper = ({children}) => (
    <div className="PostWrapper">
        {children}
    </div>
)
export default PostWrapper;