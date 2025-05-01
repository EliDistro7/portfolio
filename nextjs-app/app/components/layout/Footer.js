// app/components/layout/Footer.jsx
export default function Footer() {
    return (
      <footer className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              YourName
            </div>
            <p className="text-gray-400">© {new Date().getFullYear()} | Web Developer & Designer</p>
          </div>
        </div>
      </footer>
    );
  }