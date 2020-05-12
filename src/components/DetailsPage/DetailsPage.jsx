import React from 'react';
import { Link } from 'react-router-dom';

import styles from './DetailsPage.module.css';

const DetailsPage = () => {
	return (
		<div class="bp3-dialog-container">
			<div class="bp3-dialog">
				<div class="bp3-dialog-header">
					<span class="bp3-icon-large bp3-icon-inbox"></span>
					<h4 class="bp3-heading">In Progress</h4>
				</div>
				<div class="bp3-dialog-body">
					Sorry for the inconvinience. This page is <strong>IN PROGRESS</strong>.<br /> Stay Tuned !!
    </div>
				<div class="bp3-dialog-footer">
					<div class="bp3-dialog-footer-actions">
						<button type="submit" class="bp3-button bp3-intent-primary"><Link to="/" className={styles.link}>Go to Homepage</Link></button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DetailsPage;
