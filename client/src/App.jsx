import { useState } from 'react';
import { Button } from './components/ui/button';
import { ThemeProvider } from './components/theme-provider';

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen min-w-screen bg-white dark:bg-black items-center justify-center">
        <h1 className="text-center pt-[34vh]">Vite + React</h1>
        <div className="p-8 flex flex-col items-center">
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </Button>
          <p className="text-center">
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-gray-600 text-center">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </ThemeProvider>
  )
}

export default App
