'use client';

import { StreamsContainer } from "../containers";
import { MyStream } from '../streams';

export default function Meeting() {
	return (
		<StreamsContainer count={1}>
			<MyStream />
		</StreamsContainer>
	)
}
