import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import CreateNewGroup from "../components/CreateNewGroup";

const Home = () => {
    const [showNewGroupForm, setShowNewGroupForm] = useState(false);
    // const [activeButton, setActiveButton] = useState(null);
    

    const handleNewGroupBtn =  () => {
        setShowNewGroupForm(true);
    }

    return ( 
        <>
        <div>Groups</div>
        <Button onClick={handleNewGroupBtn}>+</Button>
        {showNewGroupForm && (
        <CreateNewGroup />
      )}
        </>
     );
}
 
export default Home;