import './form.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addPost, editPost, getCategories } from '../../store/postSlice';
import { useNavigate } from 'react-router-dom';
export default function Form({ data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = localStorage.getItem('userId');
    const categories = useSelector(state => state.post.categories);
    const [post, setPost] = useState({ title: '', categoryId: '', content: '', userId: user });
    const [img, setİmg] = useState('');

    useEffect(() => {
        dispatch(getCategories());
    }, [])

    const onChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('categoryId', post.categoryId);
        formData.append('content', post.content);
        formData.append('userId', post.userId);
        formData.append('img', img);

        if (data) {
            formData.append('postId', data._id);
            dispatch(editPost(formData));
            navigate(`/post/${data._id}`);
        } else {
            dispatch(addPost(formData));
            navigate('/');
        }
    }
    useEffect(() => {
        if (data) {
            setPost({ title: data.title, categoryId: data.categoryId, content: data.content, userId: data.userId });
        }
    }, [data])
    return (
        <div className='container'>
            <div className="container-form" id='form-post'>
                <h1>{data ? 'Edit Post' : 'Add Post'}</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder='Title' onChange={onChange} name='title' value={post.title}></input>
                    <div>
                        <label>İmage :</label>
                        <input style={{ width: 200 }} type="file" onChange={(e) => setİmg(e.target.files[0])} name='imgUrl'></input>
                    </div>
                    <div>
                        <label>Category :</label>
                        <select style={{ width: 200 }} value={post.categoryId} name='categoryId' onChange={onChange}>
                            <option></option>
                            {categories.map(category => {
                                return (
                                    <option value={category._id} >{category.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <textarea placeholder="Content" rows="20" name='content' onChange={onChange} value={post.content} ></textarea>
                    <button type='submit' className="form-btn">Save</button>
                </form>
            </div>
        </div>
    )
}