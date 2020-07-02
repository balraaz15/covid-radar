import React from 'react';
import { Navbar, Button, Alignment, Icon } from '@blueprintjs/core';
import { Link } from "react-router-dom";
import cx from 'classnames';

import styles from './NavigationBar.module.css';

const NavigationBar = () => {
	return (
		<Navbar className={styles.Navbar}>
			<Navbar.Group align={Alignment.RIGHT}>
				<Navbar.Heading><Link to="/" className={cx(styles.link, styles.title)}><Icon icon="virus" className={styles.icon} iconSize={30} />Covid Radar</Link></Navbar.Heading>
				<Link to="/details" className={styles.link}><Button className="bp3-minimal"><Icon icon="globe" className={styles.icon} />All Countries</Button></Link>
				<Navbar.Divider className={styles.divider} />
				<a href="https://github.com/balraaz15/covid-radar" target="_blank" className={cx(styles.link, styles.githubLink)} rel="noopener noreferrer"><Button className="bp3-minimal"><Icon icon="git-branch" className={styles.icon} />Github</Button></a>
			</Navbar.Group>
		</Navbar>
	)
}

export default NavigationBar;
