import type { PageLoad } from './$types';
import { images } from '$lib/images';

export const load: PageLoad = ({ params }) => {
	const id = parseInt(params.id);
	const image = images.find(img => img.id === id);

	if (!image) {
		throw new Error('Image not found');
	}

	return {
		image
	};
};
