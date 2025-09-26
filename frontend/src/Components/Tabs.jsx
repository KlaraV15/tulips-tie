import { useState } from "react"

export function Tabs({ defaultValue, children }) {
    const [activeTab, setActiveTab] = useState(defaultValue)

    const childrenWithProps = Array.isArray(children)
        ? children.map(child => {
            if (child && child.props) {
                return {
                    ...child,
                    props: {
                        ...child.props,
                        activeTab,
                        setActiveTab
                    }
                }
            }
            return child
        })
        : children

    return <div>{childrenWithProps}</div>
}

export function TabsList({ children, activeTab, setActiveTab, className = "" }) {
    const childrenWithProps = Array.isArray(children)
        ? children.map(child => {
            if (child && child.props) {
                return {
                    ...child,
                    props: {
                        ...child.props,
                        activeTab,
                        setActiveTab
                    }
                }
            }
            return child
        })
        : children

    return (
        <div className={`flex space-x-1 rounded-lg bg-gray-100 p-1 ${className}`}>
            {childrenWithProps}
        </div>
    )
}

export function TabsTrigger({ value, children, activeTab, setActiveTab, className = "" }) {
    const isActive = activeTab === value

    return (
        <button
            onClick={() => setActiveTab(value)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                } ${className}`}
        >
            {children}
        </button>
    )
}

export function TabsContent({ value, children, activeTab, className = "" }) {
    if (activeTab !== value) return null

    return <div className={className}>{children}</div>
}