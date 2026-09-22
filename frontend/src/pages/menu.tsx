import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Utensils } from "lucide-react";

type ApiItem = {
  _id: string;
  name: string;
  description: string;
  price?: number;
  category?: string;
  image?: string;
  imageUrl?: string;
};

type MenuItem = {
  name: string;
  desc: string;
  tag: string | null;
  price?: number;
  img?: string;
};

type MenuGroup = {
  category: string;
  items: MenuItem[];
};

const menuData: MenuGroup[] = [
  {
    category: "Classics",
    items: [
      {
        name: "Margherita",
        desc: "San Marzano tomato, fior di latte, fresh basil.",
        tag: null,
        price: 14.5,
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Quattro Formaggi",
        desc: "A blend of four cheeses on a thin, blistered crust.",
        tag: null,
        price: 17.0,
        img: "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Pepperoni",
        desc: "Double pepperoni, mozzarella, oregano.",
        tag: "Best seller",
        price: 16.5,
        img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    category: "Signature",
    items: [
      {
        name: "Truffle & Mushroom",
        desc: "Wild mushrooms, truffle cream, fresh thyme.",
        tag: "Chef choice",
        price: 19.5,
        img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Spicy Diavola",
        desc: "Calabrian chili, spicy salami, hot honey.",
        tag: null,
        price: 18.0,
        img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    category: "Sides & Salads",
    items: [
      {
        name: "Garlic Focaccia",
        desc: "House-baked, rosemary, sea salt.",
        tag: null,
        price: 8.5,
        img: undefined,
      },
      {
        name: "Green Papaya Salad",
        desc: "Crushed peanut, lime, chili.",
        tag: null,
        price: 11.0,
        img: undefined,
      },
    ],
  },
  {
    category: "Drinks",
    items: [
      {
        name: "Lemongrass Iced Tea",
        desc: "House-steeped, lightly sweet.",
        tag: null,
        price: 5.0,
        img: undefined,
      },
      {
        name: "Palm Sugar Coffee",
        desc: "Cambodian dark roast, condensed milk.",
        tag: null,
        price: 5.5,
        img: undefined,
      },
      {
        name: "Sparkling Yuzu",
        desc: "Citrus, soda, mint.",
        tag: null,
        price: 6.0,
        img: undefined,
      },
    ],
  },
];

export default function Menu() {
  const [items, setItems] = useState<ApiItem[]>([]);
  const [active, setActive] = useState(menuData[0].category);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const menuGroups = useMemo(() => {
    if (!items.length) {
      return menuData;
    }

    return items.reduce<MenuGroup[]>((groups, item) => {
      const category = item.category || "Menu";
      const existing = groups.find((group) => group.category === category);
      const menuItem: MenuItem = {
        name: item.name,
        desc: item.description,
        tag: null,
        price: item.price,
        img: item.imageUrl || item.image,
      };

      if (existing) {
        existing.items.push(menuItem);
      } else {
        groups.push({ category, items: [menuItem] });
      }

      return groups;
    }, []);
  }, [items]);

  const activeGroup =
    menuGroups.find((g) => g.category === active) || menuGroups[0];

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/items");
        if (!response.ok) {
          throw new Error("Could not load menu items");
        }

        const data = await response.json();
        setItems(Array.isArray(data) ? data : []);
        if (Array.isArray(data) && data.length > 0) {
          setActive(data[0].category || "Menu");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Could not load menu items",
        );
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="min-h-screen px-4 sm:px-6 md:px-16 py-12 md:py-20 bg-[#f8f4ee] text-[#242E52] flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[1.5px] bg-[#242E52]/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#242E52]/70">
              Artisanal Menu
            </span>
            <span className="w-6 h-[1.5px] bg-[#242E52]/40" />
          </div>

          <h1 className="font-serif italic text-5xl md:text-7xl mb-8 text-[#242E52]">
            Menu
          </h1>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
            {menuGroups.map((group) => {
              const isActive = active === group.category;
              return (
                <button
                  key={group.category}
                  onClick={() => setActive(group.category)}
                  className={`text-xs font-bold uppercase cursor-pointer tracking-wider px-5 py-2.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-[#242E52] text-[#f8f4ee] shadow-md shadow-[#242E52]/20 scale-105"
                      : "border border-[#242E52]/20 text-[#242E52] hover:border-[#242E52]/60 hover:bg-[#242E52]/5"
                  }`}
                >
                  {group.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Section */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="font-serif italic text-2xl md:text-4xl text-[#242E52]">
              {activeGroup.category}
            </h2>

            {activeGroup.items.length > 2 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleScroll("left")}
                  className="p-2 rounded-full border border-[#242E52]/20 text-[#242E52] hover:bg-[#242E52] hover:text-[#f8f4ee] transition-colors"
                  aria-label="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScroll("right")}
                  className="p-2 rounded-full border border-[#242E52]/20 text-[#242E52] hover:bg-[#242E52] hover:text-[#f8f4ee] transition-colors"
                  aria-label="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {loading && (
            <p className="mb-8 text-center text-sm text-[#242E52]/60 animate-pulse py-8">
              Loading menu...
            </p>
          )}

          {error && !loading && (
            <p className="mb-8 text-center text-sm text-[#242E52]/60 py-8">
              {error}
            </p>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup.category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative w-full"
            >
              <div
                ref={scrollRef}
                className="
                  flex
                  gap-5
                  overflow-x-auto
                  [&::-webkit-scrollbar]:hidden
                  [-ms-overflow-style:none]
                  [scrollbar-width:none]
                  py-2
                  px-1
                  scroll-smooth
                "
              >
                {activeGroup.items.map((item, index) => (
                  <motion.div
                    key={`${item.name}-${index}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    className="shrink-0 w-[220px] sm:w-[250px] md:w-[260px] group"
                  >
                    {item.img ? (
                      <div className="overflow-hidden rounded-lg mb-4 aspect-square bg-[#3d0c11]/5">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square bg-[#3d0c11]/5 rounded-lg mb-4 flex flex-col items-center justify-center text-[#3d0c11]/40">
                        <Utensils className="w-8 h-8 mb-2 stroke-[1.5]" />
                        <span className="text-[10px] uppercase tracking-widest font-semibold">
                          No Preview
                        </span>
                      </div>
                    )}

                    <h3 className="font-bold text-base text-[#242E52] leading-snug">
                      {item.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-2">
                      {item.tag && (
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#242E52]/60">
                          {item.tag}
                        </span>
                      )}
                      {item.price !== undefined && (
                        <span className="text-sm font-semibold text-[#242E52]/70">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
