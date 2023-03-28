import './Comments.css';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { addCommentToProduct } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';

const Comments = ({ comments, setOpenComments, openComments }) => {
    const [text, setText] = useState('');

    const dispatch = useDispatch();
    const { id } = useParams();

    const user = useSelector(state => state.authReducer.user);

    const handleChangeText = (e) => setText(e.target.value)

    const handleAddComment = (e) => {
        e.preventDefault();

        const formData = {
            author: user?.name,
            authorImage: user?.imageUrl,
            description: text,
            productId: id
        }

        dispatch(addCommentToProduct(formData, setText))
    }

    return(
        <div className='comments-wrap'>
            <Backdrop
                sx={{ overflowY:'auto', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openComments}
                onClick={(e) => setOpenComments(false)}
            >
                <div className='comments-block-wrap' onClick={(e) => e.stopPropagation()}>
                    {comments.length === 0 &&
                        <h1>No comments yet</h1>
                    }
                    <div className='comments-block'>
                        {comments.map(comment =>
                            <div className='comments-avatar-block'>
                                <Avatar src={comment.authorImage} className='comments-avatar'></Avatar>
                                <span>{comment.description}</span>
                            </div>
                        )}
                    </div>
                    <form onSubmit={handleAddComment} className='comments-create-block'>
                        <input value={text} type="text" onChange={handleChangeText} placeholder='Enter your text here' />
                        <button onClick={handleAddComment}>create</button>
                        <input type="submit" hidden />
                    </form>
                </div>
            </Backdrop>
        </div>
    )
}

export default Comments;