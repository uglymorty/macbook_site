import React from 'react'
import {navLinks} from "../src/constants/index.js";

export const NavBar = () => {
    return (
        <header>
            <nav>
                <img src="/logo.svg" alt="Apple logo"/>
                <ul>
                    {navLinks.map((link) => {
                        return (
                            <li key={link.label}>
                                <a href={link.label}>{link.label}</a>
                            </li>
                        )
                    })}
                </ul>

                <div className="flex-center gap-3 ">
                    <button>
                        <img src="/search.svg" alt="Search"/>
                    </button>
                    <button>
                        <img src="/cart.svg" alt="Cart"/>
                    </button>
                </div>
            </nav>
        </header>
    )
}
