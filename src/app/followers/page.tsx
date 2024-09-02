'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { AtpAgent } from '@atproto/api'
import { useUserContext } from "@/context/userContext"
import { useEffect } from "react"
import { redirect } from "next/navigation"
import { UserRoundMinus } from "lucide-react"

export default function Component() {

  const { user, session, getProfile, followers, follows, getFollows } = useUserContext()

  async function fetchData(callback: any) {
    try {
      await callback();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (session.did) {
      fetchData(async () => {
        await getProfile(session.did, session.token);
        await getFollows(session.did, session.token);
      });
      return;
    }

    redirect('/login')
  }, [session]);

  return (
    <div className="w-full max-w-md mx-auto bg-background rounded-lg shadow-lg overflow-hidden mt-40">
      <pre>
        {/* {JSON.stringify(getKnownFollowers.lenght, null, 2)}
        {JSON.stringify(followers.length, null, 2)} */}
        {/* {JSON.stringify(follows.length, null, 2)} */}
        {/* {knownFollowers.length} */}
        {/* {JSON.stringify(session, null, 2)} */}
        {/* {JSON.stringify(follows, null, 2)} */}
      </pre>
      {/* <div className="bg-primary py-6 px-8">
        <h1 className="text-3xl font-bold text-primary-foreground">Your Profile</h1>
      </div> */}
      <div className="p-8 space-y-6">
        {/* <img src={user?.banner} className="w-full rounded-lg mb-4" alt="banner" /> */}

        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.avatar} alt="@shadcn" />
            <AvatarFallback>
              {user?.handle?.slice(0, 2).toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="text-xl font-semibold">{user?.displayName}</div>
            <div className="text-muted-foreground">@{user?.handle}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{user?.followersCount}</div>
            <div className="text-muted-foreground">Followers</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{user?.followsCount}</div>
            <div className="text-muted-foreground">Following</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{user?.viewer?.knownFollowers.count}</div>
            <div className="text-muted-foreground">Mutuals</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{follows && follows?.filter((follow: { viewer: { followedBy: any } }) => !follow.viewer?.followedBy).length}</div>
            <div className="text-muted-foreground">Don't follow you</div>
          </div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Don't follow you</h2>
          <ul className="space-y-6 md:space-y-2">
            {follows && follows?.filter((follow: { viewer: { followedBy: any } }) => !follow?.viewer?.followedBy).map((follow: any) => (
              <div className="flex flex-col justify-between overflow-hidden gap-4 md:flex-row" key={follow?.handle}>
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={follow?.avatar} alt="@shadcn" />
                    <AvatarFallback>
                      {follow?.handle?.slice(0, 2).toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="text-md font-semibold">{follow?.displayName}</div>
                    <div className="text-muted-foreground">@{follow?.handle}</div>
                  </div>
                </div>
                <Button variant="destructive" size="sm">
                  <UserRoundMinus size={16} />
                </Button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
