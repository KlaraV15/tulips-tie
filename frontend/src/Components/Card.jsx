export function Card({ children, className = "" }) {
    return (
        <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
            {children}
        </div>
    )
}

export function CardHeader({ children, className = "" }) {
    return <div className={`p-6 pb-4 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = "" }) {
    return <h3 className={`font-semibold text-lg ${className}`}>{children}</h3>
}

export function CardDescription({ children, className = "" }) {
    return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
}

export function CardContent({ children, className = "" }) {
    return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}