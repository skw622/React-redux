import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { Page } from 'components';
import {
  Header,
  ListingsDetails,
  ListingsAddressDetail,
} from './components';

import { withAuthorization } from 'components/Session';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  aboutAuthor: {
    marginTop: theme.spacing(3)
  },
  aboutProject: {
    marginTop: theme.spacing(3)
  },
  projectCover: {
    marginTop: theme.spacing(3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  preferences: {
    marginTop: theme.spacing(3)
  },
  actions: {
    marginTop: theme.spacing(3)
  },
  listingdData: {
    marginTop: theme.spacing(3)
  }
}));

const ListingsCreate = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Create New Listings"
    >
      <Header />
      <ListingsDetails className={classes.preferences} />
      <ListingsAddressDetail className={classes.aboutProject} />
      <div className={classes.actions}>
        <Button
          color="primary"
          variant="contained"
        >
          Create Listing
        </Button>
      </div>
    </Page>
  );
};

export default withAuthorization(true, false)(ListingsCreate);
