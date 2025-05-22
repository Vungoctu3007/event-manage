import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import ImageUpload from "./ImageUpload";

interface OrganizerInfoProps {
  onDataChange: (data: {
    organization_name: string;
    organizer_description: string;
    organizer_url: File | null;
  }) => void;
}

const OrganizerInfo: React.FC<OrganizerInfoProps> = React.memo(
  ({ onDataChange }) => {
    const maxLength = 100;
    const maxLengthDescription = 500;
    const [organizationName, setOrganizationName] = useState("");
    const [organizerDescription, setOrganizerDescription] = useState("");
    const [organizerUrl, setOrganizerUrl] = useState<File | null>(null);
    const [organizerPreview, setOrganizerPreview] = useState<string | null>(null);

    const handleNameChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= maxLength) {
          setOrganizationName(e.target.value);
          onDataChange({
            organization_name: e.target.value,
            organizer_description: organizerDescription,
            organizer_url: organizerUrl,
          });
        }
      },
      [organizerDescription, organizerUrl, onDataChange]
    );

    const handleDescriptionChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value.slice(0, maxLengthDescription);
        setOrganizerDescription(value);
        onDataChange({
          organization_name: organizationName,
          organizer_description: value,
          organizer_url: organizerUrl,
        });
      },
      [organizationName, organizerUrl, onDataChange]
    );

    const handleFileChange = useCallback(
      (file: File | null) => {
        setOrganizerUrl(file);
        onDataChange({
          organization_name: organizationName,
          organizer_description: organizerDescription,
          organizer_url: file,
        });
      },
      [organizationName, organizerDescription, onDataChange]
    );

    return (
      <div className="flex">
        <div className="w-1/4 pr-4 pt-5">
          <ImageUpload
            onFileChange={handleFileChange}
            preview={organizerPreview}
            setPreview={setOrganizerPreview}
            width="275px"
            height="275px"
            label="Thêm logo ban tổ chức"
            dimensions="(275x275)"
          />
        </div>
        <div className="w-3/4 space-y-4">
          <div>
            <label className="text-sm mb-1 block">
              <span className="text-red-500">*</span>{" "}
              <span className="text-white">Tên ban tổ chức</span>
            </label>
            <div className="relative w-full">
              <Input
                type="text"
                value={organizationName}
                onChange={handleNameChange}
                placeholder="Tên ban tổ chức"
                className="bg-white text-black border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 w-full pr-20"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                {organizationName.length} / {maxLength}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm mb-1 block">
              <span className="text-red-500">*</span>{" "}
              <span className="text-white">Thông tin ban tổ chức</span>
            </label>
            <div className="relative w-full">
              <textarea
                value={organizerDescription}
                onChange={handleDescriptionChange}
                placeholder="Thông tin ban tổ chức"
                className="bg-white text-black border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 w-full h-48 rounded-md p-2 pr-20"
              />
              <span className="absolute right-2 bottom-2 text-xs text-gray-500 pointer-events-none">
                {organizerDescription.length} / {maxLengthDescription}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default OrganizerInfo;