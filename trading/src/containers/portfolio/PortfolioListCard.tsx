// import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Button, CardActions, Divider, Grid, Menu, MenuItem, Typography } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// assets
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        // marginLeft: '20px',
        // marginRight: '20px',
        marginBottom: '12px'
    },
    cardAction: {
        padding: '10px',
        paddingTop: 0,
        justifyContent: 'center'
    },
    primaryLight: {
        // color: theme.palette.primary[200],
        cursor: 'pointer'
    },
    divider: {
        marginTop: '12px',
        marginBottom: '12px'
    },
    avatarSuccess: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        // backgroundColor: theme.palette.success.light,
        // color: theme.palette.success.dark,
        marginLeft: '15px'
    },
    successDark: {
        // color: theme.palette.success.dark
    },
    avatarError: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        // backgroundColor: theme.palette.orange.light,
        // color: theme.palette.orange.dark,
        marginLeft: '15px'
    },
    errorDark: {
        // color: theme.palette.orange.dark
    }
}));

// ===========================|| DASHBOARD DEFAULT - POPULAR CARD ||=========================== //
interface Data {
    id: string,
    timeTag: string,
    coinName: string,
    uuid: string,
    price: number,
    quantity: number,
    isBid: boolean
}
interface arrayProps {
    rows: Data[];
}

export const PortfolioListCard: React.FC<arrayProps> = ({
    rows,
}) => {
    const classes = useStyles();
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container alignContent="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h4">거래내역</Typography>
                        </Grid>
                        <Grid item>
                            <MoreHorizOutlinedIcon
                                fontSize="small"
                                className={classes.primaryLight}
                                aria-controls="menu-popular-card"
                                aria-haspopup="true"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {
                        rows.map((e , i)=> {
                            return (
                                <Grid key={e.id} container direction="column"className={classes.card}>
                                    <Card >
                                        <CardContent>
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            매수 {e.coinName}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container alignItems="center" justifyContent="space-between">
                                                            <Grid item>
                                                                <Typography variant="subtitle1" color="inherit">
                                                                    {e.isBid}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2" className={classes.successDark}>
                                                    거래일시 {e.timeTag}
                                                </Typography>
                                                <Typography variant="subtitle2" className={classes.successDark}>
                                                    주문금액 Profit
                                                </Typography>
                                                <Typography variant="subtitle2" className={classes.successDark}>
                                                    거래단가 {e.price}
                                                </Typography>
                                                <Typography variant="subtitle2" className={classes.successDark}>
                                                    채결수량 {e.quantity}
                                                </Typography>
                                            </Grid>
                                            {/* <Divider className={classes.divider} /> */}
                                        </CardContent>
                                    </Card>
                                </Grid>
                                // <Divider  key={e.id} className={classes.divider} />
                            )
                        })
                    }
                    {/*            <Grid container direction="column">
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        비트코인
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                $1839.00
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid item>
                            ㅁㄴㅇㅁㄴㅇ
                            <Typography variant="subtitle2" className={classes.successDark}>
                                10% Profit
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        TTML
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                $100.00
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" className={classes.errorDark}>
                                10% loss
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        Reliance
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                $200.00
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Avatar variant="rounded" className={classes.avatarSuccess}>
                                                <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                            </Avatar>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" className={classes.successDark}>
                                10% Profit
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} /> */}
                </Grid>
            </Grid>
        </div>
    );
};

// export default PortfolioListCard;