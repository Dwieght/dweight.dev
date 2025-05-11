"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { trpc } from "~/app/_trpc/client";
import Link from "next/link";
import NavigationBar from "~/components/NagivationBar";

export default function DashboardPage() {
    const [isYoutubeBtn, setYoutubeBtn] = useState(false);
    const [isNotePadBtn, setNotePadBtn] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();
    const {
        data: youtubeLinks,
        isLoading: linksLoading,
        error: linksError,
    } = trpc.getAllLinks.useQuery(
        { userId: session?.user?.id },
        { enabled: !!session?.user?.id }
    );
    const {
        data: notepad,
        isLoading: notepadLoading,
        error: notepadError,
    } = trpc.getAllNotePad.useQuery(
        { userId: session?.user?.id },
        { enabled: !!session?.user?.id }
    );

    useEffect(() => {
        if (youtubeLinks && youtubeLinks?.length > 0) {
            setYoutubeBtn(true);
        } else {
            setYoutubeBtn(false);
        }
        if (notepad && notepad?.length > 0) {
            setNotePadBtn(true);
        } else {
            setNotePadBtn(false);
        }
    }, [youtubeLinks, isYoutubeBtn, notepad, isNotePadBtn]);

    if (status === "unauthenticated") {
        router.push("/login");
        return null;
    }

    if (status === "loading" || linksLoading) return <div>Loading...</div>;

    if (linksError) return <div>Error loading links: {linksError.message}</div>;

    return (
        <div>
            <NavigationBar />
            <div className="flex justify-center items-center h-52 ">
                What&apos;s on your mind?
            </div>
            <div className="flex space-x-2 justify-center">
                {isYoutubeBtn && (
                    <div className="flex justify-center items-center">
                        <Link
                            href="/youtube"
                            className="border rounded-lg p-2 hover:bg-gray-200 transition-all hover:text-grey-400 "
                        >
                            Youtube
                        </Link>
                    </div>
                )}
                {isNotePadBtn && (
                    <div className="flex justify-center items-center">
                        <Link
                            href="/notepad"
                            className="border rounded-lg p-2 hover:bg-gray-200 transition-all hover:text-grey-400 "
                        >
                            Notepad
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
