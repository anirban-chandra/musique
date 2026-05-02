"use client";

import { signIn, useSession } from "next-auth/react";

export function Appbar() {

    const session = useSession();
    return (
        <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
        <div className="text-lg font-bold">Musique</div>
        <div>
            {session.data?.user && <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600" onClick={() => signIn()}>Logout</button>}
            {!session.data?.user && <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600" onClick={() => signIn()}>Sign In</button>}
        </div>
        </div>
    );
    }