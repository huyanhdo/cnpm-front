import React from "react";
import {Box, Typography, Tab } from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import { ComboManage, PizzaManage } from "../components/manageCategory";
import { styled } from "@mui/system";
import { useAuth } from "../context/AuthContext";
import { Home } from "./Home";
export const MyTab = styled(Tab)({
    fontFamily: 'be Vietnam',
    fontWeight: '600',
    fontSize: '20px',
    borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
    },
    textTransform: 'none',
    color: '#EA6A12',
    '&.Mui-selected': {
      color: '#07143B',
    },

})


export const ManagePage = ()=>{
    const {currentUser} = useAuth();
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return( currentUser?
            <Box style={{
                width: '100%',
                }}>
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        m: 3
                    }}
                    >Quản lý món
                </Typography>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginLeft:3 }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <MyTab label="Pizza" value="1" />
                        <MyTab label="Tráng miệng" value="2" />
                        <MyTab label="Khai vị" value="3" />
                        <MyTab label="Món chay" value="4" />
                        <MyTab label="Đồ cho bé" value="5" />
                        <MyTab label="Đồ uống" value="6" />
                        <MyTab label="Combo" value="7" />

                    </TabList>
                    </Box>
                    <TabPanel value="1">
                        <PizzaManage category= {'pizza'} />
                    </TabPanel>
                    <TabPanel value="2">
                        <PizzaManage category= {'dessert'} />
                    </TabPanel>
                    <TabPanel value="3">
                        <PizzaManage category= {'appetizer'} />
                    </TabPanel>
                    <TabPanel value="4">
                        <PizzaManage category= {'vegetable'} />
                    </TabPanel>
                    <TabPanel value="5">
                        <PizzaManage category= {'kid'} />
                    </TabPanel>
                    <TabPanel value="6">
                        <PizzaManage category= {'drink'} />
                    </TabPanel>
                    <TabPanel value="7">
                        <ComboManage />
                    </TabPanel>
                </TabContext>
                </Box>
            </Box> : <Home/> 
    )
}