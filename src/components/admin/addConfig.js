import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Select from 'react-select';
import { Mutation } from 'react-apollo';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import '../../utils/data/locations.css';
import {
	dedicatedLocations,
	businessLocations,
	trialLocations,
} from '../../utils/data/locations';
import { useStaticQuery, graphql } from 'gatsby';
import _ from 'lodash';
import { ADD_CONFIG } from '../../utils/graphql/adminGraph';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'top',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		width: '640px',
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function AddConfig(props) {
	const plansProxies = useStaticQuery(graphql`
		query ProductsQuery {
			allMysqlProxyPlans {
				edges {
					node {
						ip_included
						button_name
					}
				}
			}
		}
	`);

	const userId = props.id;
	const plans = plansProxies.allMysqlProxyPlans.edges.map((x) => x.node);
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [proxyCount, setProxyCount] = React.useState({});
	const [proxyPlan, setProxyPlan] = React.useState(); // residential or dedicated or trial
	const [locationVariant, setLocationVariant] = React.useState(
		businessLocations
	); // display locations taking in consideration proxyPlan state
	const [locations, setLocations] = React.useState();

	const plansName = plans.map((x) => x.button_name);
	const plansNumber = plans.map((x) => x.ip_included);

	const values = plansNumber.map((x) => ({ value: x }));
	const label = plansName.map((x) => ({ label: x }));

	const mergeData = _.merge([], values, label);

	const customStyles = {
		container: (base) => ({
			...base,
			width: 300,
		}),
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onChange = (currentNode, selectedNodes) => {
		const loc = selectedNodes.map((x) => x.value).join(',');
		console.log(loc);
	};

	const handleChange = async (e) => {
		await setProxyCount(parseInt(e.value));
		const dedicated = e.label.includes('Dedicated');
		const trial = e.label.includes('Trial');
		const residential = e.label.includes('Residential');

		if (trial === true) {
			await setProxyPlan('trial');
			await setLocationVariant(trialLocations);
		}
		if (dedicated === true) {
			await setProxyPlan('dedicated');
			await setLocationVariant(dedicatedLocations);
		}

		if (residential === true) {
			await setProxyPlan('residential');
			await setLocationVariant(businessLocations);
		}
	};

	return (
		<div>
			<link
				href='https://unpkg.com/react-dropdown-tree-select/dist/styles.css'
				rel='stylesheet'
			/>
			<Button variant='contained' color='secondary' onClick={handleOpen}>
				Add Config
			</Button>

			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<Select
							options={mergeData}
							placeholder='select plan'
							isSearchable
							simpleValue={false}
							onChange={handleChange}
							styles={customStyles}
						/>
						<br />
						<DropdownTreeSelect data={locationVariant} onChange={onChange} />
						<br />
						<Mutation
							mutation={ADD_CONFIG}
							variables={{
								userId: userId,
								proxy_count: proxyCount,
								locations: locations,
							}}
						>
							{(addConfig) => (
								<Button
									variant='contained'
									color='primary'
									onClick={() => {
										addConfig();
										handleClose();
									}}
								>
									Save
								</Button>
							)}
						</Mutation>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
