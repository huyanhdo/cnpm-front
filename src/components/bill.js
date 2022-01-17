import { Box, Card, Divider, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react'
export const Bill = (props) =>{
    const label ={
        'kid':'Đồ cho bé',
        'pizza':'Pizza',
        'appetizer':'Khai vị',
        'vegetable':'Đồ chay',
        'drink':'Đồ uống',
        'dessert':'Tráng miệng'
    };
    const statusStepper = {'Pending':'Duyệt','Prepairing':'Chuẩn bị','Shipping':'Vận chuyển','Completed':'Hoàn thành'}
    const order = props.order;
    const categories = ['kid', 'dessert', 'appetizer', 'drink', 'vegetable']
    //const categories = ['Đồ cho bé', 'Tráng miệng', 'Khai vị', 'Đồ uống', 'Đồ chay']
    const steps = ['Duyệt', 'Chuẩn bị', 'Vận chuyển', 'Hoàn thành']
    const activeStep = steps.findIndex(step => step === statusStepper[order.status])
    const timeToDate = (time) =>{
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
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
                    fontFamily: 'be Vietnam',
                    fontWeight: 700,
                    fontSize: '30px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'center',
                    m: 3,
                    width: '100%'
                }}
                >{"Mã đơn: " + props.code}
            </Typography>
            <Divider variant='middle'/>
            <pre
                style={{
                    fontFamily: 'be Vietnam',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'start',
                    marginLeft: '20px',
                }}
                >{"Tên: " + order.customer + "\t\t\tSố điện thoại: " + order.phone + 
                "\nĐịa chỉ: " + order.address + "\t\t\tThời gian: " + timeToDate(order.time)}
            </pre>
            <Divider variant='middle'/>
            {order.detail.pizza &&
            <Typography variant="h6"
                sx={{
                    fontFamily: 'be Vietnam',
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
                <pre
                style={{
                    width: '50%',
                    fontFamily: 'be Vietnam',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'start',
                    marginLeft: '20px',
                    m: 3,
                }}
                >{"+ Mã sản phẩm: " + pizza.id + "\t\tx" + pizza.number}
                </pre>
            )}
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between', flexWrap: 'wrap'
            }}
            >
            {
                categories.map(category => order.detail[category] &&
                    <Box sx={{width: '50%'}}>
                    <Divider variant='middle' sx={{width: '50%'}}/>
                    <Typography variant="h6"
                sx={{
                    fontFamily: 'be Vietnam',
                    fontWeight: 1000,
                    fontSize: '20px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'start',
                    marginLeft: '20px',
                    m: 3,
                }}
                >{label[category]} 
            </Typography>
                    {
                    order.detail[category].map(product =>
                        <pre
                        style={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        marginLeft: '20px',
                        m: 3,
                        }}
                        >{"+ Mã sản phẩm: " + product.id + "\t\tx" + product.number}
                        </pre>
                    )}
                    </Box>
                )
            }
            </Box>
            <Divider variant='middle'/>
            <pre
                style={{
                    fontFamily: 'be Vietnam',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'start',
                    marginLeft: '20px',
                    m: 3,
                }}
                >{"Tổng tiền: " + order['total payment'] + "\nPhí vận chuyển: " + order['shipping payment']}
            </pre>
            <Typography variant="h6"
                sx={{
                    fontFamily: 'be Vietnam',
                    fontWeight: 1000,
                    fontSize: '20px',
                    lineHeight: '52px',
                    color: '#07143B',
                    width: '100%',
                    m: 3,
                }}
                >Trạng thái:
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