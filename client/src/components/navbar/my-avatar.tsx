import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function MyAvatar() {
	return (
		<Popover>
			<PopoverTrigger>
				<div className="bg-light-secondary flex h-full cursor-pointer items-center justify-between rounded-full p-2 dark:bg-dark-secondary md:w-80">
					<div className="flex items-center gap-x-5">
						<Avatar className="border-2 border-white">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className="hidden md:block font-medium">Illia</div>
					</div>
				</div>
			</PopoverTrigger>
			<PopoverContent>
				<div className="flex cursor-pointer items-center gap-x-3 rounded-xl p-2 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
					Swith
				</div>
				<div className="flex cursor-pointer items-center gap-x-3 rounded-xl p-2 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
					sign
				</div>
			</PopoverContent>
		</Popover>
	)
}
