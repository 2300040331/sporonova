"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Phone, MapPin, Mail, ClipboardList, ArrowLeft, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCMS } from "@/lib/cms-context";
import { getSectionStyles, getHeadingStyles, getParagraphStyles, getButtonStyles } from "@/lib/styles-helper";

export const INQUIRY_MAPPINGS: Record<string, { title: string; message: string }> = {
  "Request Product Catalogue": {
    title: "Product Catalogue Request",
    message:
      "Hello, I would like to receive your latest mushroom spawn product catalogue. Please share details of your available mushroom spawn varieties, packaging options, pricing, and ordering information.",
  },
  "Request Technical PDF / Specifications": {
    title: "Technical Documentation Request",
    message:
      "Hello, I would like to receive the technical specifications for your mushroom spawn products. Please share information on storage conditions, shelf life, inoculation methods, cultivation guidelines, and recommended usage.",
  },
  "Request Bulk Spawn Quote": {
    title: "Bulk Spawn Quotation Request",
    message:
      "Hello, I am interested in purchasing mushroom spawn in bulk. Please provide a quotation including available varieties, pricing, minimum order quantity (MOQ), packaging options, delivery timeline, and payment terms.",
  },
  "Request Cooperative Partnership Info": {
    title: "Partnership Inquiry",
    message:
      "Hello, we are interested in exploring a partnership with Liquid Spawn. Please share information about dealership, distributorship, cooperative partnerships, commercial collaborations, and the application process.",
  },
  "General Cultivation Query": {
    title: "Mushroom Cultivation Support",
    message:
      "Hello, I have a question regarding mushroom cultivation. I would appreciate your guidance on spawn selection, cultivation techniques, disease management, yield optimization, or any other technical support.",
  },
};

