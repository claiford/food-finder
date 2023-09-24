import axios from 'axios';

const FetchUsers = async () => {
  try {
    // Make a GET request to your backend API endpoint
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`);

    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      // Parse the response data
      const users = response.data;

      // Do something with the users data, e.g., store it in state
      return users;
    } else {
      // Handle error cases, e.g., display an error message
      console.error('Failed to fetch user data');
      return null;
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error('Error fetching user data:', error);
    return null;
  }
};

export default FetchUsers;
