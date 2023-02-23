import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "../../components/Forms/PostForm";
import { getPostById } from "../../store/postSlice";

export default function EditPost() {
    const post = useSelector(state => state.post.postDetail);
    const { postId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostById(postId));
    }, [])
    return (
        <div>
            <Form data={post}></Form>
        </div>
    )
}