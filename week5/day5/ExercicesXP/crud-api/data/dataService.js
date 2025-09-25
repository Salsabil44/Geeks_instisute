import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

// Fetch all posts
export async function fetchPosts() {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching posts: ' + error.message);
    }
}