export function Navbar()
{
    return(
        <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
            <h1 className="text-xl font-bold">Games Collection shelf</h1>
            <div className="space-x-6">
                <a href="/" className="hover:text-blue-400">Games Shelf</a>
                <a href="/about" className="hover:text-blue-400">About</a>
            </div>
        </nav>
    );
}