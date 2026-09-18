import { useEffect, useMemo, useState } from "react";

type ApiItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  image?: string;
  imageUrl?: string;
};

type MenuItem = {
  name: string;
  desc: string;
  tag: string | null;
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
        img: "https://picsum.photos/seed/margherita/200/200",
      },
      {
        name: "Quattro Formaggi",
        desc: "A blend of four cheeses on a thin, blistered crust.",
        tag: null,
        img: "https://picsum.photos/seed/formaggi/200/200",
      },
      {
        name: "Pepperoni",
        desc: "Double pepperoni, mozzarella, oregano.",
        tag: "Best seller",
        img: "https://picsum.photos/seed/pepperoni/200/200",
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
        img: "https://picsum.photos/seed/truffle/200/200",
      },
      {
        name: "Spicy Diavola",
        desc: "Calabrian chili, spicy salami, hot honey.",
        tag: null,
        img: "https://picsum.photos/seed/diavola/200/200",
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
        img: undefined,
      },
      {
        name: "Green Papaya Salad",
        desc: "Crushed peanut, lime, chili.",
        tag: null,
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
        img: undefined,
      },
      {
        name: "Palm Sugar Coffee",
        desc: "Cambodian dark roast, condensed milk.",
        tag: null,
        img: undefined,
      },
      {
        name: "Sparkling Yuzu",
        desc: "Citrus, soda, mint.",
        tag: null,
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

  return (
    <section className="px-6 md:px-16 py-16 md:py-24 bg-[#f8f4ee] text-[#242E52]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-5 h-[1.5px] bg-[#242E52]/80" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#242E52]/80">
              Menu
            </span>
          </div>

          <div className="grid mder:grid-cols-12 gap-8 items-end mb-12">
            <div className="md:col-span-7">
              <h1 className="flex flex-col leading-none">
                <span className="font-sif italic text-5xl md:text-6xl lg:text-5xl font-normal mb-1">
                  The
                </span>
                <span className="font-sans font-black text-6xl md:text-8xl lg:text-7xl tracking-tight uppercase">
                  Favorites
                </span>
              </h1>
            </div>

            <div className="md:col-span-5 border-l-2 border-[#242E52] pl-5 py-1">
              <p className="text-sm md:text-base text-[#242E52]/80 leading-relaxed font-normal">
                Wood-fired daily, from a starter dough that's never rushed. Each
                pizza, its own story.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {menuGroups.map((group) => {
              const isActive = active === group.category;
              return (
                <button
                  key={group.category}
                  onClick={() => setActive(group.category)}
                  className={`text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-all ${
                    isActive
                      ? "bg-[#ea9cc2] text-[#3d0c11]"
                      : "border border-[#3d0c11]/20 text-[#3d0c11] hover:border-[#3d0c11]/60"
                  }`}
                >
                  {group.category}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-3 mb-8">
            <h2 className="font-serif italic text-2xl md:text-3xl">
              {activeGroup.category}
            </h2>
            <span className="text-sm text-[#3d0c11]/40">
              {String(activeGroup.items.length).padStart(2, "0")}
            </span>
          </div>

          {loading && (
            <p className="mb-8 text-sm text-[#3d0c11]/60">Loading menu...</p>
          )}

          {error && !loading && (
            <p className="mb-8 text-sm text-[#3d0c11]/60">{error}</p>
          )}

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {activeGroup.items.map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex gap-5">
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 shrink-0 rounded-md object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 shrink-0 rounded-md bg-[#3d0c11]/5" />
                )}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-sans font-bold text-lg">{item.name}</h3>
                    {item.tag && (
                      <span className="text-[10px] uppercase tracking-wide font-medium text-[#3d0c11] border border-[#3d0c11]/30 rounded-full px-2 py-0.5">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#3d0c11]/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
