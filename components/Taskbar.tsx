"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function Taskbar() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        console.log('Toggle clicked, current state:', isMenuOpen)
        setIsMenuOpen(prev => {
            console.log('Setting menu to:', !prev)
            return !prev
        })
    }

    const closeMenu = () => {
        console.log('Closing menu')
        setIsMenuOpen(false)
    }

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (isMenuOpen && !target.closest('.taskbar-container')) {
                closeMenu()
            }
        }

        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isMenuOpen])

    // Log when menu state changes
    useEffect(() => {
        console.log('Menu state changed to:', isMenuOpen)
    }, [isMenuOpen])

    return (
        <>
            <nav className="taskbar">
                <div className="taskbar-container">
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <img src="/static/logo.png" alt="Fiscale Logo" className="logo" />
                    </a>

                    {/* Hamburger Menu Button - Only visible on mobile */}
                    <button
                        className="hamburger-menu"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                        type="button"
                    >
                        {isMenuOpen ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                    {/* Navigation Links */}
                    <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
                        <li>
                            <a
                                href="/dashboard?tab=dashboard"
                                className={pathname === '/dashboard' ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="/dashboard?tab=expenses"
                                className={pathname === '/dashboard' ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                Expenses
                            </a>
                        </li>
                        <li>
                            <a
                                href="/dashboard?tab=income"
                                className={pathname === '/dashboard' ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                Income
                            </a>
                        </li>
                        <li>
                            <a
                                href="/dashboard?tab=goals"
                                className={pathname === '/dashboard' ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                Goals
                            </a>
                        </li>
                        <li>
                            <a
                                href="/dashboard?tab=tax"
                                className={pathname === '/dashboard' ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                Tax
                            </a>
                        </li>
                        <li>
                            <a
                                href="/dashboard?tab=osap"
                                className={pathname === '/dashboard' ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                OSAP
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Overlay to close menu when clicking outside - Separate from nav */}
            {isMenuOpen && (
                <div
                    className="menu-overlay"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}
        </>
    )
}