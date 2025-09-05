import './App.css'
import PosterSection from './components/poster_section'
import CharacterSection from './components/character_section'
import SplashSection from './components/splash_section'
import Footer from './components/footer'
import { ThemeProvider } from "./components/theme-provider"

function Metadata() {
  return (
    <>
      <title>Low Bar Brawlers</title>
      <meta name="description" content="A history of the Low Bar Brawlers. A Dungeons and Dragons 5e Campaign spanning 3 years." />
      <meta name="keywords" content="dungeons and dragons, dnd, 5e, campaign, low bar brawlers, history, story, characters, players, dm, dungeon master, matthew ciolino" />
      <link rel="icon" type="image/svg+xml" href="/assets/dragon.svg" />
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Metadata />
      <div className="absolute top-0 left-0 w-full h-full snap-y snap-mandatory scroll-smooth">
        <SplashSection />
        <PosterSection />
        <CharacterSection />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
