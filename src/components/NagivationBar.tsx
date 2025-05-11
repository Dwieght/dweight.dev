import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/dashboard");
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow-md">
            <div className="text-xl font-bold">MiPocket</div>
            <div className="flex items-center space-x-4">
                <span className="font-medium pe-5">
                    {session?.user?.username}
                </span>
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-10 w-10 rounded-full p-0"
                        >
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="User avatar"
                                />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <ChevronDown
                                className={`ml-2 h-4 w-4 transition-transform border-none duration-200 me-10 ${
                                    isOpen ? "rotate-180 border-none" : ""
                                }`}
                            />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}
