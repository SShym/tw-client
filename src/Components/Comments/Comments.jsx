import './Comments.css';
import Avatar from '@mui/material/Avatar';
import { useEffect, useRef, useState } from 'react';
import { addCommentToProduct } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';

const Comments = ({ comments, setOpenComments, openComments }) => {
    const [text, setText] = useState('');

    const myRef = useRef(null);
    const dispatch = useDispatch();    
    const { id } = useParams();

    const user = useSelector(state => state.authReducer.user);

    useEffect(() => {
        myRef.current.scrollIntoView();
    }, [comments]);

    const handleChangeText = (e) => setText(e.target.value)

    const handleAddComment = (e) => {
        e.preventDefault();

        const formData = {
            author: user?.name,
            authorImage: user?.imageUrl,
            description: text,
            productId: id
        }

        text.trim().length > 0 && dispatch(addCommentToProduct(formData, setText))
    }

    return(
        <div className='comments-wrap'>
            <Backdrop
                sx={{ display:'flex', flexDirection:'column', overflowY:'auto', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openComments}
                onClick={(e) => setOpenComments(false)}
            >
                {!user && <span className='not-logged-in'>Login to write a comment!</span>}
                <div className='comments-block-wrap' onClick={(e) => e.stopPropagation()}>
                    {comments.length === 0 &&
                        <h1>No comments yet</h1>
                    }
                    <div className='comments-block'>
                        {comments.map(comment =>
                            <div className='comments-avatar-block'>
                                <Avatar src={comment.authorImage} className='comments-avatar'>{comment.author[0]}</Avatar>
                                <span>{comment.description}</span>
                                {console.log(comment)}
                            </div>
                        )}
                    </div>
                        <form onSubmit={handleAddComment} className='comments-create-block'>
                            <input disabled={!user} value={text} type="text" onChange={handleChangeText} placeholder='Enter your message' />
                            <button disabled={!user} onClick={handleAddComment}>SEND</button>
                            <input type="submit" hidden />
                        </form>
                    <div ref={myRef} />
                </div>
            </Backdrop>
        </div>
    )
}

export default Comments;