function ContactContent() {
  const { data } = useCMS();
  const searchParams = useSearchParams();
  const inquiryParam = searchParams.get("inquiry");
  const productParam = searchParams.get("product");

  const initialType = inquiryParam === "pdf" 
    ? "Request Technical PDF / Specifications" 
    : inquiryParam === "partnership" 
    ? "Request Cooperative Partnership Info" 
    : "";
  
  const defaultMapping = initialType ? INQUIRY_MAPPINGS[initialType] : { title: "", message: "" };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: initialType,
    title: defaultMapping.title,
    message: productParam
      ? `Hello, I would like to receive the official Technical PDF datasheet and biological specifications for ${productParam}.`
      : defaultMapping.message,
  });

  const [isTitleEdited, setIsTitleEdited] = useState(false);
  const [isMessageEdited, setIsMessageEdited] = useState(Boolean(productParam));

  useEffect(() => {
    if (inquiryParam === "pdf") {
      const pdfMapping = INQUIRY_MAPPINGS["Request Technical PDF / Specifications"];
      setFormData((prev) => ({
        ...prev,
        inquiryType: "Request Technical PDF / Specifications",
        title: pdfMapping.title,
        message: productParam
          ? `Hello, I would like to receive the official Technical PDF datasheet and biological specifications for ${productParam}.`
          : pdfMapping.message,
      }));
      setIsTitleEdited(false);
      setIsMessageEdited(Boolean(productParam));
    } else if (inquiryParam === "partnership") {
      const partnerMapping = INQUIRY_MAPPINGS["Request Cooperative Partnership Info"];
      setFormData((prev) => ({
        ...prev,
        inquiryType: "Request Cooperative Partnership Info",
        title: partnerMapping.title,
        message: partnerMapping.message,
      }));
      setIsTitleEdited(false);
      setIsMessageEdited(false);
    }
  }, [inquiryParam, productParam]);

  const handleInquiryTypeChange = (newType: string) => {
    if (!newType) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: "",
        title: "",
        message: "",
      }));
      setIsTitleEdited(false);
      setIsMessageEdited(false);
      return;
    }

    const mapping = INQUIRY_MAPPINGS[newType] || {
      title: "",
      message: "",
    };

    const hasManualEdits = isTitleEdited || isMessageEdited;

    if (hasManualEdits) {
      const confirmReplace = window.confirm(
        "Changing the inquiry type will update your Title and Message fields to the corresponding default template. Replace your existing edits?"
      );
      if (!confirmReplace) {
        setFormData((prev) => ({ ...prev, inquiryType: newType }));
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      inquiryType: newType,
      title: mapping.title,
      message: mapping.message,
    }));
    setIsTitleEdited(false);
    setIsMessageEdited(false);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({ ...prev, title: val }));
    setIsTitleEdited(true);
  };

  const handleMessageChange = (val: string) => {
    setFormData((prev) => ({ ...prev, message: val }));
    setIsMessageEdited(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.inquiryType) {
      alert("Please select an inquiry type.");
      return;
    }
    const phoneNumber = data?.contact?.whatsappNumber || "917207208419";
    const text = `*Name:* ${encodeURIComponent(formData.name || "N/A")}%0A*Email:* ${encodeURIComponent(formData.email || "N/A")}%0A*Inquiry Type:* ${encodeURIComponent(formData.inquiryType)}%0A*Title:* ${encodeURIComponent(formData.title || "N/A")}%0A*Message:* ${encodeURIComponent(formData.message || "N/A")}`;

    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <main className="flex-1 bg-[#f9faf7] pt-28 pb-20 min-h-screen" style={getSectionStyles(data?.contact?.styles)}>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Back Link & Header */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[10px] text-[#4e8c4a] font-mono uppercase tracking-widest hover:underline font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs text-[#4e8c4a] font-mono uppercase tracking-widest block font-extrabold">
              {data?.contact?.badge || "SporoNova Contact & Technical Center"}
            </span>
            <h1 
              className="font-display text-4xl md:text-5xl font-black text-[#1c3c24] leading-tight font-sans"
              style={getHeadingStyles(data?.contact?.styles)}
            >
              {data?.contact?.title || "Get In Touch With Our Team"}
            </h1>
            <p 
              className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed font-sans"
              style={getParagraphStyles(data?.contact?.styles)}
            >
              {data?.contact?.subtitle || "Request product catalogues, official technical PDF datasheets, bulk spawn pricing, or expert cultivation support."}
            </p>
            <div className="w-16 h-1 bg-[#4e8c4a] mx-auto mt-4 rounded-full" />
          </div>
        </div>

        {/* Notice Banner if coming from Download PDF button */}
        {inquiryParam === "pdf" && (
          <div className="bg-[#1c3c24] text-white p-6 rounded-2xl border border-[#7baa6b]/30 shadow-md flex items-center gap-4 max-w-4xl mx-auto animate-fadeIn">
            <Download className="w-8 h-8 text-[#7baa6b] shrink-0" />
            <div className="space-y-0.5">
              <span className="text-xs font-bold font-display uppercase tracking-wider block text-[#7baa6b]">
                Technical PDF Datasheet Request
              </span>
              <p className="text-xs text-white/80 font-semibold leading-relaxed">
                {productParam
                  ? `You are requesting the official technical specification datasheet for ${productParam}. Complete the form below to connect instantly with our team via WhatsApp.`
                  : "Complete the form below to receive the technical PDF specifications package via WhatsApp."}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column - Contact Details */}
          <div 
            className="lg:col-span-4 bg-white border border-[#e6e4dc] p-8 rounded-[2rem] flex flex-col justify-between space-y-8 shadow-sm"
            style={{
              backgroundColor: data?.contact?.styles?.cardBgColor || undefined,
              borderColor: data?.contact?.styles?.cardBorderColor || undefined,
              borderRadius: data?.contact?.styles?.cardBorderRadius !== undefined ? `${data?.contact?.styles.cardBorderRadius}px` : undefined,
            }}
          >
            <div className="space-y-6">
              <h3 className="text-[#1c3c24] font-display text-xl font-extrabold tracking-tight">
                {data?.contact?.getInTouchTitle || "Get in Touch"}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
                {data?.contact?.getInTouchParagraph || "Request a product catalogue, ask about bulk discounts, or get custom recommendations for your specific growth setup."}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#f9faf7] border border-[#e6e4dc] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#4e8c4a]" />
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 block font-mono font-bold uppercase">PHONE & WHATSAPP SUPPORT</span>
                  <span className="text-xs font-bold text-gray-700 block">{data?.contact?.phone || "+91 7207208419"}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#f9faf7] border border-[#e6e4dc] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#4e8c4a]" />
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 block font-mono font-bold uppercase">LABORATORY HEADQUARTERS</span>
                  <span className="text-xs font-bold text-gray-700 block leading-tight">{data?.contact?.address || "Koni, Bilaspur, Chhattisgarh 495009"}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#f9faf7] border border-[#e6e4dc] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#4e8c4a]" />
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 block font-mono font-bold uppercase">EMAIL INQUIRIES</span>
                  <span className="text-xs font-bold text-gray-700 block">{data?.contact?.email || "sales@sporonova.com"}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <span className="text-[9px] text-gray-400 font-mono tracking-widest block uppercase font-bold">
                {data?.contact?.footerTag || "ISO & GMP Accredited Facility"}
              </span>
            </div>
          </div>

          {/* Middle Column - Form */}
          <div 
            className="lg:col-span-4 bg-white border border-[#e6e4dc] p-8 rounded-[2rem] shadow-sm"
            style={{
              backgroundColor: data?.contact?.styles?.cardBgColor || undefined,
              borderColor: data?.contact?.styles?.cardBorderColor || undefined,
              borderRadius: data?.contact?.styles?.cardBorderRadius !== undefined ? `${data?.contact?.styles.cardBorderRadius}px` : undefined,
            }}
          >
            <form className="space-y-5" onSubmit={handleContactSubmit}>
              <div className="space-y-1.5">
                <label className="text-[9px] text-gray-500 uppercase font-mono font-bold block">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#f9faf7] border border-[#e6e4dc] rounded-xl px-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-[#4e8c4a] focus:ring-1 focus:ring-[#4e8c4a]/10 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] text-gray-500 uppercase font-mono font-bold block">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full bg-[#f9faf7] border border-[#e6e4dc] rounded-xl px-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-[#4e8c4a] focus:ring-1 focus:ring-[#4e8c4a]/10 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] text-gray-500 uppercase font-mono font-bold block">Inquiry Type</label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => handleInquiryTypeChange(e.target.value)}
                  className="w-full bg-[#f9faf7] border border-[#e6e4dc] rounded-xl px-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-[#4e8c4a] transition-all cursor-pointer"
                  required
                >
                  <option value="">Select Inquiry Type</option>
                  <option value="Request Product Catalogue">Request Product Catalogue</option>
                  <option value="Request Technical PDF / Specifications">Request Technical PDF / Specifications</option>
                  <option value="Request Bulk Spawn Quote">Request Bulk Spawn Quote</option>
                  <option value="Request Cooperative Partnership Info">Request Cooperative Partnership Info</option>
                  <option value="General Cultivation Query">General Cultivation Query</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] text-gray-500 uppercase font-mono font-bold block">Inquiry Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Inquiry title..."
                  className="w-full bg-[#f9faf7] border border-[#e6e4dc] rounded-xl px-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-[#4e8c4a] focus:ring-1 focus:ring-[#4e8c4a]/10 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] text-gray-500 uppercase font-mono font-bold block">Message Details</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleMessageChange(e.target.value)}
                  placeholder="Specify spawn capacity needs or strain selections..."
                  className="w-full bg-[#f9faf7] border border-[#e6e4dc] rounded-xl px-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-[#4e8c4a] focus:ring-1 focus:ring-[#4e8c4a]/10 transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1c3c24] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#4e8c4a] transition-all shadow-md shadow-[#1c3c24]/5 flex items-center justify-center gap-2 cursor-pointer"
                style={getButtonStyles(data?.contact?.styles)}
              >
                <ClipboardList className="w-3.5 h-3.5" /> Send Message via WhatsApp
              </button>
            </form>
          </div>

          {/* Right Column - Map Embed */}
          <div className="lg:col-span-4 rounded-[2rem] overflow-hidden border border-[#e6e4dc] shadow-sm relative min-h-[300px]">
            <iframe
              src={data?.contact?.mapIframeUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696.8524458312014!2d82.1388031!3d22.1129528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280b2a265691f1%3A0xc3f605a9c9f2b86d!2sKoni%2C%20Bilaspur%2C%20Chhattisgarh%20495009!5e0!3m2!1sen!2sin!4v1783234000000!5m2!1sen!2sin"}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[#f9faf7] pt-32 text-center text-xs font-mono text-gray-500">Loading Contact Form...</div>}>
        <ContactContent />
      </Suspense>
      <Footer />
    </>
  );
}
