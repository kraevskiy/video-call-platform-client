import Navbar from "@/components/navbar";

export default function AuthLayout({children}: {children: React.ReactNode}) {
	return(
		<div className="flex h-screen flex-col">
			<Navbar />
			{children}
		</div>
	)
}
