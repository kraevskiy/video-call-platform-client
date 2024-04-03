"use client";

import { Code } from "@/types";
import { useState } from 'react';
import Lobby from "./_components/lobby";
import Meeting from "./_components/meeting";

export default function MeetingPage({ params }: { params: { code: Code } }) {
	const [isLobby, setIsLobby] = useState(true);

	return isLobby ? <Lobby /> : <Meeting />;
}
