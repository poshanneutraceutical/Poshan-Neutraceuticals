import { useEffect, useState } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { api, type Product } from '../lib/api';
import { useCart } from '../context/CartContext';

const fallbackProducts: Product[] = [
  { id: 1, name: 'Shadow Pre-Workout', price: 2499, description: 'Explosive energy and laser-sharp focus for those who train like there is no tomorrow.', category: 'pre-workout', imageUrl: 'https://images.pexels.com/photos/3850838/pexels-photo-3850838.jpeg?auto=compress&cs=tinysrgb&w=600', badge: 'BEST SELLER', featured: true, inStock: true },
  { id: 2, name: 'Wraith Whey Protein', price: 2999, description: 'Ultra-pure recovery fuel. Build your physique with surgical precision.', category: 'protein', imageUrl: 'https://images.pexels.com/photos/4753928/pexels-photo-4753928.jpeg?auto=compress&cs=tinysrgb&w=600', badge: 'NEW', featured: true, inStock: true },
  { id: 3, name: 'Phantom Shaker', price: 499, description: 'Engineered for relentless use. Custom edition for the warrior.', category: 'accessories', imageUrl: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=600', badge: null, featured: true, inStock: true },
  { id: 4, name: 'Specter Creatine', price: 1799, description: 'Pharmaceutical-grade creatine monohydrate for raw strength gains.', category: 'creatine', imageUrl: 'https://images.pexels.com/photos/5257574/pexels-photo-5257574.jpeg?auto=compress&cs=tinysrgb&w=600', badge: 'HOT', featured: false, inStock: true },
  { id: 5, name: 'Revenant BCAA', price: 1599, description: 'Intra-workout amino acids to fuel your session and accelerate recovery.', category: 'aminos', imageUrl: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=600', badge: null, featured: false, inStock: true },
  { id: 6, name: 'Banshee Fat Burner', price: 2199, description: 'Thermogenic complex designed for maximum shred and mental clarity.', category: 'fat-burner', imageUrl: 'https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=600', badge: 'POPULAR', featured: false, inStock: true },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getProducts();
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch {
        // keep fallback data if API is unreachable
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="arsenal" className="relative py-24 bg-[#0a0a0a] stripe-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#e41e26]" />
            <span className="section-label">The Arsenal</span>
            <div className="w-8 h-[2px] bg-[#e41e26]" />
          </div>
          <h2 className="ghost-logo-text text-5xl md:text-6xl text-white mb-4">
            Elite <span className="text-[#e41e26]">Arsenal</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Every product is forged in the shadows, tested in the fire, and delivered
            to those who demand nothing less than dominance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <article
              key={p.id}
              className="product-card group relative bg-[#111111] border border-white/5 overflow-hidden animate-fadeInUp"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
                {p.badge && <span className="product-badge">{p.badge}</span>}
                <img
                  src={p.imageUrl || ''}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {!p.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="font-fire text-white tracking-widest">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="text-[0.65rem] tracking-[0.2em] text-[#e41e26] uppercase font-display mb-2">
                  {p.category}
                </div>
                <h3 className="font-fire text-xl text-white mb-2 group-hover:text-[#e41e26] transition-colors">
                  {p.name}
                </h3>
                <p className="text-sm text-white/50 mb-4 leading-relaxed line-clamp-2">
                  {p.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="ghost-logo-text text-2xl text-white">
                    ₹{Number(p.price).toLocaleString('en-IN')}
                  </span>
                 <button
                   disabled={!p.inStock || addingProductId === p.id}
                   onClick={async () => {
                     try {
                       setAddingProductId(p.id);

                       await addToCart(p.id, 1);

                       alert(`${p.name} added to cart`);
                     } catch (error) {
                       console.error(error);
                       alert("Unable to add product to cart.");
                     } finally {
                       setAddingProductId(null);
                     }
                   }}
                   className="btn-primary !py-2 !px-4 !text-xs disabled:opacity-50"
                 >
                   <ShoppingBag size={14} />

                   {addingProductId === p.id ? "Adding..." : "Add"}
                 </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a href="#distribute" className="btn-outline">
            View Full Catalog
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
