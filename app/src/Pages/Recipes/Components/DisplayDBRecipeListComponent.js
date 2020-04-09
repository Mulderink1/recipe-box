import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    head: {
        backgroundColor: "#00bde5",
        color: "#FFFFFF",
    },
}));

const ColorLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: '#ccf6ff',
    },
    barColorPrimary: {
        backgroundColor: '#00bde5',
    },
})(LinearProgress);

async function fetchRecipes() {
    const response = await fetch('/recipes');
    const body = await response.json();
    return body;
}

function DisplayDBRecipeListComponent(){
    const [recipes, setRecipes] = useState([]);
    const [load, setLoad] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        fetchRecipes()
        .then(body => {
            setRecipes(body.Items);
            setLoad(true);
        })
        .catch(() => {
            setLoad(true);
        });
    }, []);

    if (load) {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Recipe Name</TableCell>
                            <TableCell className={classes.head}>Recipe Intro</TableCell>
                            <TableCell className={classes.head}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipes.map((recipe, index) =>
                            <TableRow hover key={index}>
                                <TableCell component="th" scope="row">{recipe.recipe_name}</TableCell>
                                <TableCell component="th" scope="row">{recipe.recipe_intro}</TableCell>
                                <TableCell component="th" scope="row">
                                    <Link to={"/recipe/edit/" + recipe.recipe_id}>
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return(
            <div>
                <ColorLinearProgress />
            </div>
        );
    }
}

export default DisplayDBRecipeListComponent;