"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Briefcase, Home, Info, Menu, User, X, LogOut, Building2, ClipboardList, Crown } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ModeToggle } from './mode-toggle';
import { useAppContext } from '@/context/AppContext';

export default function NavBar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { isAuth, user, setIsAuth, setUser } = useAppContext();

    const toggleMenu = () => setIsOpen(!isOpen);

    const logoutHandler = () => {
        Cookies.remove('token');
        Cookies.remove('user_id');
        setIsAuth(false);
        setUser(null);
        toast.success("Logged out successfully");
        router.push('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-300">
            <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => router.push('/')}>
                    <div className="w-10 h-10 bg-gradient-to-tr from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 rounded-[14px] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-300">
                        <Briefcase className="text-white dark:text-zinc-900 w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-white dark:to-zinc-400 hidden sm:block ml-1">
                        Lumora
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-lg px-1.5 py-1.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                    <Link href={"/"}>
                        <Button variant="ghost" className="gap-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 font-semibold px-5">
                            Home
                        </Button>
                    </Link>
                    <Link href={"/about"}>
                        <Button variant="ghost" className="gap-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 font-semibold px-5">
                            About
                        </Button>
                    </Link>
                    <Link href={"/jobs"}>
                        <Button variant="ghost" className="gap-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 font-semibold px-5">
                            Explore Jobs
                        </Button>
                    </Link>
                    {isAuth && user?.role === "recruiter" && (
                        <Link href={"/company"}>
                            <Button variant="ghost" className="gap-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 font-semibold px-5">
                                My Companies
                            </Button>
                        </Link>
                    )}
                    {isAuth && user?.role === "jobseeker" && (
                        <Link href={"/applications"}>
                            <Button variant="ghost" className="gap-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 font-semibold px-5">
                                My Applications
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Right Side Actions */}
                <div className='hidden md:flex items-center gap-4'>
                    <ModeToggle />
                    
                    {isAuth && user ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className='cursor-pointer ring-2 ring-transparent hover:ring-zinc-500/30 rounded-full outline-none transition-all'>
                                    <Avatar className="w-10 h-10 border border-zinc-200/80 dark:border-zinc-800 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-transform hover:scale-105">
                                        <AvatarImage src={user.profile_pic || ""} alt={user.name} className="object-cover" />
                                        <AvatarFallback className="bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 font-bold">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent align="end" className="w-64 p-2.5 rounded-[24px] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] mt-2">
                                <div className="p-3 mb-2 bg-zinc-50/80 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                                    <p className="font-bold text-[15px] text-zinc-900 dark:text-zinc-100 truncate">{user.name}</p>
                                    <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                                    <div className="mt-2 inline-block px-2 py-0.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                        {user.role}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Link href={"/account"}>
                                        <Button variant="ghost" className='w-full justify-start gap-3 rounded-lg text-sm h-10'>
                                            <User size={16} /> My Account
                                        </Button>
                                    </Link>
                                    {user.role === "recruiter" && (
                                        <Link href={"/company"}>
                                            <Button variant="ghost" className='w-full justify-start gap-3 rounded-lg text-sm h-10'>
                                                <Building2 size={16} /> Manage Companies
                                            </Button>
                                        </Link>
                                    )}
                                    {user.role === "jobseeker" && (
                                        <Link href={"/applications"}>
                                            <Button variant="ghost" className='w-full justify-start gap-3 rounded-lg text-sm h-10'>
                                                <ClipboardList size={16} /> My Applications
                                            </Button>
                                        </Link>
                                    )}
                                    {user.role === "jobseeker" && !(
                                        user.subscription && new Date(user.subscription).getTime() > Date.now()
                                    ) && (
                                        <Link href={"/subscribe"}>
                                            <Button variant="ghost" className='w-full justify-start gap-3 rounded-lg text-sm h-10 text-amber-600 dark:text-amber-400'>
                                                <Crown size={16} /> Go Premium
                                            </Button>
                                        </Link>
                                    )}
                                    <Button variant="ghost" className='w-full justify-start gap-3 rounded-lg text-sm h-10 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium' onClick={logoutHandler}>
                                        <LogOut size={16} /> Sign Out
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Link href={"/login"}>
                            <Button className='gap-2 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 shadow-[0_4px_14px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_rgba(255,255,255,0.1)] px-7 font-bold active:scale-[0.98] transition-all'>
                                <User size={16} /> Sign In
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden flex items-center gap-3'>
                    <ModeToggle />
                    <button onClick={toggleMenu} className='p-2 rounded-xl bg-white/50 dark:bg-zinc-800/50'>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile View */}
            {isOpen && (
                <div className="md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 p-4 absolute top-20 left-0 right-0 shadow-2xl flex flex-col gap-2 pb-6">
                    <Link href={"/"} onClick={toggleMenu}>
                        <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-12 text-lg">
                            <Home size={20} /> Home
                        </Button>
                    </Link>
                    <Link href={"/about"} onClick={toggleMenu}>
                        <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-12 text-lg">
                            <Info size={20} /> About
                        </Button>
                    </Link>
                    <Link href={"/jobs"} onClick={toggleMenu}>
                        <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-12 text-lg">
                            <Briefcase size={20} /> Explore Jobs
                        </Button>
                    </Link>
                    {isAuth && user?.role === "recruiter" && (
                        <Link href={"/company"} onClick={toggleMenu}>
                            <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-12 text-lg">
                                <Building2 size={20} /> My Companies
                            </Button>
                        </Link>
                    )}
                    {isAuth && user?.role === "jobseeker" && (
                        <Link href={"/applications"} onClick={toggleMenu}>
                            <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-12 text-lg">
                                <ClipboardList size={20} /> My Applications
                            </Button>
                        </Link>
                    )}
                    {isAuth && user?.role === "jobseeker" && !(
                        user?.subscription && new Date(user.subscription).getTime() > Date.now()
                    ) && (
                        <Link href={"/subscribe"} onClick={toggleMenu}>
                            <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-12 text-lg text-amber-600 dark:text-amber-400">
                                <Crown size={20} /> Go Premium
                            </Button>
                        </Link>
                    )}
                    
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
                    
                    {isAuth && user ? (
                        <>
                            <div className="px-4 py-3 flex items-center gap-3">
                                <Avatar className="w-10 h-10 border border-zinc-200 dark:border-zinc-800">
                                    <AvatarImage src={user.profile_pic || ""} alt={user.name} />
                                    <AvatarFallback className="bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 font-bold">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                            <Link href={"/account"} onClick={toggleMenu}>
                                <Button variant="ghost" className='w-full justify-start gap-3 rounded-xl h-12 text-lg'>
                                    <User size={20} /> Account Settings
                                </Button>
                            </Link>
                            <Button variant="ghost" className='w-full justify-start gap-3 rounded-xl h-12 text-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30' onClick={() => { logoutHandler(); toggleMenu(); }}>
                                <LogOut size={20} /> Sign Out
                            </Button>
                        </>
                    ) : (
                        <Link href={"/login"} onClick={toggleMenu}>
                            <Button className='w-full justify-center gap-3 rounded-xl h-12 text-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 mt-2 font-bold'>
                                <User size={20} /> Sign In
                            </Button>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
