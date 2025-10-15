export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return <div className="min-h-screen bg-background font-sans text-foreground antialiased">{children}</div>;
}
