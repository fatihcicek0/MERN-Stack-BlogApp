import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Posts from "../../components/Posts";
import { getPostByCategoryId } from "../../store/postSlice";
import './home.css'
export default function PostsByCategory() {
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const posts = useSelector(state => state.post.posts);
    useEffect(() => {
        dispatch(getPostByCategoryId(categoryId));
        console.log(posts);
    }, [categoryId])
    return (
        <Posts posts={posts} />
    )
}