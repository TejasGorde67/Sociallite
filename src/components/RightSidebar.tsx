// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ThemeProvider } from "@/components/ThemeProvider";
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
// import RightSidebar from "@/components/RightSidebar";
// import { Toaster } from "react-hot-toast";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Socialite",
//   description: "A modern social media application powered by Next.js",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <ClerkProvider>
//       <html lang="en" suppressHydrationWarning>
//         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//           <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
//             <div className="min-h-screen flex flex-col">
//               <Navbar />

//               {/* Main layout with Sidebar - Content - RightSidebar */}
//               <main className="flex flex-1 max-w-7xl mx-auto px-4 py-8">
//                 {/* Left Sidebar (Optional) */}
//                 <div className="hidden lg:block lg:w-1/4">
//                   <Sidebar />
//                 </div>

//                 {/* Main Content in Center */}
//                 <div className="flex-1 lg:w-1/2 px-4">{children}</div>

//                 {/* Right Sidebar (Twitter-like) */}
//                 <div className="hidden lg:block lg:w-1/4">
//                   <RightSidebar />
//                 </div>
//               </main>
//             </div>
//             <Toaster />
//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }

import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { getUserByClerkId } from "@/actions/user.action";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";

async function RightSidebar() {
  const authUser = await currentUser();
  if (!authUser) return <UnAuthenticatedRightSidebar />;

  const user = await getUserByClerkId(authUser.id);
  if (!user) return null;

  return (
    <div className="sticky top-20">
      <Card className="w-72">
        {" "}
        {/* Set a fixed width if needed */}
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="w-20 h-20 border-2 ">
                <AvatarImage src={user.image || "/avatar.png"} />
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.username}</p>
              </div>
            </Link>

            {user.bio && (
              <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
            )}

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-medium">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {user.location || "No location"}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                {user.website ? (
                  <a
                    href={`${user.website}`}
                    className="hover:underline truncate"
                    target="_blank"
                  >
                    {user.website}
                  </a>
                ) : (
                  "No website"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RightSidebar;

const UnAuthenticatedRightSidebar = () => (
  <div className="sticky top-20">
    <Card className="w-72">
      {" "}
      {/* Fixed width for consistency */}
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Welcome Back!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          Login to access your profile and connect with others.
        </p>
        <SignInButton mode="modal">
          <Button className="w-full" variant="outline">
            Login
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="w-full mt-2" variant="default">
            Sign Up
          </Button>
        </SignUpButton>
      </CardContent>
    </Card>
  </div>
);
