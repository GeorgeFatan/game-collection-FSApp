export function Navbar()
{
    return(
        <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
            <h1 className="text-xl font-bold">Games Collection Shelf</h1>
            <div className="space-x-6">
                <a href="/" className="nav-button" style={{ marginRight: "10px" }}>
                    Games Shelf
                </a>
                <a href="/about" className="nav-button">
                    About
                </a>
            </div>
        </nav>
    );
}