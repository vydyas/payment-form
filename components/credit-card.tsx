import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

interface CreditCardProps {
  cardNumber?: string
  cardHolder?: string
  expiryDate?: string
  cvv?: string
  isFlipped: boolean
}

export function CreditCard({ cardNumber, cardHolder, expiryDate, cvv, isFlipped }: CreditCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <div className="relative w-[195px] h-[128px] perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 z-0">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-shimmer" />
            )}
            <Image
              src="/images/credit-card.png"
              alt="Credit Card Front"
              width={195}
              height={128}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIsImageLoaded(true)}
              priority
            />
          </div>
          {!isImageLoaded && (
            <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <div className="text-white">
                  <p className="text-xs mb-1">Card Number</p>
                  <p className="text-sm font-mono tracking-wider">
                    {cardNumber || "•••• ••••"}
                  </p>
                </div>
                <div className="text-white">
                  <p className="text-xs mb-1">Expires</p>
                  <p className="text-xs font-mono">{expiryDate || "MM/YY"}</p>
                </div>
              </div>
              <div className="text-white">
                <p className="text-xs mb-1">Card Holder</p>
                <p className="text-sm font-mono uppercase">
                  {cardHolder || "CARD HOLDER"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 z-0">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-shimmer" />
            )}
            <Image
              src="/images/credit-card.png"
              alt="Credit Card Back"
              width={195}
              height={128}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIsImageLoaded(true)}
              priority
            />
          </div>
          {!isImageLoaded && (
            <div className="absolute inset-0 p-4 z-10">
              <div className="h-8 bg-black mt-4 mb-2" />
              <div className="flex justify-end">
                <div className="text-white bg-white/10 px-2 py-1 rounded">
                  <p className="text-xs mb-0.5">CVV</p>
                  <p className="text-xs font-mono">{cvv || "•••"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

