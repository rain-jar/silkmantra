import { useCartStore } from '../stores/cartStore';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity,
    0
  );

  return (
    <>
        <Header/>
        <div className="mt-16 min-h-screen px-4 md:px-8 py-10 bg-cream text-brand">
        <h1 className="text-2xl font-bold mb-6">Cart</h1>

        {cart.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <div className="space-y-8">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                <thead className="text-left border-b border-gray-300">
                    <tr>
                    <th className="py-2">Product</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2 text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => {
                    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''))
                    const itemTotal = price * item.quantity;

                    return (
                        <tr key={item.id} className="border-b border-gray-200">
                        {/* Product column */}
                        <td className="py-4 flex gap-4 items-center">
                            <div className="relative w-16 h-16 rounded overflow-hidden">
                            <Image
                                src={item.image_url}
                                alt={item.name}
                                layout="fill"
                                objectFit="cover"
                            />
                            </div>
                            <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-accent">{item.price}</p>
                            </div>
                        </td>

                        {/* Quantity column */}
                        <td className="py-4">
                            <div className="flex items-center gap-2 mb-2">
                            <button
                                onClick={() =>
                                item.quantity > 1
                                    ? useCartStore.setState((state) => ({
                                        cart: state.cart.map((p) =>
                                        p.id === item.id
                                            ? { ...p, quantity: p.quantity - 1 }
                                            : p
                                        ),
                                    }))
                                    : null
                                }
                                className="px-2 py-1 border rounded"
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() => addToCart(item)}
                                className="px-2 py-1 border rounded"
                            >
                                +
                            </button>
                            </div>
                            <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-500 hover:underline"
                            >
                            Remove from cart
                            </button>
                        </td>

                        {/* Total Item Price */}
                        <td className="py-4 text-right font-medium">
                            ₹{itemTotal.toLocaleString()}
                        </td>
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>

            {/* Total Row + Action Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                {/* Order Note */}
                <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium mb-1">Add an Order Note</label>
                <textarea
                    rows="3"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="How can we help you?"
                ></textarea>
                </div>

                {/* Total + Checkout */}
                <div className="text-right w-full md:w-1/2 space-y-4">
                <p className="text-lg font-semibold">
                    Total: ₹{total.toLocaleString()}
                </p>
                <button 
                    onClick={() => {
                        const messageLines = cart.map((item) => {
                            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
                            const total = price * item.quantity;
                            return `- ${item.name} (x${item.quantity}): ₹${total.toLocaleString()}`;
                          });
                          
                          const message = `Hello! I'm interested in these sarees:\n\n${messageLines.join(
                            '\n'
                          )}\n\nTotal: ₹${total.toLocaleString()}`;
                          
                          const whatsappNumber = '14379725620'; // Your number, no +
                          const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                            message
                          )}`;
                          
                          window.open(whatsappLink, '_blank');
                          
                    }}
                    className="bg-brand text-white px-6 py-3 rounded-full hover:bg-accent transition">
                    Send WhatsApp Invoice
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
        <Footer/>
    </>
  );
}
