import React, { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { District, Province, Ward } from "@/types/Province";

interface LocationSelectorProps {
  onLocationChange: (data: {
    province: string;
    district: string;
    ward: string;
    streetAddress: string;
  }) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = React.memo(
  ({ onLocationChange }) => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const [selectedWard, setSelectedWard] = useState<string>("");
    const [streetAddress, setStreetAddress] = useState<string>("");

    useEffect(() => {
      fetch("https://provinces.open-api.vn/api/?depth=3")
        .then((res) => res.json())
        .then((data) => setProvinces(data));
    }, []);

    const handleProvinceChange = useCallback(
      (provinceName: string) => {
        setSelectedProvince(provinceName);
        const province = provinces.find((p) => p.name === provinceName);
        setDistricts(province?.districts || []);
        setSelectedDistrict("");
        setWards([]);
        setSelectedWard("");
        onLocationChange({
          province: provinceName,
          district: "",
          ward: "",
          streetAddress,
        });
      },
      [provinces, streetAddress, onLocationChange]
    );

    const handleDistrictChange = useCallback(
      (districtName: string) => {
        setSelectedDistrict(districtName);
        const district = districts.find((d) => d.name === districtName);
        setWards(district?.wards || []);
        setSelectedWard("");
        onLocationChange({
          province: selectedProvince,
          district: districtName,
          ward: "",
          streetAddress,
        });
      },
      [districts, selectedProvince, streetAddress, onLocationChange]
    );

    const handleWardChange = useCallback(
      (wardName: string) => {
        setSelectedWard(wardName);
        onLocationChange({
          province: selectedProvince,
          district: selectedDistrict,
          ward: wardName,
          streetAddress,
        });
      },
      [selectedProvince, selectedDistrict, streetAddress, onLocationChange]
    );

    const handleStreetChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setStreetAddress(e.target.value);
        onLocationChange({
          province: selectedProvince,
          district: selectedDistrict,
          ward: selectedWard,
          streetAddress: e.target.value,
        });
      },
      [selectedProvince, selectedDistrict, selectedWard, onLocationChange]
    );

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm mb-1 block">
              <span className="text-red-500">*</span>{" "}
              <span className="text-white">Tỉnh thành</span>
            </label>
            <Select value={selectedProvince} onValueChange={handleProvinceChange}>
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="Chọn Tỉnh/Thành" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((p) => (
                  <SelectItem key={p.code} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-white text-sm mb-1 block">
              Quận/Huyện
            </label>
            <Select
              value={selectedDistrict}
              onValueChange={handleDistrictChange}
              disabled={!districts.length}
            >
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="Chọn Quận/Huyện" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((d) => (
                  <SelectItem key={d.code} value={d.name}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white text-sm mb-1 block">
              Phường/Xã
            </label>
            <Select
              value={selectedWard}
              onValueChange={handleWardChange}
              disabled={!wards.length}
            >
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="Chọn Phường/Xã" />
              </SelectTrigger>
              <SelectContent>
                {wards.map((w) => (
                  <SelectItem key={w.code} value={w.name}>
                    {w.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm mb-1 block">
              <span className="text-red-500">*</span>{" "}
              <span className="text-white">Số nhà, đường</span>
            </label>
            <Input
              placeholder="Số nhà, đường"
              value={streetAddress}
              onChange={handleStreetChange}
              className="bg-white text-black border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>
    );
  }
);

export default LocationSelector;