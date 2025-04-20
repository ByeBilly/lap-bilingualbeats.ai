"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Headphones, BookOpen, Languages, ShoppingCart, Plus, Minus, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

// Define cart item type
type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

export default function Home() {
  // Shopping cart state
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Calculate cart totals
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Add item to cart
  const addToCart = (id: string, name: string, price: number) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex((item) => item.id === id)

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += 1
        return updatedCart
      } else {
        // Item doesn't exist, add new item
        return [...prevCart, { id, name, price, quantity: 1 }]
      }
    })

    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    })
  }

  // Update item quantity
  const updateQuantity = (id: string, change: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    })
  }

  // Remove item from cart
  const removeItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      setCart([])
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/sky-background.png')" }}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mb-6 overflow-hidden">
            <div className="flex items-center px-6 py-2">
              <div className="flex items-center">
                <Image
                  src="/images/echo-mascot.png"
                  alt="Echo Mascot"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <h1 className="text-white text-xl font-bold">BILINGUAL BEATS</h1>
              </div>
              <div className="ml-auto flex items-center">
                <nav className="flex space-x-4 mr-4">
                  <Link href="https://bilingualbeats.ai/" className="text-white hover:text-gray-300">
                    Home
                  </Link>
                  <Link href="#" className="text-white hover:text-gray-300">
                    Products
                  </Link>
                  <Link href="#" className="text-white hover:text-gray-300">
                    About
                  </Link>
                </nav>

                {/* Shopping Cart */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="relative text-white">
                      <ShoppingCart className="h-5 w-5" />
                      {cartItemCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 bg-purple-600 hover:bg-purple-600">
                          {cartItemCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>Your Cart</SheetTitle>
                    </SheetHeader>

                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-[50vh]">
                        <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Your cart is empty</p>
                      </div>
                    ) : (
                      <div className="mt-8 space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500"
                                onClick={() => removeItem(item.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}

                        <Separator className="my-4" />

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between font-bold">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                          </div>
                        </div>

                        <Button
                          className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
                          onClick={handleCheckout}
                          disabled={isCheckingOut}
                        >
                          {isCheckingOut ? <>Processing...</> : <>Checkout (${cartTotal.toFixed(2)})</>}
                        </Button>
                      </div>
                    )}
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Product Info */}
            <div className="w-full md:w-2/3 bg-black bg-opacity-80 rounded-lg p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">Language Acquisition Pack (LAP)</h2>
              <div className="text-sm text-gray-400 mb-4">
                By{" "}
                <Link href="#" className="text-purple-400 hover:underline">
                  Bilingual Beats
                </Link>{" "}
                • The musical way to language fluency
              </div>

              <div className="mb-6 relative">
                <Image
                  src="/images/language-acquisition-pack.png"
                  alt="Language Acquisition Pack"
                  width={600}
                  height={350}
                  className="rounded-lg w-full"
                />
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  144 Tracks
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 px-8 rounded-lg flex-1"
                  onClick={() => addToCart("lap", "Language Acquisition Pack", 44)}
                >
                  Buy Now – $44
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-lg flex-1"
                  onClick={() =>
                    alert(
                      "Backstage access is available only to LAP buyers. Get your pack to unlock 44 days of custom bilingual music!",
                    )
                  }
                >
                  Backstage Pass
                </Button>
              </div>

              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Music className="mr-2 text-purple-400" /> A Musical Journey to Language Fluency
              </h3>
              <p className="mb-4">
                The Language Acquisition Pack is a bundle of 144 bilingual tracks, each custom-made based on your
                preferred musical style. Whether you love classical, folk, hip hop, pop, or nursery rhymes, we've got
                you covered!
              </p>
              <p className="mb-6">
                Every line of each song is sung in two languages—first in your native language, then mirrored in your
                target language—creating immersive, side-by-side language exposure that makes learning natural and fun.
              </p>

              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Headphones className="mr-2 text-purple-400" /> How It Works
              </h3>
              <div className="bg-gray-900 p-4 rounded-lg mb-6">
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Purchase your LAP</strong> - Get started with a one-time payment of $44
                  </li>
                  <li>
                    <strong>Receive your first mini-album</strong> - Check your email for your first set of custom
                    tracks
                  </li>
                  <li>
                    <strong>Enjoy 44 days of music</strong> - New releases arrive regularly, tailored to your feedback
                  </li>
                  <li>
                    <strong>Fine-tune your experience</strong> - Adjust language choices and genre preferences as you go
                  </li>
                </ol>
              </div>

              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <BookOpen className="mr-2 text-purple-400" /> What is Language Acquisition?
              </h3>
              <div className="bg-gray-900 p-4 rounded-lg mb-6">
                <p>
                  Language acquisition is the unconscious process of understanding and using a language, and it differs
                  from language learning. When you acquire a language through music, you absorb vocabulary, grammar, and
                  pronunciation naturally—just like children do with their first language.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-1/3 space-y-6">
              {/* Echo Introduction */}
              <div className="bg-black bg-opacity-80 rounded-lg p-6 text-white">
                <div className="flex items-center mb-3">
                  <Image
                    src="/images/echo-mascot.png"
                    alt="Echo Mascot"
                    width={50}
                    height={50}
                    className="rounded-full mr-3"
                  />
                  <h3 className="text-xl font-bold">Meet Echo!</h3>
                </div>
                <p className="text-sm mb-4">
                  Hey there, language explorer! I'm Echo, your musical guide on this language journey. I'll help you
                  discover the joy of learning through music. Whether you're a beginner or looking to polish your
                  skills, our bilingual tracks make language acquisition fun and natural. Ready to start your musical
                  language adventure? 🎵
                </p>
              </div>

              {/* Additional Products */}
              <div className="bg-black bg-opacity-80 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Additional Products</h3>

                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-purple-400">One-off Custom Albums</h4>
                  <p className="text-sm mb-2">12–15 custom tracks tailored to your preferences</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">$9.95</span>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => addToCart("custom-album", "One-off Custom Album", 9.95)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="font-bold text-blue-400">Pre-packaged Albums</h4>
                  <p className="text-sm mb-2">Ready-made collections in popular genres</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">$6.95</span>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => addToCart("pre-packaged", "Pre-packaged Album", 6.95)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>

              {/* Musical Styles */}
              <div className="bg-black bg-opacity-80 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Available Musical Styles</h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-purple-900 px-2 py-1 rounded">Classical</span>
                  <span className="bg-purple-900 px-2 py-1 rounded">Folk</span>
                  <span className="bg-purple-900 px-2 py-1 rounded">Hip Hop</span>
                  <span className="bg-purple-900 px-2 py-1 rounded">Pop</span>
                  <span className="bg-purple-900 px-2 py-1 rounded">Rock</span>
                  <span className="bg-purple-900 px-2 py-1 rounded">Jazz</span>
                  <span className="bg-purple-900 px-2 py-1 rounded">Electronic</span>
                  <span className="bg-purple-900 px-2 py-1 rounded">Country</span>
                  <span className="bg-purple-900 px-2 py-1 rounded">R&B</span>
                  <span className="bg-purple-900 px-2 py-1 rounded">Nursery Rhymes</span>
                  <span className="bg-purple-900 px-2 py-1 rounded">Lullabies</span>
                  <span className="bg-purple-900 px-2 py-1 rounded">Reggae</span>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-black bg-opacity-80 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Languages className="mr-2" /> Supported Languages
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span>Spanish</span>
                  <span>French</span>
                  <span>German</span>
                  <span>Italian</span>
                  <span>Japanese</span>
                  <span>Mandarin</span>
                  <span>Korean</span>
                  <span>Portuguese</span>
                  <span>Russian</span>
                  <span>Arabic</span>
                  <span>+ many more</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-black bg-opacity-80 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Get Language Tips</h3>
                <p className="text-sm mb-4">
                  Subscribe to our newsletter for free language learning tips and exclusive offers:
                </p>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700">Join</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
