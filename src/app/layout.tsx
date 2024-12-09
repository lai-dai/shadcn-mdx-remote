import "~/styles/globals.css"

import { CircleAlert, CircleCheck, CircleX, Info, Loader } from "lucide-react"
import { type Viewport, type Metadata } from "next"
import localFont from "next/font/local"
import Script from "next/script"
import { ThemeProvider } from "next-themes"
import { Toaster } from "~/components/ui/sonner"
import { META_THEME_COLORS, siteConfig } from "~/config/site"
import { cn } from "~/lib/utils"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Radix UI",
    "Shadcn UI",
    "T3 App",
    "Next Mdx remote",
    "Next.js MDX Blog",
  ],
  authors: [
    {
      name: "laidai",
      url: "https://laidai.xyz",
    },
  ],
  creator: "daire",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@laidai9966",
  },
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={"vi"}
      suppressHydrationWarning={true}>
      <Script id={"theme"}>
        {`
try {
  if (
    localStorage.theme === 'dark'
    || ((!('theme' in localStorage) || localStorage.theme === 'system')
      && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
  }
} catch (_) {}
        `}
      </Script>

      <body
        className={cn(
          "font-sans antialiased",
          geistSans.variable,
          geistMono.variable,
        )}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"dark"}
          disableTransitionOnChange={false}
          enableSystem={false}>
          <div
            className={"relative"}
            vaul-drawer-wrapper={""}>
            {children}
          </div>

          <Toaster
            icons={{
              error: <CircleX className={"text-error size-4"} />,
              info: <Info className={"text-info size-4"} />,
              loading: <Loader className={"size-4 animate-spin"} />,
              success: <CircleCheck className={"text-success size-4"} />,
              warning: <CircleAlert className={"text-warning size-4"} />,
            }}/>
        </ThemeProvider>
      </body>
    </html>
  )
}
