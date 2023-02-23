import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Posts from '../../components/Posts';
import { getPosts } from '../../store/postSlice';
import './home.css'
export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [])
  return (
    <Posts posts={posts}></Posts>
  )
}