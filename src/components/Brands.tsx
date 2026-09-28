export default function Brands() {
  const brands = ["LogoIpsum", "LogoIpsum", "LogoIpsum", "LogoIpsum", "LogoIpsum"];
  
  return (
    <section className="bg-neutral-50 border-b border-neutral-200 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-8">
        {brands.map((brand, i) => (
          <div key={i} className="flex items-center gap-2 text-neutral-400 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center text-white font-bold">L</div>
            <span className="font-poppins font-bold text-xl">{brand}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
