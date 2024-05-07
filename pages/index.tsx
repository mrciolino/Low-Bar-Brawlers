import Head from 'next/head'
import NextScript from 'next/script'
import { Icon } from '@iconify/react';
import Card from './_cards';
import Profile from './_profile';
import { useEffect } from 'react';


export default function Home() {

  const toggleDarkMode = () => {
    const html = document.querySelector('html');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')!;
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')!;

    // Toggle the "dark" class on the <html> element and change the icon visibile
    if (localStorage.getItem('color-theme') === 'dark') {
      html!.classList.remove('dark');
      localStorage.removeItem('color-theme');
      themeToggleDarkIcon.classList.remove('hidden');
      themeToggleLightIcon.classList.add('hidden');
    } else {
      html!.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      themeToggleDarkIcon.classList.add('hidden');
      themeToggleLightIcon.classList.remove('hidden');
    }
  };

  // set the intial color theme on load based on the user's preference
  useEffect(() => {
    const html = document.querySelector('html');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')!;
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')!;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const userPrefersDark = prefersDarkScheme.matches;
    const userHasUsedToggle = localStorage.getItem('color-theme');

    if (userHasUsedToggle) {
      html!.classList.add('dark');
      themeToggleDarkIcon.classList.add('hidden');
      themeToggleLightIcon.classList.remove('hidden');
    } else if (userPrefersDark) {
      html!.classList.add('dark');
      themeToggleDarkIcon.classList.add('hidden');
      themeToggleLightIcon.classList.remove('hidden');
    } else {
      html!.classList.remove('dark');
      themeToggleDarkIcon.classList.remove('hidden');
      themeToggleLightIcon.classList.add('hidden');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Low Bar Brawlers</title>
        <meta name="description" content="A history of the Low Bar Brawlers. A Dungeons and Dragons 5e Campaign spanning 3 years." />
        <meta name="keywords" content="dungeons and dragons, dnd, 5e, campaign, low bar brawlers, history, story, characters, players, dm, dungeon master, matthew ciolino" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dragon.webp" />
        <NextScript src="node_modules/flowbite/dist/flowbite.min.css"></NextScript>
      </Head>

      <div className='h-screen bg-slate-300 dark:bg-gray-900'>
        <header className="box-content">
          <nav className="bg-white px-2 sm:px-4 py-2.5 w-full z-20 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-600">
            <div className="container flex flex-wrap mx-auto md:justify-between justify-center">
              <a href="#" className="flex items-center">
                <img src="/dragon.webp" className="h-6 mr-3 sm:h-9" alt="Sea of Thieves Cooking Timer Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">Low Bar Brawlers</span>
              </a>
              <div className="flex text-3xl gap-3 text-gray-800 dark:text-gray-200">
                <button id="theme-toggle" onClick={toggleDarkMode} type="button" className="text-gray-1000 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                  <svg id="theme-toggle-dark-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                  <svg id="theme-toggle-light-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </button>
                <a href='https://github.com/mrciolino/SoT_Fishing_Timer' title="Github Repo" className="text-gray-1000 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg p-2.5"><Icon icon="mdi:github" /></a>
              </div>
            </div>
          </nav>
        </header>

        <section className="hero">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center text-white">Welcome to Low Bar Brawlers</h1>
            <p className="text-lg text-center text-white mt-4">A Dungeons and Dragons 5e Campaign spanning 3 years</p>
          </div>
        </section>

        <section className="character-profiles">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mt-8">Profiles</h2>
          <div className='flex justify-center items-center  '>
            <div className="container p-4 grid gap-5 grid-cols-2 lg:grid-cols-4">
              <Profile title="Matthew Ciolino" image="/krog.png" />
            </div>
          </div>
        </section>

        <section className="season-posters">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mt-8">Photos</h2>
          <div className='flex justify-center items-center  '>
            <div className="container p-4 grid gap-5 grid-cols-2 lg:grid-cols-4">
              <Card title="Season 1 Poster" image="/Season 1 Poster Full.webp" />
              <Card title="Season 2 Poster" image="/Season 2 Poster Full.webp" />
              <Card title="Season 3 Poster" image="/Season 3 Poster Full.webp" />
              <Card title="Season 4 Poster" image="/Season 4 Poster Full.webp" />
            </div>
          </div>
        </section>


        <footer className='box-content bg-slate-300 text-sm text-gray-800 p-5 pt-24 text-center items-center dark:text-gray-200 dark:bg-gray-900'>
          <div className='flex justify-center items-center flex-wrap'>
            Made with Next.js <a aria-label="NextJS" href="https://nextjs.org/" className="ml-1"><Icon icon="simple-icons:nextdotjs" /></a> &nbsp;
            and TailWindCSS <a aria-label="TailWindCSS" href="https://tailwindcss.com/" className="ml-1"><Icon icon="mdi:tailwind" /></a> &nbsp;
            by Bazzert <a aria-label="Matthew Ciolino" href="https://www.matthewciolino.com/"> &nbsp; <img src="/portfolio.webp" alt="Portfolio Logo" className="h-5 inline" /></a>
          </div>
        </footer>
      </div>
    </>
  )
}
