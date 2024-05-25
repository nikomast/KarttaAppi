import axios from 'axios';

export const addComment = async (comment) => {
    try {
        const response = await axios.post('http://localhost:3000/comments', comment);
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error; 
    }
};


export const getCommentsForLocation = async (entityId, entityType) => {
    try {
        const response = await axios.get('http://localhost:3000/comments?entityId='+entityId+'&&entityType='+entityType);
        return response.data;
    } catch (error) {
      console.error('Error fetching:', error);
        throw error;
    }
};
