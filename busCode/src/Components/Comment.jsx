import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCommentsForLocation, addComment } from '../ApiCalls/CommentsApi';
import { useLogin } from '../Contexts/LoginContext';

const Comments = ({ entityId, entityType }) => {
    const { username, userid } = useLogin();
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchComments() {
            try {
                const fetchedComments = await getCommentsForLocation(entityId, entityType);
                setComments(fetchedComments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setLoading(false);
            }
        }

        fetchComments();
    }, [entityId, entityType]);

    const handleCommentSubmit = async () => {
        try {
            const newComment = {
                comment: newCommentText,
                username: username,
                userId: userid,
                entityId: entityId,
                entityType: entityType
            };
            const response = await addComment(newComment);
            // Update the comments state with the newly added comment
            setComments([...comments, response]);
            setNewCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    if (loading) {
        return <div>Loading comments...</div>;
    }

    return (
        <div className='commentDisplayContainer'>
            <h2>Comments</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>By: {comment.username}</p>
                    </li>
                ))}
            </ul>
            <textarea type="text" value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} />
            <button className='button-color' onClick={handleCommentSubmit}>Post Comment</button>
        </div>
    );
};

Comments.propTypes = {
    entityId: PropTypes.string.isRequired,
    entityType: PropTypes.oneOf(['location', 'route']).isRequired
};

export default Comments;
