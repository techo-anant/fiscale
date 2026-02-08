"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Taskbar() {
    const pathname = usePathname()

    return (
        <nav className="taskbar">
            <div className="taskbar-container">
                <a href="/" style={{ textDecoration: 'none' }}>
                    <img src="/static/logo.png" alt="Fiscale Logo" className="logo"/>
                </a>

                <ul className="nav-links">
                    <li>
                        <a
                            href="/dashboard?tab=dashboard"
                            className={pathname === '/dashboard' ? 'active' : ''}
                        >
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="/dashboard?tab=expenses"
                            className={pathname === '/dashboard' ? 'active' : ''}
                        >
                            Expenses
                        </a>
                    </li>
                    <li>
                        <a
                            href="/dashboard?tab=income"
                            className={pathname === '/dashboard' ? 'active' : ''}
                        >
                            Income
                        </a>
                    </li>
                    <li>
                        <a
                            href="/dashboard?tab=goals"
                            className={pathname === '/dashboard' ? 'active' : ''}
                        >
                            Goals
                        </a>
                    </li>
                    <li>
                        <a
                            href="/dashboard?tab=tax"
                            className={pathname === '/dashboard' ? 'active' : ''}
                        >
                            Tax
                        </a>
                    </li>
                    <li>
                        <a
                            href="/dashboard?tab=osap"
                            className={pathname === '/dashboard' ? 'active' : ''}
                        >
                            OSAP
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}