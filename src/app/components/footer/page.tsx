export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                 <h1>
          <span className="text-2xl font-bold">ATK</span>
          <span className="text-sm font-light"> - Toko ATK Sekolah Terbaik</span>
                 </h1>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ATK. All rights reserved.
        </p>
      </div>
    </footer>
  );
}