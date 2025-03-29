import { cn } from "@/lib/utils"
import Image from "next/image"

interface CreditCardProps {
  isFlipped: boolean
}

export function CreditCard({ isFlipped }: CreditCardProps) {
  const cardStyle = {
    width: 195,
    height: 128,
  }

  return (
    <div
      className={cn("relative transition-transform duration-700 transform-style-3d", isFlipped && "rotate-y-180")}
      style={cardStyle}
    >
      {/* Front of card */}
      <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl">
        <Image
          src="/images/credit-card.png"
          alt="Credit Card"
          width={195}
          height={128}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Back of card */}
      <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl overflow-hidden shadow-xl">
        <div className="h-8 bg-gray-800 mt-4"></div>
        <div className="px-4 mt-4">
          <div className="bg-white h-8 flex items-center justify-end px-3 rounded">
            <div className="text-gray-800 font-mono text-xs">CVV</div>
          </div>
          <div className="mt-6 text-white text-xs opacity-80">
            The 3 or 4 digit security code on the back of your card
          </div>
        </div>
      </div>
    </div>
  )
}

