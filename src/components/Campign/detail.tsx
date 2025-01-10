"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowBack, Close, LoadingSpiner } from "@/app/dashboard/assets/icon";

const DetailCampaign = () => {
  const { id } = useParams();
  const [campaignDetail, setCampaignDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isPopupOpenImage, setIsPopupOpenImage] = useState(false);

  const handleOpenPopupImage = () => setIsPopupOpenImage(true);
  const handleClosePopupImage = () => setIsPopupOpenImage(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/campaign/${id}`);
        const result = await response.json();

        if (response.ok) {
          setCampaignDetail(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch data");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-3">
        <LoadingSpiner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="border rounded-2xl px-7 py-7">
      <Link href="/dashboard/campign">
        <div className="text-[24px] text-black-2 font-semibold flex gap-3 items-center mb-10">
          <ArrowBack />
          Detail Campaign
        </div>
      </Link>

      <div className=" px-4 py-4 flex flex-col gap-4 text-black-2">
        <div className="flex gap-7">
          <div className="w-50 font-semibold">Judul</div>
          <div className="text-[#4A4D4F] uppercase">{campaignDetail?.title}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Banner</div>
          <div onClick={handleOpenPopupImage} className="text-primary2 font-semibold cursor-pointer">
            Lihat Banner
          </div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Kategori</div>
          <div className="text-[#4A4D4F] capitalize">{campaignDetail?.kategori}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Total</div>
          <div className="text-[#4A4D4F]">{campaignDetail?.total}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Tanggal Dibuat</div>
          <div className="text-[#4A4D4F]">{new Date(campaignDetail?.created_at).toLocaleDateString()}</div>
        </div>

        <div className="flex gap-7">
          <div className="w-50 font-semibold">Deskripsi</div>
          <div className="text-[#4A4D4F]">{campaignDetail?.deskripsi}</div>
        </div>
      </div>

      {isPopupOpenImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-2 bg-opacity-70 z-999999">
          <div className="bg-white text-black-2 p-4 rounded-lg shadow-lg w-[400px] xl:ms-55">
            <div className="flex justify-between items-center mb-7">
              <h2 className="text-[20px] font-medium">Foto Banner</h2>
              <div onClick={handleClosePopupImage} className="cursor-pointer">
                <Close />
              </div>
            </div>
            <div className="flex justify-center mb-3">
              <img src={campaignDetail?.image} alt="Banner" width={300} height={200} className="rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailCampaign;
