import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Posts from "../../components/Posts";
import { getPostByUserId } from "../../store/postSlice";

export default function UserPosts() {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post.posts);

    const userId = localStorage.getItem('userId');
    useEffect(() => {
        dispatch(getPostByUserId(userId));
    },[]);
    return (
        <div>
            <Posts posts={posts} userPage={true} />
        </div>
    )
} 