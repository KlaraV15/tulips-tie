import { useState, createContext, useContext } from "react"

const TabsContext = createContext()

export function Tabs({ defaultValue, children }) {
    const [activeTab, setActiveTab] = useState(defaultValue)

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div>{children}</div>
        </TabsContext.Provider>
    )
}

export function TabsList({ children, className = "" }) {
    return (
        <div className={`flex space-x-1 rounded-lg bg-gray-100 p-1 ${className}`}>
            {children}
        </div>
    )
}

export function TabsTrigger({ value, children, className = "" }) {
    const { activeTab, setActiveTab } = useContext(TabsContext)
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

export function TabsContent({ value, children, className = "" }) {
    const { activeTab } = useContext(TabsContext)

    if (activeTab !== value) return null

    return <div className={className}>{children}</div>
}