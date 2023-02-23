export default function Comments({ comments }) {
    return (
        <div style={{ marginTop: 20 }}>
            {comments && comments.map(comment => {
                return (
                    <div key={comment.id} style={{ borderTop: '1px solid lightgray', padding: 10 }}>
                        <h4>{comment.userName}</h4>
                        <p style={{ padding: 10 }}>{comment.comment}</p>
                    </div>
                )
            })
            }
        </div>
    )
}