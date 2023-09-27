import axios from 'axios';

const FetchGroups = async () => {
  try {
    // Make a GET request to your backend API endpoint for fetching groups
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/customer/api/groups/${localStorage.getItem("customerToken")}`);
    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      // Parse the response data
      const groups = response.data;

      // Do something with the fetched groups data, e.g., store it in state
      return groups;
    } else {
      // Handle error cases, e.g., display an error message
      console.error('Failed to fetch groups data');
      return null;
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error('Error fetching groups data:', error);
    return null;
  }
};

export default FetchGroups;
