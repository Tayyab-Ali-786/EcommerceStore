"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  IconPlus, 
  IconLayoutDashboard, 
  IconSettings, 
  IconLogout,
  IconPackage,
  IconTrash,
  IconEdit,
  IconPhoto,
  IconCurrencyDollar,
  IconList
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "add-product" | "manage-products">("dashboard");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (!parsedUser.isAdmin) {
      router.push("/");
      return;
    }
    setUser(parsedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-200">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-900 bg-zinc-950/50 backdrop-blur-xl">
        <div className="flex h-full flex-col p-6">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
              <IconLayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Admin Hub</span>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem 
              icon={<IconLayoutDashboard size={20} />} 
              label="Overview" 
              active={activeTab === "dashboard"} 
              onClick={() => setActiveTab("dashboard")} 
            />
            <NavItem 
              icon={<IconPlus size={20} />} 
              label="Add Product" 
              active={activeTab === "add-product"} 
              onClick={() => setActiveTab("add-product")} 
            />
            <NavItem 
              icon={<IconList size={20} />} 
              label="Manage Products" 
              active={activeTab === "manage-products"} 
              onClick={() => setActiveTab("manage-products")} 
            />
          </nav>

          <div className="mt-auto border-t border-zinc-900 pt-6">
            <button 
              onClick={handleLogout}
              className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-red-500/10 hover:text-red-400"
            >
              <IconLogout size={20} className="transition-transform group-hover:-translate-x-1" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 w-full p-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {activeTab === "dashboard" && "Dashboard Overview"}
              {activeTab === "add-product" && "Add New Product"}
              {activeTab === "manage-products" && "Product Management"}
            </h1>
            <p className="mt-1 text-zinc-500">Welcome back, {user.name.split(" ")[0]}! Here's what's happening today.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 p-1">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800" />
            </div>
          </div>
        </header>

        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <StatCard title="Total Products" value="24" icon={<IconPackage className="text-blue-400" />} />
                  <StatCard title="Total Sales" value="$4,560" icon={<IconCurrencyDollar className="text-green-400" />} />
                  <StatCard title="Active Users" value="1.2k" icon={<IconSettings className="text-purple-400" />} />
                </div>
              </motion.div>
            )}

            {activeTab === "add-product" && (
              <motion.div
                key="add-product"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AddProductForm />
              </motion.div>
            )}

            {activeTab === "manage-products" && (
              <motion.div
                key="manage-products"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ProductList />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
        active 
          ? "bg-blue-600/10 text-blue-400 ring-1 ring-blue-500/20" 
          : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-900 bg-zinc-900/50 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-500">{title}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function AddProductForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title"),
            price: Number(formData.get("price")),
            description: formData.get("description"),
            category: formData.get("category"),
            stock: Number(formData.get("stock")),
            imageUrl: formData.get("imageUrl")
        };

        try {
            const res = await fetch("https://ecommercestore-backend-4p55.onrender.com/addProduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to add product");

            setMessage("Product added successfully!");
            (e.target as HTMLFormElement).reset();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl rounded-3xl border border-zinc-900 bg-zinc-900/30 p-10 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-8">
                {message && <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4 text-green-400 text-sm">{message}</div>}
                {error && <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm">{error}</div>}

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Product Title</label>
                        <input name="title" required className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="Enter product name" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Category</label>
                        <input name="category" required className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="e.g. Footwear" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Price ($)</label>
                        <input name="price" type="number" step="0.01" required className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Initial Stock</label>
                        <input name="stock" type="number" required className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="0" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Image URL</label>
                    <div className="relative">
                        <IconPhoto className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                        <input name="imageUrl" className="w-full rounded-xl bg-zinc-950 border border-zinc-800 pl-12 pr-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="https://example.com/image.jpg" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Product Description</label>
                    <textarea name="description" required rows={4} className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none" placeholder="Describe the product features and details..." />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/30 active:scale-95 disabled:opacity-50"
                >
                    {loading ? "Creating Product..." : "Deploy Product"}
                </button>
            </form>
        </div>
    );
}

function ProductList() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://ecommercestore-backend-4p55.onrender.com/products");
                const result = await res.json();
                if (result.success) setProducts(result.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await fetch(`https://ecommercestore-backend-4p55.onrender.com/products/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (res.ok) {
                setProducts(products.filter(p => p._id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="text-zinc-500">Loading products...</div>;

    return (
        <div className="grid grid-cols-1 gap-4 overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-900/10">
            <div className="grid grid-cols-12 border-b border-zinc-900 bg-zinc-950 px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <div className="col-span-5">Product Info</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-1">Stock</div>
                <div className="col-span-2 text-right">Actions</div>
            </div>

            <div className="divide-y divide-zinc-900">
                {products.length === 0 ? (
                    <div className="p-8 text-center text-zinc-600">No products found. Add some!</div>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="grid grid-cols-12 items-center px-6 py-4 transition-colors hover:bg-zinc-900/30">
                            <div className="col-span-5 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden">
                                    {product.imageUrl && <img src={product.imageUrl} alt="" className="h-full w-full object-cover" />}
                                </div>
                                <div>
                                    <div className="font-semibold text-white">{product.title}</div>
                                    <div className="text-xs text-zinc-500 line-clamp-1">{product.description}</div>
                                </div>
                            </div>
                            <div className="col-span-2 text-sm text-zinc-400 capitalize">{product.category}</div>
                            <div className="col-span-2 font-mono text-sm text-blue-400">${product.price?.toFixed(2)}</div>
                            <div className="col-span-1 text-sm text-zinc-400">{product.stock}</div>
                            <div className="col-span-2 flex justify-end gap-2">
                                <button className="rounded-lg p-2 text-zinc-500 hover:bg-blue-500/10 hover:text-blue-400 transition-all">
                                    <IconEdit size={18} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(product._id)}
                                    className="rounded-lg p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
                                >
                                    <IconTrash size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
