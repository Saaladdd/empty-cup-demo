"use client";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "./icons/logo.png";
import contacts from "./icons/contacts.png";
import gallery from "./icons/gallery.png";
import map from "./icons/map.png";
import heartboard from "./icons/clipboard-heart 1.png";
import sort from "./icons/sort.png";
import details from "./icons/arrow-right-short 1.png";
import shortlistEmpty from "./icons/bookmark-heart-empty.png";
import shortlistFull from "./icons/bookmark-heart-full.png";
import report from "./icons/exclamation-circle.png";
import hide from "./icons/eye-slash 1.png";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showOnlyShortlisted, setShowOnlyShortlisted] = useState(false);
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/contacts")
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        console.error("Axios error:", err);
        setError("Failed to fetch items.");
      });
  }, []);

  const handleToggleShortlist = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_shortlisted: !item.is_shortlisted } : item
      )
    );

    axios
      .post(`http://localhost:8080/api/toggle_shortlist/${id}`)
      .then((res) => {
        const updatedStudio = res.data.updated;
        if (!updatedStudio) return;

        setItems((prev) =>
          prev.map((item) => (item.id === updatedStudio.id ? updatedStudio : item))
        );
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to toggle shortlist status.");
        setItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, is_shortlisted: !item.is_shortlisted } : item
          )
        );
      });
  };
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="w-8 h-8">
          <Image src={logo} alt="EmptyCup Logo" width={32} height={32} className="rounded-full" />
        </div>
        <h1 className="text-xl font-medium text--600">EmptyCup</h1>
        <button className="p-1">
          <MoreVertical className="w-6 h-6 text-gray-600" />
        </button>
      </header>
      <nav className="flex justify-between items-center p-4 border-b">
        <Link href="/contacts" className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src={contacts}
              alt="Contacts"
              width={24}
              height={24}
              className="object-contain grayscale brightness-50"
            />
          </div>
          <span className="text-xs text-gray-500">Contacts</span>
        </Link>
        <Link href="/gallery" className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image src={gallery} alt="Gallery" width={24} height={24} className="object-contain" />
          </div>
          <span className="text-xs text-gray-500">Gallery</span>
        </Link>
        <Link href="/map" className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image src={map} alt="Map" width={24} height={24} className="object-contain" />
          </div>
          <span className="text-xs text-gray-500">Map</span>
        </Link>
        <Link href="/" className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src={heartboard}
              alt="Shortlisted"
              width={24}
              height={24}
              className="object-contain cursor-pointer"
              onClick={() => setShowOnlyShortlisted((prev) => !prev)}
            />
          </div>
          <span className="text-xs text-gray-500">Shortlisted</span>
        </Link>
        <Link href="/sort" className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image src={sort} alt="Sort" width={24} height={24} className="object-contain" />
          </div>
          <span className="text-xs text-gray-500">Sort</span>
        </Link>
      </nav>
      <div className="flex flex-col">
        {items
          .filter((studio) => !showOnlyShortlisted || studio.is_shortlisted)
          .map((studio) => (
            <div key={studio.id} className={`border-b ${studio.is_shortlisted ? "bg-[rgba(255,252,242,1)]" : ""}`}>
              <div className="p-4 flex">
                <div className="flex-1 pr-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold">{studio.name}</h2>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            fill={i < Math.floor(studio.rating) ? "black" : i < studio.rating ? "black" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={i < Math.floor(studio.rating) ? "" : i < studio.rating ? "fill-[50%]" : ""}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-md mt-2 text-gray-700">{studio.description}</p>
                  <div className="flex justify-between mt-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{studio.projects}</p>
                      <p className="text-s text-gray-600">Projects</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">{studio.years}</p>
                      <p className="text-s text-gray-600">Years</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">{studio.price}</p>
                      <p className="text-s text-gray-600">Price</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl">{studio.phone_1}</p>
                    <p className="text-2xl">{studio.phone_2}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-center ml-2 border-l pl-2 text-[#8d4337]">
                  <button className="flex flex-col items-center mb-3">
                    <Image src={details} alt="Details" width={20} height={20} className="mb-1" />
                    <span className="text-xs">Details</span>
                  </button>

                  <button
                    className="flex flex-col items-center mb-3 cursor-pointer"
                    onClick={() => handleToggleShortlist(studio.id)}
                  >
                    <Image
                      src={studio.is_shortlisted ? shortlistFull : shortlistEmpty}
                      alt="Shortlist"
                      width={20}
                      height={20}
                      className="mb-1"
                    />
                    <span className="text-xs">Shortlist</span>
                  </button>

                  <button className="flex flex-col items-center mb-3">
                    <Image src={hide} alt="Hide" width={20} height={20} className="mb-1" />
                    <span className="text-xs">Hide</span>
                  </button>
                  <button className="flex flex-col items-center">
                    <Image src={report} alt="Report" width={20} height={20} className="mb-1" />
                    <span className="text-xs">Report</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
