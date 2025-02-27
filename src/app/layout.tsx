import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/LeftSidebar";
import { Toaster } from "react-hot-toast";
import RightSidebar from "@/components/RightSidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Socialite",
  description: "A modern social media application powered by Next.js",
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex">
//       <main className="flex-1 p-4">{children}</main> {/* Main content area */}
//       <RightSidebar /> {/* Sidebar on the right */}
//     </div>
//   );
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
              <Navbar />

              {/* Main Layout */}
              <main className="max-w-6xl mx-auto px-4 py-8 flex gap-6">
                {/* Left Sidebar (Fixed Width) */}
                <div className="hidden lg:block w-[280px] flex-shrink-0">
                  <Sidebar />
                </div>

                {/* Main Content (Flex-1 to stay centered) */}
                <div className="flex-1">{children}</div>

                {/* Right Sidebar (Fixed Width, Same as Left Sidebar) */}
                <div className="hidden lg:block w-[280px] flex-shrink-0">
                  <RightSidebar />
                </div>
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ThemeProvider } from "@/components/ThemeProvider";
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/LeftSidebar";
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

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ClerkProvider>
//       <html lang="en" suppressHydrationWarning>
//         <body
//           className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         >
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="system"
//             enableSystem
//             disableTransitionOnChange
//           >
//             <div className="min-h-screen flex flex-col">
//               <Navbar />

//               {/* Main Layout */}
//               <main className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
//                 {/* Left Sidebar (Optional) */}
//                 <div className="hidden lg:block w-1/4">
//                   <Sidebar />
//                 </div>

//                 {/* Main Content (Keeping the original size) */}
//                 <div className="flex-1">{children}</div>

//                 {/* Right Sidebar (New, but doesn't shrink the middle bar) */}
//                 <div className="hidden lg:block w-1/4">
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
