import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import LocationSelector from "@/components/layouts/Organizer/Event/LocationSelector";
import EventDetails from "@/components/layouts/Organizer/Event/EventDetails";
import OrganizerInfo from "@/components/layouts/Organizer/Event/OrganizerInfo";
import ImageUpload from "@/components/layouts/Organizer/Event/ImageUpload";

interface EventInfoProps {
    onDataChange: (data: {
        title: string;
        description: string;
        start_time: string;
        end_time: string;
        status: "active" | "cancelled" | "sold_out";
        logo_url: File | null;
        background_url: File | null;
        organizer_url: File | null;
        map_url: File | null; // Added for event map
        category_id: string;
        organization_name: string;
        organizer_description: string;
        venue_name: string;
        venue_city: string;
        venue_address: string;
    }) => void;
}

const EventInfo: React.FC<EventInfoProps> = ({ onDataChange }) => {
    const maxLength = 100;
    const [venueName, setVenueName] = useState("");
    const [logoUrl, setLogoUrl] = useState<File | null>(null);
    const [backgroundUrl, setBackgroundUrl] = useState<File | null>(null);
    const [mapUrl, setMapUrl] = useState<File | null>(null); // State for event map
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);
    const [mapPreview, setMapPreview] = useState<string | null>(null); // Preview for event map
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        start_time: "",
        end_time: "",
        status: "active" as "active" | "cancelled" | "sold_out",
        category_id: "",
    });
    const [organizerData, setOrganizerData] = useState({
        organization_name: "",
        organizer_description: "",
        organizer_url: null as File | null,
    });
    const [locationData, setLocationData] = useState({
        province: "",
        district: "",
        ward: "",
        streetAddress: "",
    });

    const handleVenueNameChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length <= maxLength) {
                setVenueName(e.target.value);
            }
        },
        []
    );

    const handleEventDataChange = useCallback(
        (data: {
            title: string;
            start_time: string;
            end_time: string;
            status: "active" | "cancelled" | "sold_out";
            category_id: string;
            description: string;
        }) => {
            setEventData(data);
            onDataChange({
                ...data,
                logo_url: logoUrl,
                background_url: backgroundUrl,
                map_url: mapUrl, // Include map_url
                organizer_url: organizerData.organizer_url,
                organization_name: organizerData.organization_name,
                organizer_description: organizerData.organizer_description,
                venue_name: venueName,
                venue_city: locationData.province,
                venue_address: `${locationData.streetAddress}${
                    locationData.ward ? ", " + locationData.ward : ""
                }${locationData.district ? ", " + locationData.district : ""}`,
            });
        },
        [
            logoUrl,
            backgroundUrl,
            mapUrl, // Added to dependencies
            organizerData,
            venueName,
            locationData,
            onDataChange,
        ]
    );

    const handleOrganizerDataChange = useCallback(
        (data: {
            organization_name: string;
            organizer_description: string;
            organizer_url: File | null;
        }) => {
            setOrganizerData(data);
            onDataChange({
                ...eventData,
                logo_url: logoUrl,
                background_url: backgroundUrl,
                map_url: mapUrl, // Include map_url
                venue_name: venueName,
                venue_city: locationData.province,
                venue_address: `${locationData.streetAddress}${
                    locationData.ward ? ", " + locationData.ward : ""
                }${locationData.district ? ", " + locationData.district : ""}`,
                ...data,
            });
        },
        [
            eventData,
            logoUrl,
            backgroundUrl,
            mapUrl, // Added to dependencies
            venueName,
            locationData,
            onDataChange,
        ]
    );

    const handleLocationChange = useCallback(
        (data: {
            province: string;
            district: string;
            ward: string;
            streetAddress: string;
        }) => {
            setLocationData(data);
            onDataChange({
                ...eventData,
                logo_url: logoUrl,
                background_url: backgroundUrl,
                map_url: mapUrl, // Include map_url
                organizer_url: organizerData.organizer_url,
                organization_name: organizerData.organization_name,
                organizer_description: organizerData.organizer_description,
                venue_name: venueName,
                venue_city: data.province,
                venue_address: `${data.streetAddress}${
                    data.ward ? ", " + data.ward : ""
                }${data.district ? ", " + data.district : ""}`,
            });
        },
        [
            eventData,
            logoUrl,
            backgroundUrl,
            mapUrl, // Added to dependencies
            organizerData,
            venueName,
            onDataChange,
        ]
    );

    const handleMapFileChange = useCallback(
        (file: File | null) => {
            setMapUrl(file);
            onDataChange({
                ...eventData,
                logo_url: logoUrl,
                background_url: backgroundUrl,
                map_url: file, // Update map_url
                organizer_url: organizerData.organizer_url,
                organization_name: organizerData.organization_name,
                organizer_description: organizerData.organizer_description,
                venue_name: venueName,
                venue_city: locationData.province,
                venue_address: `${locationData.streetAddress}${
                    locationData.ward ? ", " + locationData.ward : ""
                }${locationData.district ? ", " + locationData.district : ""}`,
            });
        },
        [
            eventData,
            logoUrl,
            backgroundUrl,
            organizerData,
            venueName,
            locationData,
            onDataChange,
        ]
    );

    return (
        <div className="space-y-6">
            <div className="flex gap-6 w-full">
                <ImageUpload
                    onFileChange={setLogoUrl}
                    preview={logoPreview}
                    setPreview={setLogoPreview}
                    width="284px"
                    height="416px"
                    label="Thêm logo sự kiện"
                    dimensions="(284x416)"
                />
                <ImageUpload
                    onFileChange={setBackgroundUrl}
                    preview={backgroundPreview}
                    setPreview={setBackgroundPreview}
                    width="855px"
                    height="416px"
                    label="Thêm ảnh nền sự kiện"
                    dimensions="(855x416)"
                />
            </div>
            <div>
                <label className="text-sm mb-1 block">
                    <span className="text-red-500">*</span>{" "}
                    <span className="text-white">Tên địa điểm</span>
                </label>
                <div className="relative w-full">
                    <Input
                        type="text"
                        value={venueName}
                        onChange={handleVenueNameChange}
                        placeholder="Tên địa điểm"
                        className="bg-white text-black border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 w-full pr-20"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                        {venueName.length} / {maxLength}
                    </span>
                </div>
            </div>
            <LocationSelector onLocationChange={handleLocationChange} />
            <EventDetails onDataChange={handleEventDataChange} />
            <OrganizerInfo onDataChange={handleOrganizerDataChange} />
            <div>
                <label className="text-sm mb-1 block">
                    <span className="text-red-500">*</span>{" "}
                    <span className="text-white">Sơ đồ sự kiện</span>
                </label>
                <ImageUpload
                    onFileChange={handleMapFileChange}
                    preview={mapPreview}
                    setPreview={setMapPreview}
                    width="1370"
                    height="416px"
                    label="Thêm sơ đồ sự kiện"
                    dimensions="(1370x416)"
                />
            </div>
        </div>
    );
};

export default EventInfo;