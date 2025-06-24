import { useState } from "react";
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
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLinkAdded: () => void;
}

interface LinkMetadata {
  title: string;
  image: string;
  domain: string;
  tags: string[];
  summary: string;
  userId: string;
}

const AddLinkModal = ({ isOpen, onClose, onLinkAdded }: AddLinkModalProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [linkData, setLinkData] = useState<LinkMetadata | null>(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const fetchLinkMetadata = async () => {
    if (!url.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/link/fetch`,
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: url.trim() }),
        }
      );

      if (!response.ok) {
        if (response.status === 500) {
          toast.error("Failed to fetch link metadata. Please check the URL.");
          navigate("/dashboard");
          return;
        }
        toast.error("Failed to fetch link metadata. Please check the URL.");
        return;
      }

      const data: LinkMetadata = await response.json();
      setLinkData(data);
    } catch (error) {
      console.error("Error fetching link metadata:", error);
      toast.error("Failed to fetch link metadata. Please check the URL.");
    }
    setIsLoading(false);
  };

  const saveLink = async () => {
    if (!linkData) {
      toast.error("No link data to save.");
    }
    if (!url.trim()) {
      toast.error("Please enter a valid URL.");
    }
    setSaveLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/link`,
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url.trim(),
            title: linkData?.title,
            image: linkData?.image,
            domain: linkData?.domain,
            tags: linkData?.tags,
            summary: linkData?.summary,
          }),
        }
      );
      if (response.status === 409) {
        toast.error("Link already saved/exists in the collection");
      }
      if (!response.ok) {
        throw new Error("Failed to save link");
      } else if (response.ok) {
        toast.success("Link saved successfully!");
      }
      toast.success("Link saved successfully!");
    } catch (error) {
      console.error("Error saving link:", error);
      toast.error("Failed to save link. Please try again.");
    }
    setUrl("");
    setLinkData(null);
    onLinkAdded();
    setSaveLoading(false);
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
              <span className="text-xs text-gray-500">{linkData.domain}</span>
              <div className="flex flex-wrap gap-2">
                {linkData.tags.length > 0 &&
                  linkData.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="text-xs bg-indigo-600 text-white"
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={saveLink}
              disabled={!linkData || saveLoading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {saveLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Link"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLinkModal;
