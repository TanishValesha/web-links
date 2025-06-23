import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Skeleton } from "../components/ui/skeleton";
import { LinkIcon, PlusIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLinkAdded: () => void;
}

interface LinkMetadata {
  title: string;
  description: string;
  image: string;
  domain: string;
}

const AddLinkModal = ({ isOpen, onClose, onLinkAdded }: AddLinkModalProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [linkData, setLinkData] = useState<LinkMetadata | null>(null);

  if (!isOpen) return null;

  const fetchLinkMetadata = async () => {
    if (!url.trim()) return;

    setIsLoading(true);
    try {
      // Simulate API call - in real app, this would fetch actual metadata
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const domain = new URL(url).hostname.replace("www.", "");
      const mockData: LinkMetadata = {
        title: "Sample Article Title",
        description:
          "This is a sample description of the article or page content that would be fetched from the URL.",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
        domain: domain,
      };

      setLinkData(mockData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast(
        "Failed to fetch link metadata. Please check the URL and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const saveLink = () => {
    if (!linkData || !url.trim()) return;

    const newLink = {
      id: Date.now(),
      url: url.trim(),
      ...linkData,
      savedAt: new Date().toISOString(),
    };

    const existingLinks = JSON.parse(
      localStorage.getItem("savedLinks") || "[]"
    );
    const updatedLinks = [newLink, ...existingLinks];
    localStorage.setItem("savedLinks", JSON.stringify(updatedLinks));

    toast("Link saved to your collection!");

    // Reset form
    setUrl("");
    setLinkData(null);
    onLinkAdded();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <PlusIcon className="w-5 h-5 mr-2 text-indigo-600" />
              Add New Link
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="flex space-x-2">
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={fetchLinkMetadata}
                disabled={!url.trim() || isLoading}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <LinkIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {isLoading && (
            <div className="space-y-3 border border-gray-200 rounded-lg p-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          )}

          {linkData && !isLoading && (
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <img
                src={linkData.image}
                alt={linkData.title}
                className="w-full h-32 object-cover rounded-md"
              />
              <h4 className="font-semibold text-gray-900">{linkData.title}</h4>
              <p className="text-sm text-gray-600">{linkData.description}</p>
              <span className="text-xs text-gray-500">{linkData.domain}</span>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={saveLink}
              disabled={!linkData}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Save Link
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLinkModal;
