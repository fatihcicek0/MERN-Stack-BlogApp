import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { deletePost } from "../store/postSlice";

export default function Posts({ posts, userPage }) {
  const user = localStorage.getItem('userId');
  const dispatch = useDispatch();

  const deleteButtonClick = (postId) => {
    dispatch(deletePost(postId));
  }

  return (
    <div className='container-card'>
      {posts.map(post => {
        return (
          <div key={post.id} className='card' >
            <div className="card-left">
              <img src={`http://localhost:8080/${post.imgUrl}`}></img>
            </div>
            <div className="card-right" >
              <div className="cr-head" >
                <Link to={`/post/${post._id}`}><h2>{post.title}</h2></Link>
                {userPage && user == post.userId &&
                  <div style={{ display: 'flex', height: 35, backgroundColor: 'white', borderRadius: 10 }} >
                    <Link to={`/post/edit/${post._id}`} style={{ backgroundColor: 'blueviolet', borderRadius: 10, color: 'white', padding: 5 }}>
                      <BorderColorIcon />
                    </Link>
                    <button onClick={() => deleteButtonClick(post._id)} style={{ height: 35, backgroundColor: 'red', borderRadius: 5, border: 'none', marginLeft: 10 }}>
                      <DeleteSweepIcon style={{ color: 'white', padding: 5 }} />
                    </button>
                  </div>
                }
              </div>
              <div className="cr-body">
                <p>{post.content}</p>
                <div>
                  ...
                  <Link to={`/post/${post._id}`} >
                    {">>>>"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}