"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, CheckCircle, Loader2, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { areasList } from "@/data/areas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SERVICES = [
  "Residential Moving",
  "Commercial Moving",
  "Long Distance Moving",
  "Packing Services",
  "Storage Solutions",
  "Specialty Moving",
  "Piano Moving",
  "White Glove Movers",
  "Large Item Moving",
  "Apartment Moving",
  "High Rise Moving",
  "Local Moving",
  "Renovation Moving Services",
];

const STORAGE_KEY = "owner-intake-draft";

const CREW_SIZE_OPTIONS = [
  "1 mover + 1 truck",
  "2 movers + 1 truck",
  "2 movers + 2 trucks",
  "3 movers + 1 truck",
  "3 movers + 2 trucks",
  "4 movers + 1 truck",
  "4 movers + 2 trucks",
  "5 movers + 2 trucks",
  "6 movers + 2 trucks",
];

interface FormData {
  neighborhood: string;
  neighborhoodOther: string;
  homeType: string;
  crewSize: string;
  moveDetails: string;
  movingTo: string;
  relatedServices: string[];
}

interface UploadedFile {
  file: File;
  preview: string;
  uploading: boolean;
  uploaded: boolean;
  url?: string;
  error?: string;
}

export default function OwnerIntakePage() {
  const [formData, setFormData] = useState<FormData>({
    neighborhood: "",
    neighborhoodOther: "",
    homeType: "",
    crewSize: "",
    moveDetails: "",
    movingTo: "",
    relatedServices: [],
  });
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionSummary, setSubmissionSummary] = useState<{
    formData: FormData;
    photoUrls: string[];
  } | null>(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed);
      } catch (e) {
        console.error("Failed to parse draft:", e);
      }
    }
  }, []);

  // Auto-save to localStorage every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSubmitted) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [formData, isSubmitted]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, relatedService: value }));
  };

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1920;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = (height * MAX_WIDTH) / width;
          width = MAX_WIDTH;
        }
        if (height > MAX_HEIGHT) {
          width = (width * MAX_HEIGHT) / height;
          height = MAX_HEIGHT;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" }));
            } else {
              resolve(file);
            }
          },
          "image/jpeg",
          0.85
        );
      };
      img.onerror = () => resolve(file);
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = useCallback(async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];
    const allowedTypes = ["image/jpeg", "image/png", "image/heic", "image/heif"];

    for (let i = 0; i < selectedFiles.length && files.length + newFiles.length < 20; i++) {
      const file = selectedFiles[i];
      
      // Check file type
      if (!allowedTypes.includes(file.type.toLowerCase()) && 
          !file.name.toLowerCase().endsWith(".heic") && 
          !file.name.toLowerCase().endsWith(".heif")) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported image format (JPG, PNG, HEIC)`,
          variant: "destructive",
        });
        continue;
      }

      // Compress if needed
      let processedFile = file;
      if (file.type.startsWith("image/") && file.size > 1024 * 1024) {
        processedFile = await compressImage(file);
      }

      newFiles.push({
        file: processedFile,
        preview: URL.createObjectURL(processedFile),
        uploading: false,
        uploaded: false,
      });
    }

    setFiles((prev) => [...prev, ...newFiles]);
  }, [files.length]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const uploadFile = async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const path = `${timestamp}-${safeName}`;

    const { data, error } = await supabase.storage
      .from("move-intakes")
      .upload(path, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from("move-intakes")
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.neighborhood || !formData.homeType || !formData.crewSize || !formData.moveDetails) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload all files
      const uploadedUrls: string[] = [];
      const updatedFiles = [...files];

      for (let i = 0; i < updatedFiles.length; i++) {
        if (!updatedFiles[i].uploaded) {
          updatedFiles[i].uploading = true;
          setFiles([...updatedFiles]);

          try {
            const url = await uploadFile(updatedFiles[i].file);
            updatedFiles[i].url = url;
            updatedFiles[i].uploaded = true;
            uploadedUrls.push(url);
          } catch (error) {
            updatedFiles[i].error = "Upload failed";
            console.error("Upload error:", error);
          }
          updatedFiles[i].uploading = false;
          setFiles([...updatedFiles]);
        } else if (updatedFiles[i].url) {
          uploadedUrls.push(updatedFiles[i].url!);
        }
      }

      // Determine final neighborhood value
      const finalNeighborhood = formData.neighborhood === "Other" 
        ? formData.neighborhoodOther 
        : formData.neighborhood;

      // Save to database
      const { error: dbError } = await supabase.from("move_intakes").insert({
        neighborhood: finalNeighborhood,
        home_type: formData.homeType,
        crew_size: formData.crewSize,
        move_details: formData.moveDetails,
        moving_from: null,
        moving_to: formData.movingTo || null,
        related_service: formData.relatedServices.join(", ") || null,
        photo_urls: uploadedUrls,
      });

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke("send-move-intake-email", {
        body: {
          neighborhood: finalNeighborhood,
          homeType: formData.homeType,
          crewSize: formData.crewSize,
          moveDetails: formData.moveDetails,
          movingTo: formData.movingTo,
          relatedServices: formData.relatedServices,
          photoUrls: uploadedUrls,
        },
      });

      if (emailError) {
        console.error("Email error:", emailError);
        // Don't fail the whole submission if email fails
      }

      // Clear draft
      localStorage.removeItem(STORAGE_KEY);

      // Show success
      setSubmissionSummary({
        formData,
        photoUrls: uploadedUrls,
      });
      setIsSubmitted(true);

      toast({
        title: "Submission successful!",
        description: "Move intake has been submitted and email sent.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartNew = () => {
    setFormData({
      neighborhood: "",
      neighborhoodOther: "",
      homeType: "",
      crewSize: "",
      moveDetails: "",
      movingTo: "",
      relatedServices: [],
    });
    files.forEach((f) => URL.revokeObjectURL(f.preview));
    setFiles([]);
    setIsSubmitted(false);
    setSubmissionSummary(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (isSubmitted && submissionSummary) {
    return (
      <>
<div className="min-h-screen bg-background p-4 md:p-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Submitted Successfully!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold">Submission Summary</h3>
                  <p><strong>Neighborhood:</strong> {submissionSummary.formData.neighborhood}</p>
                  <p><strong>Home/Move Type:</strong> {submissionSummary.formData.homeType}</p>
                  <p><strong>Crew Size:</strong> {submissionSummary.formData.crewSize}</p>
                  <p><strong>Move Details:</strong> {submissionSummary.formData.moveDetails}</p>
                  {submissionSummary.formData.movingTo && (
                    <p><strong>Moving To:</strong> {submissionSummary.formData.movingTo}</p>
                  )}
                  {submissionSummary.formData.relatedServices.length > 0 && (
                    <p><strong>Related Services:</strong> {submissionSummary.formData.relatedServices.join(", ")}</p>
                  )}
                  <p><strong>Photos:</strong> {submissionSummary.photoUrls.length} uploaded</p>
                </div>

                {submissionSummary.photoUrls.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Uploaded Photos</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {submissionSummary.photoUrls.map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                          <img
                            src={url}
                            alt={`Upload ${i + 1}`}
                            className="w-full h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <Button onClick={handleStartNew} className="w-full" size="lg">
                  Start New Submission
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
<div className="min-h-screen bg-background pb-24 md:pb-8">
        <div className="max-w-2xl mx-auto p-4 md:p-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Move Intake Form</CardTitle>
              <p className="text-muted-foreground text-center text-sm">
                Submit move details and photos for the Recent Moves page
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Neighborhood */}
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">
                    Neighborhood <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.neighborhood}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, neighborhood: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a neighborhood" />
                    </SelectTrigger>
                    <SelectContent>
                      {areasList.map((area) => (
                        <SelectItem key={area.slug} value={area.name}>
                          {area.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.neighborhood === "Other" && (
                    <Input
                      id="neighborhoodOther"
                      name="neighborhoodOther"
                      value={formData.neighborhoodOther}
                      onChange={handleInputChange}
                      placeholder="Enter neighborhood name"
                      className="mt-2"
                      required
                    />
                  )}
                </div>

                {/* Home/Move Type */}
                <div className="space-y-2">
                  <Label htmlFor="homeType">
                    Home/Move Type <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="homeType"
                    name="homeType"
                    value={formData.homeType}
                    onChange={handleInputChange}
                    placeholder="e.g., 5,000 sq ft Two-Story Home"
                    required
                  />
                </div>

                {/* Crew Size */}
                <div className="space-y-2">
                  <Label htmlFor="crewSize">
                    Crew Size <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.crewSize}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, crewSize: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select crew size" />
                    </SelectTrigger>
                    <SelectContent>
                      {CREW_SIZE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Move Details */}
                <div className="space-y-2">
                  <Label htmlFor="moveDetails">
                    Move Details <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="moveDetails"
                    name="moveDetails"
                    value={formData.moveDetails}
                    onChange={handleInputChange}
                    placeholder="Describe the move: special items, challenges, what was involved..."
                    rows={4}
                    required
                  />
                </div>

                {/* Moving To (optional) */}
                <div className="space-y-2">
                  <Label htmlFor="movingTo">Moving To (optional)</Label>
                  <Input
                    id="movingTo"
                    name="movingTo"
                    value={formData.movingTo}
                    onChange={handleInputChange}
                    placeholder="Destination location"
                  />
                </div>

                {/* Related Services - Multi-select */}
                <div className="space-y-3">
                  <Label>Related Services (optional)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {SERVICES.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service}`}
                          checked={formData.relatedServices.includes(service)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData((prev) => ({
                                ...prev,
                                relatedServices: [...prev.relatedServices, service],
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                relatedServices: prev.relatedServices.filter((s) => s !== service),
                              }));
                            }
                          }}
                        />
                        <label
                          htmlFor={`service-${service}`}
                          className="text-sm leading-none cursor-pointer"
                        >
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label>Photos ({files.length}/20)</Label>
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    <Upload className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop photos here, or tap to select
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG, HEIC • Max 20 photos
                    </p>
                    <input
                      id="file-input"
                      type="file"
                      accept="image/jpeg,image/png,image/heic,image/heif,.heic,.heif"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileSelect(e.target.files)}
                    />
                  </div>

                  {/* File Previews */}
                  {files.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-4">
                      {files.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={file.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          {file.uploading && (
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <Loader2 className="w-6 h-6 text-white animate-spin" />
                            </div>
                          )}
                          {file.uploaded && (
                            <div className="absolute top-1 right-1">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                          {file.error && (
                            <div className="absolute inset-0 bg-red-500/50 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs">Failed</span>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-1 left-1 bg-black/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop Submit Button */}
                <div className="hidden md:block">
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Move Intake"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Sticky Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden">
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Move Intake"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

