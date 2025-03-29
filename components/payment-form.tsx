"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { CreditCard } from "@/components/credit-card"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

type FormData = {
  cardNumber: string
  expiration: string
  cvv: string
}

type FormErrors = {
  cardNumber?: string
  expiration?: string
  cvv?: string
}

export default function PaymentForm() {
  const [formData, setFormData] = useState<FormData>({
    cardNumber: "",
    expiration: "",
    cvv: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isFlipped, setIsFlipped] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const cvvInputRef = useRef<HTMLInputElement>(null)

  const validateCardNumber = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "")
    if (digitsOnly.length !== 16) {
      return "Card number must be 16 digits"
    }
    return undefined
  }

  const validateExpiration = (value: string) => {
    // Simplified validation for MM/YYYY format
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/
    if (!regex.test(value)) {
      return "Enter a valid expiration date (MM/YYYY)"
    }

    // Check if date is in the future
    const [month, year] = value.split("/")
    const expiryDate = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
    const today = new Date()

    if (expiryDate < today) {
      return "Card has expired"
    }

    return undefined
  }

  const validateCVV = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "")
    if (digitsOnly.length < 3 || digitsOnly.length > 4) {
      return "CVV must be 3 or 4 digits"
    }
    return undefined
  }

  const formatCardNumber = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "")
    const groups = []

    for (let i = 0; i < digitsOnly.length; i += 4) {
      groups.push(digitsOnly.slice(i, i + 4))
    }

    return groups.join(" ")
  }

  const formatExpiration = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "")

    if (digitsOnly.length <= 2) {
      return digitsOnly
    }

    const month = digitsOnly.slice(0, 2)
    const year = digitsOnly.slice(2, 6)

    return `${month}/${year}`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value)
    } else if (name === "expiration") {
      formattedValue = formatExpiration(value)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: FormErrors = {}

    const cardNumberError = validateCardNumber(formData.cardNumber)
    if (cardNumberError) newErrors.cardNumber = cardNumberError

    const expirationError = validateExpiration(formData.expiration)
    if (expirationError) newErrors.expiration = expirationError

    const cvvError = validateCVV(formData.cvv)
    if (cvvError) newErrors.cvv = cvvError

    setErrors(newErrors)

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData)
      // Here you would typically send the data to your backend
    }
  }

  const isFormValid = () => {
    // Check if all fields have values
    const allFieldsFilled =
      formData.cardNumber.trim() !== "" && formData.expiration.trim() !== "" && formData.cvv.trim() !== ""

    // Basic validation without showing errors
    const cardNumberValid = formData.cardNumber.replace(/\D/g, "").length === 16
    const expirationValid = /^(0[1-9]|1[0-2])\/\d{4}$/.test(formData.expiration)
    const cvvValid = /^\d{3,4}$/.test(formData.cvv)

    return allFieldsFilled && cardNumberValid && expirationValid && cvvValid
  }

  const toggleAccordion = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Handle CVV focus/blur for card flip animation
  useEffect(() => {
    const handleCvvFocus = () => setIsFlipped(true)
    const handleCvvBlur = () => setIsFlipped(false)

    const cvvInput = cvvInputRef.current
    if (cvvInput) {
      cvvInput.addEventListener("focus", handleCvvFocus)
      cvvInput.addEventListener("blur", handleCvvBlur)
    }

    return () => {
      if (cvvInput) {
        cvvInput.removeEventListener("focus", handleCvvFocus)
        cvvInput.removeEventListener("blur", handleCvvBlur)
      }
    }
  }, [])

  // Check if form is valid
  const formIsValid = isFormValid()

  return (
    <>
      <div className="pt-32 pb-24 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            {/* Left Column */}
            <div className="md:col-span-5 flex justify-center items-center">
              <div className="flex flex-col items-center">
                {/* Credit Card */}
                <div className="perspective-1000 mb-16 flex justify-center">
                  <CreditCard isFlipped={isFlipped} />
                </div>

                {/* Text below card */}
                <div className="flex flex-col text-center">
                  <span className="payment-form-gradient-text">To confirm your appointment please</span>
                  <span className="payment-form-gradient-text mt-2">
                    provide some additional information
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-1" />

            {/* Right Column - Form */}
            <div className="md:col-span-4">
              {/* Title aligned with form */}
              <h1 className="payment-form-gradient-text text-[30px] mb-24">
                Payment Information
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                <div>
                  <label htmlFor="cardNumber" className="payment-form-label block mb-2">
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Card Number"
                    className={cn(
                      "payment-form-input",
                      errors.cardNumber && "payment-form-input-error"
                    )}
                    maxLength={19}
                    aria-invalid={!!errors.cardNumber}
                    aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
                  />
                  {errors.cardNumber && (
                    <p id="cardNumber-error" className="text-red-500 text-sm mt-1">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="expiration" className="payment-form-label block mb-2">
                      Expiration
                    </label>
                    <input
                      id="expiration"
                      name="expiration"
                      value={formData.expiration}
                      onChange={handleInputChange}
                      placeholder="MM/YYYY"
                      className={cn(
                        "payment-form-input",
                        errors.expiration && "payment-form-input-error"
                      )}
                      maxLength={7}
                      aria-invalid={!!errors.expiration}
                      aria-describedby={errors.expiration ? "expiration-error" : undefined}
                    />
                    {errors.expiration && (
                      <p id="expiration-error" className="text-red-500 text-sm mt-1">
                        {errors.expiration}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cvv" className="payment-form-label block mb-2">
                      CVV/CVC
                    </label>
                    <input
                      id="cvv"
                      name="cvv"
                      ref={cvvInputRef}
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="—"
                      className={cn(
                        "payment-form-input",
                        errors.cvv && "payment-form-input-error"
                      )}
                      maxLength={4}
                      aria-invalid={!!errors.cvv}
                      aria-describedby={errors.cvv ? "cvv-error" : undefined}
                    />
                    {errors.cvv && (
                      <p id="cvv-error" className="text-red-500 text-sm mt-1">
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-8 flex justify-center">
                  <button 
                    type="submit" 
                    disabled={!formIsValid} 
                    className="payment-form-button"
                  >
                    Continue
                  </button>
                </div>
              </form>

              <div className="mt-16 space-y-2 max-w-md">
                <div
                  className={cn(
                    "border-t border-gray-800 pt-4 flex justify-between items-center cursor-pointer",
                    expandedItems.includes("why-card") && "pb-2"
                  )}
                  onClick={() => toggleAccordion("why-card")}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedItems.includes("why-card")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      toggleAccordion("why-card")
                      e.preventDefault()
                    }
                  }}
                >
                  <span className="payment-form-accordion-text">Why do you need my card?</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform text-[#797979]",
                      expandedItems.includes("why-card") && "transform rotate-180"
                    )}
                  />
                </div>
                {expandedItems.includes("why-card") && (
                  <div className="pb-4 text-xs text-gray-400">
                    <p>
                      We require your card information to secure your appointment. In case of late cancellation or
                      no-show, a fee may be charged. Your card will not be charged unless you miss your appointment or
                      cancel with less than 24 hours notice.
                    </p>
                  </div>
                )}

                <div
                  className={cn(
                    "border-t border-gray-800 py-4 flex justify-between items-center cursor-pointer",
                    expandedItems.includes("future-use") && "pb-2"
                  )}
                  onClick={() => toggleAccordion("future-use")}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedItems.includes("future-use")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      toggleAccordion("future-use")
                      e.preventDefault()
                    }
                  }}
                >
                  <span className="payment-form-accordion-text">How might you use my card in the future?</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform text-[#797979]",
                      expandedItems.includes("future-use") && "transform rotate-180"
                    )}
                  />
                </div>
                {expandedItems.includes("future-use") && (
                  <div className="pb-4 text-xs text-gray-400">
                    <p>
                      Your card information may be used for future appointments, services, or products you request. We
                      will always notify you before any charges are made. Your card details are securely stored and
                      encrypted according to PCI DSS standards.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2" />
          </div>
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="hidden md:block w-full absolute bottom-20 left-0">
        <div className="payment-form-progress-line" />
        
        <div className="container px-4 max-w-6xl">
          <div className="flex justify-around items-center relative">
            <div className="flex flex-col items-center">
              <div className="payment-form-progress-circle payment-form-progress-circle-appointment" />
              <span className="payment-form-progress-text">
                Appointment
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="payment-form-progress-circle payment-form-progress-circle-payment" />
              <span className="payment-form-progress-text">
                Payment
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="payment-form-progress-circle payment-form-progress-circle-confirmation" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

