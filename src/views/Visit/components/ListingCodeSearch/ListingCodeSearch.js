/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, colors } from '@material-ui/core';

import useRouter from 'utils/useRouter';


const schema = {
  mlsnumber: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true
  }
};

const useStyles = makeStyles(theme => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  submitButton: {
    marginTop: theme.spacing(2),
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const ListingCodeSearch = props => {
  const {  className, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });


  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    router.history.push('/vist/results');
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <div className={classes.fields}>
        <TextField
          error={hasError('mlsnumber')}
          fullWidth
          helperText={hasError('mlsnumber') ? formState.errors.mlsnumber[0] : null}
          label="MLS Number"
          name="mlsnumber"
          onChange={handleChange}
          // value={formState.values.email || ''}
          variant="outlined"
        />
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        // disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
        component={RouterLink}
        to={'/visit/results'}
      >
        Search
      </Button>
    </form>
  );
};

ListingCodeSearch.propTypes = {
  className: PropTypes.string
};

export default ListingCodeSearch;