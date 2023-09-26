import { useState, useEffect } from 'react';
import { TextField, Button } from "@mui/material";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddMembersForm = ({ onAddMember }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const { group_id } = useParams();

  useEffect(() => {
    // Fetch user data when the component mounts
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/customer/api/customers`)
      .then((response) => {
        if (response.status === 200) {
          const users = response.data;
          setCustomers(users);
          setFilteredUsers(users);
        } else {
          console.error("Failed to fetch users.");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);

    const filteredUsers = customers.filter((user) =>
      user.name.toLowerCase().includes(searchText)
    );
    setFilteredUsers(filteredUsers);
  };

  const handleAddMember = async (user) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/customer/api/group/${group_id}/add-members`,
        { user: localStorage.getItem("token"), data: { memberIds: [user._id] } }
      );

      if (response.status === 200) {
        const newMember = {
          _id: user._id
        };

        onAddMember(newMember);

        setSearchText('');
      } else {
        console.error("Failed to add member to the group");
      }
    } catch (error) {
      console.error("Error adding member to the group:", error);
    }
  };

  return (
    <div>
      <TextField
        label="Search for Users"
        variant="outlined"
        value={searchText}
        onChange={handleSearchInputChange}
      />
      <Button variant="contained" color="primary" onClick={() => handleAddMember(filteredUsers[0])}>
        Add Member
      </Button>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <div>
          {filteredUsers.map((user) => (
            <div key={user._id}>
              <p>{user.name}</p>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleAddMember(user)}
              >
                Add
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddMembersForm;
