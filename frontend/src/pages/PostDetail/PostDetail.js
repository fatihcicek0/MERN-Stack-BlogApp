import { useEffect } from "react";
import './detail.css';
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../store/postSlice";
import { Link, useParams } from "react-router-dom";
import Comments from "../../components/Comments";
import CommentForm from "../../components/Forms/CommentForm";
export default function PostDetail() {
    const user = localStorage.getItem('userId');
    const dispatch = useDispatch();
    const { postId } = useParams();
    const post = useSelector(state => state.post.postDetail);
    useEffect(() => {
        dispatch(getPostById(postId));
    }, [postId])
    return (
        <div className="container-detail" >
            <div className="cd-head">
                <img src={`http://localhost:8080/${post.imgUrl}`} ></img>
            </div>
            <div className="cd-body">
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <Comments comments={post.comments} />
                <CommentForm postId={postId} />
            </div>
        </div>
    )
}