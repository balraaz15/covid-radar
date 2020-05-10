import React from 'react';
import { Navbar, Button, Alignment } from '@blueprintjs/core';

import styles from './NavigationBar.module.css';

const NavigationBar = () => {
	return (
		<Navbar className={styles.Navbar}>
			<Navbar.Group align={Alignment.RIGHT}>
				<Navbar.Heading className={styles.title}>Covid Radar</Navbar.Heading>
				<a href="https://github.com/balraaz15/covid-radar" target="_blank" rel="noopener noreferrer"><Button className="bp3-minimal" icon="git-branch" text="View on Github" /></a>
			</Navbar.Group>
		</Navbar>
	)
}

export default NavigationBar;
