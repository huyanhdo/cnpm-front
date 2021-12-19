import { Box, Card, Divider, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react'
export const Bill = (props) =>{
    const order = props.order;
    const categories = ['kid', 'dessert', 'appetizer', 'drink', 'vegetable']
    const steps = ['Pending', 'Preparing', 'Shipping', 'Completed']
    const activeStep = steps.findIndex(step => step === order.status)
    const timeToDate = (time) =>{
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()
        let hour = date.getHours()
        let min = date.getMinutes()
        let sec = date.getSeconds()
        return year + '/' + month + '/' + day + " - " + hour + ":" + min + ":" + sec;   
    }
    return(
        <Card
        sx={{
            width: '60%',
            p: 5
        }}
        >
            <Typography variant="h6"
                sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: '30px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'center',
                    m: 3,
                    width: '100%'
                }}
                >{"Order Code: " + props.code}
            </Typography>
            <Divider variant='middle'/>
            <pre
                style={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'start',
                    marginLeft: '20px',
                }}
                >{"Name: " + order.customer + "\t\t\tPhone: " + order.phone + 
                "\nAddress: " + order.address + "\t\t\tTime: " + timeToDate(order.time)}
            </pre>
            <Divider variant='middle'/>
            {order.detail.pizza &&
            <Typography variant="h6"
                sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 1000,
                    fontSize: '20px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'start',
                    marginLeft: '20px',
                    m: 3,
                }}
                >Pizzas: 
            </Typography>
            }
            {order.detail.pizza && order.detail.pizza.map(pizza =>
            <Box
            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                p: 3,
                alignItems: 'center'
            }}
            >
                <pre
                style={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'start',
                    marginLeft: '20px',
                    m: 3,
                }}
                >{"+ Product code: " + pizza.id + "\nSize: " + pizza.size + "\tType: " + pizza.type + '\nTopping: ' + 
                    pizza.topping.reduce((str, top) => str + top + ',', '')
                }
                </pre>
                <Typography variant="h6"
                sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'center',
                    m: 3,
                }}
                >{"x" + pizza.number}
                </Typography>
            </Box>
            )}
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
            >
            {
                categories.map(category => order.detail[category] &&
                    <Box sx={{width: '50%'}}>
                    <Divider variant='middle' sx={{width: '50%'}}/>
                    <Typography variant="h6"
                sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 1000,
                    fontSize: '20px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'start',
                    marginLeft: '20px',
                    m: 3,
                }}
                >{category.replace(/^\w/, (c) => c.toUpperCase())}s: 
            </Typography>
                    {
                    order.detail[category].map(product =>
                        <pre
                        style={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        marginLeft: '20px',
                        m: 3,
                        }}
                        >{"+ Product Code: " + product.id + "\t\tx" + product.number}
                        </pre>
                    )}
                    </Box>
                )
            }
            </Box>
            <Divider variant='middle'/>
            <pre
                style={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'start',
                    marginLeft: '20px',
                    m: 3,
                }}
                >{"Total payment: " + order['total payment'] + "\nShipping payment: " + order['shipping payment']}
            </pre>
            <Typography variant="h6"
                sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 1000,
                    fontSize: '20px',
                    lineHeight: '52px',
                    color: '#07143B',
                    width: '100%',
                    m: 3,
                }}
                >Status:
            </Typography>
            <Stepper
            color='warning'
            activeStep={activeStep}
            alternativeLabel
            >
                {
                    steps.map(step =>
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>    
                    )
                }
            </Stepper>
        </Card>
    )
}