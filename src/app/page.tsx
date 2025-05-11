"use client";

import Link from "next/link";

function HomePage() {
    return (
        <div className="border h-screen flex items-center justify-center">
            <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-sm">
                <Link
                    href="/login"
                    className="block text-center w-full px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    Signin
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
