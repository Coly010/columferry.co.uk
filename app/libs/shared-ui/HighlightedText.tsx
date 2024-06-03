export const HighlightedText = ({children}: { children: React.ReactNode }) => {
    return <span
        className="font-semibold underline decoration-emerald-300 decoration-2 underline-offset-4">{children}</span>
}