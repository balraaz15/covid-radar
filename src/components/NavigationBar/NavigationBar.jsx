import React from 'react';
import { Navbar, Button, Alignment, Icon } from '@blueprintjs/core';
import { Link } from "react-router-dom";
import cx from 'classnames';

import styles from './NavigationBar.module.css';

const NavigationBar = () => {
	return (
		<Navbar className={styles.Navbar}>
			<Navbar.Group align={Alignment.RIGHT}>
				<Navbar.Heading><Link to="/" className={cx(styles.link, styles.title)}>Covid Radar</Link></Navbar.Heading>
				<Link to="/details" className={styles.link}><Button className="bp3-minimal"><Icon icon="globe" className={styles.icon} />Global Details</Button></Link>
				<Navbar.Divider />
				<a href="https://github.com/balraaz15/covid-radar" target="_blank" className={styles.link} rel="noopener noreferrer"><Button className="bp3-minimal"><Icon icon="git-branch" className={styles.icon} />View on Github</Button></a>
			</Navbar.Group>
		</Navbar>
	)
}

export default NavigationBar;
