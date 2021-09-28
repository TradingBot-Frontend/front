import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AndroidIcon from '@material-ui/icons/Android';
import DescriptionIcon from '@material-ui/icons/Description';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

export const List = styled(ListItem)`
  :hover {
    background-color: #adb6c4;
  }
`;

export const MainListItems = () => {
  const history = useHistory();
  const handleClick = (url: string) => {
    history.push(`${url}`);
  };
  const { url } = useRouteMatch();
  return (
    <div>
      <List button onClick={() => handleClick(`${url}`)}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </List>
      <List button onClick={() => handleClick(`${url}/coin-market`)}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Coin Market" />
      </List>
      <List button onClick={() => handleClick(`${url}/trading-bot`)}>
        <ListItemIcon>
          <AndroidIcon />
        </ListItemIcon>
        <ListItemText primary="Trading bot" />
      </List>
      <List button onClick={() => handleClick(`${url}/portfolio`)}>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Portfolio" />
      </List>
      {/* <List button onClick={() => handleClick(`${url}/simulation`)}>
        <ListItemIcon>
          <PlayCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Simulation" />
      </List> */}
    </div>
  );
};
// export const mainListItems = (
//   <div>
//     <ListItem button>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <ShoppingCartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Coin Market" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AndroidIcon />
//       </ListItemIcon>
//       <ListItemText primary="Trading bot" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <DescriptionIcon />
//       </ListItemIcon>
//       <ListItemText primary="Portfolio" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <PlayCircleOutlineIcon />
//       </ListItemIcon>
//       <ListItemText primary="Simulation" />
//     </ListItem>
//   </div>
// );
