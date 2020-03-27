import React, { Component } from 'react';

export class NewsTicker extends Component {
	render() {
		return (
			<div>
				<p className='news-ticker'>
					<span>
						This is text - This is text - This is text - This is
						text - This is text - This is text - This is text - This
						is text - This is text - This is text - This is text -
						This is text -&nbsp;
					</span>
				</p>

				<p className='news-ticker news-ticker2'>
					<span>
						This is text - This is text - This is text - This is
						text - This is text - This is text - This is text - This
						is text - This is text - This is text - This is text -
						This is text -&nbsp;
					</span>
				</p>
			</div>
		);
	}
}

export default NewsTicker;
