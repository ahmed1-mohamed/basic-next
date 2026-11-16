// import { Metadata } from "next";


// export const metadata: Metadata = {
//   title: {
//     default: "",
//     template: "",
//   },
//   description:
//     "",
//   metadataBase: new URL(""),
//   robots: {
//     index: true,
//     follow: true,
//   },
//   manifest: "/manifest.json",
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: "default",
//     title: "",
//   },
//   formatDetection: {
//     telephone: false,
//   },
//   keywords: [],
//   openGraph: {
//     title: "",
//     description:
//       "",
//     siteName: "",
//     type: "",
//   },
//   twitter: {
//     card: "",
//     title: "",
//     description:
//       "",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
