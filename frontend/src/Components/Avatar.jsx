export function Avatar({ src, alt, fallback, className = "" }) {
    return (
        <div className={`inline-flex items-center justify-center rounded-full bg-gray-100 ${className}`}>
            {src ? (
                <img src={src} alt={alt} className="rounded-full w-full h-full" />
            ) : (
                <span className="text-sm font-medium text-gray-600">{fallback}</span>
            )}
        </div>
    )
}