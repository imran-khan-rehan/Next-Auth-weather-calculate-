"use client"
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
    // get session from nextAuth
    const { data: session } = useSession();
    console.log(session);
    // useSession uses React Context

    // if the user exists -> show a Sign Out button and their information
    if(session) {
        return (
            <>
                <button  onClick={() => signOut()} type="button" className="btn btn-primary bg-green-500 text-white m-3 hover:bg-green-600">Sign Out of Google</button>
                <button  onClick={() => window.location.href='/addCustomer'} type="button" className="btn btn-primary bg-green-500 text-white m-3 hover:bg-green-600">ADD Customers</button>
                <button  onClick={() => window.location.href='/customers'} type="button" className="btn btn-primary bg-green-500 text-white m-3 hover:bg-green-600">ALL Customers</button>

                {/* Pass session info to server component */}
            </>
        )
    } else {
        return (
            <>
                <button onClick={() => signIn()} type="button" className="btn btn-primary bg-green-500 text-white m-3 hover:bg-green-600">Sign In with Google</button>
            </>
        )
    }

    // if a user doesn't exist -> show a Sign In button
}