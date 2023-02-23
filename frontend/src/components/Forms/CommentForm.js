import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addComment } from '../../store/postSlice';
import'./form.css';
export default function CommentForm({ postId }) {

    const dispatch = useDispatch();
    const userName = localStorage.getItem('userName');
    const [data, setData] = useState({ postId: postId, userName: userName, comment: '' });

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment(data));
        setData({ postId: postId, userName: userName, comment: '' });
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <textarea name="comment"
                    value={data.comment}
                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                    row='10'
                    placeholder="Write a comment...">
                </textarea>
                <button className="form-btn" style={{ width: 150 }} type='submit'>Add comment</button>
            </form>
        </div>
    )
}