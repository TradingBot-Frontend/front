import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AndroidIcon from '@material-ui/icons/Android';
import DescriptionIcon from '@material-ui/icons/Description';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { useHistory } from 'react-router-dom';

export const MainListItems = () => {
  const history = useHistory();
  const handleClick = (url: string) => {
    history.push(`./${url}`);
  };
  return (
    <div>
      <ListItem button onClick={() => handleClick('')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => handleClick('coin-market')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Coin Market" />
      </ListItem>
      <ListItem button onClick={() => handleClick('trading-bot')}>
        <ListItemIcon>
          <AndroidIcon />
        </ListItemIcon>
        <ListItemText primary="Trading bot" />
      </ListItem>
      <ListItem button onClick={() => handleClick('portfolio')}>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Portfolio" />
      </ListItem>
      <ListItem button onClick={() => handleClick('simulation')}>
        <ListItemIcon>
          <PlayCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Simulation" />
      </ListItem>
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
